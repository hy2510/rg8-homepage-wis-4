//SAMPLE TYPE
import SITE_PATH from '@/app/site-path'
import { Customer } from './customer'

export type CustomerConfiguration = {
  target: 'private' | 'school' | 'academy'
  country: 'kr' | 'vn' | 'id' | 'ca'
  setting: {
    showStudyEndDay: boolean
    showStudyEndInform: boolean
    showReadingking: boolean
    loginWithName: boolean
    printVocabulary: boolean
    printWorksheet: boolean
    printReport: boolean
    printLevelCertificate: boolean
    speakActivity: boolean
    paymentable: boolean
    paymentUrl: string
  }
  menu: {
    dailyRg: { open: boolean }
    eb: {
      open: boolean
      search: { open: boolean }
      continue: { open: boolean }
      readingLevel: {
        open: boolean
        level: {
          open: boolean
          prekClassic: {
            open: boolean
          }
          dodoAbc: {
            open: boolean
          }
        }
        series: { open: boolean }
      }
      collections: {
        open: boolean
        newBooks: { open: boolean }
        movies: { open: boolean }
        workbooks: { open: boolean }
        themes: { open: boolean }
        series: { open: boolean }
        schoolSubjects: { open: boolean }
      }
    }
    pb: {
      open: boolean
      search: { open: boolean }
      continue: { open: boolean }
      readingLevel: {
        open: boolean
        level: { open: boolean }
        series: { open: boolean }
      }
      collections: {
        open: boolean
        newBooks: { open: boolean }
        themes: { open: boolean }
        series: { open: boolean }
      }
    }
    activity: {
      open: boolean
      result: {
        open: boolean
        read: { open: boolean }
        speak: { open: boolean }
        write: { open: boolean }
      }
      todo: { open: boolean }
      favorite: { open: boolean }
      tryAgain: { open: boolean }
    }
    myLevelSetting: { open: boolean }
    rank: {
      open: boolean
      monthly: { open: boolean; isShowClassName: boolean }
      readingking: {
        open: boolean
        groupRank: { open: boolean }
      }
      levelMaster: {
        open: boolean
        isShowClassName: boolean
        isMaskingLevel: boolean
      }
      hallOfFame: { open: boolean }
    }
    calendar: { open: boolean }
    levelTest: { open: boolean }
    pkWorkbookMp3: { open: boolean }
    dodoAbcWorkbookMp3: { open: boolean }
    account: {
      open: boolean
      setting: {
        open: boolean
        homeScreen: { open: boolean }
        avatar: { open: boolean }
        quizFriends: { open: boolean }
        listenAndRepeat: {
          open: boolean
          levelK: { open: boolean }
          level1: { open: boolean }
        }
        quizHelper: {
          open: boolean
          hint: { open: boolean }
          chance: { open: boolean }
        }
      }
      studentInfo: {
        open: boolean
        studyAvaliableDay: { open: boolean }
        studentName: { open: boolean; editable: boolean }
        loginId: { open: boolean }
        email: { open: boolean }
        password: { open: boolean }
        phoneNumber: { open: boolean; editable: boolean }
        smsNotice: { open: boolean }
        strekSetting: { open: boolean }
        studyPause: { open: boolean }
        withdraw: { open: boolean }
      }
    }
    profile: { open: boolean }
    streak: { open: boolean }
    dailyGoal: { open: boolean }
    friendsStory: { open: boolean }
  }
}

