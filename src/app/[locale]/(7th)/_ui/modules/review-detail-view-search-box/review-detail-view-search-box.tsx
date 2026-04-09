import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

const STYLE_ID = 'review_detail_view_search_box'

// 상세보기 리포트 검색박스
export const ReportSearchBox = ({
  startDate,
  endDate,
  recommendPeriod = [],
  isHideKeyword,
  keyword,
  isSearching = false,
  onChangeStartDate,
  onChangeEndDate,
  onChangeKeyword,
  onClickSearch: onClick,
}: {
  startDate: string
  endDate: string
  recommendPeriod?: number[]
  isHideKeyword: boolean
  keyword: string
  isSearching?: boolean
  onChangeStartDate?: (date: string) => void
  onChangeEndDate?: (date: string) => void
  onChangeKeyword?: (keyword: string) => void
  onClickSearch?: (startDate: string, endDate: string, keyword: string) => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [lKeyword, setlKeyword] = useState(keyword || '')
  const [lStartDate, setlStartDate] = useState(startDate)
  const [lEndDate, setlEndDate] = useState(endDate)
  const [isSelectTextField, setIsSelectTextField] = useState(false)

  const periodDay = useMemo(() => {
    const nowDate = new Date()
    const endDate = new Date(lEndDate)

    const todayCheck = DateUtils.dayDistance(nowDate, endDate) === 0

    const days = todayCheck
      ? DateUtils.dayDistance(new Date(lStartDate), endDate, true)
      : -1
    return days
  }, [lStartDate, lEndDate])

  useEffect(() => {
    setlKeyword(keyword || '')
    setIsSelectTextField(!!keyword)
  }, [keyword])

  useEffect(() => {
    setlStartDate(startDate)
  }, [startDate])

  useEffect(() => {
    setlEndDate(endDate)
  }, [endDate])

  return (
    <div className={style.report_search_box}>
      <div className={style.set_period_options}>
        {recommendPeriod.map((period) => {
          let label = ''
          if (period === 1) {
            label = t('t761', { num: 1 })
          } else {
            label = t('t408', { num: period })
          }
          return (
            <div
              key={`sel_period_${period}`}
              className={`${style.option} ${!isSelectTextField && period === periodDay && !isSearching && style.active}`}
              onClick={() => {
                const endDate = new Date()
                const startDate = new Date()
                startDate.setDate(endDate.getDate() - period + 1)
                const lStartDate = DateUtils.toStringDate(startDate, {
                  divide: '-',
                  digitfix: true,
                })
                const lEndDate = DateUtils.toStringDate(endDate, {
                  divide: '-',
                  digitfix: true,
                })
                setlStartDate(lStartDate)
                setlEndDate(lEndDate)
                setIsSelectTextField(false)
                onClick && onClick(lStartDate, lEndDate, '')
              }}>
              {label}
            </div>
          )
        })}
      </div>
      <div className={style.search_bar}>
        <div className={style.search_type}>
          <div className={style.column1}>
            <div
              className={style.period}
              onClick={() => {
                isSelectTextField ? setIsSelectTextField(false) : null
              }}>
              <div
                className={`${style.start_date} ${isSelectTextField ? style.deactive : ''}`}>
                <input
                  type="date"
                  value={lStartDate}
                  onChange={(e) => {
                    const value = e.target.value
                    setlStartDate(value)
                    onChangeStartDate && onChangeStartDate(value)
                  }}
                />
              </div>
              <div>~</div>
              <div
                className={`${style.end_date} ${isSelectTextField ? style.deactive : ''}`}>
                <input
                  type="date"
                  value={lEndDate}
                  onChange={(e) => {
                    const value = e.target.value
                    setlEndDate(value)
                    onChangeEndDate && onChangeEndDate(value)
                  }}
                />
              </div>
            </div>

            {isHideKeyword ? (
              <></>
            ) : (
              <div
                className={`${style.search_bar} ${isSelectTextField ? style.active : ''}`}
                onClick={() => {
                  isSelectTextField ? null : setIsSelectTextField(true)
                }}>
                <input
                  type="text"
                  placeholder={t('t547')}
                  value={isSelectTextField ? lKeyword : ''}
                  onChange={(e) => {
                    const value = e.target.value
                    setlKeyword(value)
                    onChangeKeyword && onChangeKeyword(value)
                  }}
                  onKeyDown={(e) => {
                    if (lKeyword.trim().length <= 0) {
                      return
                    }
                    if (e.key.toLowerCase() === 'enter') {
                      e.currentTarget?.blur()
                      onClick && onClick('', '', lKeyword)
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            if (!isSearching) {
              if (!isSelectTextField) {
                onClick && onClick(lStartDate, lEndDate, '')
              } else {
                onClick && onClick('', '', lKeyword)
              }
            }
          }}
          className={style.search_button}>
          <Image
            alt=""
            src="/src/images/search-icons/search_white.svg"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  )
}
