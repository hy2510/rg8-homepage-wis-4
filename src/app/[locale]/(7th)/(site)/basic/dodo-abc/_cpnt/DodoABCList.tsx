'use client'

import { useLibraryDodoAbcLevel } from '@/7th/_client/store/library/dodo-abc/selector'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import { DodoABCType } from './DodoABCContainer'
import DodoABCCover, { DodoABCMovieCover } from './DodoABCCover'
import DodoABCNextPick from './DodoABCNextPick'

const STYLE_ID = 'page_kids_dodo_abc'

const NEXT_FICK_FIND_DIRECTION: 'first' | 'last' = 'first'

type MovieThumbnamilType = {
  activity: string
  intro?: {
    thumbnail: string
    videoPath: string
  }
  ending?: {
    thumbnail: string
    videoPath: string
  }
}
const MovieThumbnail: MovieThumbnamilType[] = [
  {
    activity: 'Study-Alphabet',
    intro: {
      thumbnail: '/src/images/@kids-dodo-abc/intro_movie_alphabet.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/alphabet_intro.mp4',
    },
    ending: {
      thumbnail: '/src/images/@kids-dodo-abc/ending_movie_alphabet.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/alphabet_ending.mp4',
    },
  },
  {
    activity: 'Study-Phonics-1',
    intro: {
      thumbnail: '/src/images/@kids-dodo-abc/intro_movie_phonics1.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/phonics1_intro.mp4',
    },
    ending: {
      thumbnail: '/src/images/@kids-dodo-abc/ending_movie_phonics1.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/phonics1_ending.mp4',
    },
  },
  {
    activity: 'Study-Phonics-2',
    intro: {
      thumbnail: '/src/images/@kids-dodo-abc/intro_movie_phonics2.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/phonics2_intro.mp4',
    },
    ending: {
      thumbnail: '/src/images/@kids-dodo-abc/ending_movie_phonics2.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/phonics2_ending.mp4',
    },
  },
  {
    activity: 'Study-Sight-Words-1',
    intro: {
      thumbnail: '/src/images/@kids-dodo-abc/intro_movie_sight_word.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/sightwords_intro.mp4',
    },
    ending: {
      thumbnail: '/src/images/@kids-dodo-abc/ending_movie_sight_word.png',
      videoPath:
        'https://wcfresource.a1edu.com/newsystem/moviebook/dodoabc/sightwords_ending.mp4',
    },
  },
]

export default function DodoABCList({
  studyType,
  onClickBook,
  onClickDownload,
}: {
  studyType: DodoABCType
  onClickBook?: (levelRoundId: string) => void
  onClickDownload?: (levelRoundId: string) => void
}) {
  const style = useStyle(STYLE_ID)
  const { option, payload: books } = useLibraryDodoAbcLevel()

  const filteredMovie = MovieThumbnail.filter(
    (mv) => mv.activity === option.activity,
  )
  const videoInfo: MovieThumbnamilType | undefined =
    filteredMovie.length === 1 ? filteredMovie[0] : undefined

  let findNextPick:
    | { image: string; title: string; levelRoundId: string }
    | undefined = undefined
  if (NEXT_FICK_FIND_DIRECTION === 'first') {
    for (let i = 0; i < books.book.length; i++) {
      if (books.book[i].rgPointCount === 0) {
        const bookItem = books.book[i]
        findNextPick = {
          image: bookItem.studyImagePath,
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
            image: bookItem.studyImagePath,
            title: bookItem.topicTitle,
            levelRoundId: bookItem.levelRoundId,
          }
        }
        break
      }
      if (i === 0 && !findNextPick) {
        const bookItem = books.book[0]
        findNextPick = {
          image: bookItem.studyImagePath,
          title: bookItem.topicTitle,
          levelRoundId: bookItem.levelRoundId,
        }
      }
    }
  }

  return (
    <>
      <div className={studyType !== 'Game' ? style.book_list : style.game_list}>
        {studyType === 'Study' && videoInfo && videoInfo.intro && (
          <DodoABCMovieCover
            tag="Intro"
            videoPath={videoInfo.intro.videoPath}
            thumbnailImage={videoInfo.intro.thumbnail}
          />
        )}
        {books.book.map((book, i) => {
          const isActive = findNextPick
            ? findNextPick.levelRoundId === book.levelRoundId
            : false
          const isStudyable =
            studyType === 'Game' ? isActive || book.rgPointCount > 0 : true
          return (
            <DodoABCCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              type={studyType}
              title={book.topicTitle}
              studyImage={book.studyImagePath}
              coverImage={book.surfaceImagePath}
              active={isActive}
              passedCount={book.rgPointCount}
              downloadPath={book.vocabularyPath}
              onClickBook={() => {
                if (isStudyable) {
                  onClickBook && onClickBook(book.levelRoundId)
                }
              }}
              onClickDownload={() => {
                onClickDownload && onClickDownload(book.vocabularyPath)
              }}
            />
          )
        })}
        {studyType === 'Study' && videoInfo && videoInfo.ending && (
          <DodoABCMovieCover
            tag="Ending"
            videoPath={videoInfo.ending.videoPath}
            thumbnailImage={videoInfo.ending.thumbnail}
          />
        )}
        {studyType === 'Study' && findNextPick && (
          <DodoABCNextPick
            image={findNextPick.image}
            title={findNextPick.title}
            onClickStart={() => {
              if (findNextPick) {
                onClickBook && onClickBook(findNextPick.levelRoundId)
              }
            }}
          />
        )}
      </div>
    </>
  )
}
