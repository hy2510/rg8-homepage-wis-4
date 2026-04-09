'use client'

import { Assets } from '@/8th/assets/asset-library'
import { SearchBarStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar({ booktype }: { booktype: 'eb' | 'pb' }) {
  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = () => {
    const keyword = encodeURIComponent(searchKeyword.trim())
    if (keyword) {
      router.push(
        `${booktype === 'eb' ? SITE_PATH.NW82.EB_SEARCH : SITE_PATH.NW82.PB_SEARCH}?keyword=${keyword}`,
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <SearchBarStyle>
      {/* 
      검색 선택 옵션 제거
      <BoxStyle className="search-option">
        <TextStyle fontSize="medium" fontColor="secondary">
          Title
        </TextStyle>
        <Image
          src={Assets.Icon.chevronDownGraySmall}
          alt="search-bar-icon"
          width={14}
          height={14}
        />
      </BoxStyle> 
      */}
      <BoxStyle display="flex" gap={10}>
        <BoxStyle className="search-input">
          <input
            type="text"
            placeholder={t('t8th001')}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </BoxStyle>
        <button className="search-button" onClick={handleSearch}>
          <Image
            src={Assets.Icon.searchBlack}
            alt="search"
            width={20}
            height={20}
          />
        </button>
      </BoxStyle>
    </SearchBarStyle>
  )
}
