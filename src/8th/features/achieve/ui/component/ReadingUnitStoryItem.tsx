'use client'

import { Assets } from '@/8th/assets/asset-library'
import {
  CurrentReadingUnitImageStyle,
  EarnedReadingUnitImageStyle,
  NotCompletedReadingUnitImageStyle,
  ReadingUnitPrologueStyle,
  ReadingUnitStoryItemStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'

/**
 * 리딩유닛 스토리
 */

interface ReadingUnitStoryItemProps {
  type: 'prologue' | 'earned' | 'current' | 'notCompleted'
  imgSrc: string
  imgAniSrc: string
  earnedTitle: string
  earnedMessage: string
  currentPoint: number
  minPoint: number
  maxPoint: number
  isOpen: boolean
  onClick?: () => void
}

export default function ReadingUnitStoryItem({
  type,
  imgSrc,
  imgAniSrc,
  earnedTitle,
  earnedMessage,
  currentPoint,
  minPoint,
  maxPoint,
  isOpen,
  onClick,
}: ReadingUnitStoryItemProps) {
  return (
    <ReadingUnitStoryItemStyle>
      {type === 'earned' && (
        <ReadingUnitStoryEarnedItem
          imgSrc={imgSrc}
          imgAniSrc={imgAniSrc}
          earnedTitle={earnedTitle}
          earnedMessage={earnedMessage}
          isOpen={isOpen}
          onClick={onClick}
        />
      )}
      {type === 'current' && (
        <ReadingUnitStoryCurrentItem
          imgSrc={imgSrc}
          currentPoint={currentPoint}
          minPoint={minPoint}
          maxPoint={maxPoint}
        />
      )}
      {type === 'notCompleted' && (
        <ReadingUnitStoryLockedItem imgSrc={imgSrc} />
      )}
    </ReadingUnitStoryItemStyle>
  )
}

// 진행중인 리딩유닛의 프롤로그
export function ReadingUnitStoryPrologue({
  readingUnitName,
  readingUnitPrologueText,
}: {
  readingUnitName: string
  readingUnitPrologueText: string
}) {
  return (
    <ReadingUnitPrologueStyle>
      <div className="reading-unit-name">··· {readingUnitName} ···</div>
      <div className="reading-unit-prologue-container">
        <div className="reading-unit-prologue-text">
          {readingUnitPrologueText}
        </div>
      </div>
    </ReadingUnitPrologueStyle>
  )
}

// 획득한 리딩유닛 이미지
function ReadingUnitStoryEarnedItem({
  imgSrc,
  imgAniSrc,
  earnedTitle,
  earnedMessage,
  isOpen,
  onClick,
}: {
  imgSrc: string
  imgAniSrc: string
  earnedTitle: string
  earnedMessage: string
  isOpen: boolean
  onClick?: () => void
}) {
  return (
    <EarnedReadingUnitImageStyle onClick={onClick}>
      <Image
        src={isOpen ? imgAniSrc : imgSrc}
        alt=""
        width={150}
        height={150}
        className={`earned-reading-unit-image ${isOpen ? 'active' : ''}`}
      />

      {isOpen ? (
        <div className="earned-reading-unit-text-container">
          <div className="title">{earnedTitle}</div>
          <div className="message">{earnedMessage}</div>
        </div>
      ) : (
        <div className="play-icon-container">
          <Image
            src={Assets.Icon.playRed}
            alt=""
            width={30}
            height={30}
            className="play-icon"
          />
        </div>
      )}
    </EarnedReadingUnitImageStyle>
  )
}

// 진행중인 리딩유닛 이미지
function ReadingUnitStoryCurrentItem({
  imgSrc,
  currentPoint,
  minPoint,
  maxPoint,
}: {
  imgSrc: string
  currentPoint: number
  minPoint: number
  maxPoint: number
}) {
  // 상대(현재 캐릭터 기준) 포인트 기준 progress 계산
  const progressRange = maxPoint - minPoint
  const currentProgress = Math.max(0, currentPoint - minPoint)
  const progressPercentage =
    progressRange > 0
      ? Math.min(100, (currentProgress / progressRange) * 100)
      : 0
  /*
   * 절대(누적 포인트 기준) 포인트 기준 progress 계산
  const progressPercentage = Math.min(100, (currentPoint / maxPoint) * 100)
  */
  return (
    <CurrentReadingUnitImageStyle>
      <div className="current-reading-unit-image-container heartbeat">
        <div className="current-reading-unit-image-overlay" />
        <Image
          src={imgSrc}
          alt=""
          width={150}
          height={150}
          className="current-reading-unit-image"
        />
      </div>
      <div className="progress">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${progressPercentage}%`,
            }}></div>
        </div>
      </div>
      {/* <div className="current-reading-unit-point">
        <div className="user-point">{Math.floor(currentProgress)}</div>
        <div>/</div>
        <div>{Math.floor(progressRange)}P</div>
      </div> */}
      <div className="current-reading-unit-point">
        <div className="user-point">{currentPoint}</div>
        <div>/</div>
        <div>{maxPoint}P</div>
      </div>
    </CurrentReadingUnitImageStyle>
  )
}

// 미진행 리딩유닛 이미지
function ReadingUnitStoryLockedItem({ imgSrc }: { imgSrc: string }) {
  return (
    <NotCompletedReadingUnitImageStyle>
      <div className="not-completed-reading-unit-image-container">
        <div className="not-completed-reading-unit-image-overlay" />
        <Image
          src={imgSrc}
          alt=""
          width={150}
          height={150}
          className="not-completed-reading-unit-image"
        />
      </div>
    </NotCompletedReadingUnitImageStyle>
  )
}
