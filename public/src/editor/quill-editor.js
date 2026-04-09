function decodeHTMLEntities(text) {
  const mdText = text.replace(/&lt;/g, '&_lt;').replace(/&gt;/g, '&_gt;')
  const textarea = document.createElement("textarea");
  textarea.innerHTML = mdText;

  const decoded = textarea.value.replace(/ /g, ' ')
  .replace(/<p><\/p>/g, '<p><br></p>')
  .replace(/<h1><\/h1>/g, '<h1><br></h1>')
  .replace(/<h2><\/h2>/g, '<h2><br></h2>')
  .replace(/<h3><\/h3>/g, '<h3><br></h3>')
  .replace(/<h4><\/h4>/g, '<h4><br></h4>')
  .replace(/<h5><\/h5>/g, '<h5><br></h5>')
  .replace(/<h6><\/h6>/g, '<h6><br></h6>')
  .replace(/&/g, () => {
      return '&amp;'
  })
  .replace(/&amp;_lt;/g, '&lt;')
  .replace(/&amp;_gt;/g, '&gt;')
  .replace(/( +)/g, (match) => {
      return match[0] + match.slice(1).replace(/ /g, '&nbsp;');
  })
  return decoded
}


function createQuill(container) {
  const Delta = Quill.import('delta')

  const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline','strike',],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['code', { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['link', ],
    ['clean']                                         // remove formatting button
  ];

  const quill = new Quill(container, {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions
    },
  });

  quill.on('text-change', (delta, oldDelta, source) => {
    if (source === 'user') {
      const ops = delta.ops || [];
      const hasBase64Image = ops.some(
        (op) =>
          op.insert &&
          typeof op.insert === 'object' &&
          op.insert.image &&
          op.insert.image.startsWith('data:')
      );

      if (hasBase64Image) {
        // Base64 이미지 제거

        // 마지막 삽입된 이미지를 제거
        const cur = quill.getContents();
        const clean = cur.ops.filter(
          (op) =>
            !(
              typeof op.insert === 'object' &&
              op.insert.image &&
              op.insert.image.startsWith('data:')
            )
        );

        quill.setContents({ ops: clean });
      }
    }
  });


  // Quill의 클립보드 `addMatcher()`를 사용하여 불필요한 HTML 제거
  quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
    if (!node.outerHTML) return delta; // 안전 처리

    // 붙여넣어진 HTML을 가져와서 정리
    const cleanHtml = decodeHTMLEntities(node.outerHTML);

    // 임시 div에 삽입 후 텍스트 가져오기
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
  

    let hasNewDelta = false
    if(cleanHtml && delta.ops.length > 0){
      for(let i=0; i<delta.ops.length; i++) {
        if(delta.ops[i].attributes){
          const entries = Object.entries(delta.ops[i].attributes)
          for(let j=0; j<entries.length;j++){
            const key = entries[j][0] 
            if(key === 'align' || key === 'table'){
              hasNewDelta = true
              break
            }
            if(entries[j].length >= 2 && typeof entries[j][1] === 'string' && entries[j][1].indexOf('var') >= 0){
              hasNewDelta = true
              break
            }
          }
        }
        if(!hasNewDelta && delta.ops[i].insert && typeof delta.ops[i].insert === 'object'){
          hasNewDelta = true
        }
        if(hasNewDelta){
          break
        }
      }

      if(!hasNewDelta){
        return delta
      }
    }

    const newDelta = new Delta()
    newDelta.ops = delta.ops.map(d => {
      let newAttr = undefined
      let newInsert = undefined
      if(!!d.attributes){
        newAttr = { ...d.attributes }
        const entries = Object.entries(d.attributes)
        entries.forEach(ent => {
          const key = ent[0]
          if(key === 'align' || key === 'table'){
            delete newAttr[key]
          }else {
            if(ent.length >= 2 && typeof ent[1] === 'string' && ent[1].indexOf('var') >= 0){
              delete newAttr[ent[0]]
            }
          }
        })
      }
      if(!!d.insert){
        if(typeof d.insert !== 'string'){
          newInsert = { ...d.insert }
          const entries = Object.entries(d.insert)
          
          const key = entries[0][0]
          if(key === 'video'){
            newInsert = ''
          }else if(key === 'image' && entries[0][1].indexOf('data:') === 0) {
            newInsert = ''
          }
        }else{
          newInsert = d.insert
        }
      }
      if(newAttr){
        return {
          attributes: newAttr, 
          insert: newInsert
        }
      }else{
        return {
          insert: newInsert
        }
      }
    })
    return newDelta
  });

  return quill
}

