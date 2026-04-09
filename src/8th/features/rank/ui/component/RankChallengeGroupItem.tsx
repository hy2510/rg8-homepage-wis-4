import { Assets } from '@/8th/assets/asset-library'
import { DivideLineStyle } from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'

interface RankChallengeGroupItemProps {
  rank: number
  name: string
  book: number
  point: number
  averagePoint: number
  isMe?: boolean
}

/**
 * 영어독서왕 아이템
 */
export default function RankChallengeGroupItem({
  rank,
  name,
  book,
  point,
  averagePoint,
  isMe = false,
}: RankChallengeGroupItemProps) {
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
        <BoxStyle display="flex" alignItems="center" gap={5}>
          <BoxStyle
            width="50px"
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
          <div style={{ width: '0px', height: '50px' }} />
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
                {name}
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
          {isMe && (
            <BoxStyle
              display="flex"
              alignItems="center"
              gap={5}
              padding="0 10px">
              <TextStyle
                fontFamily="sans"
                fontSize="small"
                fontColor="secondary">
                {`${t('t8th251')}, ${t('t8th247')}, ${t('t8th248')}`}
              </TextStyle>
            </BoxStyle>
          )}
          <BoxStyle display="flex" alignItems="center" gap={5} padding="0 10px">
            <TextStyle fontColor="primary" fontFamily="sans">
              {`${averagePoint}P, ${book}, +${point}P`}
            </TextStyle>
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
      {!isMe && <DivideLineStyle borderWidth="1" />}
    </>
  )
}

export function RankChallengeGroupItemHeader() {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <>
      <BoxStyle
        display="flex"
        justifyContent="space-between"
        gap={5}
        backgroundColor={'#EDFAFE'}
        borderRadius={15}
        padding="10px">
        <BoxStyle display="flex" alignItems="center" gap={5}>
          <BoxStyle
            width="50px"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <TextStyle fontSize="small" fontWeight={700}>
              {'#'}
            </TextStyle>
          </BoxStyle>
          <div style={{ width: '0px', height: '50px' }} />
          <BoxStyle
            display="flex"
            flexDirection="column"
            padding="0 0 0 10px"
            maxWidth="200px">
            <TextStyle
              fontSize="medium"
              fontFamily={'round'}
              fontWeight={700}
              fontColor={'lightBlue'}>
              {'-'}
            </TextStyle>
          </BoxStyle>
        </BoxStyle>
        <BoxStyle
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end"
          gap={5}>
          <BoxStyle display="flex" alignItems="center" gap={5} padding="0 10px">
            <TextStyle fontFamily="sans" fontSize="small" fontColor="secondary">
              {`${t('t8th251')}, ${t('t8th247')}, ${t('t8th248')}`}
            </TextStyle>
          </BoxStyle>
          <BoxStyle display="flex" alignItems="center" gap={5} padding="0 10px">
            <TextStyle fontColor="primary" fontFamily="sans">
              {`-, -, -`}
            </TextStyle>
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
    </>
  )
}
