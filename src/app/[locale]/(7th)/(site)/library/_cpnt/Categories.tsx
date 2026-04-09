import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'

const STYLE_ID = 'page_library'

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
  | 'SERIES'
  | 'THEME'
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
    title: '기초 영어',
    comment: '알파벳, 파닉스 배우기',
    image: '/src/images/@book-search-bar/dodo_abc.png',
    link: SITE_PATH.LIBRARY.DODO_ABC_STUDY,
  },
  {
    id: 'PK',
    title: '기초 영어 (classic)',
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
  {
    id: 'SERIES',
    title: 'Series',
    comment: '',
    image: '/src/images/@book-search-bar/series_eb.svg',
    link: SITE_PATH.LIBRARY.SERIES_LIST,
  },
  {
    id: 'THEME',
    title: 'Theme',
    comment: '',
    image: '/src/images/@book-search-bar/theme.png',
    link: SITE_PATH.LIBRARY.THEME_LIST,
  },
]

export default function Categories({ bookType }: { bookType?: string }) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { studyOpen } = useSiteBlueprint()

  const supportCategory: CATEGORY_ID[] = []
  if (studyOpen.DodoABC) {
    supportCategory.push('DODO')
  }
  if (studyOpen.PreK) {
    supportCategory.push('PK')
  }
  if (studyOpen.EB) {
    supportCategory.push('EB')
  }
  if (studyOpen.PB) {
    supportCategory.push('PB')
  }
  if (studyOpen.LC) {
    supportCategory.push('LC')
  }
  if (studyOpen.MS) {
    supportCategory.push('MS')
  }
  if (studyOpen.EB) {
    supportCategory.push('MOVIE')
  }
  if (studyOpen.EB || studyOpen.PB) {
    supportCategory.push('NEWBOOK')
  }
  if (studyOpen.EB) {
    supportCategory.push('WORKBOOK')
  }
  if (studyOpen.EB || studyOpen.PB) {
    supportCategory.push('SERIES')
    supportCategory.push('THEME')
  }

  const categorys: Category[] = []
  if (!supportCategory || supportCategory.length === 0) {
    categorys.push(...BookSearchBarCategoryData)
  } else {
    supportCategory.forEach((id) => {
      const cate = BookSearchBarCategoryData.find((item) => item.id === id)
      if (cate) {
        categorys.push(cate)
      }
    })
  }

  return (
    <div className={style.categories}>
      <div className={style.txt_h}>{t('t492')}</div>
      <div className={style.container}>
        {categorys.map((item) => {
          let title = item.title
          let link = item.link
          if (item.id === 'DODO') {
            title = t('t482')
          } else if (item.id === 'PK') {
            title = t('t484')
          } else if (item.id === 'SERIES') {
            if (bookType === 'EB') {
              link = SITE_PATH.LIBRARY.SERIES_LIST_EB
            } else if (bookType === 'PB') {
              link = SITE_PATH.LIBRARY.SERIES_LIST_PB
            }
          } else if (item.id === 'THEME') {
            if (bookType === 'EB') {
              link = SITE_PATH.LIBRARY.THEME_LIST_EB
            } else if (bookType === 'PB') {
              link = SITE_PATH.LIBRARY.THEME_LIST_PB
            }
          }

          return (
            <Link href={link} key={item.id}>
              <div className={style.category_item}>
                <div
                  className={style.category_image}
                  style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className={style.txt_title}>{title}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
