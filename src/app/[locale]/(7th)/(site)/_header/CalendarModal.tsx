'use client'

import '@/7th/_ui/common/global-option-calendar/global-option-calendar.scss'
import {
  useFetchAttendCalendar,
  useOnLoadAttendCalendar,
} from '@/7th/_client/store/calendar/attend/hook'
import { useCalendarAttend } from '@/7th/_client/store/calendar/attend/selector'
import {
  useFetchStudyCalendar,
  useOnLoadStudyCalendar,
} from '@/7th/_client/store/calendar/study/hook'
import { useCalendarStudy } from '@/7th/_client/store/calendar/study/selector'
import { useStudentDailyLearning } from '@/7th/_client/store/student/daily-learning/selector'
import { Modal } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import LevelUtils from '@/util/level-utils'
import NumberUtils from '@/util/number-utils'
import { useRouter } from 'next/navigation'
import { ReactNode, useMemo, useState } from 'react'

const STYLE_ID = 'global_option_calendar'

// 캘린더 모달
export function CalendarModal({ onCloseModal }: { onCloseModal?: () => void }) {
  // @Language 'common'
  const { t } = useTranslation()

  const { loading: attendLoading } = useOnLoadAttendCalendar()
  const { loading: studyLoading } = useOnLoadStudyCalendar()

  const loading = attendLoading && studyLoading

  return (
    <Modal
      header
      title={t('t015')}
      onClickDelete={onCloseModal}
      onClickLightbox={onCloseModal}>
      <CalendarUI loading={loading} onCloseModal={onCloseModal} />
    </Modal>
  )
}

