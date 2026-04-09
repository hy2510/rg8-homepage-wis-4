import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type DailyStage = {
  stageId: string
  stageName: string
  minLevel: string
  maxLevel: string
}

function makeDailyStage(json: any): DailyStage {
  return {
    stageId: RenewType.renewString(json?.StageId),
    stageName: RenewType.renewString(json?.StageName),
    minLevel: RenewType.renewString(json?.MinLevel),
    maxLevel: RenewType.renewString(json?.MaxLevel),
  }
}

function transform(json: any): DailyStageResponse {
  return {
    list: json?.Stage?.map((item: any) => makeDailyStage(item)),
  }
}

export type DailyStageParams = {}

export type DailyStageResponse = {
  list: DailyStage[]
}

export async function getDailyStage(
  input?: DailyStageParams,
): Promise<DailyStageResponse> {
  const request = makeRequest(`api/daily/stage`, {
    method: 'get',
  })
  return await execute(request, transform)
}
