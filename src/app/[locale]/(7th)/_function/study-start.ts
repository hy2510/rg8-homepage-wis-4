import { sendToLog } from '@/app/api/aalog/logutil'
import SITE_PATH from '@/app/site-path'

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
  BookType: 'EB' | 'PB' | 'PK' | 'DODO'
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
  referer,
  exitUrl,
  logoutUrl,
}: {
  studyInfo: StudyStartInfo
  user?: 'student' | 'staff'
  mode?: 'quiz' | 'review'
  isStartSpeak?: boolean
  unit?: string
  language?: string
  device?: string
  referer?: string
  exitUrl?: string
  logoutUrl?: string
}) {
  const LevelName = studyInfo.bookCode
  let bookTypeTmp = undefined
  const isPK = LevelName.startsWith('EB-PK')
  const bookRound = Number(LevelName.substring(6))
  if (isPK) {
    if (bookRound < 300) {
      bookTypeTmp = 'PK'
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

  const BookType = bookTypeTmp as 'EB' | 'PB' | 'PK' | 'DODO'
  let quizReferer = SITE_PATH.LIBRARY.HOME
  if (BookType === 'PK') {
    quizReferer = SITE_PATH.BASIC.PRE_K
    if (bookRound >= 1 && bookRound <= 26) {
      quizReferer += `?activity=Alphabet`
    } else if (bookRound >= 27 && bookRound <= 66) {
      quizReferer += `?activity=Story`
    } else if (bookRound >= 67 && bookRound <= 166) {
      quizReferer += `?activity=Phonics`
    } else if (bookRound >= 167 && bookRound <= 206) {
      quizReferer += `?activity=Word`
    }
  } else if (BookType === 'DODO') {
    quizReferer = SITE_PATH.BASIC.DODO_ABC
    if (bookRound >= 301 && bookRound <= 326) {
      quizReferer += `?activity=Study-Alphabet`
    } else if (bookRound >= 401 && bookRound <= 427) {
      quizReferer += `?activity=Study-Phonics-1`
    } else if (bookRound >= 428 && bookRound <= 450) {
      quizReferer += `?activity=Study-Phonics-2`
    } else if (bookRound >= 501 && bookRound <= 530) {
      quizReferer += `?activity=Study-Sight-Words-1`
    } else if (bookRound >= 531 && bookRound <= 560) {
      quizReferer += `?activity=Study-Sight-Words-2`
    } else if (bookRound >= 601 && bookRound <= 615) {
      quizReferer += `?activity=Game-Alphabet`
    } else if (bookRound >= 616 && bookRound <= 635) {
      quizReferer += `?activity=Game-Phonics`
    } else if (bookRound >= 636 && bookRound <= 650) {
      quizReferer += `?activity=Game-Sight-Words-1`
    } else if (bookRound >= 651 && bookRound <= 665) {
      quizReferer += `?activity=Game-Sight-Words-2`
    } else if (bookRound >= 701 && bookRound <= 730) {
      quizReferer += `?activity=Song-Nursery-Rhyme`
    } else if (bookRound >= 751 && bookRound <= 776) {
      quizReferer += `?activity=Song-Alphabet-Chant`
    } else if (bookRound >= 801 && bookRound <= 850) {
      quizReferer += `?activity=Song-Phonics-Chant`
    }
  }
  const refererTmp =
    referer || (mode === 'quiz' ? quizReferer : SITE_PATH.REVIEW.MAIN)
  const exitUrlTmp =
    exitUrl ||
    refererTmp ||
    (mode === 'quiz' ? SITE_PATH.LIBRARY.HOME : SITE_PATH.REVIEW.MAIN)

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
    referer: refererTmp,
    exitUrl: exitUrlTmp,
    logoutUrl: logoutUrl || '/signoff',
    unit,
    language,
    device,
  }

  sendToLog(refererTmp)
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
}: {
  user?: 'student' | 'staff'
  language?: string
}) {
  const ref = {
    BookType: 'LEVELTEST',
    User: user,
    Mode: 'quiz',
    referer: SITE_PATH.LIBRARY.HOME,
    exitUrl: SITE_PATH.LIBRARY.HOME,
    language,
  }
  const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
  if (window && window.location) {
    window.location.href = '/study/start.html?REF=' + signedRef
  }
}
