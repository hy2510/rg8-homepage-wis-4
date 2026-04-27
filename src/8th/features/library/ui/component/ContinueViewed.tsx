'use client'

import { Assets } from '@/8th/assets/asset-library'
import { TodoBook } from '@/8th/features/todo/model/todo-book'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import {
  BookListEmptyStateStyle,
  BookListStyle,
  RecentlyViewedStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LevelSectionType } from '../levelSectionData'
import BookItem from './BookItem'
import LevelItem from './LevelSectionLevelItem'
import SeriesItem from './LevelSectionSeriesItem'

/**
 * Recently Viewed 메뉴
 */
export default function ContinueViewed({
  defaultTab = 'level',
  continueSection,
  todos,
  moreTodo,
  onClickBook,
  onChangeTab,
}: {
  defaultTab?: 'level' | 'todo'
  continueSection?: LevelSectionType
  todos?: TodoBook[]
  moreTodo?: boolean
  onClickBook?: (studyId: string) => void
  onChangeTab?: (tab: 'level' | 'todo') => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const [activeTab, setActiveTab] = useState<'level' | 'todo'>(defaultTab)
  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  const onTabChanged = (tab: 'level' | 'todo') => {
    setActiveTab(tab)
    if (onChangeTab) {
      onChangeTab(tab)
    }
  }

  return (
    <RecentlyViewedStyle>
      <BoxStyle display="flex" gap={isPhone ? 5 : 10} alignItems="center">
        {/* <Image
          src={Assets.Icon.Study.recentlyViewed}
          alt="recently-viewed"
          width={28}
          height={28}
        /> */}
        <TextStyle fontSize="large" fontColor="primary">
          {`· ${t('t8th002')}`}
        </TextStyle>
      </BoxStyle>

      <BoxStyle className="section-tabs" display="flex" gap={10}>
        <button
          type="button"
          className={`section-tab ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => onTabChanged('todo')}>
          My To-Do
        </button>
        <button
          type="button"
          className={`section-tab ${activeTab === 'level' ? 'active' : ''}`}
          onClick={() => onTabChanged('level')}>
          My Reading
        </button>
      </BoxStyle>

      {activeTab === 'level' && (
        <ContinueLevelSeries continueSection={continueSection} />
      )}
      {activeTab === 'todo' && !!todos && (
        <ContinueTodoBookList
          todos={todos}
          moreTodo={!!moreTodo}
          onClickBook={onClickBook}
        />
      )}
    </RecentlyViewedStyle>
  )
}

function ContinueLevelSeries({
  continueSection,
}: {
  continueSection?: LevelSectionType
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  if (!continueSection) {
    return (
      <BookListEmptyStateStyle>
        <p>{t('t8th009')}</p>
      </BookListEmptyStateStyle>
    )
  }

  return (
    <BoxStyle
      className={`list ${isPhone ? 'mobile-slider' : ''}`}
      display={isPhone ? 'flex' : 'grid'}
      gridTemplateColumns={isPhone ? undefined : 'repeat(3, 1fr)'}
      gap={10}>
      {continueSection.levels &&
        continueSection.levels.length > 0 &&
        continueSection.levels
          .filter((level) => level.items.length > 0)
          .map((group) => {
            return group.items.map((level) => {
              return (
                <div
                  key={`${level.type}${level.level}-${level.title}`}
                  className={isPhone ? 'slider-item' : ''}>
                  <LevelItem
                    key={`${level.type}${level.level}-${level.title}`}
                    type={level.type}
                    level={level.level}
                    title={level.title}
                    bgColor={level.bgColor}
                    fontColor={level.fontColor}
                    completed={level.completed}
                    href={level.href}
                    imgSrc={level.imgSrc}
                    total={level.total}
                  />
                </div>
              )
            })
          })}
      {continueSection.series &&
        continueSection.series.length > 0 &&
        continueSection.series
          .filter((series) => series.items.length > 0)
          .map((group) => {
            return group.items.map((series) => {
              return (
                <div
                  key={`${series.title}`}
                  className={isPhone ? 'slider-item' : ''}>
                  <SeriesItem
                    key={series.title}
                    level={
                      series.minLevel === series.maxLevel
                        ? series.minLevel
                        : `${series.minLevel}~${series.maxLevel}`
                    }
                    title={series.title}
                    imgSrc={series.imgSrc}
                    bgColor={series.color}
                    href={series.href}
                  />
                </div>
              )
            })
          })}
      {continueSection.todos &&
        continueSection.todos.length > 0 &&
        continueSection.todos
          .filter((level) => level.items.length > 0)
          .map((group) => {
            return group.items.map((level) => {
              return (
                <LevelItem
                  key={`${level.type}${level.level}-${level.title}`}
                  type={level.type}
                  level={level.level}
                  title={level.title}
                  bgColor={level.bgColor}
                  fontColor={level.fontColor}
                  completed={level.completed}
                  href={level.href}
                  imgSrc={level.imgSrc}
                  total={level.total}
                />
              )
            })
          })}
    </BoxStyle>
  )
}

function ContinueTodoBookList({
  todos,
  moreTodo,
  onClickBook,
}: {
  todos: TodoBook[]
  moreTodo: boolean
  onClickBook?: (studyId: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  if (todos.length === 0) {
    return (
      <BookListEmptyStateStyle>
        <p>{t('t8th009')}</p>
      </BookListEmptyStateStyle>
    )
  }

  return (
    <>
      {isPhone && (
        <BoxStyle
          className="list mobile-slider todo-books-slider"
          display="flex"
          gap={10}>
          {todos.map((book) => (
            <div key={book.studyId} className="slider-item">
              {renderBookItem(book, onClickBook)}
            </div>
          ))}
        </BoxStyle>
      )}
      {!isPhone && (
        <BookListStyle>
          {todos.map((book) => renderBookItem(book, onClickBook))}
        </BookListStyle>
      )}
      {moreTodo && (
        <Link href={SITE_PATH.NW82.TODO}>
          <RoundedFullButton
            onClick={undefined}
            fontColor="var(--font-color-primary)">
            <BoxStyle
              display="flex"
              alignItems="center"
              flexDirection="row"
              gap={5}>
              <TextStyle
                fontSize="medium"
                fontWeight="bolder"
                fontFamily="sans">
                {t('t8th333')}
              </TextStyle>
              <Image
                src={Assets.Icon.arrowRightBlack}
                alt="right-arrow"
                width={14}
                height={14}
              />
            </BoxStyle>
          </RoundedFullButton>
        </Link>
      )}
    </>
  )
}

function renderBookItem(
  book: TodoBook,
  onClickBook?: (studyId: string) => void,
) {
  const isInProgressInTodo = book.levelName.startsWith('EB-PK')
    ? !book.deleteYn
    : book.answerCount > 0
  return (
    <BookItem
      key={book.studyId}
      title={book.title}
      passCount={0}
      addYn={!book.deleteYn}
      movieYn={!!book.animationPath}
      point={book.getableRgPoint}
      src={book.surfaceImagePath}
      levelName={book.levelName}
      homeworkYn={book.homeworkYn}
      recommendedAge={book.recommendedAge}
      isCheckable={false}
      isDisabled={false}
      isChecked={false}
      isInProgressInTodo={isInProgressInTodo}
      onClick={() => {
        if (onClickBook) {
          onClickBook(book.studyId)
        }
      }}
    />
  )
}
