import { ApiResponse } from '@/http/common/response'
import { Student, makeStudent } from '../object/student'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = {
  student: Student
  studyState: {
    isStudyEnd: boolean
    studyEndMessage: string
    value?: 'END' | 'NEED_PAYMENT' | 'PAUSED'
  }
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      student: makeStudent(json.student),
      studyState: {
        isStudyEnd: json.studyState.isStudyEnd,
        studyEndMessage: json.studyState.studyEndMessage,
        value: json.studyState.value,
      },
    }
  })
}

export { action as getStudent }
export type { Output as StudentResponse }

function newInstance(): Output {
  return {
    student: makeStudent(),
    studyState: {
      isStudyEnd: true,
      studyEndMessage: 'none',
    },
  }
}
export { newInstance as newStudent }
