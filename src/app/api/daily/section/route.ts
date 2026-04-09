import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import DailyRG from '@/repository/server/daily-rg'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../_util'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(request, 'stageId')
  const stageId = parameter.getString('stageId', '')

  // return RouteResponse.response(HARDCODING, { status: 200 })

  const [payload, status, error] = await executeRequestAction(
    DailyRG.section(token, { stageId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

// FIXME: 하드코딩 데이터
const HARDCODING = {
  Section: [
    {
      SectionId: 's2-section-01',
      SectionName: '1. Alphabet Readers',
      TotalBooks: 20,
      CompleteBooks: 20,
      SectionCompleteYn: true,
      Level: 'KA',
    },
    {
      SectionId: 's2-section-02',
      SectionName: '2. Phonics Readers',
      TotalBooks: 30,
      CompleteBooks: 30,
      SectionCompleteYn: true,
      Level: 'KA',
    },
    {
      SectionId: 's2-section-03',
      SectionName: '3. Sight Words Readers',
      TotalBooks: 30,
      CompleteBooks: 30,
      SectionCompleteYn: true,
      Level: 'KA',
    },
    {
      SectionId: 's2-section-04',
      SectionName: '4. Easy Readers',
      TotalBooks: 30,
      CompleteBooks: 30,
      SectionCompleteYn: true,
      Level: 'KB',
    },
    {
      SectionId: 's2-section-05',
      SectionName: '4. Easy Readers 2',
      TotalBooks: 30,
      CompleteBooks: 30,
      SectionCompleteYn: true,
      Level: 'KB',
    },
    {
      SectionId: 's2-section-06',
      SectionName: '4. Easy Readers 3',
      TotalBooks: 30,
      CompleteBooks: 30,
      SectionCompleteYn: true,
      Level: 'KB',
    },
    {
      SectionId: 's2-section-07',
      SectionName: 'KC Reading List 1',
      TotalBooks: 22,
      CompleteBooks: 22,
      SectionCompleteYn: true,
      Level: 'KC',
    },
    {
      SectionId: 's2-section-08',
      SectionName: 'KC Reading List 2',
      TotalBooks: 22,
      CompleteBooks: 20,
      SectionCompleteYn: false,
      Level: 'KC',
    },
    {
      SectionId: 's2-section-09',
      SectionName: 'KC Reading List 3',
      TotalBooks: 22,
      CompleteBooks: 22,
      SectionCompleteYn: true,
      Level: 'KC',
    },
    {
      SectionId: 's2-section-10',
      SectionName: 'KC Reading List 4',
      TotalBooks: 22,
      CompleteBooks: 22,
      SectionCompleteYn: true,
      Level: 'KC',
    },
  ],
}
