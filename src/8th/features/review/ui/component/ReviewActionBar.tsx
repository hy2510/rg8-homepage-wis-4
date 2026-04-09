import { Assets } from '@/8th/assets/asset-library'
import { ActionBarContainerStyle } from '@/8th/shared/styled/SharedStyled'
import ActionBar, {
  ActionBarDropdown,
  ActionBarDropdownProps,
} from '@/8th/shared/ui/ActionBar'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

export type { ActionBarDropdownItem } from '@/8th/shared/ui/ActionBar'

type SearchType = 'period' | 'title'
type DateSelectRange = 1 | 7 | 15 | 30 | 0
const DATE_RANGE_LIST = [1, 7, 15, 30]

interface ReviewActionBarProps {
  title?: string
  startDate?: string
  endDate?: string
  keyword?: string
  searchOptionOpen?: boolean
  disableKeyword?: boolean
  onChangeDate?: (startDate: string, endDate: string) => void
  onChangeKeyword?: (keyword: string) => void
  dropdowns?: ActionBarDropdownProps[]
  exportPanel?: {
    isOpen: boolean
    title: string
    count?: number
    isEdit?: boolean
    onCancel?: () => void
    onConfirm?: () => void
  }
}

export function ReviewActionBar({
  title,
  startDate,
  endDate,
  keyword,
  searchOptionOpen,
  disableKeyword,
  onChangeDate,
  onChangeKeyword,
  dropdowns,
  exportPanel,
}: ReviewActionBarProps) {
  useEffect(() => {
    setIsPeriodSearchOpen(searchOptionOpen)
  }, [searchOptionOpen])

  const [isPeriodSearchOpen, setIsPeriodSearchOpen] = useState(searchOptionOpen)

  const onSearchAction = ({
    type: searchType,
    startDate,
    endDate,
    keyword,
  }: {
    type: SearchType
    startDate?: string
    endDate?: string
    keyword?: string
  }) => {
    if (searchType === 'period') {
      if (onChangeDate) {
        onChangeDate(startDate || '', endDate || '')
      }
    } else if (searchType === 'title') {
      if (onChangeKeyword) {
        onChangeKeyword(keyword || '')
      }
    }
  }

  return (
    <ActionBar
      body={
        <>
          <BoxStyle
            display="flex"
            alignItems="center"
            gap={20}
            padding="3px 0 3px 0">
            {dropdowns?.map((dropdown, i) => (
              <ActionBarDropdown
                key={dropdown.title}
                title={dropdown.title}
                position={i > 1 ? 'right' : 'left'}
                items={dropdown.items}
                isTitleBlack={dropdown.isTitleBlack}
                isActiveMakerVisible={dropdown.isActiveMakerVisible}
                onItemClick={dropdown.onItemClick}
              />
            ))}
          </BoxStyle>
          <div className="mobile-divider" />
          <BoxStyle
            display="flex"
            alignItems="center"
            gap={5}
            cursor="pointer"
            onClick={() => setIsPeriodSearchOpen(!isPeriodSearchOpen)}>
            <div className="period-search-text">
              Period · <span className="value">{title}</span>
            </div>
            <Image
              src={Assets.Icon.chevronRightGray}
              alt="arrow-down"
              width={18}
              height={18}
              style={{
                transform: isPeriodSearchOpen
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.1s ease-in-out',
              }}
            />
          </BoxStyle>
        </>
      }
      footer={
        isPeriodSearchOpen && (
          <ActionBarBottomPeriodSearch
            initialStartDate={startDate}
            initialEndDate={endDate}
            initialKeyword={keyword}
            disableKeyword={disableKeyword}
            onSearchAction={onSearchAction}
          />
        )
      }
      exportPanel={exportPanel}
    />
  )
}