export function buildCustomerConfiguration_TEST(
  customer?: Customer,
): CustomerConfiguration {
  const {
    customerUse,
    countryCode,
    useStudentNoYn,
    studyEBUseYn,
    studyPBUseYn,
    needPayment,
    preKMode,
    viewVocaYn,
    viewAssessmentYn,
    viewLevelUpYn,
    studentWorkSheetYn,
  } = customer || {
    customerUse: 'Private',
    countryCode: 'KR',
    useStudentNoYn: false,
    studyEBUseYn: true,
    studyPBUseYn: true,
    needPayment: 'N',
    preKMode: 'D',
    viewVocaYn: false,
    viewAssessmentYn: false,
    viewLevelUpYn: false,
    studentWorkSheetYn: false,
    useSpeakYn: false,
    useEbookAniYn: false,
  }
  const target = customerUse.toLocaleLowerCase() as
    | 'academy'
    | 'school'
    | 'private'

  let country: 'kr' | 'vn' | 'id' | 'ca' = 'kr'
  if (
    countryCode === 'KR' ||
    countryCode === 'VN' ||
    countryCode === 'ID' ||
    countryCode === 'CA'
  ) {
    country = countryCode.toLocaleLowerCase() as 'kr' | 'vn' | 'id' | 'ca'
  }

  const paymentUrl =
    target === 'private'
      ? SITE_PATH.HOME.MEMBERSHIP_PAYMENT
      : SITE_PATH.HOME.RG_PAYMENT

  const config: CustomerConfiguration = {
    target,
    country,
    setting: {
      showStudyEndDay: true,
      showStudyEndInform: true,
      showReadingking: true,
      loginWithName: true,
      printVocabulary: false,
      printWorksheet: false,
      printReport: false,
      printLevelCertificate: true,
      speakActivity: false,
      paymentable: true,
      paymentUrl: paymentUrl,
    },
    menu: {
      dailyRg: { open: true },
      eb: {
        open: true,
        search: { open: true },
        continue: { open: true },
        readingLevel: {
          open: true,
          level: {
            open: true,
            prekClassic: { open: preKMode.includes('P') },
            dodoAbc: { open: preKMode.includes('D') },
          },
          series: { open: true },
        },
        collections: {
          open: true,
          newBooks: { open: true },
          movies: { open: true },
          workbooks: { open: true },
          themes: { open: true },
          series: { open: false },
          schoolSubjects: { open: true },
        },
      },
      pb: {
        open: true,
        search: { open: true },
        continue: { open: true },
        readingLevel: {
          open: true,
          level: { open: true },
          series: { open: true },
        },
        collections: {
          open: true,
          newBooks: { open: true },
          themes: { open: true },
          series: { open: true },
        },
      },
      activity: {
        open: true,
        result: {
          open: true,
          read: { open: true },
          speak: { open: true },
          write: { open: false },
        },
        todo: { open: true },
        favorite: { open: true },
        tryAgain: { open: true },
      },
      myLevelSetting: { open: true },
      rank: {
        open: true,
        monthly: { open: true, isShowClassName: false },
        readingking: {
          open: true,
          groupRank: { open: false },
        },
        levelMaster: {
          open: true,
          isShowClassName: false,
          isMaskingLevel: false,
        },
        hallOfFame: { open: true },
      },
      calendar: { open: true },
      levelTest: { open: true },
      pkWorkbookMp3: { open: true },
      dodoAbcWorkbookMp3: { open: true },
      account: {
        open: true,
        setting: {
          open: true,
          homeScreen: { open: true },
          avatar: { open: true },
          quizFriends: { open: true },
          listenAndRepeat: {
            open: true,
            levelK: { open: true },
            level1: { open: true },
          },
          quizHelper: {
            open: true,
            hint: { open: true },
            chance: { open: true },
          },
        },
        studentInfo: {
          open: true,
          studyAvaliableDay: { open: true },
          studentName: {
            open: true,
            editable: true,
          },
          loginId: { open: true },
          email: { open: true },
          password: { open: true },
          phoneNumber: { open: true, editable: true },
          smsNotice: { open: true },
          strekSetting: { open: true },
          studyPause: { open: true },
          withdraw: { open: true },
        },
      },
      profile: { open: true },
      streak: { open: true },
      dailyGoal: { open: true },
      friendsStory: { open: true },
    },
  }
  return config
}

