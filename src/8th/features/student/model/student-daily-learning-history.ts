import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type StudentDailyLearningHistory = {
  iDX: string
  studentId: string
  settingLevelCode: string
  aimPoint: number
  settingBooks: number
  settingDate: string
  settingType: string
}

function makeStudentDailyLearningHistory(
  json?: any,
): StudentDailyLearningHistory {
  return {
    iDX: RenewType.renewString(json?.IDX),
    studentId: RenewType.renewString(json?.StudentId),
    settingLevelCode: RenewType.renewString(json?.SettingLevelCode),
    aimPoint: RenewType.renewNumber(json?.AimPoint),
    settingBooks: RenewType.renewNumber(json?.SettingBooks),
    settingDate: RenewType.renewString(json?.SettingDate),
    settingType: RenewType.renewString(json?.SettingType),
  }
}

function transform(json: any): StudentDailyLearningHistoryResponse {
  return {
    list: json?.DailyLearningHistory.map((item: any) =>
      makeStudentDailyLearningHistory(item),
    ),
  }
}

export type StudentDailyLearningHistoryParams = {}

export type StudentDailyLearningHistoryResponse = {
  list: StudentDailyLearningHistory[]
}

export async function getStudentDailyLearningHistory(
  input?: StudentDailyLearningHistoryParams,
): Promise<StudentDailyLearningHistoryResponse> {
  const request = makeRequest(`api/student/daily-learning-history`, {
    method: 'get',
  })
  return await execute(request, transform)
}
