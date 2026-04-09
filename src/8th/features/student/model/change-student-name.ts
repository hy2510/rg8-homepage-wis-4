import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ChangeStudentNameResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type ChangeStudentNameParams = {
  studentName: string
}

export type ChangeStudentNameResponse = {
  success: boolean
}

export async function putChangeStudentName(
  input: ChangeStudentNameParams,
): Promise<ChangeStudentNameResponse> {
  const request = makeRequest(`api/student/change-student-name`, {
    method: 'put',
    queryString: { studentName: input.studentName },
  })
  return await execute(request, transform)
}
