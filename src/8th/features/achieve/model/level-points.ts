import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type LevelPoint = {
  levelName: string
  nextLevelName: string
  point: number
  books: number
  myRgPoint: number
  requiredRgPoint: number
  remainingRgPoint: number
  levelCode: string
  levelId: string
}
function makeLevelPoint(json?: any): LevelPoint {
  return {
    levelName: RenewType.renewString(json?.LevelName),
    nextLevelName: RenewType.renewString(json?.NextLevelName),
    point: RenewType.renewNumber(json?.Point),
    books: RenewType.renewNumber(json?.Books),
    myRgPoint: RenewType.renewNumber(json?.MyRgPoint),
    requiredRgPoint: RenewType.renewNumber(json?.RequiredRgPoint),
    remainingRgPoint: RenewType.renewNumber(json?.RemainingRgPoint),
    levelCode: RenewType.renewString(json?.LevelCode),
    levelId: RenewType.renewString(json?.LevelId),
  }
}

function transform(json: any): LevelPointsResponse {
  return {
    list: json?.Point?.map((item: any) => makeLevelPoint(item)),
  }
}

export type LevelPointsParams = {}

export type LevelPointsResponse = {
  list: LevelPoint[]
}

export async function getLevelPoints(
  input?: LevelPointsParams,
): Promise<LevelPointsResponse> {
  const request = makeRequest(`api/achievement/level-point`, {
    method: 'get',
  })
  return await execute(request, transform)
}
