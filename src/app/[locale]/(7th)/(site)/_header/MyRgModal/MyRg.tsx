'use client'

import { useAchieveLevelMaster } from '@/7th/_client/store/achieve/level-master/selector'
import { useAchieveReadingKingTrophy } from '@/7th/_client/store/achieve/readingking-trophy/selector'
import { useAchieveSuccessiveDailyGoal } from '@/7th/_client/store/achieve/successive-daily-goal/selector'
import { useAchieveSuccessiveStudy } from '@/7th/_client/store/achieve/successive-study/selector'
import { useLibraryFavorite } from '@/7th/_client/store/library/favorites/selector'
import { useLibraryTodo } from '@/7th/_client/store/library/todos/selector'
import { useStudentAvatar } from '@/7th/_client/store/student/avatar/selector'
import { useStudentContinuousStudy } from '@/7th/_client/store/student/continuous-study/selector'
import { useStudentDailyLearning } from '@/7th/_client/store/student/daily-learning/selector'
import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import { useOnLoadLevelTestInfo } from '@/7th/_client/store/student/level-test-info/hook'
import { useLevelTestInfo } from '@/7th/_client/store/student/level-test-info/selector'
import { useStudentReadingUnit } from '@/7th/_client/store/student/reading-unit/selector'
import { useStudentTodayStudy } from '@/7th/_client/store/student/today-study/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { openWindow } from '@/7th/_function/open-window'
import { Button } from '@/7th/_ui/common/common-components'
import { useStyle, useThemeMode } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import { useChannelTalkChatbotController } from '@/external/channel-talk/component/ChannelTalkContext'
import useTranslation from '@/localization/client/useTranslations'
import { VIETNAMESE } from '@/localization/localize-config'
import DateUtils from '@/util/date-utils'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import {
  CONTINUOUS_SETTING,
  DAILY_SUCCESS_MAX_STUDY,
  MyRgMenu,
} from '../MyRgModal'

const STYLE_ID = 'global_option_my_rg'

