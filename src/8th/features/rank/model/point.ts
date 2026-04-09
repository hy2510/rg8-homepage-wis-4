import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type PointRank = {
  no: number
  studentId: string
  loginId: string
  name: string
  nameEng: string
  gradeName: string
  className: string
  rgPoint: number
  bookCount: number
  classRank: number
  totalRank: number
  imgAvatarList: string
  avatarId: string
  imgRankingList2: string
}

function makePointRank(json?: any): PointRank {
  return {
    no: RenewType.renewNumber(json?.NO),
    studentId: RenewType.renewString(json?.StudentId),
    loginId: RenewType.renewString(json?.LoginId),
    name: RenewType.renewString(json?.Name),
    nameEng: RenewType.renewString(json?.NameEng),
    gradeName: RenewType.renewString(json?.GradeName),
    className: RenewType.renewString(json?.ClassName),
    rgPoint: RenewType.renewNumber(json?.RgPoint),
    bookCount: RenewType.renewNumber(json?.BookCount),
    classRank: RenewType.renewNumber(json?.ClassRank),
    totalRank: RenewType.renewNumber(json?.TotalRank),
    imgAvatarList: RenewType.renewString(json?.ImgAvatarList),
    avatarId: RenewType.renewString(json?.AvatarId),
    imgRankingList2: RenewType.renewString(json?.ImgRankingList2),
  }
}

function transform(json: any): PointRankResponse {
  return {
    user: json?.Me ? makePointRank(json.Me) : undefined,
    list: json?.Rank?.map((json: any) => {
      return makePointRank(json)
    }),
  }
}

export type PointRankParams = {
  type: string
}

export type PointRankResponse = {
  user?: PointRank
  list: PointRank[]
}

export async function getPointRank(
  input: PointRankParams,
): Promise<PointRankResponse> {
  const request = makeRequest(`api/ranking/point`, 'append-customer', {
    method: 'get',
    queryString: {
      type: input.type,
    },
  })
  return await execute(request, transform)
}
