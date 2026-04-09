const LOGIN_LOCK_STORAGE_KEY = 'login_lock'

export type LoginPageLock = {
  customerId: string
  customerName: string
}

export function getLoginPageLock(): LoginPageLock | undefined {
  let loginLock: LoginPageLock | undefined = undefined
  if (window) {
    const loginLockJson = window.localStorage.getItem(LOGIN_LOCK_STORAGE_KEY)
    if (loginLockJson) {
      loginLock = JSON.parse(loginLockJson) as LoginPageLock
    }
  }
  return loginLock
}

export function setLoginPageLock(info: LoginPageLock): boolean {
  if (window) {
    window.localStorage.setItem(LOGIN_LOCK_STORAGE_KEY, JSON.stringify(info))
    return true
  } else {
    return false
  }
}

export function deleteLoginPageLock(): boolean {
  if (window) {
    window.localStorage.removeItem(LOGIN_LOCK_STORAGE_KEY)
    return true
  } else {
    return false
  }
}
