'use client'

import {
  ENGLISH,
  KOREAN,
  VIETNAMESE,
  supportLanguages,
} from '@/localization/localize-config'
import { usePathname, useSearchParams } from 'next/navigation'
import { useStyle } from '../context/StyleContext'

const STYLE_ID = 'common_components'

export default function ChooseLanguage({
  align,
  optionLanguages,
}: {
  align?: 'left'
  optionLanguages?: string[]
}) {
  const style = useStyle(STYLE_ID)

  const languages =
    optionLanguages && optionLanguages.length > 0
      ? optionLanguages
      : supportLanguages
  const languageData = languages.map((lang) => {
    let className = ''
    if (lang === KOREAN) {
      className = style.kr_icon
    } else if (lang === ENGLISH) {
      className = style.eng_icon
    } else if (lang === VIETNAMESE) {
      className = style.vn_icon
    }
    return {
      code: lang,
      className,
    }
  })

  const searchParam = useSearchParams()
  const paths = usePathname()
    .split('/')
    .filter((val) => !!val)

  let checkLanguage: string | undefined = undefined
  if (paths.length >= 1) {
    languageData.forEach((lang) => {
      if (lang.code === paths[0]) {
        checkLanguage = lang.code
      }
    })
  }

  const onClickLanguage = (language: string) => {
    let sitepath = `/${language}`
    paths.forEach((path, i) => {
      if (i > 0) {
        sitepath += `/${path}`
      }
    })
    const qs = searchParam.toString()
    if (qs) {
      sitepath += `?${searchParam.toString()}`
    }
    window.location.replace(sitepath)
  }

  return (
    <div
      className={`${style.choose_language} ${align === 'left' && style.align_left}`}>
      {languageData.map((lang) => {
        return (
          <div
            key={lang.code}
            className={lang.className}
            onClick={() => onClickLanguage(lang.code)}>
            {checkLanguage === lang.code && (
              <span className={style.check_icon}></span>
            )}
          </div>
        )
      })}
    </div>
  )
}
