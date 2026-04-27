import { Assets } from '@/8th/assets/asset-library'
import {
  useIsPhone,
  useIsTabletLarge,
} from '@/8th/shared/context/ScreenModeContext'
import { DailyRGBookItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import { ResourceDownloadButtonStyle } from '@/8th/shared/styled/SharedStyled'
import { StartButton } from '@/8th/shared/ui/Buttons'
import DropdownMenu from '@/8th/shared/ui/Dropdowns'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'

/**
 * Book Single Item
 */

interface DailyRGBookItemProps {
  ref?: React.RefObject<HTMLDivElement | null>
  no: number
  title: string
  imgUrl: string
  passCount: number
  point: number
  color: string
  isCurrent?: boolean
  isPreK?: boolean
  preKCharacter?: string
  isMovieAvailable?: boolean
  expendMenu?: {
    text: string
    subText?: string
    onClick?: () => void
  }[]
  onExpendMenuClick?: (isOpen: boolean) => void
  onStart?: () => void
  onImageLoaded?: (isSuccess: boolean) => void
  onContentClick?: () => void
}

export default function DailyRGBookItem({
  ref,
  no,
  title,
  imgUrl,
  passCount,
  point,
  color,
  isCurrent,
  isPreK,
  preKCharacter,
  isMovieAvailable,
  expendMenu,
  onExpendMenuClick,
  onStart,
  onImageLoaded,
  onContentClick,
}: DailyRGBookItemProps) {
  const isPhone = useIsPhone()

  const isCompleted = point <= 0
  let pointText = `${NumberUtils.toDecimalPoint(point)}P`
  if (isCompleted) {
    pointText = 'Good Job 👍'
  }

  const onImageLoadEvent = onImageLoaded
    ? () => {
        onImageLoaded(true)
      }
    : undefined
  const onImageErrorEvent = onImageLoaded
    ? () => {
        onImageLoaded(false)
      }
    : undefined

  return (
    <DailyRGBookItemStyle
      ref={ref}
      className={isCurrent ? 'current-book' : ''}
      isPreK={isPreK}
      isCurrent={isCurrent}
      isCompleted={passCount > 0}
      color={color}>
      <div
        className={`book-container ${
          isPreK ? 'mobile-prek-container' : 'mobile-book-container'
        }`}>
        {passCount === 0 && <div className="book-number">{no}</div>}
        {passCount === 1 && <div className="completed-mark" />}
        {passCount >= 2 && <div className="completed-mark-twin" />}
        <div className={isPreK ? 'prek-thumbnail' : 'book-cover'}>
          <div className="image-wrapper" onClick={onContentClick}>
            <Image
              src={imgUrl}
              alt="thumbnail"
              className="image"
              width={125}
              height={180}
              onLoad={onImageLoadEvent}
              onError={onImageErrorEvent}
            />
            {preKCharacter && (
              <Image
                src={getPreKCharacterBadgeAsset(preKCharacter)}
                className={'character'}
                alt={preKCharacter}
                width={42}
                height={42}
              />
            )}
            {isMovieAvailable && (
              <Image
                src={Assets.Icon.playRed}
                className={'movie-icon'}
                alt={'movie-icon'}
                width={42}
                height={42}
              />
            )}
          </div>
        </div>
        <div className="title-container">
          <div className="title-box">
            <div className="title" onClick={onContentClick}>
              {title}
            </div>
            {/* <span className="dot">•</span> */}
            <div className={`point ${isCompleted ? 'good-job' : ''}`}>
              {pointText}
            </div>
          </div>
          <div>
            {isPhone ? (
              <>
                {/*<ResourceDownloadButton
                isMobile
                expendMenu={expendMenu}
                onExpendMenuClick={onExpendMenuClick}
              /> */}
              </>
            ) : (
              <>
                {isCurrent && (
                  <StartButton onClick={onStart} className="animated" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isPhone ? (
        <div style={{ width: '100%' }}>
          {isCurrent && (
            <StartButton
              onClick={onStart}
              isMobile
              className="mobile-animated mobile-activated"
            />
          )}
        </div>
      ) : (
        <>
          {/* <div>
          <ResourceDownloadButton
            expendMenu={expendMenu}
            onExpendMenuClick={onExpendMenuClick}
          />
        </div> */}
        </>
      )}
    </DailyRGBookItemStyle>
  )
}

function ResourceDownloadButton({
  isMobile,
  expendMenu,
  onExpendMenuClick,
}: {
  isMobile?: boolean
  expendMenu?: {
    text: string
    subText?: string
    onClick?: () => void
  }[]
  onExpendMenuClick?: (isOpen: boolean) => void
}) {
  const isGnbBottomTablet = useIsTabletLarge('smaller')

  return (
    <ResourceDownloadButtonStyle isMobile={isMobile}>
      <button
        className="download-button-trigger"
        onClick={() => {
          if (onExpendMenuClick) {
            onExpendMenuClick(true)
          }
        }}
        aria-label="Download options">
        <Image
          src={Assets.Icon.moreVerticalGray}
          alt="download"
          width={24}
          height={24}
        />
      </button>
      {expendMenu && expendMenu.length > 0 && (
        <DropdownMenu
          items={expendMenu}
          position={isGnbBottomTablet ? 'leftCenter' : 'rightCenter'}
          isOpen={true}
          onClose={() => {
            if (onExpendMenuClick) {
              onExpendMenuClick(false)
            }
          }}
        />
      )}
    </ResourceDownloadButtonStyle>
  )
}

function getPreKCharacterBadgeAsset(character: string) {
  const badge =
    Assets.DailyRG.Badge[character as keyof typeof Assets.DailyRG.Badge]
  return badge
}
