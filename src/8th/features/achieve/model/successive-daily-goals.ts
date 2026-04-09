import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type SuccessiveDailyGoal = {
  achievedCount: number
  achievedDate: string
}

function makeSuccessiveDailyGoal(json?: any): SuccessiveDailyGoal {
  return {
    achievedCount: RenewType.renewNumber(json?.AchievedCount),
    achievedDate: RenewType.renewString(json?.AchievedDate),
  }
}

function transform(json: any): SuccessiveDailyGoalsResponse {
  return {
    list: json?.Study?.map((item: any) => makeSuccessiveDailyGoal(item)),
    currentDailyGoal: RenewType.renewNumber(json?.CurrentAchievedCount),
  }
}

export type SuccessiveDailyGoalsParams = {}

export type SuccessiveDailyGoalsResponse = {
  list: SuccessiveDailyGoal[]
  currentDailyGoal: number
}

export async function getSuccessiveDailyGoals(
  input?: SuccessiveDailyGoalsParams,
): Promise<SuccessiveDailyGoalsResponse> {
  const request = makeRequest(`api/achievement/successive-daily-goal`, {
    method: 'get',
  })
  return await execute(request, transform)
}