const CalendarUI = ({
  loading: propsLoading,
  onCloseModal,
}: {
  loading: boolean
  onCloseModal?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { fetch: attendFetch, loading: attendLoading } =
    useFetchAttendCalendar()
  const { fetch: studyFetch, loading: studyLoading } = useFetchStudyCalendar()

  const loading = propsLoading || attendLoading || studyLoading

  const userSetting = useStudentDailyLearning().payload
  const attendCalendar = useCalendarAttend().payload
  const studyCalendar = useCalendarStudy().payload.calendar
  const beforeSetup = useCalendarStudy().payload.beforeSetup

  const nowDate = new Date()
  const [info, setInfo] = useState<{ year: number; month: number }>({
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
  })

  const router = useRouter()

  const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]
  const monthShorts = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const yearChangeLeft = ({ year, month }: { year: number; month: number }) => {
    const newYear = year - 1
    updateCalendarDate({ year: newYear, month })
  }

  const yearChangeRight = ({
    year,
    month,
  }: {
    year: number
    month: number
  }) => {
    const newYear = year + 1
    updateCalendarDate({ year: newYear, month })
  }

  const monthChangeLeft = ({
    year,
    month,
  }: {
    year: number
    month: number
  }) => {
    const newYear = month - 1 <= 0 ? year - 1 : year
    const newMonth = month - 1 <= 0 ? 12 : month - 1
    updateCalendarDate({ year: newYear, month: newMonth })
  }
  const monthChangeRight = ({
    year,
    month,
  }: {
    year: number
    month: number
  }) => {
    const newYear = month + 1 >= 13 ? year + 1 : year
    const newMonth = month + 1 >= 13 ? 1 : month + 1
    updateCalendarDate({ year: newYear, month: newMonth })
  }

  const updateCalendarDate = (yearMonth: { year: number; month: number }) => {
    studyFetch(yearMonth)
    attendFetch(yearMonth)
    setInfo(yearMonth)
  }

  const onMoveToReview = ({
    year,
    month,
    day,
  }: {
    year: number
    month: number
    day: number
  }) => {
    const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
    router.push(`${SITE_PATH.REVIEW.MAIN}?startDate=${date}&endDate=${date}`)
    onCloseModal && onCloseModal()
  }

  const [isSimpleMode, _isSimpleMode] = useState(false)

  const {
    dayArrays,
    attendDays,
    studyDays,
    monthlyBooks,
    monthlyPoints,
    events,
    dayData,
  } = useMemo(() => {
    const dayArrays: number[] = []
    let attendDays = 0
    let studyDays = 0
    let monthlyPoints = 0.0
    let monthlyBooks = 0
    const events: {
      day: number
      item: {
        type: 'books' | 'change' | 'levelup'
        value: string
        extra?: string
      }[]
    }[] = []
    const dayData: {
      day: number
      point: number
      book: number
      isAttend: boolean
      isSuccess: boolean
      isStudyChanged: boolean
      isEventReadCount: boolean
      isLevelMaster: boolean
    }[] = []

    const monthOffset = info.month - 1
    const date = new Date(info.year, monthOffset, 1)
    const dayOfNum = date.getDay()
    date.setMonth(monthOffset + 1)
    date.setDate(0)
    const lastDay = date.getDate()

    for (let i = 0; i < 7; i++) {
      if (dayOfNum > i) {
        dayArrays.push(-1)
      } else {
        break
      }
    }
    for (let i = 1; i <= lastDay; i++) {
      dayArrays.push(i)
    }

    let isAvailableDate = false
    const calendarSize = attendCalendar.length
    if (calendarSize) {
      const dataDate = DateUtils.createDate(attendCalendar[0].regDate)

      if (
        dataDate.getFullYear() === info.year &&
        dataDate.getMonth() + 1 === info.month &&
        studyCalendar.length
      ) {
        const studyDataDate = DateUtils.createDate(studyCalendar[0].regDate)
        isAvailableDate =
          studyDataDate.getFullYear() === info.year &&
          studyDataDate.getMonth() + 1 === info.month
      }
    }

    if (isAvailableDate) {
      attendDays =
        (attendCalendar && attendCalendar.filter((a) => a.validYn).length) || 0
      studyDays =
        (studyCalendar && studyCalendar.filter((a) => a.successYn).length) || 0

      for (let i = 0; i < calendarSize; i++) {
        const day = i + 1
        const studyBefore = i === 0 ? beforeSetup : studyCalendar[i - 1]
        const attend = attendCalendar[i]
        const study = studyCalendar[i]

        let isStudyChanged = false
        let isEventReadCount = false
        let isLevelMaster = false
        const eventItem: {
          day: number
          item: {
            type: 'books' | 'change' | 'levelup'
            value: string
            extra?: string
          }[]
        } = {
          day: i + 1,
          item: [],
        }
        if (attend.studyCountHundred) {
          isEventReadCount = true
          eventItem.item.push({
            type: 'books',
            value: attend.studyCountHundred.toString(),
          })
        }
        if (attend.levelUpLevel) {
          const levelName =
            LevelUtils.previousLevel(attend.levelUpLevel.toString()) || '-'

          isLevelMaster = true
          eventItem.item.push({
            type: 'levelup',
            value: levelName === 'PK' ? 'Pre K' : levelName,
          })
        }

        let value: string = ''
        let extra: 'book' | 'point' | undefined = undefined
        if (study.settingType !== studyBefore.settingType) {
          if (study.settingType === 'Books') {
            extra = 'book'
            value = study.settingBooks.toString()
          } else {
            extra = 'point'
            value = study.aimPoint.toString()
          }
        } else if (
          study.settingType === 'Books' &&
          studyBefore.settingBooks !== study.settingBooks
        ) {
          extra = 'book'
          value = study.settingBooks.toString()
        } else if (
          study.settingType === 'Points' &&
          studyBefore.aimPoint !== study.aimPoint
        ) {
          extra = 'point'
          value = study.aimPoint.toString()
        }
        if (extra) {
          isStudyChanged = true
          eventItem.item.push({
            type: 'change',
            value,
            extra,
          })
        }
        if (eventItem.item.length > 0) {
          events.push(eventItem)
        }

        monthlyPoints += study.point
        monthlyBooks += study.books
        dayData.push({
          day,
          point: study.point,
          book: study.books,
          isSuccess: study.successYn,
          isAttend: attend.validYn,
          isStudyChanged,
          isEventReadCount,
          isLevelMaster,
        })
      }
    }

    return {
      dayArrays,
      attendDays,
      studyDays,
      monthlyBooks,
      monthlyPoints,
      events,
      dayData,
    }
  }, [info, beforeSetup, attendCalendar, studyCalendar])

  //detail
  const userStudyLearningType = userSetting.settingType
  const userStudyLearningValue =
    userStudyLearningType === 'Points' ? userSetting.point : userSetting.books

  return (
    <>
      {/* <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <Nav>
          <NavItem
            active={isSimpleMode}
            onClick={() => {
              _isSimpleMode(true)
            }}
            width="100%">
            {t('t016')}
          </NavItem>
          <NavItem
            active={!isSimpleMode}
            onClick={() => {
              _isSimpleMode(false)
            }}
            width="100%">
            {t('t017')}
          </NavItem>
        </Nav>
      </div> */}
      <div className={style.calendar_modal}>
        <div className={`${style.cal_header} ${monthNames[info.month - 1]}`}>
          <div className={style.cal_header_container}>
            <div className={style.current_month}>
              <div className={`${style.year_carousel} year_carousel`}>
                {/* <div
                  className={'carousel_left_button'}
                  onClick={() => yearChangeLeft(info)}></div> */}
                <div className={`${style.cal_year} cal_year`}>{info.year}</div>
                {/* <div
                  className={'carousel_right_button'}
                  onClick={() => yearChangeRight(info)}></div> */}
              </div>
              <div className={style.month_carousel}>
                <div
                  className={'carousel_left_button'}
                  onClick={() => monthChangeLeft(info)}></div>
                <div className={`${style.cal_month} cal_month`}></div>
                <div
                  className={'carousel_right_button'}
                  onClick={() => monthChangeRight(info)}></div>
              </div>
            </div>
            <div className={style.monthly_study_status_container}>
              <div className={style.monthly_study_status}>
                {isSimpleMode ? (
                  <CalendarSimpleModeInfo
                    attendDays={attendDays}
                    studyDays={studyDays}
                  />
                ) : (
                  <CalendarDetailModeInfo
                    settingType={userStudyLearningType}
                    settingValue={userStudyLearningValue}
                    studyDays={studyDays}
                  />
                )}
              </div>
              <div className={style.attend_status}>
                <CalendarSimpleModeInfo
                  attendDays={attendDays}
                  studyDays={studyDays}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.cal_body}>
          {isSimpleMode ? (
            <CalendarSimpleModeBody
              yearMonth={info}
              days={dayArrays}
              dayData={loading ? [] : dayData}
            />
          ) : (
            <CalendarDetailModeBody
              yearMonth={info}
              monthlyBooks={monthlyBooks}
              monthlyPoints={monthlyPoints}
              days={dayArrays}
              dayData={loading ? [] : dayData}
              onClickDay={onMoveToReview}
            />
          )}
        </div>
        <CalendarEvent
          month={monthShorts[info.month - 1]}
          events={loading ? [] : events}
        />
      </div>
    </>
  )
}

