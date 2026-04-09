import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { ENGLISH, VIETNAMESE } from '@/localization/localize-config'
import NumberUtils from '@/util/number-utils'
import { NextRequest, NextResponse } from 'next/server'
import Export from '@/repository/server/export'
import Library from '@/repository/server/library'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'sortColumn')
  const sortColumn = parameter.getString('sortColumn')

  const [payload, status, error] = await executeRequestAction(
    Library.todos(token, { sortColumn }),
  )
  if (payload?.Todo && payload.Todo?.length) {
    const todos = payload.Todo.map((book: any) => {
      const bookPoint = NumberUtils.toDecimalPoint(book.BookPoint, {
        count: 2,
        method: 'ceil',
      })
      const earnPoint = NumberUtils.toDecimalPoint(book.RgPointSum, {
        count: 2,
        method: 'ceil',
      })
      const passCount = Number(book.RgPointCount)
      let GetableRgPoint = bookPoint

      if (passCount <= 0 && book.OngoingFullEasyCode === '093006') {
        GetableRgPoint = NumberUtils.toRgDecimalPoint(bookPoint * 0.5)
      } else if (passCount === 1) {
        const findMode = findFullEasyMode(bookPoint, earnPoint)
        if (findMode === 'full') {
          GetableRgPoint = NumberUtils.toRgDecimalPoint(bookPoint * 0.5)
        } else if (findMode === 'invalid') {
          GetableRgPoint = 0
        }
      } else if (passCount >= 2) {
        GetableRgPoint = 0
      }
      return {
        ...book,
        GetableRgPoint,
      }
    })
    payload.Todo = todos
  }

  const [dwPayload, dwStatus, dwError] = await executeRequestAction(
    Export.todoExcel(token, {
      sortColumn,
    }),
  )
  if (dwStatus && dwStatus.status >= 200 && dwStatus.status < 300) {
    const downloadUrl = dwPayload.Url
    payload['ExcelDownload'] = downloadUrl
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function POST(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'levelRoundIds',
    'studentHistoryId',
  )
  const levelRoundIds = parameter.getString('levelRoundIds')
  const studentHistoryId = parameter.getString('studentHistoryId')

  const [payload, status, addError] = await executeRequestAction(
    Library.addTodos(token, {
      levelRoundIds,
      studentHistoryId,
    }),
  )

  const lang = request.cookies.get('lang')?.value || 'ko'
  if (status.status === 400) {
    const extra = JSON.parse(payload.message)
    let message = '도서를 Todo에 추가할 수 없습니다.'
    if (lang === VIETNAMESE) {
      message = 'Hiện không thể thêm sách vào To-do.'
    } else if (lang === ENGLISH) {
      message = 'You cannot add the book to Todo.'
    }
    if (extra && extra.code) {
      if (extra.code === 1005) {
        message = 'Todo에는 200권 까지 추가 가능합니다.'
        if (lang === VIETNAMESE) {
          message = 'Bạn có thể thêm tối đa 200 quyển sách vào mục To-do.'
        } else if (lang === ENGLISH) {
          message = 'You can add up to 200 books to Todo.'
        }
      } else if (extra.code === 1001 || extra.code === 1006) {
        message = '해당 레벨의 도서를 추가할 수 없습니다.'
        if (lang === VIETNAMESE) {
          message = 'Không thể thêm sách ở cấp độ này.'
        } else if (lang === ENGLISH) {
          message = 'You cannot add a book of this level.'
        }
      }
    }

    return NextResponse.json({ message }, status)
  }
  if (addError) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function DELETE(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(
    request,
    'isAll',
    'studyIds',
    'sortColumn',
  )
  const isAll = parameter.getString('isAll', 'N') as 'Y' | 'N'
  const studyIds = parameter.getString('studyIds')

  if (isAll === 'Y') {
    const [payload, status, error] = await executeRequestAction(
      Library.deleteAllTodos(token),
    )
    if (error) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  } else {
    const [payload, status, error] = await executeRequestAction(
      Library.deleteTodos(token, { studyIds }),
    )
    if (error) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  }
}

// 얻은 포인트를 기준으로 Full 인지 Easy인지 근사값을 추론하는 함수
// 변동 허용범위는 최대 +-33.3%이므로 30% 바운더리로 설정함.
function findFullEasyMode(
  rgPoint: number,
  earnRgPoint: number,
): 'full' | 'easy' | 'invalid' {
  const BOUNDARY = 0.3
  const xEasy = earnRgPoint * 2
  const xFull = earnRgPoint

  const easyRange = [xEasy * (1 - BOUNDARY), xEasy * (1 + BOUNDARY)]
  const fullRange = [xFull * (1 - BOUNDARY), xFull * (1 + BOUNDARY)]

  const isEasyPossible = easyRange[0] <= rgPoint && rgPoint <= easyRange[1]
  const isFullPossible = fullRange[0] <= rgPoint && rgPoint <= fullRange[1]

  if (isEasyPossible && !isFullPossible) {
    return 'easy'
  } else if (!isEasyPossible && isFullPossible) {
    return 'full'
  }
  return 'invalid'
}
