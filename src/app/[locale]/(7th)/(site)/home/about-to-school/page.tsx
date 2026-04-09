'use client'

import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'

const STYLE_ID = 'page_about_to_school'

export default function Page() {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <main className={`container compact ${style.about_to_school}`}>
      <div className={style.contents_box}>
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
      </div>
    </main>
  )
}

const TitleBox = ({
  txt1,
  txt2,
  txt1Color,
  txt2Color,
}: {
  txt1: string
  txt2: string
  txt1Color?: string
  txt2Color?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.title_box}>
        <div className={style.txt_1} style={{ color: txt1Color }}>
          {txt1}
        </div>
        <div className={style.txt_2} style={{ color: txt2Color }}>
          {txt2}
        </div>
      </div>
    </>
  )
}

const CardTitle = ({ txt1, txt2 }: { txt1: string; txt2: string }) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.card_title}>
        <div
          className={style.txt_1}
          dangerouslySetInnerHTML={{ __html: txt1 }}></div>
        <div
          className={style.txt_2}
          dangerouslySetInnerHTML={{ __html: txt2 }}></div>
      </div>
    </>
  )
}

const SlideContainer = ({
  children,
  theme,
  slideCardData,
  fixCardContainerSize,
}: {
  children?: any
  theme?: string
  slideCardData: any
  fixCardContainerSize?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  const [slideNumber, setSlideNumber] = useState(0)
  const cardData = [...slideCardData]

  const isMobile = useScreenMode() === 'mobile'

  return (
    <>
      <div className={style.slide_container}>
        <div
          className={
            style.slide_num
          }>{`${slideNumber + 1} / ${cardData.length}`}</div>
        <div
          className={`${style.left_arrow} ${theme == 'red' ? style.red : ''}`}
          onClick={() => {
            0 == slideNumber
              ? setSlideNumber(cardData.length - 1)
              : setSlideNumber(slideNumber - 1)
          }}></div>
        <div
          className={`${style.right_arrow} ${theme == 'red' ? style.red : ''}`}
          onClick={() => {
            slideNumber < cardData.length - 1
              ? setSlideNumber(slideNumber + 1)
              : setSlideNumber(0)
          }}></div>
        {children}
        <div
          className={`${style.card_container} ${fixCardContainerSize && style.fix_size}`}>
          <CardTitle
            txt1={slideCardData[slideNumber].title}
            txt2={
              isMobile
                ? slideCardData[slideNumber].subMobile
                : slideCardData[slideNumber].sub
            }
          />
          <div className={style.slide_image}>
            <Image
              src={slideCardData[slideNumber].imgSrc}
              width={1000}
              height={600}
              alt=""
            />
          </div>
          {/* <div>{slideCardData[slideNumber].comment}</div> */}
        </div>
      </div>
    </>
  )
}

const Section01 = () => {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'

  const slideCardData = [
    {
      title: '영어의 시작 DODO ABC',
      sub: '재미있는 영상과 5단계 액티비티, 신나는 동요와 복습 게임으로<br /> 알파벳, 파닉스, 사이트 워드를 배워요.',
      subMobile:
        '재미있는 영상과 5단계 액티비티, 신나는 동요와 복습 게임으로 알파벳, 파닉스, 사이트 워드를 배워요.',
      imgSrc: '/src/images/@about-to-school/section01/slide/1.png',
    },
    {
      title: '다양하고 풍부한 스토리',
      sub: '오디오를 포함한 eBook, 애니메이션으로 감상하는 Movie Book,<br /> 영어로 된 원서 pBook 등 6,000여 개 이상의 다양한 콘텐츠를 경험해요. ',
      subMobile:
        '오디오를 포함한 eBook, 애니메이션으로 감상하는 Movie Book, 영어로 된 원서 pBook 등 6,000여 개 이상의 다양한 콘텐츠를 경험해요. ',
      imgSrc: '/src/images/@about-to-school/section01/slide/2.png',
    },
    {
      title: '말하기가 쉬워지는 AI SPEAK',
      sub: 'AI 음성인식 프로그램이 eBook 속 원어민 음성을 따라 읽으면<br /> 음소 단위로 분석해서 결과를 알려줘요.',
      subMobile:
        'AI 음성인식 프로그램이 eBook 속 원어민 음성을 따라 읽으면 음소 단위로 분석해서 결과를 알려줘요.',
      imgSrc: '/src/images/@about-to-school/section01/slide/3.png',
    },
    {
      title: '꼼꼼한 5단계 독후 학습',
      sub: '레벨별 수준에 맞는 적절한 학습으로<br /> 영어의 4대 영역을 고르게 키워요.',
      subMobile:
        '레벨별 수준에 맞는 적절한 학습으로 영어의 4대 영역을 고르게 키워요.',
      imgSrc: '/src/images/@about-to-school/section01/slide/4.png',
    },
  ]

  return (
    <>
      <div className={style.section01}>
        <div className={style.title_image}>
          <Image
            src={'/src/images/@about-to-school/section01/top_title.svg'}
            width={600}
            height={205}
            alt=""
          />
        </div>
        <div className={style.contents}>
          <div>
            리딩게이트는 우리나라 아이들의 영어 학습을 위해 설계된
            {isMobile ? '' : <br />} 영어 독서 프로그램으로
            {isMobile ? '' : <br />} 수준별 독서와 꼼꼼한 독후 학습을
            제공합니다.
          </div>
          <div>
            다양한 주제의 재미있고 유익한 스토리북을 통해
            {isMobile ? '' : <br />} 생생한 영어 표현과 꾸준한 독서 습관을
            기르고,
          </div>
          <div>
            독후 학습을 통해 영어의 문맥과 핵심 내용을 파악하여
            {isMobile ? '' : <br />} 문제 해결 능력을 키울 수 있습니다.
          </div>
        </div>
        <SlideContainer
          theme=""
          slideCardData={slideCardData}
          fixCardContainerSize>
          <div className={style.overlap}>
            <TitleBox
              txt1={'보고, 듣고, 읽고, 말하는'}
              txt2={'풍부한 콘텐츠'}
              txt1Color={''}
              txt2Color={'var(--blue)'}
            />
          </div>
        </SlideContainer>
      </div>
    </>
  )
}

const Section02 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardPkData = [
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_1.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_2.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_3.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_4.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_5.png',
    },
  ]

  const slideCardKData = [
    {
      title: 'Level KA',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/KA.png',
    },
    {
      title: 'Level KB',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/KB.png',
    },
    {
      title: 'Level KC',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/KC.png',
    },
  ]
  const slideCard1Data = [
    {
      title: 'Level 1A',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/1A.png',
    },
    {
      title: 'Level 1B',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/1B.png',
    },
    {
      title: 'Level 1C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/1C.png',
    },
  ]
  const slideCard2Data = [
    {
      title: 'Level 2A',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/2A.png',
    },
    {
      title: 'Level 2B',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/2B.png',
    },
    {
      title: 'Level 2C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/2C.png',
    },
  ]
  const slideCard36Data = [
    {
      title: 'Level 3A~6C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/3B.png',
    },
    {
      title: 'Level 3A~6C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/4A.png',
    },
    {
      title: 'Level 3A~6C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/6A.png',
    },
  ]

  return (
    <>
      <div className={style.section02}>
        <TitleBox
          txt1={'22단계의 세분화된'}
          txt2={'레벨구성'}
          txt1Color={''}
          txt2Color={'#F95977'}
        />
        <div className={style.row}>
          <div className={style.table_image}>
            <Image
              src={'/src/images/@about-to-school/section02/table.png'}
              width={918}
              height={130}
              alt=""
            />
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardPkData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardKData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCard1Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCard2Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCard36Data}></SlideContainer>
        </div>
      </div>
    </>
  )
}