function addImage(quill, imageUrl) {
  // let range = quill.getSelection();
  // if (!range) {
  //   range = { index: quill.getLength(), length: 0 }; // 커서가 없을 경우 마지막 위치로 설정
  // }
  const range = { index: quill.getLength(), length: 0 }; 
  quill.insertEmbed(range.index, "image", imageUrl, 'user');
}


function findImageLineIndex(quill) {
  const delta = quill.getContents();
  let imageLineIndex = -1;
  let imageIndex = -1;

  let scanIndex = 0;
  for (const op of delta.ops) {
    const length = typeof op.insert === 'string' ? op.insert.length : 1;
    if (
      op.insert &&
      typeof op.insert === 'object' &&
      Object.prototype.hasOwnProperty.call(op.insert, 'image')
    ) {
      imageIndex = scanIndex;
      break;
    }
    scanIndex += length;
  }
  if(imageIndex >= 0){
    const [line] = quill.getLine(imageIndex);
    if (!line) return -1;

    const allLines = quill.getLines();
    return allLines.findIndex(l => l === line);
  }
  return imageLineIndex;
}

function getLineIndex(quill) {
  const selection = quill.getSelection();
  if (!selection) return -1;

  const [line] = quill.getLine(selection.index);
  if (!line) return -1;

  const allLines = quill.getLines();
  return allLines.findIndex(l => l === line);
}

function swapLine(quill, fromLineIndex, toLineIndex) {
  if(fromLineIndex === toLineIndex || fromLineIndex < 0 || toLineIndex < 0) return;

  const allLines = quill.getLines();
  if(allLines.length <= fromLineIndex || allLines.length <= toLineIndex) return;

  const direction = fromLineIndex > toLineIndex ? 'up': 'down'

  const fromIndex = quill.getIndex(allLines[fromLineIndex]);
  const fromLength = allLines[fromLineIndex].length();
  const fromDelta = quill.getContents(fromIndex, fromLength);

  const toIndex = quill.getIndex(allLines[toLineIndex]);
  const toLength = allLines[toLineIndex].length();
  const toDelta = quill.getContents(toIndex, toLength);

  // 1. 먼저 두 줄 삭제 (항상 큰 인덱스부터)
  let firstDeleteIndex = toIndex
  let firstDeleteLength = toLength
  let pairDeleteIndex = fromIndex
  let pairDeleteLength = fromLength
  if(direction === 'up'){
    firstDeleteIndex = fromIndex
    firstDeleteLength = fromLength
    pairDeleteIndex = toIndex
    pairDeleteLength = toLength
  }
  quill.deleteText(firstDeleteIndex, firstDeleteLength, 'user');
  quill.deleteText(pairDeleteIndex, pairDeleteLength, 'user');

  // 2. 삭제된 위치에 Delta 삽입 (순서 주의)
  let firstRetain = { retain: fromIndex }
  let secondRetain = { retain: toIndex - fromIndex - fromLength }
  let firstDelta = toDelta.ops
  let secondDelta = fromDelta.ops

  if(direction === 'up'){
    firstRetain.retain = toIndex
    secondRetain.retain = fromIndex - toIndex - toLength
    firstDelta = fromDelta.ops
    secondDelta = toDelta.ops
  }
  quill.updateContents([
    { ...firstRetain },
    ...firstDelta,
    { ...secondRetain },
    ...secondDelta,
  ], 'user');
}

function setContentHtml(quill, html) {
  const delta = quill.clipboard.convert({ html });
  quill.setContents(delta);
}

function getContentHtml(quill) {
  const semanticHtml = quill.getSemanticHTML()
  const html = decodeHTMLEntities(semanticHtml)
  return html
}

function getPlainText(quill) {
  const plainText = quill.getText()
  if(plainText){
    return plainText.trim()
  }
  return ''
}
