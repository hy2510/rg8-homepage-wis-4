'use client'

import { BookDetailInfo } from '@/8th/features/library/model/book-info'
import { useStudentEarnReadingUnit } from '@/8th/features/student/service/setting-query'
import { useStudent } from '@/8th/features/student/service/student-query'
import { useAuth } from '@/8th/shared/auth/AuthContext'
import { useDevicePlatformInfo } from '@/8th/shared/context/DeviceContext'
import { goToLevelTest, goToStudy } from '@/8th/shared/utils/study-start-8th'
import SITE_PATH from '@/app/site-path'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import { usePathname, useSearchParams } from 'next/navigation'

export default function useStartStudy(mode: 'review' | 'quiz') {
  const path = usePathname()
  const searchParams = useSearchParams()

  const { language } = useLanguagePackContext()
  const device = useDevicePlatformInfo()
  const { staff: staffLoginStatus } = useAuth()

  const { data: student } = useStudent()
  const { data: readingUnitData } = useStudentEarnReadingUnit()

  const onStartStudy = (bookInfo: BookDetailInfo, isSpeak?: boolean) => {
    const readingUnitId =
      readingUnitData?.list?.find(
        (item) =>
          student?.student?.studyReadingUnitId &&
          item.readingUnitId === student?.student?.studyReadingUnitId,
      )?.id || ''

    let refererUrl: string | undefined = undefined
    if (mode === 'quiz') {
      if (path.includes(SITE_PATH.NW82.DAILY_RG)) {
        refererUrl = SITE_PATH.NW82.DAILY_RG
      } else if (bookInfo?.bookCode.startsWith('EB')) {
        const isPK = bookInfo?.bookCode?.startsWith('EB-PK')
        const bookRound = Number(bookInfo?.bookCode?.substring(6))
        if (isPK && bookRound > 0) {
          if (bookRound >= 1 && bookRound <= 26) {
            refererUrl = `${SITE_PATH.NW82.EB_PREK}/alphabet`
          } else if (bookRound >= 27 && bookRound <= 66) {
            refererUrl = `${SITE_PATH.NW82.EB_PREK}/story`
          } else if (bookRound >= 67 && bookRound <= 166) {
            refererUrl = `${SITE_PATH.NW82.EB_PREK}/phonics`
          } else if (bookRound >= 167 && bookRound <= 206) {
            refererUrl = `${SITE_PATH.NW82.EB_PREK}/word`
          } else if (bookRound >= 301 && bookRound <= 326) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/alphabet`
          } else if (bookRound >= 401 && bookRound <= 427) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/phonics1`
          } else if (bookRound >= 428 && bookRound <= 450) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/phonics2`
          } else if (bookRound >= 501 && bookRound <= 530) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/sightwords1`
          } else if (bookRound >= 531 && bookRound <= 560) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/sightwords2`
          } else if (bookRound >= 601 && bookRound <= 615) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/game-alphabet`
          } else if (bookRound >= 616 && bookRound <= 635) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/game-phonics`
          } else if (bookRound >= 636 && bookRound <= 650) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/game-sightwords1`
          } else if (bookRound >= 651 && bookRound <= 665) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/game-sightwords2`
          } else if (bookRound >= 701 && bookRound <= 730) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/nursery-rhyme`
          } else if (bookRound >= 751 && bookRound <= 776) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/alphabet-chant`
          } else if (bookRound >= 801 && bookRound <= 850) {
            refererUrl = `${SITE_PATH.NW82.EB_DODOABC}/phonics-chant`
          }
        }
        if (!refererUrl) {
          refererUrl = SITE_PATH.NW82.EB
        }
      } else if (bookInfo?.bookCode.startsWith('PB')) {
        refererUrl = SITE_PATH.NW82.PB
      }
    } else if (mode === 'review') {
      const paramstr = searchParams.toString()
      if (paramstr) {
        refererUrl = `${path}?${paramstr}`
      } else {
        refererUrl = path
      }
    }

    const exitUrl = mode === 'quiz' ? SITE_PATH.NW82.TODO : refererUrl
    const logoutUrl = '/signoff'

    const user = staffLoginStatus === 'active' ? 'staff' : 'student'
    goToStudy({
      studyInfo: bookInfo!,
      mode,
      user,
      isStartSpeak: isSpeak,
      unit: readingUnitId,
      refererUrl,
      exitUrl,
      logoutUrl,
      language,
      device,
    })
  }

  return {
    onStartStudy,
  }
}

export function useStartLevelTest() {
  const { language } = useLanguagePackContext()
  return () => goToLevelTest({ language, exitUrl: SITE_PATH.NW82.ACTIVITY })
}