const Section03 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardKData = [
    {
      title: 'Level K',
      sub: 'Listening Activity',
      subMobile: 'Listening Activity',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/1.png',
    },
    {
      title: 'Level K',
      sub: 'Vocabulary Practice',
      subMobile: 'Vocabulary Practice',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/2-2.png',
    },
    {
      title: 'Level K',
      sub: 'Reading Comprehension',
      subMobile: 'Reading Comprehension',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/3.png',
    },
    {
      title: 'Level K',
      sub: 'Writing Activty',
      subMobile: 'Writing Activty',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/4.png',
    },
  ]
  const slideCard1Data = [
    {
      title: 'Level 1',
      sub: 'Listening Activity',
      subMobile: 'Listening Activity',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/1.png',
    },
    {
      title: 'Level 1',
      sub: 'Vocabulary Practice',
      subMobile: 'Vocabulary Practice',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/2-2.png',
    },
    {
      title: 'Level 1',
      sub: 'Reading Comprehension',
      subMobile: 'Reading Comprehension',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/3.png',
    },
    {
      title: 'Level 1',
      sub: 'Summary Test',
      subMobile: 'Summary Test',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/4.png',
    },
    {
      title: 'Level 1',
      sub: 'Writing Activity',
      subMobile: 'Writing Activity',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/5.png',
    },
  ]
  const slideCard2Data = [
    {
      title: 'Level 2 이상',
      sub: 'Reading Comprehension',
      subMobile: 'Reading Comprehension',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/1.png',
    },
    {
      title: 'Level 2 이상',
      sub: 'Vocabulary Practice',
      subMobile: 'Vocabulary Practice',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/2-2.png',
    },
    {
      title: 'Level 2 이상',
      sub: 'Summary Test',
      subMobile: 'Summary Test',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/3.png',
    },
    {
      title: 'Level 2 이상',
      sub: 'Cloze Test',
      subMobile: 'Cloze Test',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/4.png',
    },
  ]

  return (
    <>
      <div className={style.section03}>
        <div className={style.row}>
          <TitleBox
            txt1={'레벨별 수준에 딱 맞는'}
            txt2={'독후 학습'}
            txt1Color={''}
            txt2Color={'var(--blue)'}
          />
          <div className={style.comment}>
            독서 후 4~5단계의(Reading Comprehension / Vocabulary / Listening /
            Summary / Writing)
            <br />
            학습을 통해 학습 성취도를 확인할 수 있습니다.
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCardKData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCard1Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCard2Data}></SlideContainer>
        </div>
      </div>
    </>
  )
}

