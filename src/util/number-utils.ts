function toDecimalPoint(
  src: number,
  option?: {
    count: number
    method: 'ceil' | 'floor' | 'trunc' | 'round'
  },
): number {
  const { count: inCount, method } = option || { count: 1, method: 'round' }

  const count = Math.trunc(inCount)
  const factor = Math.pow(10, count)

  switch (method) {
    case 'ceil':
      return Math.ceil(src * factor) / factor
    case 'floor':
      return Math.floor(src * factor) / factor
    case 'trunc':
      return Math.trunc(src * factor) / factor
    case 'round':
      return Math.round(src * factor) / factor
  }
}

function getHundredPercentage(
  part: number,
  total: number,
  option?: {
    isInteger: boolean
    limitZeroToHundred: boolean
  },
): number {
  if (total <= 0) {
    return 0
  }
  const { isInteger, limitZeroToHundred } = option || {
    isInteger: true,
    limitZeroToHundred: true,
  }

  const value = (part / total) * 100
  let percent = value
  if (limitZeroToHundred) {
    percent = Math.min(Math.max(0, value), 100)
  }
  if (isInteger) {
    return toDecimalPoint(percent, { count: 0, method: 'trunc' })
  }
  return percent
}

function toRgDecimalPoint(src: unknown): number {
  let num: number = 0
  if (typeof src === 'number' && !isNaN(src)) {
    num = src
  } else if (typeof src === 'string' && !isNaN(Number(src))) {
    num = parseFloat(src)
  }
  return toDecimalPoint(num, { count: 1, method: 'trunc' })
}

function toBigNumberString(
  num: number,
  option?: { divide?: ',' | '.' | "'" | ' ' | 'india'; point?: '.' | ',' },
): string {
  if (num < 1000 && Number.isInteger(num)) {
    return num.toString()
  }
  const { divide = ',', point: pPoint = '.' } = option || {
    divide: ',',
    point: '.',
  }
  const point =
    divide === ',' || divide === 'india' ? '.' : divide === '.' ? ',' : pPoint

  let text = ''
  let pointText = ''
  if (Number.isInteger(num)) {
    text = num.toString()
  } else {
    const tmp = num.toString().split('.')
    text = tmp[0]
    pointText = tmp[1]
  }

  let result = ''
  if (text) {
    if (divide !== 'india') {
      const startIndex = text.length % 3 !== 0 ? text.length % 3 : 0
      if (startIndex !== 0) {
        result = `${text.substring(0, startIndex)}${divide}`
      }
      for (let i = startIndex; i < text.length; i += 3) {
        result += `${text.substring(i, i + 3)}${divide}`
      }
      result = result.substring(0, result.length - 1)
    } else {
      const headText = text.substring(0, text.length - 3)
      const tailText = text.substring(text.length - 3, text.length)
      const startIndex = headText.length % 2 !== 0 ? 1 : 0
      if (startIndex !== 0) {
        result = `${headText.substring(0, startIndex)},`
      }
      for (let i = startIndex; i < headText.length; i += 2) {
        result += `${headText.substring(i, i + 2)},`
      }
      if (tailText !== '') {
        result += `${tailText}`
      } else {
        result = result.substring(0, result.length - 1)
      }
    }
  }
  if (pointText) {
    result += `${point}${pointText}`
  }
  return result
}

const NumberUtils = {
  toDecimalPoint,
  toRgDecimalPoint,
  getHundredPercentage,
  toBigNumberString,
}
export default NumberUtils