function ActionBarBottomPeriodSearch({
  initialStartDate,
  initialEndDate,
  initialKeyword,
  disableKeyword,
  onSearchAction,
}: {
  initialStartDate?: string
  initialEndDate?: string
  initialKeyword?: string
  disableKeyword?: boolean
  onSearchAction?: (data: {
    type: SearchType
    startDate?: string
    endDate?: string
    keyword?: string
  }) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const initialValue = useMemo(() => {
    const tmpDate = new Date()
    tmpDate.setDate(tmpDate.getDate() - 14)

    const startDate = DateUtils.toStringDate(
      initialStartDate ? DateUtils.createDate(initialStartDate) : tmpDate,
    )
    const endDate = DateUtils.toStringDate(
      initialEndDate ? DateUtils.createDate(initialEndDate) : new Date(),
    )
    const keyword = initialKeyword || ''

    const dayDistance = DateUtils.dayDistance(
      DateUtils.createDate(startDate),
      DateUtils.createDate(endDate),
      true,
    )
    let period: DateSelectRange = 0
    switch (dayDistance) {
      case 1:
        period = 1
        break
      case 7:
        period = 7
        break
      case 15:
        period = 15
        break
      case 30:
        period = 30
        break
    }
    return {
      startDate,
      endDate,
      keyword,
      period,
    }
  }, [initialStartDate, initialEndDate, initialKeyword])

  const [activeTab, setActiveTab] = useState<SearchType>(
    initialKeyword ? 'title' : 'period',
  )
  const [searchKeyword, setSearchKeyword] = useState<string>(
    initialValue.keyword,
  )
  const [startDate, setStartDate] = useState<string>(initialValue.startDate)
  const [endDate, setEndDate] = useState<string>(initialValue.endDate)
  const [selectedPeriod, setSelectedPeriod] = useState<DateSelectRange>(
    initialValue.period,
  )

  const inputKeywordRef = useRef<HTMLInputElement>(null)

  const handleTabClick = (tab: SearchType) => {
    if (tab === 'title') {
      setStartDate(initialValue.startDate)
      setEndDate(initialValue.endDate)
      setSelectedPeriod(initialValue.period)
    } else {
      setSearchKeyword(initialValue.keyword)
    }
    setActiveTab(tab)
  }

  const onPeriodClick = (period: number) => {
    if (period !== 1 && period !== 7 && period !== 15 && period !== 30) {
      setSelectedPeriod(0)
      return
    }

    const endDate = new Date()
    const startDate = new Date()
    switch (period) {
      case 1:
        setSelectedPeriod(period)
        break
      case 7:
        startDate.setDate(endDate.getDate() - 6)
        setSelectedPeriod(period)
        break
      case 15:
        startDate.setDate(endDate.getDate() - 14)
        setSelectedPeriod(period)
        break
      case 30:
        startDate.setDate(endDate.getDate() - 29)
        setSelectedPeriod(period)
        break
    }
    setStartDate(DateUtils.toStringDate(startDate))
    setEndDate(DateUtils.toStringDate(endDate))
    if (onSearchAction) {
      onSearchAction({
        type: 'period',
        startDate: DateUtils.toStringDate(startDate),
        endDate: DateUtils.toStringDate(endDate),
      })
    }
  }

  const onStartDateChange = (date: string) => {
    const resultDate = computeDate({
      inputStartDate: date,
      inputEndDate: endDate,
    })
    setStartDate(resultDate.startDate)
    setEndDate(resultDate.endDate)
    setSelectedPeriod(resultDate.period)
  }

  const onEndDateChange = (date: string) => {
    const resultDate = computeDate({
      inputStartDate: startDate,
      inputEndDate: date,
    })
    setStartDate(resultDate.startDate)
    setEndDate(resultDate.endDate)
    setSelectedPeriod(resultDate.period)
  }

  const onSearch = () => {
    if (activeTab === 'title' && !searchKeyword) {
      return
    }
    if (onSearchAction) {
      if (inputKeywordRef.current) {
        inputKeywordRef.current.blur()
      }
      onSearchAction({
        type: activeTab,
        startDate: startDate,
        endDate: endDate,
        keyword: searchKeyword || undefined,
      })
    }
  }

  return (
    <ActionBarContainerStyle isBottom isPeriodSearch>
      <BoxStyle display="flex" flexDirection="column" gap={10}>
        {!disableKeyword && (
          <>
            <div className="tab-button-container">
              <div
                className={`tab-button ${activeTab === 'period' ? 'active' : ''}`}
                onClick={() => handleTabClick('period')}>
                {t('t8th062')}
              </div>
              <div
                className={`tab-button ${activeTab === 'title' ? 'active' : ''}`}
                onClick={() => handleTabClick('title')}>
                {t('t8th063')}
              </div>
            </div>
          </>
        )}

        {/* 기간으로 검색 - 자동 날짜 선택 */}
        {activeTab === 'period' && (
          <BoxStyle display="flex" gap={20} padding="8px">
            {DATE_RANGE_LIST.map((item: number) => {
              let label = `${t('t8th064', { num: item })}`
              if (item === 1) {
                label = t('t8th065')
              }
              return (
                <div
                  key={item}
                  onClick={() => onPeriodClick(item)}
                  style={{ cursor: 'pointer' }}>
                  <TextStyle
                    fontSize="small"
                    fontWeight="bold"
                    fontColor={
                      selectedPeriod !== 0 && selectedPeriod === item
                        ? 'primary'
                        : 'secondary'
                    }
                    fontFamily="sans">
                    {label}
                  </TextStyle>
                </div>
              )
            })}
          </BoxStyle>
        )}
        {/* 기간으로 검색 - 날짜 직접 입력 */}
        <BoxStyle display="flex" alignItems="center" gap={10} width="100%">
          {activeTab === 'period' && (
            <BoxStyle display="flex" alignItems="center" gap={5} width="100%">
              <BoxStyle
                display="flex"
                alignItems="center"
                gap={10}
                width="100%">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSearch()
                    }
                  }}
                />
              </BoxStyle>
              <TextStyle fontSize="medium">~</TextStyle>
              <BoxStyle
                display="flex"
                alignItems="center"
                gap={10}
                width="100%">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSearch()
                    }
                  }}
                />
              </BoxStyle>
            </BoxStyle>
          )}
          {/* 타이틀로 검색 */}
          {activeTab === 'title' && (
            <BoxStyle display="flex" alignItems="center" gap={10} width="100%">
              <input
                ref={inputKeywordRef}
                className="title-search"
                type="text"
                placeholder={t('t8th066')}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch()
                  }
                }}
              />
            </BoxStyle>
          )}
          {/* 검색 버튼 */}
          <BoxStyle
            display="flex"
            alignItems="center"
            gap={10}
            cursor="pointer"
            onClick={onSearch}>
            <Image
              src={Assets.Icon.searchBlack}
              alt="search"
              width={20}
              height={20}
            />
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
    </ActionBarContainerStyle>
  )
}

function computeDate({
  inputStartDate,
  inputEndDate,
}: {
  inputStartDate: string
  inputEndDate: string
}): {
  startDate: string
  endDate: string
  period: DateSelectRange
  distance: number
} {
  const today = new Date()
  const inStartDate = DateUtils.createDate(inputStartDate)
  const inEndDate = DateUtils.createDate(inputEndDate)

  const isSwap = DateUtils.dayDistance(inStartDate, inEndDate) < 0
  const startDate = isSwap ? inEndDate : inStartDate
  const endDate = isSwap ? inStartDate : inEndDate

  const isEndDateToday = DateUtils.dayDistance(endDate, today) === 0

  const dayDistance = DateUtils.dayDistance(startDate, endDate, true)
  let period: DateSelectRange = 0
  if (
    isEndDateToday &&
    (dayDistance === 1 ||
      dayDistance === 7 ||
      dayDistance === 15 ||
      dayDistance === 30)
  ) {
    period = dayDistance
  }

  return {
    startDate: DateUtils.toStringDate(startDate),
    endDate: DateUtils.toStringDate(endDate),
    period: period,
    distance: dayDistance,
  }
}