const Section04 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardPkData = [
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/1.png',
    },
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/2.png',
    },
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/3.png',
    },
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/4.png',
    },
  ]
  const slideCardKData = [
    {
      title: 'eBook (KA~1C)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/5.png',
    },
    {
      title: 'eBook (KA~1C)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/6.png',
    },
    {
      title: 'eBook (KA~1C)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/7.png',
    },
  ]

  return (
    <>
      <div className={style.section04}>
        <div className={style.row}>
          <TitleBox
            txt1={'음성인식 프로그램'}
            txt2={'AI SPEAK'}
            txt1Color={''}
            txt2Color={'#F95977'}
          />
          <div className={style.comment}>
            DODO ABC Sight Word 학습과 eBook K~1레벨에서 Speak 프로그램을 이용할
            수 있습니다.
            <br />
            학생의 발음을 음소 단위로 분석하여 결과를 제공함으로써 스피킹 능력을
            향상시킵니다.
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardPkData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardKData}></SlideContainer>
        </div>
      </div>
    </>
  )
}

const Section05 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardRow1Data = [
    {
      title: '일일 목표',
      sub: '나의 일일 학습 목표를 설정하고 목표를 달성하면 캘린더에서 달성 현황을 확인할 수 있어요.',
      subMobile:
        '나의 일일 학습 목표를 설정하고 목표를 달성하면 캘린더에서 달성 현황을 확인할 수 있어요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/1@2x.png',
    },
    {
      title: '연속학습',
      sub: '매일 한 권 이상 학습을 완료하여 연속 학습을 이어갈 수 있어요.',
      subMobile:
        '매일 한 권 이상 학습을 완료하여 연속 학습을 이어갈 수 있어요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/2@2x.png',
    },
    {
      title: '레벨마스터',
      sub: '레벨별로 정해진 학습 포인트를 모두 채우면 레벨마스터를 달성해요.',
      subMobile:
        '레벨별로 정해진 학습 포인트를 모두 채우면 레벨마스터를 달성해요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/3@2x.png',
    },
    {
      title: '도도와 친구들',
      sub: '포인트를 쌓아 도도와 친구들의 성장 스토리를 열어볼 수 있어요.',
      subMobile:
        '포인트를 쌓아 도도와 친구들의 성장 스토리를 열어볼 수 있어요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/4@2x.png',
    },
  ]

  return (
    <>
      <div className={style.section05}>
        <div className={style.row}>
          <TitleBox
            txt1={'학습에 재미를 더해주는'}
            txt2={'포인트와 동기 부여 기능'}
            txt1Color={''}
            txt2Color={'var(--blue)'}
          />
          <div className={style.comment}>
            <div className={style.col_left}>
              <Image
                src="/src/images/@about-to-school/section05/book.png"
                width={141}
                height={220}
                alt=""
              />
            </div>
            <div className={style.col_right}>
              <div>
                리딩게이트의 모든 도서는 단어와 페이지 수, 문장의 난이도를
                고려한 포인트가 차등 부여되어 있습니다.
              </div>
              <div>
                온라인 독후 학습을 평균 70점 이상으로 통과할 경우 해당 도서의
                포인트를 획득할 수 있습니다.
              </div>
              <div>
                포인트는 도서 당 최대 두 번까지 획득할 수 있으며, 첫 번째 학습
                통과 시 100%, 두 번째 학습 통과 시 50% 포인트를 획득합니다.
              </div>
            </div>
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCardRow1Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <div className={style.end_image}>
            <Image
              src={'/src/images/@about-to-school/section05/ending@2x.png'}
              width={1768}
              height={504}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}
