'use client'

import { Assets } from '@/8th/assets/asset-library'
import { StudentProfileCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import { WidgetBoxStyle } from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'

/**
 * 리딩유닛, 아바타, 이름 나오는 카드
 */

interface StudentProfileCardProps {
  studentName: string
  avatar: string
  level: string
  levelMasterProgress: number
  rank: number
  book: number
  point: number
  todo: number
  favorite: number
  isOpenTodo: boolean
  isOpenFavorite: boolean
  medal?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'titanium'
  onLinkClick?: (linkId: 'activity' | 'todo' | 'favorite') => void
}

export default function StudentProfileCard({
  studentName,
  avatar,
  level,
  levelMasterProgress,
  rank,
  book,
  point,
  todo,
  favorite,
  isOpenTodo = true,
  isOpenFavorite = true,
  medal,
  onLinkClick,
}: StudentProfileCardProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const frameImage = medal ? Assets.HallOfFame.Profile[medal].src : undefined

  return (
    <WidgetBoxStyle height="272px">
      <StudentProfileCardStyle>
        <div
          className="header"
          onClick={() => {
            if (onLinkClick) {
              onLinkClick('activity')
            }
          }}>
          <div className="avatar">
            <div className="wrapper">
              {frameImage && (
                <Image
                  className="frame"
                  src={frameImage}
                  alt=""
                  width={68}
                  height={68}
                />
              )}
              <Image
                className="avatar-image"
                src={avatar}
                alt=""
                width={50}
                height={50}
              />
            </div>
          </div>
          <BoxStyle display="flex" flexDirection="column" gap={3}>
            <BoxStyle display="flex" alignItems="center" gap={5}>
              {/* <div className="rank">#{pointRank}</div> */}
              <div className="name">{studentName}</div>
            </BoxStyle>
            <TextStyle
              fontSize="0.75em"
              fontColor="lightBlue"
              padding="0 0 0 2px">
              Lv. {level} ({Math.min(levelMasterProgress, 100)}%){' '}
              {0 < rank && rank < 1000 ? `/ Rank ${rank}` : ''}
            </TextStyle>
          </BoxStyle>
        </div>
        <div className="body">
          <div className="label">
            <Image
              src={Assets.Icon.Side.booksRead}
              alt=""
              width={28}
              height={28}
            />
            {t('t8th247')}
          </div>
          <div className="value">{book}</div>
          <div className="label">
            <Image
              src={Assets.Icon.Side.earnedPoints}
              alt=""
              width={28}
              height={28}
            />
            {t('t8th248')}
          </div>
          <div className="value">{NumberUtils.toRgDecimalPoint(point)}P</div>
          {isOpenTodo && (
            <>
              <div className="label">
                <Image
                  src={Assets.Icon.Side.toDo}
                  alt=""
                  width={28}
                  height={28}
                />
                {t('t8th268')}
              </div>
              <div
                className="value link"
                onClick={() => {
                  if (onLinkClick) {
                    onLinkClick('todo')
                  }
                }}>
                {todo}
              </div>
            </>
          )}
          {isOpenFavorite && (
            <>
              <div className="label">
                <Image
                  src={Assets.Icon.Side.favorite}
                  alt=""
                  width={28}
                  height={28}
                />
                {t('t8th269')}
              </div>
              <div
                className="value link"
                onClick={() => {
                  if (onLinkClick) {
                    onLinkClick('favorite')
                  }
                }}>
                {favorite}
              </div>
            </>
          )}
        </div>
      </StudentProfileCardStyle>
    </WidgetBoxStyle>
  )
}
