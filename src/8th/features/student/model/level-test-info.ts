import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type LevelTestInfo = {
  isAvailableLevelTest: boolean
  isLatest: boolean
  latestLevelTestDate?: string
  latestLevelTestLevel?: string
  report?: string
}

function makeLevelTestInfo(json?: any): LevelTestInfo {
  const latest = json?.Latest
  const isLatest = !!latest
  return {
    isAvailableLevelTest: RenewType.renewBoolean(json?.IsAvailableLevelTest),
    isLatest: isLatest,
    latestLevelTestDate: RenewType.renewString(latest?.LevelTestDate),
    latestLevelTestLevel: RenewType.renewString(latest?.LevelTestLevel),
    report: RenewType.renewString(latest?.LevelTestReport),
  }
}

function transform(json: any): LevelTestInfoResponse {
  return makeLevelTestInfo(json)
}

export type LevelTestInfoParams = {}

export type LevelTestInfoResponse = LevelTestInfo

export async function getLevelTestInfo(
  input?: LevelTestInfoParams,
): Promise<LevelTestInfoResponse> {
  const request = makeRequest(`api/student/level-test-info`, {
    method: 'get',
  })
  return await execute(request, transform)
}
