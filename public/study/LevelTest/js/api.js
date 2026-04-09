var REF = undefined
function setupRef() {
  const refData = window.sessionStorage.getItem('REF')
  REF = JSON.parse(decodeURIComponent(atob(refData)))
}
setupRef()

const BASE_URL = '/api/study/level-test'
function getLevelTestInfo(level) {
  return fetch(`${BASE_URL}/info?level=${level}`)
}

function deleteTest(levelTestId) {
  return fetch(`${BASE_URL}/reset?levelTestId=${levelTestId}`, {
    method: 'DELETE',
  })
}

function getQuizData(levelTestDetailId) {
  return fetch(`${BASE_URL}/quiz?levelTestDetailId=${levelTestDetailId}`)
}

function saveRecord(saveData) {
  return fetch(`${BASE_URL}/save`, {
    method: 'post',
    body: JSON.stringify(saveData),
  })
}

function getTestResult(levelTestDetailId) {
  return fetch(`${BASE_URL}/result?levelTestDetailId=${levelTestDetailId}`)
}

function onFinishLevelTestResult(level) {
  if (REF && REF.referer) {
    if (
      level &&
      level.toUpperCase() === 'PK' &&
      REF.referer.indexOf('library') >= 0
    ) {
      location.replace('/basic')
    } else {
      location.replace(REF.referer)
    }
  } else {
    window.location.replace('/')
  }
}

function onExitStudy() {
  if (REF && REF.exitUrl) {
    window.location.replace(REF.exitUrl)
  } else {
    window.location.replace('/')
  }
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
