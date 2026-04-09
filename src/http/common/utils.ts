import { http } from '../core/call'
import { HttpRequest, HttpRequestOption } from '../core/request'
import { ApiResponse } from './response'

export const DEFAULT_TIMEOUT = 30 * 1000
export const DEFAULT_CONTENT_TYPE = 'application/json'

export function makeRequest(
  host: string,
  path: string,
  option?: HttpRequestOption,
): HttpRequest {
  return {
    url: `${host}${path}`,
    contentType: DEFAULT_CONTENT_TYPE,
    timeout: DEFAULT_TIMEOUT,
    ...option,
  }
}

export async function execute<T>(
  request: HttpRequest,
  transform?: (rawJson: any) => T,
): Promise<ApiResponse<T>> {
  let response: Response
  try {
    response = await http.call(request)
  } catch (error) {
    return {
      ok: false,
      status: 500,
      result: {
        code: 999999,
        message: 'Internal Server Error(Network Error)',
      },
    }
  }
  try {
    const isOk = response.ok
    const json = await response.json()
    if (isOk) {
      //FIXME - json Response 템플릿 미확정으로 하도코딩 함. hard coding
      const data = transform ? transform(json) : (json as T)

      return {
        ok: response.ok,
        status: response.status,
        result: {
          code: 0,
          message: 'success',
        },
        data,
      }
    } else {
      return {
        ok: false,
        status: response.status,
        result: {
          code: json.code,
          message: json.message,
        },
        extra: json.extra ? json.extra : undefined,
      }
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      result: {
        code: 999990,
        message: 'Internal Server Error(Data Error)',
      },
    }
  }
}
