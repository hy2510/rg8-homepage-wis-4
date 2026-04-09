var REF = undefined
function setupRef() {
  const refData = window.sessionStorage.getItem('REF')
  REF = JSON.parse(decodeURIComponent(atob(refData)))
}
setupRef()

const BASE_URL = '/api/study/pre-k'
function getStudyInfo() {
  const { StudyId, StudentHistoryId } = REF
  return fetch(
    `${BASE_URL}/info?studyId=${StudyId}&studentHistoryId=${StudentHistoryId}`,
  )
}

function getStudyRecord() {
  const { StudyId, StudentHistoryId } = REF
  return fetch(
    `${BASE_URL}/record?studyId=${StudyId}&studentHistoryId=${StudentHistoryId}`,
  )
}

function saveRecord(step, isStudyEnd) {
  const { StudyId, StudentHistoryId } = REF
  const record = {
    studyId: StudyId,
    studentHistoryId: StudentHistoryId,
    step: step.toString(),
    studyEndYn: isStudyEnd ? 'Y' : 'N',
    dvc: 'N',
  }
  return fetch(`${BASE_URL}/save`, {
    method: 'post',
    body: JSON.stringify(record),
  })
}

function getFERData(data) {
  if (REF && REF.Mode === 'quiz') {
    const ferData = btoa(
      encodeURIComponent(
        JSON.stringify({
          type: 'PK',
          unit: '',
          level: 'PK',
          returnUrl: REF.referer,
          language: REF.language,
          data: data,
        }),
      ),
    )
    return ferData
  }
  return undefined
}

function studyFinish(ferData) {
  window.sessionStorage.removeItem('REF')
  window.sessionStorage.removeItem('apiStudyInfo')

  if (ferData) {
    window.sessionStorage.setItem('FER', ferData)
    window.location.replace('/study/Result/finish.html')
  } else {
    window.location.replace(REF.referer || '/')
  }
}

function onExitStudy() {
  if (REF && REF.exitUrl) {
    window.location.replace(REF.exitUrl)
  } else {
    window.location.replace('/')
  }
}

function onLogoutStudy() {
  if (REF && REF.logoutUrl) {
    window.location.replace(REF.logoutUrl)
  } else {
    window.location.replace('/signoff')
  }
}

function sendSms() {
  const { StudyId, StudentHistoryId } = REF
  return fetch(
    `${BASE_URL}/send-sms?studyId=${StudyId}&studentHistoryId=${StudentHistoryId}`,
  )
}

function checkSession() {
  return fetch(`/api/study/check-session`)
}

let sessionCheckTimer = undefined
let isStartCheckSession = false
let checkSessionFailCount = 0
function loopCheckSession() {
  if (isStartCheckSession) {
    execCheckSession()
  }
}

function execCheckSession() {
  checkSession()
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Check Session Failed')
      }
    })
    .then((data) => {
      if (data.isPass) {
        checkSessionFailCount = 0
        sessionCheckTimer = setTimeout(loopCheckSession, 30000)
      } else {
        isStartCheckSession = false
        alert('Logged out due to another login.')
        onLogoutStudy()
      }
    })
    .catch((error) => {
      checkSessionFailCount++
      if (checkSessionFailCount > 3) {
        isStartCheckSession = false
        // alert('Logged out due to inactivity.')
        alert('Session checked fail.')
        onLogoutStudy()
      } else {
        sessionCheckTimer = setTimeout(loopCheckSession, 30000)
      }
    })
}

function startCheckSession() {
  if (sessionCheckTimer) {
    return
  }
  sessionCheckTimer = setTimeout(() => {
    if (REF.User !== 'staff') {
      isStartCheckSession = true
      loopCheckSession()
    }
  }, 1000)
}

function stopCheckSession() {
  isStartCheckSession = false
  if (!!sessionCheckTimer) {
    clearTimeout(sessionCheckTimer)
  }
  sessionCheckTimer = undefined
}

function initCheckSession() {
  window.addEventListener('online', () => {
    // console.log('[study] 인터넷 연결됨: checkSession 시작')
    startCheckSession()
  })

  window.addEventListener('offline', () => {
    // console.log('[study] 인터넷 끊김: checkSession 중지')
    stopCheckSession()
  })

  if (navigator.onLine) {
    setTimeout(() => {
      startCheckSession()
    }, 1000)
  }
}
initCheckSession()
