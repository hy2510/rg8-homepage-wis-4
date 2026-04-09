import { Assets } from '@/8th/assets/asset-library'
import { DivideLineStyle } from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'

/**
 * 랭킹 월간 아이템
 */

interface RankMonthlyItemProps {
  rank: number
  avatar: string
  name: string
  book: number
  point: number
  schoolClass?: string
  isMe?: boolean
}

export default function RankMonthlyItem({
  rank,
  avatar,
  name,
  schoolClass,
  book,
  point,
  isMe,
}: RankMonthlyItemProps) {
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
          <Image src={avatar} alt={name} width={50} height={50} />
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
            {schoolClass && (
              <TextStyle
                fontSize="small"
                fontFamily="sans"
                fontWeight={500}
                fontColor="secondary">
                {schoolClass}
              </TextStyle>
            )}
          </BoxStyle>
        </BoxStyle>
        <BoxStyle
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end"
          gap={5}
          width="40%">
          <BoxStyle
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="flex-end"
            gap={5}
            padding="0 10px">
            <TextStyle
              fontColor="primary"
              fontFamily="sans"
              fontSize="medium"
              textAlign="right">
              {`${book}, +${point}P`}
            </TextStyle>
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
      {!isMe && <DivideLineStyle borderWidth="1" />}
    </>
  )
}
