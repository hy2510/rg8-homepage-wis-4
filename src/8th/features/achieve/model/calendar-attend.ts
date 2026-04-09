import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type CalendarAttend = {
  studentId: string
  regDate: string
  attendDate: string
  loginIp: string
  mobileYn: string
  deviceType: string
  validYn: boolean
  totalAttendCount: number
  levelUpLevel: string
  studyCountHundred: number
  today: string
}

function makeCalendarAttend(json: any): CalendarAttend {
  return {
    studentId: RenewType.renewString(json?.StudentId),
    regDate: RenewType.renewString(json?.RegDate),
    attendDate: RenewType.renewString(json?.AttendDate),
    loginIp: RenewType.renewString(json?.LoginIp),
    mobileYn: RenewType.renewString(json?.MobileYn),
    deviceType: RenewType.renewString(json?.DeviceType),
    validYn: RenewType.renewBoolean(json?.ValidYn),
    totalAttendCount: RenewType.renewNumber(json?.TotalAttendCount),
    levelUpLevel: RenewType.renewString(json?.LevelUpLevel),
    studyCountHundred: RenewType.renewNumber(json?.StudyCountHundred),
    today: RenewType.renewString(json?.Today),
  }
}

function transform(json: any): CalendarAttendResponse {
  return {
    list: json?.AttendCalendar?.map((item: any) => makeCalendarAttend(item)),
  }
}

export type CalendarAttendParams = {
  year: number
  month: number
}

export type CalendarAttendResponse = {
  list: CalendarAttend[]
}

export async function getCalendarAttend(
  input: CalendarAttendParams,
): Promise<CalendarAttendResponse> {
  const request = makeRequest(`api/calendar/attend`, {
    method: 'get',
    queryString: {
      year: input.year,
      month: input.month,
    },
  })
  return await execute(request, transform)
}
