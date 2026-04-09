import NumberUtils from '@/util/number-utils'
import { NextResponse } from 'next/server'
import { ApiResponse } from '@/repository/server/utils'
import { RouteResponse, executeRequestAction } from '../_util'

export async function searchBook({
  searchRequest,
  isSearchNewBook = false,
  downloadRequest,
  filterUpdateRequest,
}: {
  searchRequest: Promise<ApiResponse>
  isSearchNewBook?: boolean
  downloadRequest?: Promise<ApiResponse>
  filterUpdateRequest?: Promise<ApiResponse>
}): Promise<NextResponse<unknown>> {
  // 도서 목록 검색
  const [payload, status, error] = await executeRequestAction(searchRequest)
  if (error) {
    return RouteResponse.commonError()
  }
  if (isErrorResponseStatus(status)) {
    return RouteResponse.commonError()
  }
  // 획득 가능한 포인트 계산
  if (!isSearchNewBook) {
    payload['Books'] = injectGetableRgPoint(payload['Books'])
  } else {
    payload['EBook'] = injectGetableRgPoint(payload['EBook'])
    payload['PBook'] = injectGetableRgPoint(payload['PBook'])
  }

  // 다운로드 링크 추가
  if (downloadRequest) {
    const [dwPayload, dwStatus, _dwError] =
      await executeRequestAction(downloadRequest)
    if (isOkResponseStatus(dwStatus)) {
      const downloadUrl = dwPayload.Url
      payload['ExcelDownload'] = downloadUrl
    }
  }

  // 필터 업데이트
  if (filterUpdateRequest) {
    const [ftPayload, ftStatus, _ftError] =
      await executeRequestAction(filterUpdateRequest)
  }

  return RouteResponse.response(payload, status)
}

function isOkResponseStatus({ status }: { status: number }) {
  return 200 <= status && status < 300
}

function isErrorResponseStatus({ status }: { status: number }) {
  return status < 200 || 401 < status
}

function injectGetableRgPoint(books: unknown[]): unknown[] {
  const bookRes = books.map((book: any) => {
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

    if (passCount === 1) {
      const findMode = findFullEasyMode(bookPoint, earnPoint)
      if (findMode === 'full') {
        GetableRgPoint = NumberUtils.toRgDecimalPoint(bookPoint * 0.5)
      } else if (findMode === 'invalid') {
        GetableRgPoint = 0
      }
    } else if (passCount === 2) {
      GetableRgPoint = 0
    }
    return {
      ...book,
      GetableRgPoint,
    }
  })
  return bookRes
}

// 얻은 포인트를 기준으로 Full 인지 Easy인지 근사값을 추론하는 함수
// 변동 허용범위는 +-33.3%이므로 30% 바운더리로 설정함.
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