// 캘린더 테이블 헤더 (요일)
const CalTableHeader = () => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.cal_table_header}>
      <div className={style.col_day}>SUN</div>
      <div className={style.col_day}>MON</div>
      <div className={style.col_day}>TUE</div>
      <div className={style.col_day}>WED</div>
      <div className={style.col_day}>THU</div>
      <div className={style.col_day}>FRI</div>
      <div className={style.col_day}>SAT</div>
    </div>
  )
}

// 캘린더 모달 > 간편보기 헤더정보
const CalendarSimpleModeInfo = ({
  attendDays,
  studyDays,
}: {
  attendDays: number
  studyDays: number
}) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.calendar_simple_mode_info}>
      <div className={style.attend_days}>
        {/* <Image
          alt={''}
          src="/src/images/@calendar-modal/circle_green.svg"
          width="18"
          height="18"
        /> */}
        <span>{t('t018', { num: attendDays })}</span>
      </div>
      {/* <div className={style.achieve_goals}> */}
      {/* <Image
          alt={''}
          src="/src/images/@calendar-modal/circle_blue.svg"
          width="18"
          height="18"
        /> */}
      {/* <span>{t('t019', { num: studyDays })}</span>
      </div> */}
    </div>
  )
}

type CalendarDayData = {
  day: number
  point: number
  book: number
  isAttend: boolean
  isSuccess: boolean
  isStudyChanged: boolean
  isEventReadCount: boolean
  isLevelMaster: boolean
}

