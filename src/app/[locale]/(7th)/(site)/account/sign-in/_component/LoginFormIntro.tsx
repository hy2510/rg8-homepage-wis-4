'use client'

import ChooseLanguage from '@/7th/_ui/common/ChooseLanguage'
import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'

const STYLE_ID = 'page_sign_in'

export default function LoginFormIntro({
  onClickNav,
}: {
  onClickNav?: (nav: 'P' | 'G') => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <>
      <Margin height={20} />
      <ChooseLanguage />
      <div className={style.choose_user_type}>
        <div
          className={style.card}
          onClick={() => onClickNav && onClickNav('P')}>
          <div className={style.symbol_image}>
            <Image
              src={'/src/images/@account/symbol_icon_indi.png'}
              width={80}
              height={80}
              alt=""
            />
          </div>
          <div className={style.txt_1}>
            {/* 개인 회원 */}
            {t('t258')}
          </div>
          <div className={style.txt_2}>
            {/* '일반' 회원인 경우, 로그인 또는 가입하려면 선택해 주세요. */}
            {t('t636')}
          </div>
        </div>
        <div
          className={style.card}
          onClick={() => onClickNav && onClickNav('G')}>
          <div className={style.symbol_image}>
            <Image
              src={'/src/images/@account/symbol_icon_school.svg'}
              width={76}
              height={86}
              alt=""
            />
          </div>
          <div className={style.txt_1}>
            {/* 그룹 회원 */}
            {t('t259')}
          </div>
          <div className={style.txt_2}>
            {/* '학교 또는 학원' 등 기관 회원인 경우, 로그인 하려면 선택해 주세요. */}
            {t('t638')}
          </div>
        </div>
      </div>
    </>
  )
}
