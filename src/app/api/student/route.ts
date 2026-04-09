import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { ENGLISH, VIETNAMESE } from '@/localization/localize-config'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const [payload, status, error] = await executeRequestAction(
    Student.student(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }

  delete payload.SchoolId
  delete payload.SchoolName
  delete payload.LoginPassword
  delete payload.Memo
  delete payload.RegistStaffId
  delete payload.RegistStaffName
  delete payload.ModifyDate
  delete payload.ModifyStaffId
  delete payload.ModifyStaffName
  delete payload.Address
  delete payload.DetailAddress
  delete payload.Postcode
  delete payload.EasyLoginYn
  delete payload.LevelCode
  delete payload.LevelHistory
  delete payload.Telephone
  delete payload.PasswordAnswer
  delete payload.PasswordCellPhone
  delete payload.PasswordQuestion
  delete payload.PersonalInfoDate
  delete payload.PhotoFilename1
  delete payload.PhotoFilename2
  delete payload.PhotoYn

  const lang = request.cookies.get('lang')?.value || 'ko'
  let isStudyEnd = false
  let studyStateValue: 'END' | 'NEED_PAYMENT' | 'PAUSED' | undefined = undefined
  let studyEndMessage = ''

  if (payload.StudyEndDay <= 0) {
    studyStateValue = 'END'
    isStudyEnd = payload.StudyEndDay <= 0

    if (lang === VIETNAMESE) {
      studyEndMessage = 'Thời gian học tập đã kết thúc.'
    } else if (lang === ENGLISH) {
      studyEndMessage = 'The learning period has ended.'
    } else {
      studyEndMessage = '학습 기간이 종료되었습니다.'
    }
  } else if (payload.NonPaymentYn) {
    studyStateValue = 'NEED_PAYMENT'
    isStudyEnd = true
    studyEndMessage = '미납요금이 있습니다.'
  } else if (payload.AdjustStatus !== 'R') {
    studyStateValue = 'PAUSED'
    isStudyEnd = true
    if (lang === VIETNAMESE) {
      studyEndMessage =
        'Bạn không thể học trong thời gian đang Tạm ngưng sử dụng. Vui lòng Hủy Tạm ngưng sử dụng để bắt đầu vào học.'
    } else if (lang === ENGLISH) {
      studyEndMessage =
        'You cannot start learning during the learning pause period. Please use it after lifting the learning pause.'
    } else {
      studyEndMessage =
        '학습 일시중지 기간에는 학습을 시작할 수 없습니다. 학습 일시중지를 해제한 후 이용해주세요.'
    }
  }
  const newPayload = {
    student: payload,
    studyState: {
      isStudyEnd,
      studyEndMessage,
      value: studyStateValue,
    },
  }
  return RouteResponse.response(newPayload, status)
}
