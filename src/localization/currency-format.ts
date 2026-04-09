import NumberUtils from '@/util/number-utils'

const FormatSetting = {
  language: 'ko',
}

function toRgDecimalPoint(src: unknown): number {
  let num: number = 0
  if (typeof src === 'number' && !isNaN(src)) {
    num = src
  } else if (typeof src === 'string' && !isNaN(Number(src))) {
    num = parseFloat(src)
  }
  return NumberUtils.toDecimalPoint(num, { count: 1, method: 'trunc' })
}

function toRgBigNumberString(src: unknown): string {
  const num: number = toRgDecimalPoint(src)
  let divide = ','
  let point = '.'
  if (FormatSetting.language === 'vn' || FormatSetting.language === 'vi') {
    divide = '.'
    point = '.'
  }
  return NumberUtils.toBigNumberString(num, { divide, point } as any)
}

function getMoneyUnit(currency: string): string {
  switch (currency) {
    case 'KRW':
      return FormatSetting.language === 'ko' ? '원' : '₩'
    case 'VND':
      return 'đ'
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    case 'JPY':
      return '¥'
    case 'CNY':
      return '元'
  }
  return ''
}

function toNumberMoneyString(src: unknown, currency: string): string {
  const num: number = Math.floor(toRgDecimalPoint(src))
  let result = ''
  if (currency === 'KRW') {
    if (FormatSetting.language === 'ko') {
      result = toRgBigNumberString(num) + '원'
    } else {
      result = '₩' + toRgBigNumberString(num)
    }
  } else if (currency === 'VND') {
    result = toRgBigNumberString(num) + 'đ'
  } else if (currency === 'USD') {
    result = '$' + toRgBigNumberString(num)
  } else if (currency === 'EUR') {
    result = toRgBigNumberString(num) + '€'
  } else if (currency === 'CNY') {
    result = toRgBigNumberString(num) + '元'
  } else if (currency === 'JPY') {
    result = '¥' + toRgBigNumberString(num)
  }
  return result
}

function changeCountryOption(language: string) {
  const lLanguage = language.toLocaleLowerCase()
  FormatSetting.language = lLanguage
}

const CurrencyFormat = {
  toRgDecimalPoint,
  toRgBigNumberString,
  toNumberMoneyString,
  getMoneyUnit,
  changeCountryOption,
}
export default CurrencyFormat
