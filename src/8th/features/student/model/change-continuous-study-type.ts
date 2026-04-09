import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ChangeContinuousStudyTypeResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type ChangeContinuousStudyTypeParams = {
  viewType: '6' | '7'
}

export type ChangeContinuousStudyTypeResponse = {
  success: boolean
}

export async function putChangeContinuousStudyType(
  input: ChangeContinuousStudyTypeParams,
): Promise<ChangeContinuousStudyTypeResponse> {
  const request = makeRequest(`api/student/continuous-study`, {
    method: 'put',
    queryString: {
      viewType: input.viewType,
    },
  })
  return await execute(request, transform)
}
