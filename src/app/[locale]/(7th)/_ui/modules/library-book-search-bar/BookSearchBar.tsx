import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { CATEGORY_ID, BookSearchBar as SearchBar } from './book-search-bar'

export default function BookSearchBar({
  isMobile,
  onCloseBookSearchPopup,
}: {
  isMobile?: boolean
  onCloseBookSearchPopup?: () => void
}) {
  const supportCategory: CATEGORY_ID[] = []
  const { studyOpen } = useSiteBlueprint()

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

  return (
    <SearchBar
      openCategorys={supportCategory}
      isMobile={isMobile}
      onCloseBookSearchPopup={onCloseBookSearchPopup}
    />
  )
}