export function buildCustomerConfiguration(
  customer?: Customer,
): CustomerConfiguration {
  const wrapCustomer = customer || {
    customerId: '',
    customerUse: 'Private',
    countryCode: 'KR',
    useStudentNoYn: false,
    studyEBUseYn: true,
    studyPBUseYn: true,
    needPayment: 'N',
    preKMode: 'D',
    viewVocaYn: false,
    viewAssessmentYn: false,
    viewLevelUpYn: false,
    studentWorkSheetYn: false,
    useSpeakYn: false,
  }
  const {
    customerUse,
    countryCode,
    useStudentNoYn,
    studyEBUseYn,
    studyPBUseYn,
    needPayment,
    preKMode,
    viewVocaYn,
    viewAssessmentYn,
    viewLevelUpYn,
    studentWorkSheetYn,
    useSpeakYn,
  } = wrapCustomer

  const target = customerUse.toLocaleLowerCase() as
    | 'academy'
    | 'school'
    | 'private'

  let country: 'kr' | 'vn' | 'id' | 'ca' = 'kr'
  if (
    countryCode === 'KR' ||
    countryCode === 'VN' ||
    countryCode === 'ID' ||
    countryCode === 'CA'
  ) {
    country = countryCode.toLocaleLowerCase() as 'kr' | 'vn' | 'id' | 'ca'
  }

  const paymentUrl =
    target === 'private'
      ? SITE_PATH.HOME.MEMBERSHIP_PAYMENT
      : SITE_PATH.HOME.RG_PAYMENT

  const config: CustomerConfiguration = {
    target,
    country,
    setting: {
      showStudyEndDay: target === 'private',
      showStudyEndInform: target === 'private',
      showReadingking: target === 'private' || target === 'school',
      loginWithName: useStudentNoYn,
      printVocabulary: viewVocaYn,
      printWorksheet: studentWorkSheetYn,
      printReport: viewAssessmentYn,
      printLevelCertificate: viewLevelUpYn,
      speakActivity: useSpeakYn,
      paymentable: needPayment === 'Y',
      paymentUrl: needPayment === 'Y' ? paymentUrl : '',
    },
    menu: {
      dailyRg: { open: target === 'private' || target === 'school' },
      eb: {
        open: studyEBUseYn,
        search: { open: studyEBUseYn },
        continue: { open: studyEBUseYn },
        readingLevel: {
          open: studyEBUseYn,
          level: {
            open: studyEBUseYn,
            prekClassic: { open: preKMode.includes('P') },
            dodoAbc: { open: preKMode.includes('D') },
          },
          series: { open: studyEBUseYn },
        },
        collections: {
          open: studyEBUseYn,
          newBooks: { open: studyEBUseYn },
          movies: { open: studyEBUseYn },
          workbooks: { open: studyEBUseYn },
          themes: { open: studyEBUseYn },
          series: { open: false }, // { open: studyEBUseYn }, // 현재 시리즈 전체목록은 제공계획이 없으므로 false
          schoolSubjects: { open: false }, // { open: studyEBUseYn && target === 'school' }, // 현재 교과연계도서 목록은 개발중 이므로 false
        },
      },
      pb: {
        open: studyPBUseYn,
        search: { open: studyPBUseYn },
        continue: { open: studyPBUseYn },
        readingLevel: {
          open: studyPBUseYn,
          level: { open: studyPBUseYn },
          series: { open: studyPBUseYn },
        },
        collections: {
          open: studyPBUseYn,
          newBooks: { open: studyPBUseYn },
          themes: { open: studyPBUseYn },
          series: { open: false }, // { open: studyPBUseYn }, // 현재 시리즈 전체목록은 제공계획이 없으므로 false
        },
      },
      activity: {
        open: true,
        result: {
          open: true,
          read: { open: true },
          speak: {
            open: useSpeakYn,
          },
          write: {
            open:
              (needPayment === 'Y' && target === 'school') ||
              target === 'academy',
          },
        },
        todo: { open: true },
        favorite: { open: true },
        tryAgain: { open: true },
      },
      myLevelSetting: { open: true },
      rank: {
        open: true,
        monthly: { open: true, isShowClassName: target === 'school' },
        readingking: {
          open: target === 'private' || target === 'school',
          groupRank: { open: target === 'school' },
        },
        levelMaster: {
          open: target === 'private' || target === 'school',
          isShowClassName: target === 'school',
          isMaskingLevel: target === 'school',
        },
        hallOfFame: {
          open:
            country === 'kr' && (target === 'private' || target === 'school'),
        },
      },
      calendar: { open: true },
      levelTest: { open: true },
      pkWorkbookMp3: { open: preKMode.includes('P') },
      dodoAbcWorkbookMp3: { open: preKMode.includes('D') },
      account: {
        open: true,
        setting: {
          open: true,
          homeScreen: { open: true },
          avatar: { open: true },
          quizFriends: { open: true },
          listenAndRepeat: {
            open: true,
            levelK: { open: true },
            level1: { open: true },
          },
          quizHelper: {
            open: true,
            hint: { open: true },
            chance: { open: true },
          },
        },
        studentInfo: {
          open: true,
          studyAvaliableDay: { open: target === 'private' },
          studentName: {
            open: true,
            editable: target === 'private',
          },
          loginId: { open: true },
          email: { open: target === 'private' },
          password: { open: true },
          phoneNumber: { open: target === 'private', editable: true },
          smsNotice: { open: target === 'private' },
          strekSetting: { open: true },
          studyPause: { open: target === 'private' },
          withdraw: { open: target === 'private' },
        },
      },
      profile: { open: true },
      streak: { open: true },
      dailyGoal: { open: true },
      friendsStory: { open: true },
    },
  }
  return customizeCustomerConfiguration(wrapCustomer, config)
}

function customizeCustomerConfiguration(
  customer: {
    customerId: string
    customerUse: string
    countryCode: string
  },
  config: CustomerConfiguration,
) {
  const { customerId } = customer

  if (customerId === '002428') {
    // 002428: 서울도성초등학교
    config.menu.rank.open = false
  } else if (customerId === '002473') {
    // 002473: 서울고현초등학교
    config.menu.rank.open = false
  } else if (customerId === '002443') {
    // 002443: 밍월드런던 영어학원
    config.menu.rank.open = false
  }

  return config
}
