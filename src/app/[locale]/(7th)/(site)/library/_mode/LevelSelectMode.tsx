'use client'

import { useFetchSetStudentDailyLearningLevel } from '@/7th/_client/store/student/daily-learning/hook'
import { useOnLoadLevelTestInfo } from '@/7th/_client/store/student/level-test-info/hook'
import { useLevelTestInfo } from '@/7th/_client/store/student/level-test-info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { goToLevelTest } from '@/7th/_function/study-start'
import { IntroChooseLevel } from '@/7th/_ui/modules/library-intro-choose-level/intro-choose-level'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import useTranslation from '@/localization/client/useTranslations'

export default function LevelSelectMode({
  onSelectLevel,
}: {
  onSelectLevel?: (level: string) => void
}) {
  const { language } = useLanguagePackContext()

  // @language 'common'
  const { t } = useTranslation()

  const { target } = useSiteBlueprint()
  const { loading: isLevelTestInfoLoading } = useOnLoadLevelTestInfo()
  const { loading: isLevelChangeLoading, fetch: fetchLevelChange } =
    useFetchSetStudentDailyLearningLevel()

  const levelTestInfo = useLevelTestInfo().payload

  const onLevelSelect = (level: string) => {
    if (!isLevelChangeLoading) {
      fetchLevelChange(level, (isSuccess) => {
        if (isSuccess) {
          onSelectLevel && onSelectLevel(level)
        }
      })
    }
  }

  const onStartLevelTest = () => {
    if (levelTestInfo.isAvailableLevelTest) {
      goToLevelTest({ language })
    } else if (target.private) {
      alert(t('t743')) // 레벨테스트는 유료회원만 응시할 수 있습니다.
    } else {
      alert(t('t744')) // 레벨테스트를 진행할 수 없습니다.
    }
  }

  const levelTestUnavailableMessage = levelTestInfo.isAvailableLevelTest
    ? undefined
    : t('t932')

  return (
    <IntroChooseLevel
      levelTestUnavailableMessage={levelTestUnavailableMessage}
      onChooseLevel={onLevelSelect}
      onStartLevelTest={onStartLevelTest}
    />
  )
}
