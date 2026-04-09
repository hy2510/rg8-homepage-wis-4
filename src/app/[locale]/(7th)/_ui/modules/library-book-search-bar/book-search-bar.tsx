'use client'

import { Button } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export type CATEGORY_ID =
  | 'PK'
  | 'DODO'
  | 'EB'
  | 'PB'
  | 'MS'
  | 'LC'
  | 'MOVIE'
  | 'NEWBOOK'
  | 'WORKBOOK'
type Category = {
  id: CATEGORY_ID
  title: string
  comment: string
  image: string
  link: string
}
const BookSearchBarCategoryData: Category[] = [
  {
    id: 'DODO',
    title: 'DODO ABC',
    comment: '알파벳, 파닉스 배우기',
    image: '/src/images/@book-search-bar/dodo_abc.png',
    link: SITE_PATH.LIBRARY.DODO_ABC_STUDY,
  },
  {
    id: 'PK',
    title: 'PRE K (classic)',
    comment: '알파벳, 파닉스 배우기',
    image: '/src/images/@book-search-bar/prek.svg',
    link: SITE_PATH.LIBRARY.PRE_K,
  },
  {
    id: 'EB',
    title: 'eBook',
    comment: '스토리 읽기와 학습',
    image: '/src/images/@book-search-bar/ebook.svg',
    link: SITE_PATH.LIBRARY.E_BOOK,
  },
  {
    id: 'PB',
    title: 'pBook Quiz',
    comment: '종이책 읽고, 온라인 퀴즈',
    image: '/src/images/@book-search-bar/pbook_quiz.svg',
    link: SITE_PATH.LIBRARY.P_BOOK,
  },
  {
    id: 'MOVIE',
    title: 'Movies',
    comment: '동영상이 포함된 eBook',
    image: '/src/images/@book-search-bar/movie_book.svg',
    link: SITE_PATH.LIBRARY.MOVIE_BOOK,
  },
  {
    id: 'NEWBOOK',
    title: 'New Books',
    comment: '이달의 신규 학습 도서',
    image: '/src/images/@book-search-bar/new_book.svg',
    link: SITE_PATH.LIBRARY.NEW_BOOK,
  },
  {
    id: 'LC',
    title: 'Listening',
    comment: 'Listening 강화 훈련',
    image: '/src/images/@book-search-bar/listening.svg',
    link: SITE_PATH.LIBRARY.HOME,
  },
  {
    id: 'MS',
    title: 'Writing',
    comment: 'Writing 강화 훈련',
    image: '/src/images/@book-search-bar/writing.svg',
    link: SITE_PATH.LIBRARY.HOME,
  },
  {
    id: 'WORKBOOK',
    title: 'Workbook',
    comment: '워크북 연계 도서',
    image: '/src/images/@book-search-bar/workbook.svg',
    link: SITE_PATH.LIBRARY.WORKBOOK,
  },
]

const STYLE_ID = 'book_search_bar'

