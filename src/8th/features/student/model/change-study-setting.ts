import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ChangeStudySettingResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type ChangeStudySettingParams = {
  type:
    | 'All'
    | 'StartScreen'
    | 'ViewStep3Hint'
    | 'ViewStep2Skip'
    | 'EBKListenRepeat'
    | 'EB1ListenRepeat'
    | 'StudyReadingUnitId'
  startScreen?: string
  isEbkListenRepeat?: boolean
  isEb1ListenRepeat?: boolean
  isViewStep3Hint?: boolean
  isViewStep2Skip?: boolean
  studyReadingUnitId?: string
}

export type ChangeStudySettingResponse = {
  success: boolean
}

export async function postChangeStudySetting(
  input: ChangeStudySettingParams,
): Promise<ChangeStudySettingResponse> {
  const request = makeRequest(`api/student/change-study-setting`, {
    method: 'post',
    body: {
      type: input.type,
      startScreen: input.startScreen,
      isEbkListenRepeat: input.isEbkListenRepeat,
      isEb1ListenRepeat: input.isEb1ListenRepeat,
      isViewStep3Hint: input.isViewStep3Hint,
      isViewStep2Skip: input.isViewStep2Skip,
      studyReadingUnitId: input.studyReadingUnitId,
    },
  })
  return await execute(request, transform)
}
