import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'

const READING_UNIT_ID_MAP: Record<string, string> = {
  '097901': 'baro',
  '097902': 'chello',
  '097903': 'millo',
  '097904': 'jack',
  '097905': 'blanc',
  '097906': 'sheila',
  '097907': 'tori',
  '097908': 'roro',
  '097909': 'greenthumb',
  '097910': 'leoni',
  '097911': 'goma',
  '097912': 'gino',
  '097913': 'edmond',
  '097914': 'gold',
  '097915': 'platinum',
  '097916': 'titanium',
}

function getReadingUnitKeyId(readingUnitId: string): string {
  const key = READING_UNIT_ID_MAP[readingUnitId]
  if (key) {
    return key
  }
  return 'baro'
}

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const [rawPayload, status, error] = await executeRequestAction(
    Student.studentEarnReadingUnit(token),
  )
  const payload = rawPayload
    ? {
        ReadingUnit: rawPayload.ReadingUnit.map((item: any) => {
          const id = getReadingUnitKeyId(item.ReadingUnitId)
          return {
            id,
            ReadingUnitId: item.ReadingUnitId,
            Name: item.NameEng,
            Image: `https://wcfresource.a1edu.com/newsystem/image/character/subcharacter/${id}_17.png`,
          }
        }),
      }
    : {
        ReadingUnit: [
          {
            name: 'Baro',
            readingUnitId: '097901',
            id: 'baro',
            image:
              'https://wcfresource.a1edu.com/newsystem/image/character/subcharacter/baro_17.png',
          },
        ],
      }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
