const STAGE_1_COLORS = ['#B535DC', '#11C6EF', '#03A6A1', '#FF6600', '#D91656']
const STAGE_2_COLORS = [
  '#05A403',
  '#03A6A1',
  '#B535DC',
  '#6500AE',
  '#001BB7',
  '#11C6EF',
  '#0046FF',
  '#A76A00',
  '#FF6600',
  '#EA0D0D',
  '#D91656',
  '#7D2351',
]
const STAGE_3_COLORS = [
  '#03A6A1',
  '#B535DC',
  '#6500AE',
  '#001BB7',
  '#11C6EF',
  '#0046FF',
  '#A76A00',
  '#FF6600',
  '#EA0D0D',
  '#D91656',
  '#7D2351',
  '#05A403',
]
const STAGE_4_COLORS = [
  '#B535DC',
  '#6500AE',
  '#001BB7',
  '#11C6EF',
  '#0046FF',
  '#A76A00',
  '#FF6600',
  '#EA0D0D',
  '#D91656',
  '#7D2351',
  '#05A403',
  '#03A6A1',
]
const STAGE_5_COLORS = [
  '#6500AE',
  '#001BB7',
  '#11C6EF',
  '#0046FF',
  '#A76A00',
  '#FF6600',
  '#EA0D0D',
  '#D91656',
  '#7D2351',
  '#05A403',
  '#03A6A1',
  '#B535DC',
]
const STAGE_6_COLORS = [
  '#001BB7',
  '#11C6EF',
  '#0046FF',
  '#A76A00',
  '#FF6600',
  '#EA0D0D',
  '#D91656',
  '#7D2351',
  '#05A403',
  '#03A6A1',
  '#B535DC',
  '#6500AE',
]

function getThemeColor(levelKey: string, index: number) {
  let pool: string[]
  switch (levelKey) {
    case 'K':
      pool = STAGE_2_COLORS
      break
    case '1':
      pool = STAGE_3_COLORS
      break
    case '2':
      pool = STAGE_4_COLORS
      break
    case '3':
      pool = STAGE_5_COLORS
      break
    case '4':
      pool = STAGE_6_COLORS
      break
    default:
      pool = STAGE_1_COLORS
  }
  if (index === 0) {
    return pool[0]
  }
  return pool[index % pool.length]
}
const PROGRESS_COLOR = '#FFCA2B'

const DailyRGTheme = {
  getThemeColor,
  progressColor: PROGRESS_COLOR,
}

export default DailyRGTheme
