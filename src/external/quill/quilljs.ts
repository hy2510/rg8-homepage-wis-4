export type QuillEditorType = {
  decodeHTMLEntities: (text: string) => string
  addImage: (imageUrl: string) => void
  setContentHtml: (html: string) => void
  getContentHtml: () => string
  getPlainText: () => string
  moveImageLine: (direction: 'up' | 'down') => void
}
type RawQuillEditorType = {
  createQuill: (dom: unknown) => unknown
  decodeHTMLEntities: (text: string) => string
  addImage: (quillObject: unknown, imageUrl: string) => void
  setContentHtml: (quillObject: unknown, html: string) => void
  getContentHtml: (quillObject: unknown) => string
  getPlainText: (quillObject: unknown) => string
  getLineIndex: (quillObject: unknown) => number
  findImageLineIndex: (quillObject: unknown) => number
  swapLine: (quillObject: unknown, fromLine: number, toLine: number) => void
}

export default function initQuillEditor(dom: HTMLDivElement): QuillEditorType {
  const editor: RawQuillEditorType = window as any as RawQuillEditorType

  const quillObj = editor.createQuill(dom)

  const decodeHTMLEntities = (text: string): string => {
    return editor.decodeHTMLEntities(text)
  }
  const addImage = (imageUrl: string) => {
    editor.addImage(quillObj, imageUrl)
  }
  const setContentHtml = (html: string) => {
    editor.setContentHtml(quillObj, html)
  }
  const getContentHtml = (): string => {
    return editor.getContentHtml(quillObj)
  }
  const getPlainText = (): string => {
    return editor.getPlainText(quillObj)
  }

  const moveImageLine = (direction: 'up' | 'down') => {
    const imageIndex = editor.findImageLineIndex(quillObj)
    if (direction === 'up') {
      editor.swapLine(quillObj, imageIndex, imageIndex - 1)
    } else {
      editor.swapLine(quillObj, imageIndex, imageIndex + 1)
    }
  }

  return {
    decodeHTMLEntities,
    addImage,
    setContentHtml,
    getContentHtml,
    getPlainText,
    moveImageLine,
  }
}
