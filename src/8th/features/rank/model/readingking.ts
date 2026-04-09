import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ReadingKingRank = {
  num: number
  loginId: string
  studentName: string
  schoolName: string
  customerName: string
  rgPoint: number
  studyDay: number
  bookCount: number
  studentId: string
  totalRank: number
  avatarId: string
  imgAvatarRankingList: string
  gradeName: string
}

function makeReadingKingRank(json?: any): ReadingKingRank {
  return {
    num: RenewType.renewNumber(json?.Num),
    loginId: RenewType.renewString(json?.LoginId),
    studentName: RenewType.renewString(json?.StudentName),
    schoolName: RenewType.renewString(json?.SchoolName),
    customerName: RenewType.renewString(json?.CustomerName),
    rgPoint: RenewType.renewNumber(json?.RgPoint),
    studyDay: RenewType.renewNumber(json?.StudyDay),
    bookCount: RenewType.renewNumber(json?.BookCount),
    studentId: RenewType.renewString(json?.StudentId),
    totalRank: RenewType.renewNumber(json?.TotalRank),
    avatarId: RenewType.renewString(json?.AvatarId),
    imgAvatarRankingList: RenewType.renewString(json?.ImgAvatarRankingList),
    gradeName: RenewType.renewString(json?.GradeName),
  }
}

function transform(json: any): ReadingKingRankResponse {
  return {
    user: json?.Me ? makeReadingKingRank(json.Me) : undefined,
    list: json?.Rank?.map((json: any) => {
      return makeReadingKingRank(json)
    }),
  }
}

export type ReadingKingRankParams = {
  eventId: string
}

export type ReadingKingRankResponse = {
  user?: ReadingKingRank
  list: ReadingKingRank[]
}

export async function getReadingKingRank(
  input: ReadingKingRankParams,
): Promise<ReadingKingRankResponse> {
  const request = makeRequest(`api/ranking/readingking`, 'append-customer', {
    method: 'get',
    queryString: {
      eventId: input.eventId,
    },
  })
  return await execute(request, transform)
}
