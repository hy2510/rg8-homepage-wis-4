'use client'

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
  isOpenAccountInfo: boolean
  customerGroupName?: string
}

export default function StudentInfoCard({
  name,
  loginId,
  signUpDate,
  avatar,
  readingUnit,
  customerGroupName,
  isOpenSetting,
  isOpenAccountInfo,
}: StudentInfoCardProps) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
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
            {/* <div className="sign-up-date">{signUpDate}</div> */}
            <div className="customer-group-name">{customerGroupName}</div>
          </BoxStyle>
        </BoxStyle>
        <BoxStyle className="buttons">
          {isOpenSetting && (
            <Link href={SITE_PATH.NW82.ACCOUNTINFO_SETTING} target="_self">
              {t('t8th080')}
            </Link>
          )}
          {isOpenAccountInfo && (
            <Link href={SITE_PATH.NW82.ACCOUNTINFO} target="_self">
              {t('t8th081')}
            </Link>
          )}
        </BoxStyle>
      </BoxStyle>
    </StudentInfoCardStyle>
  )
}
