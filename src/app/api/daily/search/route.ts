import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import DailyRG from '@/repository/server/daily-rg'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../_util'
import { searchBook } from '../../library/search-book'

const NEW_PREK_STAGE_ID = '1'
const NEW_PREK_CHARACTER_LIST = {
  Baro: { start: 301, end: 309 },
  Chello: { start: 310, end: 318 },
  Millo: { start: 319, end: 326 },
  Jack: { start: 401, end: 409 },
  Blanc: { start: 410, end: 418 },
  Sheila: { start: 419, end: 427 },
  Tori: { start: 428, end: 435 },
  Roro: { start: 436, end: 443 },
  GreenThumb: { start: 444, end: 450 },
  Leoni: { start: 501, end: 515 },
  Goma: { start: 516, end: 530 },
  Gino: { start: 531, end: 545 },
  Edmond: { start: 546, end: 560 },
}

function findCharacterByBookCode(bookCode: string) {
  const num = Number(bookCode.replace('EB-PK-', ''))

  if (Number.isNaN(num)) return undefined

  for (const [character, { start, end }] of Object.entries(
    NEW_PREK_CHARACTER_LIST,
  )) {
    if (num >= start && num <= end) {
      return character
    }
  }
  return undefined
}

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(request, 'stageId', 'sectionId')
  const stageId = parameter.getString('stageId', '')
  const sectionId = parameter.getString('sectionId', '')

  if (stageId === NEW_PREK_STAGE_ID) {
    const [payload, status, error] = await executeRequestAction(
      DailyRG.search(token, { stageId, sectionId }),
    )
    if (error) {
      return RouteResponse.commonError()
    }

    payload.Books = payload.Books.map((book: any) => {
      return {
        ...book,
        Character: findCharacterByBookCode(book.LevelName),
      }
    })
    return searchBook({
      searchRequest: Promise.resolve({
        ok: true,
        status: status.status,
        data: payload,
      }),
    })
  } else {
    return searchBook({
      searchRequest: DailyRG.search(token, { stageId, sectionId }),
    })
  }
}
