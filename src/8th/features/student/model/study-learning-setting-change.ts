import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): StudyLearningSettingChangeResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type StudyLearningSettingChangeParams = {
  type: 'Books' | 'Points'
  level: string
  value: number
}

export type StudyLearningSettingChangeResponse = {
  success: boolean
}

export async function putStudyLearningSettingChange(
  input: StudyLearningSettingChangeParams,
): Promise<StudyLearningSettingChangeResponse> {
  const request = makeRequest(`api/student/daily-learning`, {
    method: 'put',
    queryString: {
      type: input.type,
      level: input.level,
      value: input.value,
    },
  })
  return await execute(request, transform)
}
