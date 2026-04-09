'use client'

import { Assets } from '@/8th/assets/asset-library'
import {
  useLevelPoints,
  useReadingKingTrophy,
} from '@/8th/features/achieve/service/achieve-query'
import ChallengeTrophyCard from '@/8th/features/achieve/ui/component/ChallengeTrophyCard'
import LevelMasterCard from '@/8th/features/achieve/ui/component/LevelMasterCard'
import {
  useExportReport,
  useExportVocabulary,
  useExportWorksheet,
} from '@/8th/features/export/service/export-query'
import PrintVocabularyModal from '@/8th/features/library/ui/modal/PrintVocabularyModal'
import { usePointRank } from '@/8th/features/rank/service/rank-query'
import RankCard from '@/8th/features/rank/ui/component/RankCard'
import { HistoryStudy } from '@/8th/features/review/model/history-study'
import {
  useHistoryBookDetailInfo,
  useHistoryReadingInfinite,
} from '@/8th/features/review/service/history-query'
import ReviewBookItem from '@/8th/features/review/ui/component/ReviewItem'
import { useStudentDailyLearning } from '@/8th/features/student/service/learning-query'
import {
  useStudentAvatarList,
  useStudentEarnReadingUnit,
} from '@/8th/features/student/service/setting-query'
import { useStudent } from '@/8th/features/student/service/student-query'
import StudentInfoCard from '@/8th/features/student/ui/component/StudentInfoCard'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { useIsTabletSmall } from '@/8th/shared/context/ScreenModeContext'
import { VocabularyOption } from '@/8th/shared/hook/useExportPanel'
import useStartStudy from '@/8th/shared/hook/useStartStudy'
import { RecentReviewListStyle } from '@/8th/shared/styled/FeaturesStyled'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function ActivityMain() {
  const { menu, setting } = useCustomerConfiguration()

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useIsTabletSmall('smaller')

  const dateParams = useMemo(() => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 14)
    return {
      startDate: DateUtils.toStringDate(startDate, {
        divide: '',
        digitfix: true,
      }),
      endDate: DateUtils.toStringDate(endDate, { divide: '', digitfix: true }),
    }
  }, [])

  const history = useHistoryReadingInfinite({
    startDate: dateParams.startDate,
    endDate: dateParams.endDate,
    status: 'All',
    page: 1,
  })

  const student = useStudent()
  const avatar = useStudentAvatarList()
  const readingUnit = useStudentEarnReadingUnit()

  const learning = useStudentDailyLearning()
  const levels = useLevelPoints()
  const trophy = useReadingKingTrophy()
  const ranking = usePointRank({ type: 'total' })

  if (
    student.isLoading ||
    avatar.isLoading ||
    readingUnit.isLoading ||
    history.isLoading ||
    learning.isLoading ||
    levels.isLoading ||
    trophy.isLoading ||
    ranking.isLoading
  ) {
    return <></>
  }

  const myAvatar =
    avatar.data?.list.find((item) => item.avatarId === avatar.data?.avatarId)
      ?.imageLarge || ''
  const readingUnitImage =
    readingUnit.data?.list.find(
      (item) => item.readingUnitId === student.data?.student.studyReadingUnitId,
    )?.image || ''

  const reviewBooks: HistoryStudy[] =
    history.data && history.data.pages.length > 0
      ? history.data.pages[0].history.filter((history, i) => i < 3)
      : []

  const levelName = learning.data?.settingLevelName || 'PK'
  const level =
    levels.data &&
    levels.data.list &&
    levels.data.list.find((level) => level.levelName === levelName)
  const earnPoint = level?.myRgPoint || 0
  const maxPoint = level?.requiredRgPoint || 0
  const latestTrophy = trophy.data?.list?.[0]
  const trophyData = latestTrophy
    ? {
        title: latestTrophy.prizeTitle,
        grade: latestTrophy.prizeGrade,
        registDate: latestTrophy.registDate,
      }
    : undefined
  const userRanking = menu.rank.monthly.open
    ? ranking.data?.user?.totalRank || 0
    : -1

  return (
    <>
      <div style={{ order: 1 }}>
        {menu.account.open && (
          <StudentInfoCard
            name={student.data?.student.name || ''}
            loginId={student.data?.student.loginId || ''}
            signUpDate={student.data?.student.registDate.substring(0, 10) || ''}
            avatar={myAvatar}
            readingUnit={readingUnitImage}
            isOpenSetting={menu.account.setting.open}
            isOpenAccountInfo={menu.account.studentInfo.open}
          />
        )}
      </div>
      <div style={{ order: isMobile ? 4 : 2 }}>
        <StudentAchievements
          level={levelName}
          earnPoint={earnPoint}
          maxPoint={maxPoint}
          rank={userRanking}
          trophy={trophyData}
          isOpenLevelChange={menu.myLevelSetting.open}
          isOpenRank={menu.rank.open}
          isOpenTrophy={setting.showReadingking}
        />
      </div>
      {menu.activity.result.open && menu.activity.result.read.open && (
        <>
          <div style={{ order: isMobile ? 2 : 3 }}>
            <RecentReviewList reviewBooks={reviewBooks} />
          </div>
          <div style={{ order: isMobile ? 3 : 4 }}>
            <Link
              href={`${SITE_PATH.NW82.REVIEW}?startDate=${dateParams.startDate}&endDate=${dateParams.endDate}`}>
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
                    {/* All Study Results */}
                    {t('t8th074')}
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
          </div>
        </>
      )}
    </>
  )
}

