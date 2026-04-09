import {
  NAVER_SEARCH_ADVISOR_ID,
  NAVER_SEARCH_ADVISOR_META_KEY,
} from './search-advisor'

export function NaverSearchAdvisorMeta() {
  return (
    <meta
      name={NAVER_SEARCH_ADVISOR_META_KEY}
      content={NAVER_SEARCH_ADVISOR_ID}
    />
  )
}
