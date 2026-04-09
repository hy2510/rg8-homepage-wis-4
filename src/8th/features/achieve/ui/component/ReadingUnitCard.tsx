import { getDodoFriendsStory } from '@/8th/shared/res/dodo-story'
import { ReadingUnitCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import {
  CommonTitleStyle,
  WidgetBoxStyle,
} from '@/8th/shared/styled/SharedStyled'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import ReadingUnitStoryModal from '../modal/ReadingUnitStoryModal'

/**
 * 리딩유닛 카드
 */

export default function ReadingUnitCard({ point }: { point: number }) {
  // @language 'common'
  const { t } = useTranslation()
  const { language } = useLanguagePackContext()

  const [progressValue, setProgressValue] = useState(0)

  const dodofriends = useMemo(() => {
    return getDodoFriendsStory(language)
  }, [language])

  // 전체 캐릭터 중에서 current 스토리 찾기
  const currentStory = useMemo(() => {
    const limitPoint =
      dodofriends.length > 0 ? dodofriends[dodofriends.length - 1].maxPoint : 0

    if (point >= limitPoint) {
      const lastIndex = dodofriends.length - 1
      const lastFriend = dodofriends[lastIndex]
      const lastStory = lastFriend.list[lastFriend.list.length - 1]
      return {
        friend: lastFriend,
        index: lastFriend.list.length - 1,
        minPoint: lastFriend.minPoint,
        maxPoint: lastFriend.maxPoint,
        imagePath: lastStory.imagePath,
      }
    }
    for (const friend of dodofriends) {
      if (point < friend.minPoint) continue // 잠금된 캐릭터는 제외

      for (let i = 0; i < friend.list.length; i++) {
        const story = friend.list[i]
        const minPoint = story.startPoint
        const maxPoint = story.endPoint
        const isCurrent = minPoint <= point && point < maxPoint

        if (isCurrent) {
          const imagePath = story.imagePath
          return { friend, index: i, minPoint, maxPoint, imagePath }
        }
      }
    }
    return null
  }, [dodofriends, point])

  const currentImage = currentStory?.imagePath || ''
  const currentStoryPoint = currentStory?.maxPoint || 0
  const currentStoryBeforePoint = currentStory?.minPoint || 0

  // 상대(현재 캐릭터 기준) 포인트 기준 progress 계산
  useEffect(() => {
    const progressRange = currentStoryPoint - currentStoryBeforePoint
    const currentProgress = Math.max(0, point - currentStoryBeforePoint)
    const progressPercentage =
      progressRange > 0
        ? Math.min(100, (currentProgress / progressRange) * 100)
        : 0
    setProgressValue(progressPercentage)
  }, [point, currentStoryBeforePoint, currentStoryPoint])

  /*
   * 절대(누적 포인트 기준) 포인트 기준 progress 계산
  useEffect(() => {
    setTimeout(() => {
      setProgressValue(Math.min(100, (point / currentStoryPoint) * 100))
    }, 1000)
  }, [point, currentStoryPoint])
  */

  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <WidgetBoxStyle height="168px">
      <ReadingUnitCardStyle>
        <CommonTitleStyle onClick={() => setIsModalOpen(true)}>
          {t('t8th200')}
        </CommonTitleStyle>
        <div className="body">
          <div className="friend-name">
            <div className="text">{currentStory?.friend.name}</div>
            <div className="thumbnail">
              {currentImage && (
                <Image src={currentImage} alt="" width={80} height={80} />
              )}
            </div>
          </div>
          <div className="friend-progress">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${progressValue}%`,
                  transition: 'width 1.5s ease-in-out',
                }}></div>
            </div>
            <div className="progress-text">
              {/* <div className="progress-text-value">
                {NumberUtils.toRgDecimalPoint(point)}
              </div> */}
              <div className="progress-text-point">
                {NumberUtils.toRgDecimalPoint(currentStoryPoint)}P
              </div>
            </div>
          </div>
        </div>
      </ReadingUnitCardStyle>
      {isModalOpen && (
        <ReadingUnitStoryModal onClose={() => setIsModalOpen(false)} />
      )}
    </WidgetBoxStyle>
  )
}
