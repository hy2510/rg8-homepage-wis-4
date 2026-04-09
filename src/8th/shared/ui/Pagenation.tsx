'use client'

import {
  PagenationItemStyle,
  PagenationStyle,
} from '@/8th/shared/styled/SharedStyled'

/**
 *
 */
interface PagenationProps {
  maxPage: number
  currentPage: number
  onPageChange?: (page: number) => void
}

const PAGE_SIZE = 5

export default function Pagenation({
  maxPage,
  currentPage,
  onPageChange,
}: PagenationProps) {
  if (currentPage === 0 || currentPage > maxPage) {
    return null
  }

  const pageList: { page: number; isActive: boolean }[] = []
  // currentPage를 기준으로 5개(PAGE_SIZE)씩 페이지 그룹 생성
  const pageGroupStart =
    Math.floor((currentPage - 1) / PAGE_SIZE) * PAGE_SIZE + 1
  const pageGroupEnd = Math.min(pageGroupStart + 4, maxPage)

  for (let i = pageGroupStart; i <= pageGroupEnd; i++) {
    pageList.push({
      page: i,
      isActive: i === currentPage,
    })
  }

  const onPageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    }
  }
  const onNavClick = (direction: 'next' | 'prev') => {
    if (onPageChange) {
      if (direction === 'next') {
        onPageChange(currentPage + 1)
      } else {
        onPageChange(currentPage - 1)
      }
    }
  }

  return (
    <PagenationStyle>
      {currentPage > 1 && (
        <PagenationNavItem direction="prev" onPageClick={onNavClick} />
      )}
      {pageList.map((page) => (
        <PagenationItem
          key={page.page}
          page={page.page}
          isActive={page.isActive}
          onPageClick={onPageClick}
        />
      ))}
      {maxPage > PAGE_SIZE && currentPage < maxPage && (
        <PagenationNavItem direction="next" onPageClick={onNavClick} />
      )}
    </PagenationStyle>
  )
}

function PagenationItem({
  page,
  isActive,
  onPageClick,
}: {
  page: number
  isActive: boolean
  onPageClick?: (page: number) => void
}) {
  return (
    <PagenationItemStyle
      className={isActive ? 'active' : ''}
      onClick={() => onPageClick && onPageClick(page)}>
      {page}
    </PagenationItemStyle>
  )
}

function PagenationNavItem({
  direction,
  onPageClick,
}: {
  direction: 'next' | 'prev'
  onPageClick?: (direction: 'next' | 'prev') => void
}) {
  return (
    <PagenationItemStyle
      onClick={() =>
        onPageClick && onPageClick(direction)
      }>{`${direction === 'next' ? '>' : '<'}`}</PagenationItemStyle>
  )
}
