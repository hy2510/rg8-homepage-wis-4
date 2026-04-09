'use client'

// @@ FIXME : MEMO : 7-8차 사용량 분석용도의 소스코드

/**
 * LOG 객체 유형
 * uid: studentId
 * date: yyyy-mm-dd
 * type: 7th, 8th
 * referer: daily, other
 */
type LogObject = {
  uid: string
  date?: string
  type?: '7th' | '8th' | ''
  referer?: 'daily' | string
}
const KEY_TMPT = 'tmpt'

export function injectUid(uid: string) {
  if (!uid) return

  const current = window.sessionStorage.getItem(KEY_TMPT)
  if (current) {
    const myItem = JSON.parse(current) as LogObject
    if (myItem.uid === uid) {
      return
    }
  }
  window.sessionStorage.setItem(
    KEY_TMPT,
    JSON.stringify({
      uid,
    }),
  )
}

export async function sendToLog(referer: string) {
  const tmpt = window.sessionStorage.getItem(KEY_TMPT)

  if (tmpt) {
    const myItem = JSON.parse(tmpt) as LogObject
    const logType = referer.includes('8th') ? '8th' : '7th'
    const logReferer =
      logType === '8th' && referer.includes('daily') ? 'daily' : 'other'
    const logDate = new Date().toISOString().split('T')[0]

    if (
      myItem.date === logDate &&
      myItem.type === logType &&
      myItem.referer === logReferer
    ) {
      // 중복 요청은 전송 생략
      return
    }
    const serialize = `${myItem.uid}|${logType}|${logReferer}`

    const res = await fetch(`/api/aalog?serialize=${serialize}`, {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.ok) {
      window.sessionStorage.setItem(
        KEY_TMPT,
        JSON.stringify({
          uid: myItem.uid,
          date: logDate,
          type: logType,
          referer: logReferer,
        }),
      )
    }
  }
}
