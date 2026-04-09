'use client'

import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'

const STYLE_ID = 'page_about_global'

export default function Page() {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <main className={`container compact ${style.about_global}`}>
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
      title: 'Begin Your English Journey with DODO ABC',
      sub: `Learn the alphabet, phonics, and sight words through watching fun videos, completing 5-step activities, singing exciting children's songs, and playing review games!`,
      subMobile: `Learn the alphabet, phonics, and sight words through watching fun videos, completing 5-step activities, singing exciting children's songs, and playing review games!`,
      imgSrc: '/src/images/@about-to-school/section01/slide/1.png',
    },
    {
      title: 'A Wide Array of Captivating Stories',
      sub: 'Dive into a world of over 6,000 pieces of content, including eBooks with full story audio, Movie Books with full animated videos, and pBooks with English comprehension activities!',
      subMobile:
        'Dive into a world of over 6,000 pieces of content, including eBooks with full story audio, Movie Books with full animated videos, and pBooks with English comprehension activities!',
      imgSrc: '/src/images/@about-to-school/section01/slide/2.png',
    },
    {
      title: 'Making Speaking Easy with AI SPEAK',
      sub: 'Our AI voice recognition program analyzes your pronunciation as you follow along with native English speakers in the eBooks, breaking it down into phoneme-level feedback to show you how you did!',
      subMobile:
        'Our AI voice recognition program analyzes your pronunciation as you follow along with native English speakers in the eBooks, breaking it down into phoneme-level feedback to show you how you did!',
      imgSrc: '/src/images/@about-to-school/section01/slide/3.png',
    },
    {
      title: 'Comprehensive 5-Step Reading Program',
      sub: 'Tailored to each level, this structured learning approach helps develop all four key areas of English proficiency evenly.',
      subMobile:
        'Tailored to each level, this structured learning approach helps develop all four key areas of English proficiency evenly.',
      imgSrc: '/src/images/@about-to-school/section01/slide/4.png',
    },
  ]

  return (
    <>
      <div className={style.section01}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0',
          }}>
          <div style={{ color: 'var(--white)', fontSize: '1.8em' }}>
            Enjoy English by reading books!
          </div>
          <div
            style={{
              color: 'var(--yellow)',
              fontSize: '3.8em',
              fontWeight: 800,
            }}>
            Reading Gate
          </div>
        </div>
        {/* <div className={style.title_image}>
          <Image
            src={'/src/images/@about-to-school/section01/top_title.svg'}
            width={600}
            height={205}
            alt=""
          />
        </div> */}
        <div className={style.contents}>
          Reading Gate is an English reading program designed to foster a love
          for reading and enhance English proficiency. It offers a comprehensive
          curriculum tailored to various learning levels, providing engaging
          content that motivates students to read more. Nurture vivid
          imaginations and promote steady reading habits through fun and
          informative storybooks on various topics while developing
          problem-solving skills by grasping the full context and core content
          through online reading activities.
          {/* <div>
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
          </div> */}
        </div>
        <SlideContainer
          theme=""
          slideCardData={slideCardData}
          fixCardContainerSize>
          <div className={style.overlap}>
            <TitleBox
              txt1={'Reading • Listening • Watching • Speaking'}
              txt2={'Experience all the rich content'}
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
          txt1={'22 Distinct Levels'}
          txt2={'Structured Progression'}
          txt1Color={''}
          txt2Color={'#F95977'}
        />
        <div className={style.row}>
          <div className={style.table_image}>
            <Image
              src={'/src/images/@about-to-school/section02/table_global.png'}
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
      title: 'Level 2 ~',
      sub: 'Reading Comprehension',
      subMobile: 'Reading Comprehension',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/1.png',
    },
    {
      title: 'Level 2 ~',
      sub: 'Vocabulary Practice',
      subMobile: 'Vocabulary Practice',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/2-2.png',
    },
    {
      title: 'Level 2 ~',
      sub: 'Summary Test',
      subMobile: 'Summary Test',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/3.png',
    },
    {
      title: 'Level 2 ~',
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
            txt1={'matched to your skill level'}
            txt2={'Reading Activities'}
            txt1Color={''}
            txt2Color={'var(--blue)'}
          />
          <div className={style.comment}>
            Reinforce your reading and learning through our 4~5-step (Reading
            Comprehension / Vocabulary / Listening / Summary / Writing)
            activities.
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
            txt1={'Voice Recognition Program'}
            txt2={'AI SPEAK'}
            txt1Color={''}
            txt2Color={'#F95977'}
          />
          <div className={style.comment}>
            {`AI SPEAK is only available in our DODO ABC Sight Word activities &
            eBooks at K~1 levels. Improves speaking ability by analyzing a
            student's pronunciation at the phoneme level and providing direct
            feedback to make the proper adjustments.`}
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
      title: 'Daily Goal',
      sub: 'Set a daily learning goal. Complete your daily learning goal. Use the calendar to check how you are doing.',
      subMobile:
        'Set a daily learning goal. Complete your daily learning goal. Use the calendar to check how you are doing.',
      imgSrc: '/src/images/@about-to-school/section05/slide/global_1.png',
    },
    {
      title: 'Study Streak',
      sub: 'Read at least a book a day. Stay consistent and never miss your goal!',
      subMobile:
        'Read at least a book a day. Stay consistent and never miss your goal!',
      imgSrc: '/src/images/@about-to-school/section05/slide/global_2.png',
    },
    {
      title: 'Level Master',
      sub: 'Become a Level Master after achieving all the points in a given level!',
      subMobile:
        'Become a Level Master after achieving all the points in a given level!',
      imgSrc: '/src/images/@about-to-school/section05/slide/global_3.png',
    },
    {
      title: 'DODO and Friends',
      sub: 'Collect points and unlock DODO and Friends mini-stories!',
      subMobile: 'Collect points and unlock DODO and Friends mini-stories!',
      imgSrc: '/src/images/@about-to-school/section05/slide/global_4.png',
    },
  ]

  return (
    <>
      <div className={style.section05}>
        <div className={style.row}>
          <TitleBox
            txt1={'make learning fun'}
            txt2={'Points and Rewards'}
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
                Reading Gate assigns points to each book based on word count,
                page count, and sentence difficulty.
              </div>
              <div>
                Earn points for a book by successfully passing the online
                reading activities with an average score of 70 or more.
              </div>
              <div>
                Points can be earned up to twice per book: 100% on the first
                completion and 50% on the second.
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
              src={'/src/images/@about-to-school/section05/ending_global.png'}
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
