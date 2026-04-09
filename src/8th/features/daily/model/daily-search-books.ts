import { execute, makeRequest } from '@/8th/shared/http'
import NumberUtils from '@/util/number-utils'
import RenewType from '@/util/string-utils'

export type DailySearchBook = {
  no: number
  topicTitle: string
  levelName: string
  levelRoundId: string
  surfaceImagePath: string
  studyImagePath: string
  preferenceAverage: number
  rgPointCount: number
  rgPointSum: number
  totalCount: number
  addYn: boolean
  seriesName: string
  addStudyCount: number
  todayStudyYn: boolean
  workSheetPath: string
  bookPoint: number
  animationPath: string
  workBookPrintYn: boolean
  studentWorkSheetYn: boolean
  recommendedAge: string
  getableRgPoint: number
  character: string
}

function makeDailySearchBook(json: any): DailySearchBook {
  return {
    no: RenewType.renewNumber(json?.No),
    topicTitle: RenewType.renewString(json?.TopicTitle),
    levelName: RenewType.renewString(json?.LevelName),
    levelRoundId: RenewType.renewString(json?.LevelRoundId),
    surfaceImagePath: RenewType.renewString(json?.SurfaceImagePath),
    preferenceAverage: RenewType.renewNumber(json?.PreferenceAverage),
    rgPointCount: RenewType.renewNumber(json?.RgPointCount),
    rgPointSum: RenewType.renewNumber(json?.RgPointSum),
    totalCount: RenewType.renewNumber(json?.TotalCount),
    addYn: RenewType.renewBoolean(json?.AddYn),
    seriesName: RenewType.renewString(json?.SeriesName),
    addStudyCount: RenewType.renewNumber(json?.AddStudyCount),
    todayStudyYn: RenewType.renewBoolean(json?.TodayStudyYn),
    workSheetPath: RenewType.renewString(json?.WorkSheetPath),
    bookPoint: NumberUtils.toRgDecimalPoint(
      RenewType.renewNumber(json?.BookPoint),
    ),
    animationPath: RenewType.renewString(json?.AnimationPath),
    workBookPrintYn: RenewType.renewBoolean(json?.WorkBookPrintYn),
    studentWorkSheetYn: RenewType.renewBoolean(json?.StudentWorkSheetYn),
    studyImagePath: RenewType.renewString(json?.StudyImagePath),
    recommendedAge: RenewType.renewString(json?.RecommendedAge),
    getableRgPoint: RenewType.renewNumber(json?.GetableRgPoint),
    character: RenewType.renewString(json?.Character),
  }
}

function transform(json: any): DailySearchBookResponse {
  return {
    book: json?.Books?.map((item: any) => makeDailySearchBook(item)),
  }
}

export type DailySearchBookParams = {
  stageId: string
  sectionId: string
}

export type DailySearchBookResponse = {
  book: DailySearchBook[]
  download?: string
}

export async function getDailySearchBook(
  input?: DailySearchBookParams,
): Promise<DailySearchBookResponse> {
  const request = makeRequest(`api/daily/search`, {
    method: 'get',
    queryString: {
      stageId: input?.stageId,
      sectionId: input?.sectionId,
    },
  })
  return await execute(request, transform)
}
