import AuthorizeToken from './token'

export interface UserDetails {
  userid: string //Login ID
  uid: string //Student ID
  cid: string //Customer ID
  sid: string //Session ID
  group: string //Group: [private, school, academy]
  role: string //Role: [student, admin]
  permission: string //Permission: [teacher]
  exp: number
  iat: number
}

type TokenResponse = { status: number; payload: AuthorizeToken | undefined }
export type Authorization = {
  token: AuthorizeToken | undefined
  getActiveAccessToken: () => string | undefined
  getAccessToken: () => string | undefined
  isValidateToken: () => boolean
  getTokenUserDetails: () => UserDetails | undefined
  isLogin: () => boolean
}

/**
 * Access Token을 조회하는 Authorization 객체를 생성한다.
 * @param token 사용자 인증 토큰
 * @returns Authorization 객체
 */
export function createAuthorization(
  token: AuthorizeToken | undefined,
): Authorization {
  const getActiveAccessToken = (token?: AuthorizeToken) => {
    if (token) {
      try {
        const userDetails = convertJWTtoUserDetails(token.accessToken)
        const isExpire = isExpireAt(userDetails)
        if (!isExpire) {
          return token.accessToken
        }
      } catch (error) {
        return
      }
    }
    return
  }
  const getAccessToken = (token?: AuthorizeToken) => {
    if (token) {
      return token.accessToken
    }
    return
  }

  if (token) {
    const accessToken = getAccessToken(token)
    if (!accessToken) {
      return {
        token: undefined,
        getActiveAccessToken: () => undefined,
        getAccessToken: () => undefined,
        isLogin: () => false,
        isValidateToken: () => false,
        getTokenUserDetails: () => undefined,
      }
    }
  }
  const authorization: Authorization = {
    token,
    getActiveAccessToken: () => getActiveAccessToken(token),
    getAccessToken: () => getAccessToken(token),
    isLogin: () => {
      return !!getAccessToken(token)
    },
    isValidateToken: () => {
      if (token?.accessToken) {
        try {
          const user = convertJWTtoUserDetails(token.accessToken)
          return !!user.sid
        } catch (error) {
          return false
        }
      }
      return false
    },
    getTokenUserDetails: () => {
      if (token?.accessToken) {
        try {
          return convertJWTtoUserDetails(token.accessToken)
        } catch (error) {
          return undefined
        }
      }
    },
  }
  return authorization
}

/**
 * JWT Access Token에서 사용자 정보를 추출한다.
 * @param jwtAccessToken 로그인 Access Token
 * @returns 사용자 정보
 */
function convertJWTtoUserDetails(jwtAccessToken: string): UserDetails {
  try {
    const accessTokenDiv = jwtAccessToken.split('.')
    const base64Data = accessTokenDiv[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload: any = JSON.parse(atob(base64Data))
    return {
      userid: payload.userid,
      uid: payload.uid,
      cid: payload.cid,
      sid: payload.sid,
      group: payload.group,
      role: payload.role,
      permission: payload.permission,
      exp: payload.exp,
      iat: payload.iat,
    }
  } catch (error) {
    throw Error('Token Parse Failed :' + error)
  }
}

/**
 * 토큰이 만료되었는지 검사한다.
 * @param user 사용자 정보
 * @returns true - 토큰 유효기간이 만료됨
 */
function isExpireAt(user: UserDetails) {
  const now = Date.now()
  const exp = user.exp * 1000
  return exp < now
}
