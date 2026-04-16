import { Assets } from '@/8th/assets/asset-library'
import { DivideLineStyle } from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'

interface RankHallOfFameItemProps {
  rank: number
  medal: 'titanium' | 'platinum' | 'gold' | 'silver' | 'bronze'
  name: string
  book: number
  point: number
  date: string
  isMe?: boolean
}

/**
 * 명예의전당 아이템
 */
export default function RankHallOfFameItem({
  rank,
  medal,
  name,
  book,
  point,
  date,
  isMe,
}: RankHallOfFameItemProps) {
  // @Language 'common'
  const { t } = useTranslation()

  let rankBg: string | undefined = undefined
  if (rank === 1) {
    rankBg = Assets.Icon.Ranking.rank1Bg.src
  } else if (rank === 2) {
    rankBg = Assets.Icon.Ranking.rank2Bg.src
  } else if (rank === 3) {
    rankBg = Assets.Icon.Ranking.rank3Bg.src
  }
  const bgColor = isMe ? '#EDFAFE' : 'transparent'

  let medalImage: string | undefined = undefined
  if (medal == 'titanium') {
    medalImage = '#c2a87e'
  } else if (medal == 'platinum') {
    medalImage = '#50d4bc'
  } else if (medal == 'gold') {
    medalImage = '#f2d622'
  } else if (medal == 'silver') {
    medalImage = '#a8a8a8'
  } else if (medal == 'bronze') {
    medalImage = '#d77235'
  }

  return (
    <>
      <BoxStyle
        display="flex"
        justifyContent="space-between"
        gap={5}
        backgroundColor={bgColor}
        borderRadius={15}
        padding="10px">
        <BoxStyle display="flex" alignItems="center" gap={5} width="60%">
          <BoxStyle
            width="40px"
            display="flex"
            alignItems="center"
            justifyContent="center">
            {rankBg ? (
              <BoxStyle
                width="40px"
                height="48px"
                backgroundImage={`url(${rankBg})`}
                backgroundSize="100%"
                backgroundPosition="center"
              />
            ) : (
              <TextStyle fontSize="small" fontWeight={700}>
                {0 < rank && rank < 1000 ? '#' + rank : '#'}
              </TextStyle>
            )}
          </BoxStyle>

          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              fontWeight: '700',
              color: 'var(--font-color-primary)',
            }}>
            {/* {medal.toUpperCase()} */}
            <Image
              src={Assets.HallOfFame.Badge[medal].src}
              alt={medal}
              width={50}
              height={50}
            />
          </div>

          <BoxStyle
            display="flex"
            flexDirection="column"
            padding="0 0 0 10px"
            maxWidth="200px">
            {isMe ? (
              <TextStyle
                fontSize="medium"
                fontFamily={'round'}
                fontWeight={700}
                fontColor={'lightBlue'}>
                {'ME'}
              </TextStyle>
            ) : (
              <TextStyle
                fontSize="medium"
                fontFamily={'sans'}
                fontWeight={700}
                fontColor={'primary'}>
                {name}
              </TextStyle>
            )}
          </BoxStyle>
        </BoxStyle>
        <BoxStyle
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end"
          gap={5}>
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="center"
            gap={5}
            padding="0 10px">
            <TextStyle
              fontColor="primary"
              fontFamily="sans"
              fontSize="small"
              textAlign="right">
              {`Reads · ${book}`}
            </TextStyle>
            <TextStyle
              fontColor="primary"
              fontFamily="sans"
              fontSize="small"
              textAlign="right">
              {`Points · ${point}P`}
            </TextStyle>
            <TextStyle
              fontColor="primary"
              fontFamily="sans"
              fontSize="small"
              textAlign="right">
              {`${date}`}
            </TextStyle>
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
      {!isMe && <DivideLineStyle borderWidth="1" />}
    </>
  )
}
