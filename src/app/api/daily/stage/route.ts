import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import DailyRG from '@/repository/server/daily-rg'
import { RouteResponse, executeRequestAction } from '../../_util'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  // return RouteResponse.response(HARDCODING, { status: 200 })

  const [payload, status, error] = await executeRequestAction(
    DailyRG.stage(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

// FIXME: 하드코딩 데이터
const HARDCODING = {
  Stage: [
    {
      StageId: 1,
      StageName: 'Stage 1',
      MinLevel: 'PK',
      MaxLevel: 'PK',
    },
    {
      StageId: 2,
      StageName: 'Stage 2',
      MinLevel: 'KA',
      MaxLevel: 'KC',
    },
    {
      StageId: 3,
      StageName: 'Stage 3',
      MinLevel: '1A',
      MaxLevel: '1C',
    },
    {
      StageId: 4,
      StageName: 'Stage 4',
      MinLevel: '2A',
      MaxLevel: '2C',
    },
    {
      StageId: 5,
      StageName: 'Stage 5',
      MinLevel: '3A',
      MaxLevel: '3C',
    },
    {
      StageId: 6,
      StageName: 'Stage 6',
      MinLevel: '4A',
      MaxLevel: '6B',
    },
  ],
}
