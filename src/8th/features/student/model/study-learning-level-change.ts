import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): StudyLearningLevelChangeResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type StudyLearningLevelChangeParams = {
  level: string
}

export type StudyLearningLevelChangeResponse = {
  success: boolean
}

export async function putStudyLearningLevelChange(
  input: StudyLearningLevelChangeParams,
): Promise<StudyLearningLevelChangeResponse> {
  const request = makeRequest(`api/student/daily-learning`, {
    method: 'put',
    queryString: {
      type: 'LEVEL',
      level: input.level,
    },
  })
  return await execute(request, transform)
}