export default function MyRg({
  onMenuClick,
  onModalClose,
}: {
  onMenuClick?: (menu: MyRgMenu) => void
  onModalClose?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { i18n, t } = useTranslation()
  const language = i18n.language

  const student = useStudentInfo()
  const studyLearning = useStudentDailyLearning().payload
  const studyTodayLearning = useStudentTodayStudy().payload

  const awardGoal = useAchieveSuccessiveDailyGoal().payload
  const awardStudy = useAchieveSuccessiveStudy().payload
  const awardLevelMaster = useAchieveLevelMaster().payload
  const awardReadingKing = useAchieveReadingKingTrophy().payload
  const { isViewModeNewType } = useStudentContinuousStudy()
  useOnLoadLevelTestInfo()

  const todoCount = useLibraryTodo().count
  const favoriteCount = useLibraryFavorite().count

  const studyLevel = studyLearning.settingLevelName
  const studyType = studyLearning.settingType === 'Books' ? 'book' : 'point'
  const studyGoal =
    studyType === 'book' ? studyLearning.books : studyLearning.point
  const studyProgress =
    studyType === 'book' ? studyTodayLearning.books : studyTodayLearning.point

  const { userAvatar } = useStudentAvatar()
  const { userReadingUnit } = useStudentReadingUnit()
  const { isShowStudyEndDay, isChallengeMenu } = useSiteBlueprint()

  let studyEndDate = ''
  if (student.studyEndDate) {
    let endDate: Date | undefined = undefined
    if (
      student.studyEndDate.length === 8 ||
      student.studyEndDate.length === 10
    ) {
      endDate = DateUtils.createDate(student.studyEndDate)
    }
    if (endDate) {
      endDate.setDate(endDate.getDate() - 1)
      if (language === VIETNAMESE) {
        studyEndDate = `${endDate.getDate()}. ${endDate.getMonth() + 1}. ${endDate.getFullYear()}`
      } else {
        studyEndDate = DateUtils.toStringDate(endDate, {
          divide: '.',
          digitfix: false,
        })
      }
    }
  }

  const chatbotController = useChannelTalkChatbotController()

  const onMyRgMenuClickListener = (menu: MyRgMenu) => {
    onMenuClick && onMenuClick(menu)
  }

  return (
    <div className={style.my_rg}>
      <MyRgUseEndDate
        useEndDay={student.studyEndDay}
        useEndDate={studyEndDate}
        isShowEndDate={isShowStudyEndDay}
      />
      <TotalStudyScore
        userGrade={student.gradeName}
        studentName={student.name}
        userAvatar={userAvatar.imageSmall}
        userReadingUnit={userReadingUnit.image}
        totalPassed={student.brCount}
        totalEarnPoints={NumberUtils.toRgDecimalPoint(student.rgPoint)}
        onClick={() => onMyRgMenuClickListener('choose-avatar')}
      />
      <MyRgAssignmentInfo
        onClickTodo={onModalClose}
        onClickFavorite={onModalClose}
        todoAssignNum={todoCount}
        favoriteAssignNum={favoriteCount}
      />
      <MyRgGoalInfo
        currentStudy={studyProgress}
        studyGoal={studyGoal}
        studyType={studyType}
        studyLevel={studyLevel}
        onClickDailyGoalSetting={() => onMyRgMenuClickListener('daily-goal')}
        onClickMyStudyLevel={() => onMyRgMenuClickListener('study-level')}
      />
      <AwardListContainer>
        <AwardListItem
          tag={t('t045')}
          text={t('t038')}
          collectNum={
            awardGoal.filter(
              (item) =>
                item.achievedCount > 0 &&
                item.achievedCount <= DAILY_SUCCESS_MAX_STUDY,
            ).length
          }
          onClick={() => onMyRgMenuClickListener('daily-goal-award')}
        />
        {isViewModeNewType && (
          <AwardListItem
            tag={t('t045')}
            text={t('t039')}
            collectNum={
              awardStudy.filter(
                (item) =>
                  item.straightDayCount > 0 &&
                  item.straightDayCount <=
                    CONTINUOUS_SETTING.CONTINUOUS_MAX_DAY,
              ).length
            }
            onClick={() => onMyRgMenuClickListener('streak-award')}
          />
        )}
        {isChallengeMenu && (
          <AwardListItem
            tag={t('t047')}
            text={t('t048')}
            collectNum={awardReadingKing.length}
            onClick={() => onMyRgMenuClickListener('challenge-award')}
          />
        )}
        <AwardListItem
          tag={t('t049')}
          text={t('t041')}
          collectNum={awardLevelMaster.length}
          onClick={() => onMyRgMenuClickListener('level-master-award')}
        />
      </AwardListContainer>
      <MyRgEtc
        onClickSetStudyMode={() => onMyRgMenuClickListener('study-setting')}
        onClickAccountInfo={onModalClose}
        onClickChatbot={() => {
          chatbotController.showChat()
          onModalClose && onModalClose()
        }}
        onStartLevelTest={() => {
          onMyRgMenuClickListener('study-level-test')
        }}
      />
      <div className={style.log_out}>
        <Button
          color="red"
          shadow
          onClick={() => onMyRgMenuClickListener('logout')}>
          {t('t050')}
        </Button>
      </div>
    </div>
  )
}

// My RG > 남은기간
function MyRgUseEndDate({
  useEndDay,
  useEndDate,
  isShowEndDate = false,
}: {
  useEndDay: number
  useEndDate?: string
  isShowEndDate?: boolean
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.my_rg_use_end_date}>
      {isShowEndDate ? (
        <>
          <span>{t('t051')}</span>
          <span>
            <b>{t('t052', { num: useEndDay })}</b>
            {useEndDate && (
              <span
                style={{
                  color: 'red',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontWeight: '700',
                }}>{`(~${useEndDate})`}</span>
            )}
          </span>
        </>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  )
}

// 나의 프로필 > 학습 총점
function TotalStudyScore({
  userGrade,
  studentName,
  userAvatar,
  userReadingUnit,
  totalPassed,
  totalEarnPoints,
  onClick,
}: {
  userGrade: string
  studentName: string
  userAvatar: string
  userReadingUnit: string
  totalPassed: number
  totalEarnPoints: number
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.total_study_score}>
      <div className={style.student_info}>
        {/* <div className={style.user_grade}>{userGrade}</div> */}
        <div className={style.student_name}>
          <div className={style.txt_l}>{studentName}</div>
        </div>
        <div className={style.current_reading_unit}>
          <Image alt="" src={userReadingUnit} width={100} height={100} />
        </div>
        <div className={style.user_avatar}>
          <Image alt="" src={userAvatar} width={100} height={100} />
        </div>
        <div className={style.edit_button} onClick={onClick}>
          <Image
            alt=""
            src={'/src/images/pencil-icons/pencil_white_2.svg'}
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className={style.total_score_container}>
        <div className={style.col_a}>
          <div className={style.txt_l}>{t('t058')}</div>
          <div className={style.txt_d}>{t('t023', { num: totalPassed })}</div>
        </div>
        <div className={style.col_b}>
          <div className={style.txt_l}>{t('t060')}</div>
          <div className={style.txt_d}>
            {NumberUtils.toRgDecimalPoint(totalEarnPoints)}P
          </div>
        </div>
      </div>
    </div>
  )
}

// My RG > 과제정보
function MyRgAssignmentInfo({
  onClickTodo,
  onClickFavorite,
  todoAssignNum,
  favoriteAssignNum,
}: {
  onClickTodo?: () => void
  onClickFavorite?: () => void
  todoAssignNum: number
  favoriteAssignNum: number
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.my_rg_assignment_info}>
      <div className={style.assignment_info_container}>
        <Link href={SITE_PATH.LIBRARY.TODO} onClick={onClickTodo}>
          <div className={style.to_do}>
            <div className={style.txt_l}>To-Do</div>
            <div className={style.count_num}>{todoAssignNum}</div>
          </div>
        </Link>
        <Link href={SITE_PATH.LIBRARY.FAVORITE} onClick={onClickFavorite}>
          <div className={style.favorite}>
            <div className={style.txt_l}>Favorite</div>
            <div className={style.count_num}>{favoriteAssignNum}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

// My RG > 학습목표
function MyRgGoalInfo({
  currentStudy,
  studyGoal,
  studyType,
  studyLevel,
  onClickDailyGoalSetting,
  onClickMyStudyLevel,
}: {
  currentStudy: number
  studyGoal: number
  studyType: 'point' | 'book'
  studyLevel: string
  onClickDailyGoalSetting?: () => void
  onClickMyStudyLevel?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const progressText =
    studyType === 'book'
      ? t('t053', { num1: currentStudy, num2: studyGoal })
      : t('t054', { num1: currentStudy, num2: studyGoal })
  return (
    <div className={style.my_rg_goal_info}>
      <div className={style.col_a} onClick={onClickDailyGoalSetting}>
        <div className={style.txt_l}>{t('t055')}</div>
        <div className={style.contents}>{progressText}</div>
      </div>
      <div className={style.col_b} onClick={onClickMyStudyLevel}>
        <div className={style.txt_l}>{t('t043')}</div>
        <div className={style.contents}>{studyLevel}</div>
      </div>
    </div>
  )
}

// My RG > 기타
function MyRgEtc({
  onClickSetStudyMode,
  onClickAccountInfo,
  onClickChatbot,
  onStartLevelTest,
}: {
  onClickSetStudyMode?: () => void
  onClickAccountInfo?: () => void
  onClickChatbot?: () => void
  onStartLevelTest?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  // 고개사별 PreK 사용여부 (DodoAbc만: 1, PreK만: 2, 둘다 사용: 3)
  const { studyOpen, isOnStudySetting } = useSiteBlueprint()
  const levelTestInfo = useLevelTestInfo().payload

  const isDodoABC = studyOpen.DodoABC
  const isPreK = studyOpen.PreK
  const mp3Url = {
    dodo: 'https://util.readinggate.com/Library/DodoABCWorkSheetMP3Info',
    pk: 'https://wcfresource.a1edu.com/NewSystem/AppMobile/webview/randing/prek_workbook_mp3/',
  }
  const [viewPreKMp3Menu, setViewPreKMp3Menu] = useState(false)

  return (
    <div className={style.my_rg_etc}>
      <div className={style.etc_item}>
        <Link href={SITE_PATH.ACCOUNT.INFO} onClick={onClickAccountInfo}>
          <Image
            alt=""
            src="/src/images/@my-rg-modal/user_info.svg"
            width={50}
            height={50}
          />
          <div className={style.txt_l}>{t('t056')}</div>
        </Link>
      </div>
      {isOnStudySetting && (
        <div className={style.etc_item} onClick={onClickSetStudyMode}>
          <Image
            alt=""
            src="/src/images/@my-rg-modal/set_study.svg"
            width={50}
            height={50}
          />
          <div className={style.txt_l}>{t('t044')}</div>
        </div>
      )}
      {/* <div className={style.etc_item} onClick={onClickChatbot}>
        <Image
          alt=""
          src="/src/images/@my-rg-modal/chatbot.svg"
          width={50}
          height={50}
        />
        <div className={style.txt_l}>{t('t057')}</div>
      </div> */}
      {levelTestInfo.isAvailableLevelTest && (
        <div className={style.etc_item} onClick={onStartLevelTest}>
          <Image
            alt=""
            src="/src/images/@my-rg-modal/chatbot.svg"
            width={50}
            height={50}
          />
          <div className={style.txt_l}>
            {/* 레벨 테스트 */}
            {t('t102')}
          </div>
        </div>
      )}
      {/* DODO ABC를 사용하고 있는 고객사의 경우 */}
      <div className={style.etc_item}>
        <div
          className={style.mp3_button}
          onClick={() => {
            if (isDodoABC && isPreK) {
              setViewPreKMp3Menu(true)
            } else if (isDodoABC) {
              openWindow(mp3Url.dodo, {
                external: true,
                target: '_blank',
              })
            } else if (isPreK) {
              openWindow(mp3Url.pk, {
                external: true,
                target: '_blank',
              })
            }
          }}>
          <Image
            alt=""
            src="/src/images/@my-rg-modal/mp3.svg"
            width={50}
            height={50}
          />
          <div className={style.txt_l}>Workbook</div>
        </div>
        {viewPreKMp3Menu && (
          <div className={style.menu}>
            <div
              className={style.btn_del}
              onClick={() => {
                setViewPreKMp3Menu(false)
              }}></div>
            <div
              className={style.menu_item}
              onClick={() => {
                openWindow(mp3Url.dodo, {
                  external: true,
                  target: '_blank',
                  feature: 'noopener, noreferrer',
                })
              }}>
              DODO ABC Workbook MP3
            </div>
            <div
              className={style.menu_item}
              onClick={() => {
                openWindow(mp3Url.pk, {
                  external: true,
                  target: '_blank',
                  feature: 'noopener, noreferrer',
                })
              }}>
              PreK Workbook MP3
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 나의 프로필 > 어워드 리스트
function AwardListContainer({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)
  return <div className={style.award_list_container}>{children}</div>
}

// 나의 프로필 > 어워드 아이템
function AwardListItem({
  text,
  tag,
  collectNum,
  onClick,
}: {
  text: string
  tag: string
  collectNum: number
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  const isDarkMode = useThemeMode() === 'dark'
  const iconPath = isDarkMode
    ? '/src/images/arrow-icons/chv_right_white.svg'
    : '/src/images/arrow-icons/chv_right.svg'

  return (
    <div className={style.award_list_item} onClick={onClick}>
      <div className={style.col_a}>
        {/* <span className={style.txt_l}>{tag}</span> */}
        <span className={style.txt_p}>{`${text} (${collectNum})`}</span>
      </div>
      <Image alt="" src={iconPath} width={24} height={24} />
    </div>
  )
}