function StudentAchievements({
  level,
  earnPoint,
  maxPoint,
  rank,
  trophy,
  isOpenLevelChange,
  isOpenRank,
  isOpenTrophy,
}: {
  level: string
  earnPoint: number
  maxPoint: number
  rank: number
  trophy?: {
    title: string
    grade: number
    registDate: string
  }
  isOpenLevelChange: boolean
  isOpenRank: boolean
  isOpenTrophy: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useIsTabletSmall('smaller')

  return (
    <BoxStyle display="flex" flexDirection="column" gap={20}>
      <TextStyle fontSize="large">{t('t8th075')}</TextStyle>
      <BoxStyle
        width={isMobile ? '100%' : 'auto'}
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={isMobile ? 10 : 15}>
        <BoxStyle
          width={isMobile ? '100%' : 'auto'}
          display="flex"
          flexDirection="row"
          gap={isMobile ? 10 : 15}>
          {isOpenLevelChange && (
            <LevelMasterCard
              level={level}
              earnPoints={earnPoint}
              levelMasterPoint={maxPoint}
            />
          )}
          {isOpenRank && <RankCard rank={rank} />}
        </BoxStyle>
        {isOpenTrophy && <ChallengeTrophyCard trophy={trophy} />}
      </BoxStyle>
    </BoxStyle>
  )
}

function RecentReviewList({ reviewBooks }: { reviewBooks: HistoryStudy[] }) {
  // @Language 'common'
  const { t } = useTranslation()

  const student = useStudent()
  const { mutate: exportVocabulary } = useExportVocabulary()
  const { mutate: exportReport } = useExportReport()
  const { mutate: exportWorksheets } = useExportWorksheet()

  const [singleItemVocabularyOption, setSingleItemVocabularyOption] = useState<
    | {
        levelRoundId: string
        studyId: string
        studentHistoryId: string
      }
    | undefined
  >(undefined)
  const [selectedBookInfo, setSelectedBookInfo] = useState<
    | {
        levelRoundId: string
        studyId: string
        studentHistoryId: string
      }
    | undefined
  >(undefined)
  const { data: bookInfo } = useHistoryBookDetailInfo(
    {
      levelRoundId: selectedBookInfo?.levelRoundId || '',
      studyId: selectedBookInfo?.studyId || '',
      studentHistoryId: selectedBookInfo?.studentHistoryId || '',
    },
    {
      enabled: !!selectedBookInfo,
    },
  )
  const { onStartStudy } = useStartStudy('review')

  const onSingleItemVocabulary = (
    levelRoundId: string,
    studentHistoryId: string,
    vocabularyOption?: VocabularyOption,
  ) => {
    exportVocabulary(
      {
        levelRoundIds: [levelRoundId],
        studentHistoryId,
        vocabularyOption: vocabularyOption ?? undefined,
      },
      {
        onSettled: (data, error, variables) => {
          if (!!data && !error) {
            openWindow(data, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
            setSingleItemVocabularyOption(undefined)
          } else if (error) {
            alert(error)
          } else {
            setSingleItemVocabularyOption(undefined)
          }
        },
      },
    )
  }

  const onSingleItemReport = (studyId: string, studentHistoryId: string) => {
    exportReport(
      {
        studyIds: [studyId],
        studentHistoryIds: [studentHistoryId],
      },
      {
        onSettled: (data, error, variables) => {
          if (!!data && !error) {
            openWindow(data, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
          } else if (error) {
            alert(error)
          } else {
          }
        },
      },
    )
  }

  const onSingleItemWorksheets = (levelName: string) => {
    exportWorksheets(
      {
        levelNames: [levelName],
      },
      {
        onSettled: (data, error, variables) => {
          if (!!data && !error) {
            openWindow(data, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
          } else if (error) {
            alert(error)
          } else {
          }
        },
      },
    )
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
    <RecentReviewListStyle>
      <BoxStyle className="header" display="flex">
        {t('t8th077')}
      </BoxStyle>
      {/* 도서가 있을 때 (15일 기준 3권까지 표시) */}
      {reviewBooks && reviewBooks.length > 0 ? (
        <BoxStyle display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={20}>
          {reviewBooks.map((history) => {
            const isBookInfoLoaded =
              bookInfo && bookInfo.studyId === history.studyId
            const expendMenu: {
              text: string
              subText?: string
              onClick?: () => void
            }[] = []

            if (isBookInfoLoaded) {
              expendMenu.push({
                text: t('t8th055'),
                subText: t('t8th056'),
                onClick: () => {
                  if (!bookInfo) {
                    return
                  }
                  if (bookInfo.expiredContentsYn) {
                    alert(t('t8th312'))
                    return
                  }
                  onStartStudy(bookInfo)
                },
              })
              if (!!bookInfo?.vocabularyPath) {
                expendMenu.push({
                  text: t('t8th057'),
                  onClick: () => {
                    setSingleItemVocabularyOption({
                      levelRoundId: history.levelRoundId,
                      studyId: history.studyId,
                      studentHistoryId: history.studentHistoryId,
                    })
                  },
                })
              }
              if (!!bookInfo?.reportPath) {
                expendMenu.push({
                  text: t('t8th058'),
                  onClick: () => {
                    onSingleItemReport(
                      history.studyId,
                      history.studentHistoryId,
                    )
                  },
                })
              }
              if (!!bookInfo?.workSheetPath) {
                expendMenu.push({
                  text: t('t8th059'),
                  onClick: () => {
                    onSingleItemWorksheets(history.levelName)
                  },
                })
              }
            }
            return (
              <ReviewBookItem
                uid={history.studyId}
                key={history.studyId}
                title={history.title}
                levelName={history.levelName}
                src={history.surfaceImagePath}
                studyDate={DateUtils.toRgDateEnglishFormat(
                  history.completeDate,
                  'MD',
                )}
                totalScore={history.average}
                stepScore1={history.scoreStep1}
                stepScore2={history.scoreStep2}
                stepScore3={history.scoreStep3}
                stepScore4={history.scoreStep4}
                stepScore5={history.scoreStep5}
                isPassed={history.average >= 70}
                completedInfo={history.fullEasyName}
                earnPoints={NumberUtils.toRgDecimalPoint(history.rgPoint)}
                expendMenu={expendMenu}
                onExpendMenuClick={(isOpen) => {
                  if (isStudyEnd) {
                    onStudyEndMessage()
                    return
                  }
                  if (isOpen) {
                    setSelectedBookInfo({
                      levelRoundId: history.levelRoundId,
                      studyId: history.studyId,
                      studentHistoryId: history.studentHistoryId,
                    })
                  } else {
                    setSelectedBookInfo(undefined)
                  }
                }}
              />
            )
          })}

          {singleItemVocabularyOption && (
            <PrintVocabularyModal
              onConfirm={(option) => {
                onSingleItemVocabulary(
                  singleItemVocabularyOption.levelRoundId,
                  singleItemVocabularyOption.studentHistoryId,
                  option,
                )
              }}
              onClickClose={() => {
                setSingleItemVocabularyOption(undefined)
              }}
            />
          )}
        </BoxStyle>
      ) : (
        // 도서가 없을 때
        <BoxStyle
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={20}
          minHeight="200px">
          <Image
            src={Assets.Image.emptyResults}
            alt="empty"
            width={120}
            height={120}
          />
          <TextStyle fontFamily="sans" fontSize="small" fontColor="secondary">
            {t('t8th076')}
          </TextStyle>
        </BoxStyle>
      )}
    </RecentReviewListStyle>
  )
}
