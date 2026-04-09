import useTranslation from '@/localization/client/useTranslations'
import { ActionBarDropdownItem } from '../ui/ActionBar'

export type ExportActionType = 'default' | 'include' | 'exclude'
export type PickItemType =
  | 'Vocabulary'
  | 'ToDo'
  | 'BookList'
  | 'Favorite'
  | 'AllBooksList'

export const useStatusItems = (currentStatus: string, isFullEasy?: boolean) => {
  // @Language 'common'
  const { t } = useTranslation()

  const statusItems: ActionBarDropdownItem[] = [
    {
      key: 'StatusAll',
      label: t('t8th015'),
      isActive: currentStatus === 'All',
    },
    {
      key: 'StatusBefore',
      label: t('t8th016'),
      isActive: currentStatus === 'Before',
    },
    {
      key: 'StatusMode1stCompleteOrBefore',
      label: t('t8th020'),
      isActive: currentStatus === '1stCompleteOrBefore',
    },
    {
      key: 'StatusMode1StComplete',
      label: t('t8th021'),
      isActive: currentStatus === '1stComplete',
    },
    // {
    //   key: 'StatusComplete',
    //   label: t('t8th017'),
    //   isActive: currentStatus === 'Complete',
    // },
    {
      key: 'StatusMode2ndComplete',
      label: t('t8th017'),
      isActive: currentStatus === '2ndComplete',
    },
  ]
  //TODO: 8차 신규 피쳐, 신규 검색조건 변경 UI 주석처리
  if (isFullEasy) {
    statusItems.splice(
      4,
      0,
      {
        key: 'StatusModeEasy',
        label: t('t8th018'),
        isActive: currentStatus === 'Easy',
      },
      {
        key: 'StatusModeFull',
        label: t('t8th019'),
        isActive: currentStatus === 'Full',
      },
    )
  }
  return statusItems
}

export const useStatusAndGenreItems = (
  currentStatus: string,
  currentGenre: string,
  isFullEasy?: boolean,
) => {
  const statusItems = useStatusItems(currentStatus, isFullEasy)
  const genreItems: ActionBarDropdownItem[] = [
    { key: 'GenreAll', label: 'All Books', isActive: currentGenre === 'All' },
    {
      key: 'GenreFiction',
      label: 'Fiction',
      isActive: currentGenre === 'Fiction',
    },
    {
      key: 'GenreNonfiction',
      label: 'Nonfiction',
      isActive: currentGenre === 'Nonfiction',
    },
  ]

  return statusItems.concat({ key: '--' }).concat(genreItems)
}

export const useSortItems = (currentSort: string) => {
  // @Language 'common'
  const { t } = useTranslation()

  const sortItems: ActionBarDropdownItem[] = [
    {
      key: 'SortRound',
      label: t('t8th022'),
      isActive: currentSort === 'Round',
    },
    {
      key: 'SortPreference',
      label: t('t8th023'),
      isActive: currentSort === 'Preference',
    },
    {
      key: 'SortReadCount',
      label: t('t8th024'),
      isActive: currentSort === 'ReadCount',
    },
    {
      key: 'SortRegistDate',
      label: t('t8th025'),
      isActive: currentSort === 'RegistDate',
    },
    {
      key: 'SortRgPoint',
      label: t('t8th026'),
      isActive: currentSort === 'RgPoint',
    },
  ]
  return sortItems
}

export const useExportItems = (option?: {
  action: ExportActionType
  pick?: PickItemType[]
}) => {
  const { action, pick = [] } = option || { action: 'default' }

  // @Language 'common'
  const { t } = useTranslation()

  const allPickItem: ActionBarDropdownItem[] = [
    { key: 'ExportVocabulary', label: t('t8th027'), isActive: true },
    { key: 'ExportToDo', label: t('t8th028'), isActive: true },
    { key: 'ExportBookList', label: t('t8th029'), isActive: true },
    { key: 'ExportFavorite', label: t('t8th030'), isActive: true },
  ]

  const pickItems: ActionBarDropdownItem[] = []
  if (action === 'default') {
    pickItems.push(...allPickItem)
  } else if (action === 'include') {
    pickItems.push(
      ...allPickItem.filter((item) =>
        pick.includes(
          `${item.key.substring(6)}` as
            | 'Vocabulary'
            | 'ToDo'
            | 'BookList'
            | 'Favorite',
        ),
      ),
    )
  } else if (action === 'exclude') {
    pickItems.push(
      ...allPickItem.filter(
        (item) =>
          !pick.includes(
            `${item.key.substring(6)}` as
              | 'Vocabulary'
              | 'ToDo'
              | 'BookList'
              | 'Favorite',
          ),
      ),
    )
  }

  const isAllBooksList =
    action === 'default' ||
    (action === 'include' && pick.includes('AllBooksList')) ||
    (action === 'exclude' && !pick.includes('AllBooksList'))
  if (isAllBooksList) {
    pickItems.push({ key: '--' })
    pickItems.push({
      key: 'ExportAllBooksList',
      label: t('t8th031'),
      isActive: true,
    })
  }
  return pickItems
}

export const useExportItems_Deprecated = (pick: PickItemType[] | 'default') => {
  // @Language 'common'
  const { t } = useTranslation()

  const allPickItem: ActionBarDropdownItem[] = [
    { key: 'ExportVocabulary', label: t('t8th027'), isActive: true },
    { key: 'ExportToDo', label: t('t8th028'), isActive: true },
    { key: 'ExportBookList', label: t('t8th029'), isActive: true },
    { key: 'ExportFavorite', label: t('t8th030'), isActive: true },
  ]

  const pickItems: ActionBarDropdownItem[] = []
  if (pick === 'default') {
    pickItems.push(...allPickItem)
  } else {
    pickItems.push(
      ...allPickItem.filter((item) =>
        pick.includes(
          `${item.key.substring(6)}` as
            | 'Vocabulary'
            | 'ToDo'
            | 'BookList'
            | 'Favorite',
        ),
      ),
    )
  }

  const isAllBooksList = pick === 'default' || pick.includes('AllBooksList')
  if (isAllBooksList) {
    pickItems.push({ key: '--' })
    pickItems.push({
      key: 'ExportAllBooksList',
      label: t('t8th031'),
      isActive: true,
    })
  }
  return pickItems
}

export const useTodoSortItems = (currentSort: string) => {
  // @Language 'common'
  const { t } = useTranslation()

  const sortItems: ActionBarDropdownItem[] = [
    {
      key: 'SortRegistDate',
      label: t('t8th032'),
      isActive: currentSort === 'RegistDate',
    },
    {
      key: 'SortRegistDateASC',
      label: t('t8th033'),
      isActive: currentSort === 'RegistDateASC',
    },
    {
      key: 'SortOngoingStudy',
      label: t('t8th034'),
      isActive: currentSort === 'OngoingStudy',
    },
    {
      key: 'SortBeforeStudy',
      label: t('t8th035'),
      isActive: currentSort === 'BeforeStudy',
    },
  ]
  return sortItems
}