// 캘린더 모달 > 간편보기 달력
const CalendarSimpleModeBody = ({
  yearMonth,
  days,
  dayData,
}: {
  yearMonth: { year: number; month: number }
  days: number[]
  dayData: CalendarDayData[]
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <CalTableHeader />
      <div className={style.calendar_simple_mode_body}>
        {days.map((day, i) => {
          const dayItem =
            day > 0 && dayData.length > day - 1 ? dayData[day - 1] : undefined

          const key = `Cal-Simple_${yearMonth.year}_${yearMonth.month}_${day}_${i}_${dayItem?.book || 0}_${dayItem?.point || 0}`
          return (
            <CalendarSimpleDay
              key={key}
              day={day}
              isBlank={day < 0}
              isAttend={dayItem?.isAttend || false}
              isSuccess={dayItem?.isSuccess || false}
            />
          )
        })}
      </div>
    </>
  )
}

const CalendarSimpleDay = ({
  day,
  isBlank,
  isAttend,
  isSuccess,
}: {
  day: number
  isBlank?: boolean
  isAttend?: boolean
  isSuccess?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  let iconClassName = ''
  if (!isBlank) {
    if (isSuccess) {
      iconClassName = `${style.event} ${style.achieved_goals}`
    } else if (isAttend) {
      iconClassName = `${style.event} ${style.attendance}`
    } else {
      iconClassName = `${style.event} ${style.no_attendance}`
    }
  }
  return (
    <div className={style.cal_item}>
      <div className={style.date}>{!isBlank ? day : ''}</div>
      {/* no_attendance: 미출석, attendance: 출석함, achieved_goals: 일일목표달성) */}
      <div className={iconClassName}></div>
    </div>
  )
}

// 캘린더 모달 > 상세보기 헤더정보
const CalendarDetailModeInfo = ({
  settingType,
  settingValue,
  studyDays,
}: {
  settingType: string
  settingValue: number
  studyDays: number
}) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.calendar_detail_mode_info}>
      {/* 일일목표설정이 포인트획득 방식인 경우 */}
      {settingType === 'Points' && (
        <div className={style.calendar_detail_mode_info_container}>
          <div className={style.goal_point_pass}>
            {/* <Image
              alt=""
              src="/src/images/@calendar-modal/point_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>{t('t019', { num: studyDays })}</span>
          </div>
          <div className={style.daily_goal_info}>
            {/* <Image
              src="/src/images/@calendar-modal/flag_check_dark_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>{t('t020', { num: settingValue })}</span>
          </div>
        </div>
      )}
      {/* 일일목표설정이 학습완료(읽은권수) 방식인 경우 */}
      {settingType === 'Books' && (
        <div className={style.calendar_detail_mode_info_container}>
          <div className={style.goal_passed_pass}>
            {/* <Image
              alt=""
              src="/src/images/@calendar-modal/book_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>{t('t019', { num: studyDays })}</span>
          </div>
          <div className={style.daily_goal_info}>
            {/* <Image
              src="/src/images/@calendar-modal/flag_check_dark_blue.svg"
              width="18"
              height="18"
            /> */}
            <span>{t('t021', { num: settingValue })}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// 캘린더 모달 > 상세보기 달력
const CalendarDetailModeBody = ({
  yearMonth,
  days,
  monthlyPoints,
  monthlyBooks,
  dayData,
  onClickDay,
}: {
  yearMonth: { year: number; month: number }
  days: number[]
  monthlyPoints: number
  monthlyBooks: number
  dayData: CalendarDayData[]
  onClickDay?: (date: { year: number; month: number; day: number }) => void
}) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const [tabButtonStatus, _tabButtonStatus] = useState<'point' | 'passed'>(
    'passed',
  )

  return (
    <>
      {/* 탭 버튼 */}
      <div className={style.cal_detail_mode_tabs}>
        <div
          className={`${style.tab_button} ${
            tabButtonStatus === 'passed' && style.active
          }`}
          onClick={() => {
            _tabButtonStatus('passed')
          }}>
          {/* {tabButtonStatus === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_blue.svg"
              width={24}
              height={24}
            />
          )} 
          {tabButtonStatus === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_white.svg"
              width={24}
              height={24}
            />
          )} */}
          <span>{t('t022')}</span>
          {tabButtonStatus === 'passed' && (
            // <span>{t('t023', { num: monthlyBooks })}</span>
            <span>{monthlyBooks}</span>
          )}
        </div>
        <div
          className={`${style.tab_button} ${
            tabButtonStatus === 'point' && style.active
          }`}
          onClick={() => {
            _tabButtonStatus('point')
          }}>
          {/* {tabButtonStatus === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_blue.svg"
              width={24}
              height={24}
            />
          )}
          {tabButtonStatus === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_white.svg"
              width={24}
              height={24}
            />
          )} */}
          <span>{t('t476')}</span>
          {tabButtonStatus === 'point' && (
            <span>{NumberUtils.toRgDecimalPoint(monthlyPoints)}P</span>
          )}
        </div>
      </div>
      {/* 캘린더 */}
      <CalTableHeader />
      <div className={style.cal_detail_mode_body}>
        {days.map((day, i) => {
          const dayItem =
            day > 0 && dayData.length > day - 1 ? dayData[day - 1] : undefined

          const key = `Cal-Detail_${yearMonth.year}_${yearMonth.month}_${day}_${i}_${dayItem?.book || 0}_${dayItem?.point || 0}`
          return (
            <CalendarDetailDay
              key={key}
              type={tabButtonStatus}
              day={day}
              isBlank={day < 0}
              point={dayItem?.point || 0.0}
              book={dayItem?.book || 0}
              isAttend={dayItem?.isAttend || false}
              isSuccess={dayItem?.isSuccess || false}
              eventStudyChange={dayItem?.isStudyChanged || false}
              eventReadCount={dayItem?.isEventReadCount || false}
              eventLevelMaster={dayItem?.isLevelMaster || false}
              onClick={(day) => {
                onClickDay &&
                  onClickDay({
                    ...yearMonth,
                    day,
                  })
              }}
            />
          )
        })}
      </div>
    </>
  )
}

const CalendarDetailDay = ({
  type,
  day,
  point,
  book,
  isBlank,
  isAttend,
  isSuccess,
  eventReadCount,
  eventStudyChange,
  eventLevelMaster,
  onClick,
}: {
  type: 'passed' | 'point'
  day: number
  point: number
  book: number
  isBlank?: boolean
  isAttend?: boolean
  isSuccess?: boolean
  eventReadCount?: boolean
  eventStudyChange?: boolean
  eventLevelMaster?: boolean
  onClick?: (day: number) => void
}) => {
  const style = useStyle(STYLE_ID)

  const isDidStudy = !isBlank && (book > 0 || point > 0)
  const onDayClick = () => {
    if (isDidStudy) {
      onClick && onClick(day)
    }
  }

  if (isBlank) {
    return (
      <div className={style.cal_item}>
        <div className={style.date}></div>
        <div className={style.result}></div>
      </div>
    )
  }
  return (
    <div
      className={`${style.cal_item}${isSuccess ? ` ${style.goal}` : ''} ${isAttend ? style.attend : ''}`}
      style={{ cursor: isDidStudy ? 'pointer' : 'default' }}
      onClick={onDayClick}>
      <div className={style.date}>{day}</div>
      <div className={style.result}>
        <div
          className={`${style.passed}${type === 'passed' && book > 0 ? ` ${style.active}` : ''} ${
            style.goal
          }`}
          style={{ opacity: `${book + point > 0 ? 1 : 0}` }}>
          {/* {type === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_blue.svg"
              width={16}
              height={16}
            />
          )}
          {type === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/book_gray.svg"
              width="16"
              height="16"
            />
          )} */}
          <span>{book}</span>
        </div>
        <div
          className={`${style.earn_point}${type === 'point' && point > 0 ? ` ${style.active}` : ''} ${
            style.goal
          }`}
          style={{ opacity: `${book + point > 0 ? 1 : 0}` }}>
          {/* {type === 'point' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_blue.svg"
              width={16}
              height={16}
            />
          )}
          {type === 'passed' && (
            <Image
              alt={''}
              src="/src/images/@calendar-modal/point_gray.svg"
              width={16}
              height={16}
            />
          )} */}
          <span>
            {NumberUtils.toRgDecimalPoint(point)}
            <span style={{ fontSize: '10px' }}>P</span>
          </span>
        </div>
        <div className={style.event_dots}>
          {eventReadCount && (
            <div className={`${style.dot} ${style.green}`}></div>
          )}
          {eventStudyChange && (
            <div className={`${style.dot} ${style.orange}`}></div>
          )}
          {eventLevelMaster && (
            <div className={`${style.dot} ${style.purple}`}></div>
          )}
        </div>
      </div>
    </div>
  )
}

const CalendarEvent = ({
  month,
  events,
}: {
  month: string
  events: {
    day: number
    item: {
      type: 'books' | 'change' | 'levelup'
      value: string
      extra?: string
    }[]
  }[]
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  const revEvent = events.filter(() => true).reverse()
  return (
    <CalendarEventHistory>
      {revEvent.map((event) => {
        return event.item.map((item, idx) => {
          let text = ''
          switch (item.type) {
            case 'books':
              text = t('t024', { num: item.value })
              break
            case 'levelup':
              text = t('t025', { txt: item.value })
              break
            case 'change':
              if (item.extra === 'book') {
                text = t('t026', { num: item.value })
              } else if (item.extra === 'point') {
                text = t('t027', { num: item.value })
              }
              break
          }
          const isSkipLabel = idx > 0
          return (
            <CalendarEventHistoryItem
              key={`Event_${item.type}_${event.day}`}
              month={month}
              isSkipLabel={isSkipLabel}
              day={event.day}
              type={item.type}>
              {text}
            </CalendarEventHistoryItem>
          )
        })
      })}
    </CalendarEventHistory>
  )
}

// 켈린더 모달 > 날짜별 이벤트 (100권 돌파 등...)
const CalendarEventHistory = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.calendar_event_history}>{children}</div>
}

// 켈린더 모달 > 날짜별 이벤트 아이템
const CalendarEventHistoryItem = ({
  month,
  day,
  isSkipLabel,
  type,
  children,
}: {
  month: string
  day: number
  isSkipLabel?: boolean
  type: 'books' | 'change' | 'levelup'
  children?: ReactNode
}) => {
  const style = useStyle(STYLE_ID)

  const isBookCount = type === 'books'
  const changeGoal = type === 'change'
  const achieveLevelMaster = type === 'levelup'
  return (
    <>
      <div className={style.event_date}>
        <div className={style.month}>{isSkipLabel ? '' : month}</div>
        <div className={style.date}>{isSkipLabel ? '' : day}</div>
        <div
          className={`
          ${style.dot} ${isBookCount && style.green} ${
            changeGoal && style.orange
          } ${achieveLevelMaster && style.purple}
          `}></div>
      </div>
      <div className={style.description}>
        <div
          className={`${style.tag} ${isBookCount && style.green} ${
            changeGoal && style.orange
          } ${achieveLevelMaster && style.purple}`}>
          {children}
        </div>
      </div>
    </>
  )
}
