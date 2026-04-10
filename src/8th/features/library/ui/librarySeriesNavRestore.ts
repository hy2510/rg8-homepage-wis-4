const LIBRARY_SERIES_NAV_KEY = 'rg8-library-series-nav-v1'

export type LibrarySeriesNavPayload = {
  /** Reading Levels 아코디언 섹션 제목. 없으면 시리즈 제목으로 섹션을 찾음 */
  section?: string
  seriesTitle: string
  /** 콜렉션 > 시리즈 목록에서 진입 시 복귀·스크롤 대상 */
  returnTarget?: 'finder' | 'seriesList'
  bookType?: 'EB' | 'PB'
}

export function rememberLibrarySeriesNav(payload: LibrarySeriesNavPayload) {
  try {
    sessionStorage.setItem(LIBRARY_SERIES_NAV_KEY, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

export function peekLibrarySeriesNav(): LibrarySeriesNavPayload | null {
  try {
    const raw = sessionStorage.getItem(LIBRARY_SERIES_NAV_KEY)
    if (!raw) return null
    return JSON.parse(raw) as LibrarySeriesNavPayload
  } catch {
    return null
  }
}

export function clearLibrarySeriesNav() {
  try {
    sessionStorage.removeItem(LIBRARY_SERIES_NAV_KEY)
  } catch {
    /* ignore */
  }
}

/** 스크롤 앵커용 DOM id (시리즈 제목 기반) */
export function librarySeriesScrollElementId(seriesTitle: string): string {
  try {
    const b = btoa(unescape(encodeURIComponent(seriesTitle)))
    return `library-series-${b.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')}`
  } catch {
    return `library-series-fallback`
  }
}

export const LIBRARY_SERIES_RESTORE_FLASH_CLASS = 'library-series-restore-flash'

export const LIBRARY_SERIES_RESTORE_DIM_BODY_CLASS =
  'library-series-restore-dim-others'

const RESTORE_FLASH_MS = 4000

/** 복귀 후 썸네일 영역 보더 반짝임 (SeriesItemStyle 루트에 id가 있어야 함) */
export function flashLibrarySeriesRestoreElement(seriesTitle: string) {
  const id = librarySeriesScrollElementId(seriesTitle)
  const el = document.getElementById(id)
  if (!el) return
  document.body.classList.add(LIBRARY_SERIES_RESTORE_DIM_BODY_CLASS)
  el.classList.add(LIBRARY_SERIES_RESTORE_FLASH_CLASS)
  window.setTimeout(() => {
    el.classList.remove(LIBRARY_SERIES_RESTORE_FLASH_CLASS)
    document.body.classList.remove(LIBRARY_SERIES_RESTORE_DIM_BODY_CLASS)
  }, RESTORE_FLASH_MS)
}
