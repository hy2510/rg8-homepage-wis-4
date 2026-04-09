'use client'

import { useOnLoadAchieveLevelBooks } from '@/7th/_client/store/achieve/level-books/hook'
import { useOnLoadAchieveLevelPoint } from '@/7th/_client/store/achieve/level-point/hook'
import { useOnLoadLibraryFavorite } from '@/7th/_client/store/library/favorites/hook'
import { useOnLoadLibraryTodo } from '@/7th/_client/store/library/todos/hook'
import { useOnLoadReadingkingEvent } from '@/7th/_client/store/readingking/event/hook'
import { useOnLoadAttendance } from '@/7th/_client/store/student/attendance/hook'
import { useOnLoadStudentAvatar } from '@/7th/_client/store/student/avatar/hook'
import { useOnLoadStudentContinuousStudy } from '@/7th/_client/store/student/continuous-study/hook'
import { useOnLoadStudentDailyLearning } from '@/7th/_client/store/student/daily-learning/hook'
import { useOnLoadStudentHistory } from '@/7th/_client/store/student/history/hook'
import { useOnLoadStudentInfo } from '@/7th/_client/store/student/info/hook'
import { useOnLoadStudentReadingUnit } from '@/7th/_client/store/student/reading-unit/hook'
import { useOnLoadStudentTodayStudy } from '@/7th/_client/store/student/today-study/hook'

export default function useAccountInfoLoading() {
  const { loading: isDailyLearningLoading, error: dailyLearningError } =
    useOnLoadStudentDailyLearning()
  const { loading: isTodayLearingLoading, error: todayLearingError } =
    useOnLoadStudentTodayStudy()
  const { loading: isStudentLoading, error: studentError } =
    useOnLoadStudentInfo()
  const {
    loading: isStudentHistoryListLoading,
    error: studentHistoryListError,
  } = useOnLoadStudentHistory()
  const { loading: isTodoLoading, error: todoError } = useOnLoadLibraryTodo()
  const { loading: isEventLoading, error: eventError } =
    useOnLoadReadingkingEvent()
  const { loading: isFavoriteLoading, error: favoriteError } =
    useOnLoadLibraryFavorite()
  const { loading: isAvatarLoading, error: avatarError } =
    useOnLoadStudentAvatar()
  const { loading: isLevelPointLoading, error: levelPointError } =
    useOnLoadAchieveLevelPoint()
  const { loading: isLevelBookLoading, error: levelBookError } =
    useOnLoadAchieveLevelBooks()
  const { loading: isContinuousStudyLoading, error: continuousStudyError } =
    useOnLoadStudentContinuousStudy()
  const { loading: isAttendLoading, error: attendError } = useOnLoadAttendance()
  const { loading: isEarnReadingUnitLoading, error: earnReadingUnitError } =
    useOnLoadStudentReadingUnit()

  const isLoading =
    isStudentLoading ||
    isStudentHistoryListLoading ||
    isTodayLearingLoading ||
    isTodoLoading ||
    isDailyLearningLoading ||
    isEventLoading ||
    isFavoriteLoading ||
    isAvatarLoading ||
    isLevelPointLoading ||
    isLevelBookLoading ||
    isContinuousStudyLoading ||
    isAttendLoading ||
    isEarnReadingUnitLoading

  const isError =
    dailyLearningError ||
    todayLearingError ||
    studentError ||
    studentHistoryListError ||
    todoError ||
    eventError ||
    favoriteError ||
    avatarError ||
    levelPointError ||
    levelBookError ||
    continuousStudyError ||
    attendError ||
    earnReadingUnitError

  return {
    isLoading,
    isError,
  }
}
