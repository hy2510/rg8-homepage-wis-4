'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useDeleteAllFavorite } from '@/8th/features/library/service/library-query'
import { useSearchFavoriteBook } from '@/8th/features/library/service/search-query'
import BookItem, {
  SkeletonBookItem,
} from '@/8th/features/library/ui/component/BookItem'
import ActionBar, {
  ActionBarDropdownItem,
} from '@/8th/features/library/ui/component/LibraryActionBar'
import BookInfoModal from '@/8th/features/library/ui/modal/BookInfoModal'
import PrintVocabularyModal from '@/8th/features/library/ui/modal/PrintVocabularyModal'
import {
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import {
  ExportActionType,
  PickItemType,
  useExportItems,
  useStatusItems,
} from '@/8th/shared/hook/useActionBarDropdownOption'
import {
  VocabularyOption,
  useExportPanelFavorite,
} from '@/8th/shared/hook/useExportPanel'
import {
  BookListEmptyStateStyle,
  BookListStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import Pagenation from '@/8th/shared/ui/Pagenation'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import { openDownloadLink, openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useState } from 'react'

export default function FavoriteBookList() {
  return <LibraryBookListDependency />
}

function LibraryBookListDependency() {
  //@language 'common'
  const { t } = useTranslation()

  const student = useStudent()

  if (student.isLoading) {
    return <></>
  }

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th030')}`}
        iconSrc={Assets.Icon.Side.favorite.src}
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
      <BookList />
    </>
  )
}

type FavoriteBookExportType =
  | 'none'
  | 'Vocabulary'
  | 'ToDo'
  | 'Favorite'
  | 'BookList'
  | 'EditDelete'

function BookList() {
  const [favoriteSearch, setFavoriteSearch] = useState<{
    status?: string
    page: number
  }>({
    status: 'All',
    page: 1,
  })

  // @Language 'common'
  const { t } = useTranslation()

  const { setting } = useCustomerConfiguration()

  const student = useStudent()
  const search = useSearchFavoriteBook(favoriteSearch)

  useEffect(() => {
    if (
      favoriteSearch.page !== 1 &&
      search.status === 'success' &&
      search.data?.book.length === 0
    ) {
      setFavoriteSearch({ status: favoriteSearch.status, page: 1 })
    }
  }, [
    favoriteSearch.page,
    favoriteSearch.status,
    search.status,
    search.data?.book.length,
  ])

  const { mutate: deleteAll } = useDeleteAllFavorite()

  const [exportMode, setExportMode] = useState<FavoriteBookExportType>('none')
  const [vocabularyOption, setVocabularyOption] = useState<boolean>(false)

  const {
    selectedItemCount,
    setSelectItemChange,
    resetSelectedItem,
    isSelectedItem,
    onActionDeleteFavorite,
    onActionVocabulary,
    onActionBookList,
    onActionAddTodo,
  } = useExportPanelFavorite()

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
      }
    | undefined
  >(undefined)

  const statusItems = useStatusItems(favoriteSearch.status || 'All')
  const exportOption: {
    action: ExportActionType
    pick?: PickItemType[]
  } = {
    action: 'include',
    pick: [],
  }
  if (setting.printVocabulary) {
    exportOption.pick = ['Vocabulary', 'BookList', 'AllBooksList']
  } else {
    exportOption.pick = ['BookList', 'AllBooksList']
  }
  const exportItems = useExportItems(exportOption)
  const editItems: ActionBarDropdownItem[] = [
    { key: 'EditDelete', label: t('t8th036'), isActive: true },
  ]

  const studentHistory = useStudentHistoryList()
  if (studentHistory.isLoading) {
    return <div></div>
  }
  const defaultStudentHistoryId =
    studentHistory.data?.list && studentHistory.data?.list.length > 0
      ? studentHistory.data.list[0].studentHistoryId
      : ''

  if (search.isLoading) {
    return (
      <BookListStyle>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonBookItem key={`skeleton-${index}`} />
        ))}
      </BookListStyle>
    )
  }

  const isExportMode = exportMode !== 'none'
  const onChangeExportMode = (item: FavoriteBookExportType) => {
    setExportMode(item)
    if (item === 'none') {
      resetSelectedItem()
    }
  }
  const onConfirmVocabularyOption = (vocabularyOption: VocabularyOption) => {
    const studentHistoryId = defaultStudentHistoryId

    onActionVocabulary(
      {
        studentHistoryId,
        vocabularyOption,
      },
      (success, url, error) => {
        if (success) {
          onChangeExportMode('none')
          setVocabularyOption(false)
          openWindow(url, {
            external: true,
            target: '_blank',
            feature: 'noopener, noreferrer',
          })
        } else if (error) {
          alert(error)
        } else {
          onChangeExportMode('none')
          setVocabularyOption(false)
        }
      },
    )
  }
  const onConfirmExport = () => {
    const studentHistoryId = defaultStudentHistoryId

    if (selectedItemCount > 0) {
      if (exportMode === 'Vocabulary') {
        setVocabularyOption(true)
      } else if (exportMode === 'ToDo') {
        onActionAddTodo(studentHistoryId, (success, error) => {
          if (success) {
            alert(t('t8th010'))
            onChangeExportMode('none')
          } else if (error) {
            try {
              const errorPayload = JSON.parse((error as any).message) as {
                message: string
              }
              alert(errorPayload.message)
            } catch (e) {
              alert('도서 추가 실패 Error')
            }
          } else {
            onChangeExportMode('none')
          }
        })
      } else if (exportMode === 'BookList') {
        onActionBookList((success, url, error) => {
          if (success) {
            openWindow(url, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
            onChangeExportMode('none')
          } else if (error) {
            alert(error)
          } else {
            onChangeExportMode('none')
          }
        })
      } else if (exportMode === 'EditDelete') {
        onActionDeleteFavorite((success, error) => {
          if (success) {
            onChangeExportMode('none')
            setFavoriteSearch({ ...favoriteSearch, page: 1 })
          } else if (error) {
            alert(error)
          } else {
            onChangeExportMode('none')
          }
        })
      }
    }
  }

  const onStatusItemClick = (item: ActionBarDropdownItem) => {
    if (item.key.startsWith('Status')) {
      const value = item.key.substring(6)
      if (value.startsWith('Mode')) {
        //TODO: 8차 신규 피쳐, 검색 조건 다양화 필요
        let status = 'All'
        switch (value) {
          case 'ModeEasy':
            status = 'Easy'
            break
          case 'ModeFull':
            status = 'Full'
            break
          case 'Mode1stCompleteOrBefore':
            status = '1stCompleteOrBefore'
            break
          case 'Mode1StComplete':
            status = '1stComplete'
            break
          case 'Mode2ndComplete':
            status = '2ndComplete'
            break
          default:
            break
        }
        setFavoriteSearch({ ...favoriteSearch, status, page: 1 })
      } else if (favoriteSearch.status !== value) {
        setFavoriteSearch({
          ...favoriteSearch,
          status: value,
          page: 1,
        })
      }
    }
  }

  const onExportItemClick = (item: ActionBarDropdownItem) => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (item.key !== 'ExportAllBooksList') {
      if (exportMode === 'EditDelete' && selectedItemCount > 0) {
        resetSelectedItem()
      }
      setExportMode(item.key.substring(6) as FavoriteBookExportType)
    } else {
      if (downloadExcelUrl) {
        openDownloadLink(downloadExcelUrl)
      }
    }
  }

  const onEditItemClick = (item: ActionBarDropdownItem) => {
    if (item.key === 'EditDelete') {
      if (selectedItemCount > 0) {
        resetSelectedItem()
      }
      setExportMode('EditDelete')
    }
  }

  const actionBarTitle = statusItems
    .filter((item) => item.isActive && !!item.label)
    .reduce((title, item) => {
      if (item.key.startsWith('Status')) {
        return item.label as string
      } else if (item.key.startsWith('Genre') && item.key !== 'GenreAll') {
        return title ? `${title} / ${item.label}` : (item.label as string)
      }
      return title
    }, '')
  const searchCount = search.data?.page?.totalRecords || 0
  const downloadExcelUrl = searchCount > 0 ? search.data?.download : undefined

  const currentPage = search.data?.page?.page || 0
  const maxPage = search.data?.page?.totalPages || 0
  const onPageClick = (page: number) => {
    setFavoriteSearch({ ...favoriteSearch, page: page })
  }

  let exportTitle = ''
  if (exportMode === 'EditDelete') {
    exportTitle = `${t('t8th043')} / ${t('t8th044')}`
  } else {
    exportTitle = `${t('t8th014')} / ${exportItems.find((item) => item.key === `Export${exportMode}`)?.label || exportMode}`
  }

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  return (
    <>
      <ActionBar
        title={actionBarTitle}
        count={searchCount}
        dropdowns={[
          {
            title: t('t8th012'),
            isActiveMakerVisible: true,
            items: statusItems,
            onItemClick: onStatusItemClick,
          },
          {
            title: t('t8th014'),
            items: exportItems,
            onItemClick: onExportItemClick,
          },
          {
            title: t('t8th043'),
            items: editItems,
            onItemClick: onEditItemClick,
          },
        ]}
        exportPanel={{
          isOpen: isExportMode,
          title: exportTitle,
          count: selectedItemCount,
          isEdit: exportMode === 'EditDelete',
          onCancel: () => onChangeExportMode('none'),
          onConfirm: onConfirmExport,
        }}
      />
      {searchCount > 0 ? (
        <>
          <BookListStyle>
            {search.data?.book?.map((book) => (
              <BookItem
                key={book.levelRoundId}
                title={book.topicTitle}
                passCount={book.rgPointCount}
                addYn={!book.addYn}
                movieYn={!!book.animationPath}
                point={book.getableRgPoint}
                src={book.surfaceImagePath}
                levelName={book.levelName}
                recommendedAge={book.recommendedAge}
                isCheckable={isExportMode}
                isChecked={isExportMode && isSelectedItem(book.levelRoundId)}
                onClick={() => {
                  if (isExportMode) {
                    const currentFlag = isSelectedItem(book.levelRoundId)
                    setSelectItemChange(
                      book.levelRoundId,
                      {
                        levelRoundId: book.levelRoundId,
                        isAddableYn: book.addYn,
                      },
                      !currentFlag,
                    )
                  } else {
                    if (isStudyEnd) {
                      onStudyEndMessage()
                      return
                    }
                    setBookInfo({
                      levelRoundId: book.levelRoundId,
                      surfaceImagePath: book.surfaceImagePath,
                      title: book.topicTitle,
                      bookCode: book.levelName,
                    })
                  }
                }}
              />
            ))}
          </BookListStyle>
          <Pagenation
            maxPage={maxPage}
            currentPage={currentPage}
            onPageChange={onPageClick}
          />
          {bookInfo && (
            <BookInfoModal
              onClickClose={() => {
                setBookInfo(undefined)
              }}
              title={bookInfo.title}
              bookCode={bookInfo.bookCode}
              imgSrc={bookInfo.surfaceImagePath}
              levelRoundId={bookInfo.levelRoundId}
            />
          )}
          {vocabularyOption && (
            <PrintVocabularyModal
              onConfirm={onConfirmVocabularyOption}
              onClickClose={() => setVocabularyOption(false)}
            />
          )}
        </>
      ) : (
        <BookListEmptyStateStyle>
          <p>{t('t8th009')}</p>
        </BookListEmptyStateStyle>
      )}
    </>
  )
}
