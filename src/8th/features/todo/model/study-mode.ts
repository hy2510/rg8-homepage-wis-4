import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): StudyModeResponse {
  return {
    success: RenewType.renewBoolean(json?.success),
    code: RenewType.renewNumber(json?.code || -1),
  }
}

export type StudyModeParams = {
  levelRoundId: string
  studyId: string
  studentHistoryId: string
  classId: string
  mode: string
}

export type StudyModeResponse = {
  success: boolean
  code: number
}

export async function postStudyMode(
  input: StudyModeParams,
): Promise<StudyModeResponse> {
  const request = makeRequest(`api/library/book-info/study-mode`, {
    method: 'post',
    body: {
      levelRoundId: input.levelRoundId,
      studyId: input.studyId,
      studentHistoryId: input.studentHistoryId,
      classId: input.classId,
      mode: input.mode,
    },
  })
  return await execute(request, transform)
}
