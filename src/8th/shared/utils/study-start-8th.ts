import { sendToLog } from '@/app/api/aalog/logutil'

type StudyStartInfo = {
  studyId: string
  studentHistoryId: string
  bookCode: string
  levelRoundId: string
  bookLevel: string
}
type StudyRef = {
  StudyId: string
  StudentHistoryId: string
  LevelName: string
  LevelRoundId: string
  User: string
  Mode: 'quiz' | 'review' | 'super'
  BookType: 'EB' | 'PB' | 'PK' | 'NEW_PK' | 'DODO'
  level: string
  isStartSpeak?: boolean
  referer?: string
  exitUrl?: string
  logoutUrl?: string
  unit?: string
  language?: string
  device?: string
}
export function goToStudy({
  studyInfo,
  user = 'student',
  mode = 'quiz',
  isStartSpeak = false,
  unit,
  language = 'ko',
  device,
  refererUrl,
  exitUrl,
  logoutUrl,
}: {
  studyInfo: StudyStartInfo
  user?: 'student' | 'staff'
  mode?: 'quiz' | 'review'
  isStartSpeak?: boolean
  refererUrl?: string
  exitUrl?: string
  logoutUrl?: string
  unit?: string
  language?: string
  device?: string
}) {
  const LevelName = studyInfo.bookCode
  let bookTypeTmp: 'EB' | 'PB' | 'PK' | 'NEW_PK' | 'DODO' | undefined =
    undefined
  const isPK = LevelName.startsWith('EB-PK')
  const bookRound = Number(LevelName.substring(6))
  if (isPK) {
    if (bookRound < 300) {
      bookTypeTmp = 'PK'
    } else if (bookRound >= 301 && bookRound <= 560) {
      bookTypeTmp = 'NEW_PK'
    } else {
      bookTypeTmp = 'DODO'
    }
  } else if (LevelName.startsWith('EB')) {
    bookTypeTmp = 'EB'
  } else if (LevelName.startsWith('PB')) {
    bookTypeTmp = 'PB'
  }
  if (!bookTypeTmp) {
    throw Error('BookType Mismatch')
  }

  const BookType = bookTypeTmp!

  const ref: StudyRef = {
    StudyId: studyInfo.studyId,
    StudentHistoryId: studyInfo.studentHistoryId,
    LevelName,
    LevelRoundId: studyInfo.levelRoundId,
    BookType,
    User: user,
    Mode: mode,
    level: studyInfo.bookLevel,
    isStartSpeak: isStartSpeak,
    referer: refererUrl,
    exitUrl: exitUrl || refererUrl,
    logoutUrl: logoutUrl,
    unit,
    language,
    device,
  }
  sendToLog(refererUrl || '')
    .then()
    .catch()
    .finally(() => {
      const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
      if (window && window.location) {
        window.location.href = '/study/start.html?REF=' + signedRef
      }
    })

  // const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
  // if (window && window.location) {
  //   window.location.href = '/study/start.html?REF=' + signedRef
  // }
}

export function goToLevelTest({
  user = 'student',
  language = 'ko',
  exitUrl = '/8th',
}: {
  user?: 'student' | 'staff'
  language?: string
  exitUrl?: string
}) {
  const ref = {
    BookType: 'LEVELTEST',
    User: user,
    Mode: 'quiz',
    referer: exitUrl,
    exitUrl,
    language,
  }
  const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
  if (window && window.location) {
    window.location.href = '/study/start.html?REF=' + signedRef
  }
}
