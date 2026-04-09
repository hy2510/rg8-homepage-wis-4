import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type StudentDailyLearning = {
  studentId: string
  settingLevelCode: string
  settingLevelName: string
  point: number
  books: number
  registDate: string
  orgRegistDate: string
  settingType: string
}

function makeStudentDailyLearning(json: any): StudentDailyLearning {
  return {
    studentId: RenewType.renewString(json?.StudentId),
    settingLevelCode: RenewType.renewString(json?.SettingLevelCode),
    settingLevelName: RenewType.renewString(json?.SettingLevelName),
    point: RenewType.renewNumber(json?.Point),
    books: RenewType.renewNumber(json?.Books),
    registDate: RenewType.renewString(json?.RegistDate),
    orgRegistDate: RenewType.renewString(json?.OrgRegistDate),
    settingType: RenewType.renewString(json?.SettingType),
  }
}

function transform(json: any): StudentDailyLearningResponse {
  return makeStudentDailyLearning(json)
}

export type StudentDailyLearningParams = {}

export type StudentDailyLearningResponse = StudentDailyLearning

export async function getStudentDailyLearning(
  input?: StudentDailyLearningParams,
): Promise<StudentDailyLearningResponse> {
  const request = makeRequest(`api/student/daily-learning`, {
    method: 'get',
  })
  return await execute(request, transform)
}
