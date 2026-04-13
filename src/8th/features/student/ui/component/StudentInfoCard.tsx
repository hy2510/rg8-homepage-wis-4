'use client'

import { Assets } from '@/8th/assets/asset-library'
import { StudentInfoCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'

/**
 * 이름, 랭킹, 점수, Todo, Favorite 카드
 */

interface StudentInfoCardProps {
  name: string
  loginId: string
  signUpDate: string
  avatar: string
  readingUnit: string
  isOpenSetting: boolean
  customerGroupName?: string
  /** `menu.account.studentInfo.studyAvaliableDay.open`일 때만 전달 (AccountInfo의 StudyStatusView와 동일하게 `studyEndDay` 사용) */
  remainingStudyDays?: number
}

export default function StudentInfoCard({
  name,
  loginId,
  avatar,
  readingUnit,
  customerGroupName,
  isOpenSetting,
  remainingStudyDays,
}: StudentInfoCardProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const card = (
    <StudentInfoCardStyle>
      <BoxStyle className="character-container">
        <Image
          src={avatar}
          alt="character"
          width={160}
          height={160}
          className="main-character"
        />
        <Image
          src={readingUnit}
          alt="character"
          width={160}
          height={160}
          className="sub-character"
        />
      </BoxStyle>
      <BoxStyle className="info-container">
        <BoxStyle className="info-content-container">
          <div className="user-name">{name}</div>
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="flex-start">
            <div className="user-id">{loginId}</div>
            {remainingStudyDays !== undefined && (
              <div className="study-remaining-period">
                {t('t8th093')}
                {t('t8th049', { num: remainingStudyDays })}
              </div>
            )}
            {/* <div className="sign-up-date">{signUpDate}</div> */}
            <div className="customer-group-name">{customerGroupName}</div>
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
      {isOpenSetting && (
        <span className="settings-gear" aria-hidden>
          <Image
            src={Assets.Icon.SettingsGray}
            alt=""
            width={22}
            height={22}
          />
        </span>
      )}
    </StudentInfoCardStyle>
  )

  if (isOpenSetting) {
    return (
      <Link
        href={SITE_PATH.NW82.ACCOUNTINFO_SETTING}
        target="_self"
        aria-label={t('t8th080')}
        style={{
          display: 'block',
          width: '100%',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
        }}>
        {card}
      </Link>
    )
  }

  return card
}