// 도서 검색바
export const BookSearchBar = ({
  openCategorys,
  isMobile,
  onCloseBookSearchPopup,
}: {
  openCategorys?: CATEGORY_ID[]
  isMobile?: boolean
  onCloseBookSearchPopup?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [isBookSearchActive, _isBookSearchActive] =
    useState<boolean>(!!isMobile)

  const nav = useRouter()

  const dismissSearchActive = useCallback(
    (isMaintainKeyword?: boolean) => {
      if (!isMaintainKeyword) {
        setSearchKeyword('')
      }
      _isBookSearchActive(false)
      onCloseBookSearchPopup && onCloseBookSearchPopup()
    },
    [onCloseBookSearchPopup],
  )

  const onMoveLink = useCallback(
    (link: string, isMaintainKeyword?: boolean) => {
      if (link) {
        dismissSearchActive(isMaintainKeyword)
        nav.push(link)
      }
    },
    [nav, dismissSearchActive],
  )

  const categorys: Category[] = []
  if (!openCategorys || openCategorys.length === 0) {
    categorys.push(...BookSearchBarCategoryData)
  } else {
    openCategorys.forEach((id) => {
      const cate = BookSearchBarCategoryData.find((item) => item.id === id)
      if (cate) {
        categorys.push(cate)
      }
    })
  }

  return (
    <>
      <div
        className={style.book_search_bar}
        onClick={() => {
          _isBookSearchActive(true)
        }}
        onKeyDown={(e) => {
          if (isBookSearchActive && e.key === 'Escape') {
            _isBookSearchActive(false)
          }
        }}>
        <div className={style.grid_icon}>
          <Image
            src={'/src/images/grid-icons/grid.svg'}
            width={16}
            height={16}
            alt=""
          />
        </div>
        <input
          type="text"
          placeholder={'eBook, pBook, New Books ...'}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: 'calc(100% - 120px)' }}
          onKeyDown={(e) => {
            if (
              isBookSearchActive &&
              searchKeyword &&
              e.key.toLowerCase() === 'enter'
            ) {
              e.currentTarget?.blur()
              const keyword = encodeURIComponent(searchKeyword)
              onMoveLink(
                `${SITE_PATH.LIBRARY.SEARCH}?keyword=${keyword}`,
                false,
              )
            }
          }}
        />
        <Button
          roundFull
          shadow
          color={'blue'}
          width={'50px'}
          onClick={(e) => {
            if (isBookSearchActive && searchKeyword) {
              e?.stopPropagation()
              const keyword = encodeURIComponent(searchKeyword)
              onMoveLink(
                `${SITE_PATH.LIBRARY.SEARCH}?keyword=${keyword}`,
                false,
              )
            }
          }}>
          <Image
            alt=""
            src="/src/images/search-icons/search_white.svg"
            width={20}
            height={20}></Image>
          {/* <span>{t('t491')}</span> */}
        </Button>
      </div>
      {isBookSearchActive && (
        <>
          <div className={style.book_search_bar_category_container}>
            <div className={style.row_a}>{t('t492')}:</div>
            <div className={style.row_b}>
              {categorys.map((a, i) => {
                let title = a.title
                let comment = a.comment
                switch (a.id) {
                  case 'DODO':
                    title = t('t482')
                    comment = t('t483')
                    break
                  case 'PK':
                    title = t('t484')
                    comment = t('t483')
                    break
                  case 'EB':
                    comment = t('t485')
                    break
                  case 'PB':
                    comment = t('t486')
                    break
                  case 'MOVIE':
                    comment = t('t804')
                    break
                  case 'NEWBOOK':
                    comment = t('t487')
                    break
                  case 'WORKBOOK':
                    comment = t('t808')
                    break
                  case 'LC':
                    comment = t('t488')
                    break
                  case 'MS':
                    comment = t('t489')
                    break
                }
                return (
                  <BookSearchBarCategoryItem
                    key={`bookserch-category-${i}`}
                    title={title}
                    comment={comment}
                    imgSrc={a.image}
                    link={a.link}
                    onItemClick={onMoveLink}
                  />
                )
              })}
            </div>
          </div>
          <div
            className={style.book_search_bg}
            onClick={() => {
              dismissSearchActive()
            }}></div>
        </>
      )}
    </>
  )
}

// 도서 검색바의 카테고리 메뉴 아이템
const BookSearchBarCategoryItem = ({
  link,
  imgSrc = '',
  title,
  comment,
  onItemClick,
}: {
  link?: string
  imgSrc?: string
  title?: string
  comment?: string
  onItemClick?: (link: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={style.book_search_bar_category_item}
      onClick={() => {
        if (link) {
          onItemClick && onItemClick(link)
        }
      }}>
      <Image alt="" src={imgSrc} width={60} height={60} />
      <div className={style.col}>
        <div className={style.txt_h}>{title}</div>
        <div className={style.txt_p}>{comment}</div>
      </div>
    </div>
  )
}
