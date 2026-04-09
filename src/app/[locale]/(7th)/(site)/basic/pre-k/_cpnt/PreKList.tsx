'use client'

import { useLibraryLevelPreK } from '@/7th/_client/store/library/pre-k/selector'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import PreKCover from './PreKCover'
import PreKNextPick from './PreKNextPick'

const STYLE_ID = 'page_kids_prek'

const NEXT_FICK_FIND_DIRECTION: 'first' | 'last' = 'first'

export default function PreKList({
  onClickBook,
  onClickDownload,
}: {
  onClickBook?: (levelRoundId: string) => void
  onClickDownload?: (levelRoundId: string) => void
}) {
  const style = useStyle(STYLE_ID)
  const { option, payload: books } = useLibraryLevelPreK()

  let findNextPick:
    | { image: string; title: string; levelRoundId: string }
    | undefined = undefined
  if (NEXT_FICK_FIND_DIRECTION === 'first') {
    for (let i = 0; i < books.book.length; i++) {
      if (books.book[i].rgPointCount === 0) {
        const bookItem = books.book[i]
        findNextPick = {
          image: bookItem.surfaceImagePath,
          title: bookItem.topicTitle,
          levelRoundId: bookItem.levelRoundId,
        }
        break
      }
    }
  } else {
    for (let i = books.book.length - 1; i >= 0; i--) {
      if (books.book[i].rgPointCount > 0) {
        if (i < books.book.length - 1) {
          const bookItem = books.book[i + 1]
          findNextPick = {
            image: bookItem.surfaceImagePath,
            title: bookItem.topicTitle,
            levelRoundId: bookItem.levelRoundId,
          }
        }
        break
      }
      if (i === 0 && !findNextPick) {
        const bookItem = books.book[0]
        findNextPick = {
          image: bookItem.surfaceImagePath,
          title: bookItem.topicTitle,
          levelRoundId: bookItem.levelRoundId,
        }
      }
    }
  }

  return (
    <>
      <div className={style.book_list}>
        {books.book.map((book, i) => {
          const isActive = findNextPick
            ? findNextPick.levelRoundId === book.levelRoundId
            : false
          return (
            <PreKCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              title={book.topicTitle}
              coverImage={book.surfaceImagePath}
              active={isActive}
              passedCount={book.rgPointCount}
              downloadPath={book.vocabularyPath}
              onClickBook={() => {
                onClickBook && onClickBook(book.levelRoundId)
              }}
              onClickDownload={() => {
                onClickDownload && onClickDownload(book.vocabularyPath)
              }}
            />
          )
        })}
      </div>
      {findNextPick && (
        <PreKNextPick
          image={findNextPick.image}
          title={findNextPick.title}
          onClickStart={() => {
            if (findNextPick) {
              onClickBook && onClickBook(findNextPick.levelRoundId)
            }
          }}
        />
      )}
    </>
  )
}
