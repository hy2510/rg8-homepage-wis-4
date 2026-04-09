'use client'

import { StudyStatusViewStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'

/**
 * 남은학습일, ... 결제하기 버튼
 */

interface StudyStatusViewProps {
  remainingStudyPeriod: number
  paymentUrl?: string
  endStudyDate?: string
}

export default function StudyStatusView({
  remainingStudyPeriod,
  paymentUrl,
  endStudyDate,
}: StudyStatusViewProps) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <StudyStatusViewStyle>
      <BoxStyle display="flex" gap={10}>
        <TextStyle fontFamily="sans" type="span" fontSize="medium">
          {t('t8th093')}
        </TextStyle>
        <TextStyle
          fontFamily="sans"
          fontWeight={'bolder'}
          type="span"
          fontSize="medium">
          {remainingStudyPeriod}
          {remainingStudyPeriod > 1
            ? ' days'
            : remainingStudyPeriod === 0
              ? ''
              : ' day'}
        </TextStyle>
      </BoxStyle>
      <BoxStyle display="flex" gap={10}>
        <TextStyle fontFamily="sans" type="span" fontSize="medium">
          {t('t8th094')}
        </TextStyle>
        <TextStyle
          fontFamily="sans"
          fontWeight={'bolder'}
          type="span"
          fontSize="medium">
          {endStudyDate}
        </TextStyle>
        {paymentUrl && (
          // <Link
          //   href={paymentUrl}
          //   style={{
          //     textDecoration: 'none',
          //   }}>
          //  Link 태그 사용 시 페이지 이동 시 폰트 문제가 발생하여 a 태그 사용
          <a href={paymentUrl} style={{ textDecoration: 'none' }}>
            <span
              style={{
                alignItems: 'center',
                fontFamily: 'sans',
                fontWeight: '700',
                color: 'var(--font-color-light-blue)',
                fontSize: 'var(--font-size-medium)',
              }}>
              {t('t8th095')}
            </span>
          </a>
          // </Link>
        )}
      </BoxStyle>
    </StudyStatusViewStyle>
  )
}
