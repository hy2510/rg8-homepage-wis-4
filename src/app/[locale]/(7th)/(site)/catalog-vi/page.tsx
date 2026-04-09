'use client'

import { openWindow } from '@/7th/_function/open-window'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH, { EXTERNAL_URL } from '@/app/site-path'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCatalogSectionText } from './_i18n/useCatalogText'

const STYLE_ID = 'page_catalog'
const createHtmlMarkup = (html: string) => ({ __html: html })

export default function Page() {
  const style = useStyle(STYLE_ID)
  const isMobile = useScreenMode() === 'mobile'

  return (
    <>
      <div className={style.catalog}>
        <div className={style.global_header_bg}></div>
      </div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
    </>
  )
}

const Section1 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')
  const backgroundVideo = '/src/videos/about_video_background.mp4'

  return (
    <div className={style.section_1}>
      <div className={style.side_banner}>
        <Image
          src={'/src/images/@about/vi/section01/side_banner.png'}
          width={98}
          height={214}
          alt=""
        />
      </div>
      <div className={style.center_group}>
        <div className={style.main_title}>
          <div className={style.row_1}>
            <span className={style.txt}>{sectionText.txt1}</span>
            <span className={style.line}></span>
            <span className={style.txt}>{sectionText.txt2}</span>
          </div>
          <div className={style.row_2}>
            <span
              dangerouslySetInnerHTML={createHtmlMarkup(sectionText.txt3)}
            />
          </div>
          <div
            className={style.row_3}
            dangerouslySetInnerHTML={createHtmlMarkup(sectionText.txt4)}
          />
        </div>
        <div className={style.app_link_group}>
          <Link href={SITE_PATH.HOME.MAIN}>
            <div className={style.btn}>
              <Image
                src="/src/images/@about/section01/img_pc.svg"
                width={23}
                height={28}
                alt=""
              />
              PC
            </div>
          </Link>
          <Link
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              openWindow(EXTERNAL_URL.googlePlay, {
                external: true,
                target: '_blank',
              })
            }}>
            <div className={style.btn}>
              <Image
                src="/src/images/@about/section01/img_googleplaylogo.svg"
                width={23}
                height={28}
                alt=""
              />
              <span>Android</span>
            </div>
          </Link>
          <Link
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              openWindow(EXTERNAL_URL.appleAppStore, {
                external: true,
                target: '_blank',
              })
            }}>
            <div className={style.btn}>
              <Image
                src="/src/images/@about/section01/img_applelogo.svg"
                width={23}
                height={28}
                alt=""
              />
              <span>iOS</span>
            </div>
          </Link>
        </div>
      </div>
      {/* 백그라운드 비디오 연속 재생 */}
      <div className={style.video_background}>
        <video className="background-video" autoPlay muted loop playsInline>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

const Section2 = () => {
  const isMobile = useScreenMode() === 'mobile'
  const awardFontSize = isMobile ? '10px' : '16px'

  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  return (
    <div className={style.section_2}>
      <div className={style.hero_text}>
        <div className={style.row_1}>
          <div className={style.col_1}>
            <div className={style.txt_1}>{sectionText.txt5}</div>
            <div
              className={style.txt_2}
              style={{
                fontWeight: 900,
                fontFamily: '"Noto Sans KR", sans-serif',
              }}>
              <span
                dangerouslySetInnerHTML={createHtmlMarkup(sectionText.txt6)}
              />
            </div>
          </div>
          <div className={style.col_2}></div>
          <div
            className={style.col_3}
            style={{
              fontWeight: 900,
              fontFamily: '"Noto Sans KR", sans-serif',
            }}>
            <span
              dangerouslySetInnerHTML={createHtmlMarkup(sectionText.txt7)}
            />
          </div>
        </div>
        <div className={style.row_2}>
          <div className={style.award_item}>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              2019
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt8}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt9}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt10_1}
            </div>
          </div>
          <div className={style.award_item}>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              2020
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt8}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt9}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt10}
            </div>
          </div>
          <div className={style.award_item}>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              2021
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt8}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt9}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt10}
            </div>
          </div>
          <div className={style.award_item}>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              2022
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt8}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt9}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt10}
            </div>
          </div>
          <div className={style.award_item}>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              2023
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt8}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt9}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt10}
            </div>
          </div>
          <div className={style.award_item}>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              2024
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt8}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt9}
            </div>
            <div style={{ textAlign: 'center', fontSize: awardFontSize }}>
              {sectionText.txt10}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Section3 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  const txt1txt2FontStyle = {
    fontSize: '20px',
    fontWeight: 300,
    lineHeight: '1.6',
    letterSpacing: '0px',
  }

  return (
    <div className={style.section_3}>
      <div className={style.col_1}></div>
      <div className={style.col_2}>
        <div
          className={style.txt_1}
          style={txt1txt2FontStyle}
          dangerouslySetInnerHTML={createHtmlMarkup(sectionText.txt11)}
        />
        <div className={style.txt_2}>
          <div
            style={{ ...txt1txt2FontStyle, marginTop: '10px' }}
            dangerouslySetInnerHTML={createHtmlMarkup(sectionText.txt12)}></div>
          {/* <div className={style.dot_box}> */}
          <div className={style.txt} style={txt1txt2FontStyle}>
            {sectionText.txt13}
          </div>
          {/* <span className={style.dot} style={txt1txt2FontStyle}></span>
           </div>  */}
        </div>
        <div
          className={style.txt_3}
          style={{ lineHeight: txt1txt2FontStyle.lineHeight }}>
          {/* 리딩게이트는 총 6,000여 권의 방대한 영어 원서 콘텐츠를 제공하는 국내 최대 온라인 영어도서관입니다.<br />
          수준별로 나눠진 다양한 주제의 영어 원서를 바탕으로 소리 내어 읽고 독후학습 퀴즈를 풀며 문맥과 핵심을 파악하는 능력을 키울 수 있습니다. */}
          {sectionText.txt14} {sectionText.txt15}
          <br />
          {sectionText.txt16} {sectionText.txt17}
        </div>
      </div>
    </div>
  )
}

const Section4 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  const slideImages = [
    '/src/images/@about/@ebook/row1_ka_1.png',
    '/src/images/@about/@ebook/row1_ka_2.png',
    '/src/images/@about/@ebook/row1_ka_3.png',
    '/src/images/@about/@ebook/row1_kb_1.png',
    '/src/images/@about/@ebook/row1_kb_2.png',
    '/src/images/@about/@ebook/row1_kb_3.png',
    '/src/images/@about/@ebook/row1_kc_1.png',
    '/src/images/@about/@ebook/row1_kc_2.png',
    '/src/images/@about/@ebook/row1_kc_3.png',
    '/src/images/@about/@ebook/row2_1a_1.png',
    '/src/images/@about/@ebook/row2_1a_2.png',
    '/src/images/@about/@ebook/row2_1a_3.png',
    '/src/images/@about/@ebook/row2_1b_1.png',
    '/src/images/@about/@ebook/row2_1b_2.png',
    '/src/images/@about/@ebook/row2_1b_3.png',
    '/src/images/@about/@ebook/row2_1c_1.png',
    '/src/images/@about/@ebook/row2_1c_2.png',
    '/src/images/@about/@ebook/row2_1c_3.png',
    '/src/images/@about/@ebook/row3_2a_1.png',
    '/src/images/@about/@ebook/row3_2a_2.png',
    '/src/images/@about/@ebook/row3_2a_3.png',
    '/src/images/@about/@ebook/row3_2b_1.png',
    '/src/images/@about/@ebook/row3_2b_2.png',
    '/src/images/@about/@ebook/row3_2b_3.png',
    '/src/images/@about/@ebook/row3_2c_1.png',
    '/src/images/@about/@ebook/row3_2c_2.png',
    '/src/images/@about/@ebook/row3_2c_3.png',
  ]

  const [imgIndex, setImgIndex] = useState(0)
  const [fade, setFade] = useState(true)

  const [contentHeight, setContentHeight] = useState('960px')

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setImgIndex((prevIndex) => (prevIndex + 1) % slideImages.length)
        setFade(true)
      }, 300)
    }, 3000)
    return () => clearInterval(timer)
  }, [imgIndex])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('screen and (max-width: 600px)')
    const listener = () => {
      if (media.matches) {
        setContentHeight('760px')
      } else {
        setContentHeight('960px')
      }
    }
    listener()
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return (
    <div className={style.section_4} style={{ height: contentHeight }}>
      <div
        className={style.row_1}
        style={{ marginLeft: '20px', marginRight: '20px' }}>
        <div className={style.txt_1}>{sectionText.txt18}</div>
        <div className={style.txt_2} style={{ marginTop: '32px' }}>
          {sectionText.txt19}
        </div>
      </div>
      <div className={style.row_2}>
        <div className={style.contents_image}>
          <div className={style.bg}>
            <Image
              src={slideImages[imgIndex]}
              width={660}
              height={400}
              alt=""
              className={`${fade ? 'slide-in-right' : 'slide-out-left'}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Section5 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  const isMobile = useScreenMode() === 'mobile'

  const [tabActive, setTabActive] = useState(0)

  const subPageContainData = [
    {
      title: 'Level K',
      step: [
        {
          name: sectionText.txt20,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step01.png',
          exp1: 'Listening Activity',
          exp2: sectionText.txt21,
        },
        {
          name: sectionText.txt22,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step02.png',
          exp1: 'Vocabulray Test',
          exp2: sectionText.txt23,
        },
        {
          name: sectionText.txt24,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step03.png',
          exp1: 'Reading Comprehension',
          exp2: sectionText.txt25,
        },
        {
          name: sectionText.txt26,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step04.png',
          exp1: 'Writing Activity',
          exp2: sectionText.txt27,
        },
      ],
    },
    {
      title: 'Level 1',
      step: [
        {
          name: sectionText.txt20,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step01.png',
          exp1: 'Listening Activity',
          exp2: sectionText.txt28,
        },
        {
          name: sectionText.txt22,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step02.png',
          exp1: 'Vocabulray Test',
          exp2: sectionText.txt29,
        },
        {
          name: sectionText.txt24,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step03.png',
          exp1: 'Reading Comprehension',
          exp2: sectionText.txt30,
        },
        {
          name: sectionText.txt31,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step04.png',
          exp1: 'Summary Test',
          exp2: sectionText.txt32,
        },
        {
          name: sectionText.txt33,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step05.png',
          exp1: 'Writing Activity',
          exp2: sectionText.txt34,
        },
      ],
    },
    {
      title: 'Level 2~6',
      step: [
        {
          name: sectionText.txt35,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step01.png',
          exp1: 'Reading Comprehension',
          exp2: sectionText.txt30,
        },
        {
          name: sectionText.txt22,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step02.png',
          exp1: 'Vocabulray Test',
          exp2: sectionText.txt36,
        },
        {
          name: sectionText.txt37,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step03_1.png',
          exp1: 'Summary Test',
          exp2: sectionText.txt38,
        },
        {
          name: sectionText.txt39,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step04.png',
          exp1: 'Cloze Test',
          exp2: sectionText.txt40,
        },
      ],
    },
  ]

  const Tabs = () => {
    return (
      <div className={style.tabs}>
        <TabButton
          txt1={'Level K'}
          txt2={sectionText.txt41}
          active={tabActive === 0}
          onClick={() => {
            setTabActive(0)
          }}
        />
        <TabButton
          txt1={'Level 1'}
          txt2={sectionText.txt42}
          active={tabActive === 1}
          onClick={() => {
            setTabActive(1)
          }}
        />
        <TabButton
          txt1={'Level 2~6'}
          txt2={sectionText.txt43}
          active={tabActive === 2}
          onClick={() => {
            setTabActive(2)
          }}
        />
      </div>
    )
  }

  type TabButtonProps = {
    txt1: string
    txt2: string
    active: boolean
    onClick: any
  }

  const TabButton: React.FC<TabButtonProps> = ({
    txt1,
    txt2,
    active,
    onClick,
  }) => {
    return (
      <div
        className={`${style.tab_button} ${active ? style.active : ''}`}
        onClick={onClick}>
        <div className={style.txt_1}>{txt1}</div>
        <div className={style.txt_2}>{txt2}</div>
      </div>
    )
  }

  interface aboutQuizDataProps {
    name: string
    imgSrc: string
    exp1?: string
    exp2: string
  }

  const SlideCard = ({
    data,
  }: {
    tabActive: number
    data: aboutQuizDataProps[]
  }) => {
    const [stepActive, setStepActive] = useState(0)
    const slideData = [...data]

    return (
      <>
        <div className={style.slide_card}>
          <div
            className={style.btn_left}
            onClick={() => {
              0 < stepActive && stepActive <= slideData.length - 1
                ? setStepActive(stepActive - 1)
                : setStepActive(slideData.length - 1)
            }}></div>
          <div className={style.slide_image}>
            <Image
              src={slideData[stepActive].imgSrc}
              width={1100}
              height={720}
              alt=""
            />
          </div>
          <div
            className={style.btn_right}
            onClick={() => {
              stepActive < slideData.length - 1
                ? setStepActive(stepActive + 1)
                : setStepActive(0)
            }}></div>
        </div>
        <div className={style.slide_card_contents}>
          <div className={style.slide_card_contents_row_1}>
            <div className={style.step}>Step {stepActive + 1}</div>
            <div className={style.study_name}>{slideData[stepActive].exp1}</div>
          </div>
          <div className={style.slide_card_contents_row_2}>
            {slideData[stepActive].exp2}
          </div>
        </div>
        <div className={style.dots}>
          {slideData.map((a, i) => {
            return (
              <div
                key={i}
                className={`${style.dot} ${stepActive === i && style.active}`}></div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <div className={style.section_5}>
        <div className={style.row_1}>
          <div className={style.txt_1}>{sectionText.txt44}</div>
          <div className={style.txt_2} style={{ marginTop: '16px' }}>
            {sectionText.txt45}
          </div>
        </div>
        <Tabs />
        {tabActive === 0 && (
          <SlideCard tabActive={0} data={subPageContainData[0].step} />
        )}
        {tabActive === 1 && (
          <SlideCard tabActive={1} data={subPageContainData[1].step} />
        )}
        {tabActive === 2 && (
          <SlideCard tabActive={2} data={subPageContainData[2].step} />
        )}
      </div>
      <div className={style.ai_speak}>
        {isMobile ? (
          <>
            <Image
              src={'/src/images/@about/vi/section04/img_speak_mo.png'}
              width={360}
              height={523}
              alt=""
            />
          </>
        ) : (
          <>
            <Image
              src={'/src/images/@about/vi/section04/img_speak.png'}
              width={1754}
              height={974}
              alt=""
            />
          </>
        )}
      </div>
    </>
  )
}

const Section6 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  const isMobile = useScreenMode() === 'mobile'
  const titleFontStyle = isMobile
    ? { fontSize: '28px', fontWeight: 500, lineHeight: '1.3' }
    : { fontSize: '46px', fontWeight: 700, lineHeight: '1.3' }

  return (
    <div className={style.section_6}>
      <div className={style.container}>
        <div className={style.col_left}>
          <div className={style.title} style={{ flexDirection: 'column' }}>
            {/* <div className={style.txt_1}>다양한</div> */}
            <div className={style.txt_2} style={titleFontStyle}>
              {sectionText.txt46}
            </div>
            <div
              className={`${style.txt_3} ${style.no_after}`}
              style={titleFontStyle}>
              {sectionText.txt47}
            </div>
          </div>
        </div>
        <div className={style.col_right}>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/vi/section06/img_symbol_01.png'}
                width={456}
                height={475}
                alt=""
              />
              {/* <div className={style.sub_text}>
                <div className={style.txt}>Level Master</div>
                <div className={style.txt}>Certificate</div>
              </div> */}
            </div>
            <div className={style.text_group}>
              {/* <div className={style.txt_1}>레벨별 목표 달성</div> */}
              <div className={style.txt_2}>{sectionText.txt48}</div>
              <div className={style.txt_3}>
                {/* 도서를 학습한 후 북퀴즈를 통과하면 포인트가 지급됩니다.
                포인트가 쌓여 레벨별 목표 포인트에 도달하면 레벨 마스터 배지를 획득할 수 있습니다.
                레벨 마스터 배지를 획득하면 인증서를 출력할 수 있으며,
                인증서를 상장으로 활용하면 성취감을 느끼고 앞으로의 학습에도 동기부여가 될 거예요. */}
                {sectionText.txt49} {sectionText.txt50} {sectionText.txt51}
              </div>
            </div>
          </div>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/vi/section06/img_symbol_04.png'}
                width={456}
                height={475}
                alt=""
              />
              {/* <div className={style.sub_text}>
                <div className={style.txt}>Quests</div>
                <div className={style.txt}>Offered</div>
              </div> */}
            </div>
            <div className={style.text_group}>
              {/* <div className={style.txt_1}>또 다른 재미</div> */}
              <div className={style.txt_2}>{sectionText.txt52}</div>
              <div className={style.txt_3}>
                {/* 레벨 마스터로 가는 과정이 너무 멀게 느껴지지 않도록, 도도와 친구들이 함께해 줘요.
                포인트가 쌓일수록 친구들이 성장하며 꿈을 향해 나아갑니다.
                친구들의 성장을 보며 함께 힘차게 학습할 수 있어요. */}
                {sectionText.txt53} {sectionText.txt54}
              </div>
            </div>
          </div>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/vi/section06/img_symbol_02.png'}
                width={456}
                height={475}
                alt=""
              />
              {/* <div className={style.sub_text}>
                <div className={style.txt}>Daily Goal</div>
                <div className={style.txt}>Achievement</div>
              </div> */}
            </div>
            <div className={style.text_group}>
              {/* <div className={style.txt_1}>노력의 성취 기록</div> */}
              <div className={style.txt_2}>{sectionText.txt55}</div>
              <div className={style.txt_3}>
                {/* 매일 꾸준한 영어 학습도 리딩게이트와 함께라면 어렵지 않아요.
                일일 목표와 연속 학습 목표를 달성하면 어워드를 획득하여 성취감을 느끼고 영어 학습 습관을 유지할 수 있어요. */}
                {sectionText.txt56} {sectionText.txt57} {sectionText.txt58}
              </div>
            </div>
          </div>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/vi/section06/img_symbol_03.png'}
                width={456}
                height={475}
                alt=""
              />
              {/* <div className={style.sub_text}>
                <div className={style.txt}>King of Reading</div>
                <div className={style.txt}>Challenge</div>
              </div> */}
            </div>
            <div className={style.text_group}>
              {/* <div className={style.txt_1}>또 다른 재미</div> */}
              {/* <div className={style.txt_2}>서브 퀘스트 진행 <span>{`(도도와 친구들)`}</span></div> */}
              <div className={style.txt_2}>{sectionText.txt59}</div>
              <div className={style.txt_3}>
                {/* 매년 상·하반기에 한 번씩 영어 독서왕 선발 대회를 개최하고 있어요.
                이 대회의 특별한 점은 시상 기준을 달성한 모든 학습자가 선물을 받을 수 있다는 거예요.
                학습자들은 이 대회에 참여하면서 동기부여와 실력 향상, 두 마리 토끼를 잡을 수 있어요. */}
                {sectionText.txt60} {sectionText.txt61} {sectionText.txt62}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.light_box}></div>
    </div>
  )
}

const Section7 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  const slideCards = [
    // {
    //   txt1: sectionText.txt63,
    //   txt2: sectionText.txt64,
    //   imgSrc: '/src/images/@about/section07/contents03.png',
    // },
    {
      txt1: sectionText.txt65,
      txt2: sectionText.txt66,
      imgSrc: '/src/images/@about/section07/contents01.png',
    },
    // {
    //   txt1: sectionText.txt67,
    //   txt2: sectionText.txt68,
    //   imgSrc: '/src/images/@about/section07/contents07.png',
    // },
  ]

  const [slideNum, setSlideNum] = useState(0)

  const btnLeftActive = () => {
    slideNum > 0 && slideNum <= slideCards.length - 1
      ? setSlideNum(slideNum - 1)
      : setSlideNum(slideCards.length - 1)
  }
  const btnRightActive = () => {
    slideNum >= 0 && slideNum < slideCards.length - 1
      ? setSlideNum(slideNum + 1)
      : setSlideNum(0)
  }

  return (
    <div className={style.section_7}>
      <div className={style.title}>
        <div className={style.txt_1}>{sectionText.txt69}</div>
        <div className={style.txt_2}>{sectionText.txt70}</div>
      </div>
      <div className={style.jumbotron}>
        <div className={style.col_left}>
          <div className={style.text_group}>
            <div className={style.txt_1}>{slideCards[slideNum].txt1}</div>
            <div className={style.txt_2}>{slideCards[slideNum].txt2}</div>
          </div>
          {/* <div className={style.arrows}>
            <div
              className={style.btn_arrow_left}
              onClick={() => {
                btnLeftActive()
              }}></div>
            <div>{`${slideNum + 1}/${slideCards.length}`}</div>
            <div
              className={style.btn_arrow_right}
              onClick={() => {
                btnRightActive()
              }}></div>
          </div> */}
        </div>
        <div className={style.col_right}>
          <div className={style.card_contents}>
            <Image
              src={slideCards[slideNum].imgSrc}
              alt=""
              width={770}
              height={410}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Section8 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  const reviewData = [
    {
      title: sectionText.txt71,
      post: sectionText.txt72,
      name: sectionText.txt73,
    },
    {
      title: sectionText.txt74,
      post: sectionText.txt75,
      name: sectionText.txt76,
    },
    {
      title: sectionText.txt77,
      post: sectionText.txt78,
      name: sectionText.txt79,
    },
    {
      title: sectionText.txt80,
      post: sectionText.txt81,
      name: sectionText.txt82,
    },
    {
      title: sectionText.txt83,
      post: sectionText.txt84,
      name: sectionText.txt85,
    },
    {
      title: sectionText.txt71,
      post: sectionText.txt72,
      name: sectionText.txt73,
    },
    {
      title: sectionText.txt74,
      post: sectionText.txt75,
      name: sectionText.txt76,
    },
    {
      title: sectionText.txt77,
      post: sectionText.txt78,
      name: sectionText.txt79,
    },
    {
      title: sectionText.txt80,
      post: sectionText.txt81,
      name: sectionText.txt82,
    },
    {
      title: sectionText.txt83,
      post: sectionText.txt84,
      name: sectionText.txt85,
    },
    {
      title: sectionText.txt71,
      post: sectionText.txt72,
      name: sectionText.txt73,
    },
    {
      title: sectionText.txt74,
      post: sectionText.txt75,
      name: sectionText.txt76,
    },
    {
      title: sectionText.txt77,
      post: sectionText.txt78,
      name: sectionText.txt79,
    },
    {
      title: sectionText.txt80,
      post: sectionText.txt81,
      name: sectionText.txt82,
    },
    {
      title: sectionText.txt83,
      post: sectionText.txt84,
      name: sectionText.txt85,
    },
  ]

  type ReviewCardProps = {
    txt_1: string
    txt_2: string
    txt_3: string
  }

  const ReviewCard: React.FC<ReviewCardProps> = ({ txt_1, txt_2, txt_3 }) => {
    return (
      <div className={style.review_card}>
        <div
          className={style.txt_1}
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
            textAlign: 'center',
            color: '#555',
          }}>
          {txt_1}
        </div>
        <div className={style.line}></div>
        <div
          className={style.txt_2}
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
            textAlign: 'center',
            color: '#555',
          }}>
          {txt_2}
        </div>
        <div className={style.line}></div>
        <div
          className={style.txt_3}
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
            textAlign: 'center',
            color: '#555',
          }}>
          {txt_3}
        </div>
      </div>
    )
  }

  return (
    <div className={style.section_8}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.txt_1}>{sectionText.txt86}</div>
          <div
            className={`${style.txt_2} ${style.no_after}`}
            style={{
              fontFamily: '"Noto Sans KR", sans-serif',
              fontWeight: 900,
              textAlign: 'center',
            }}>
            {sectionText.txt87}
          </div>
          <div className={style.real_review_image}>
            <Image
              src={'/src/images/@about/section08/text_real_review.png'}
              width={376}
              height={120}
              alt=""
            />
          </div>
        </div>
        <div className={style.video_thumnail}>
          <iframe
            frameBorder={0}
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/_OKPbLJmVT8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
      </div>
      <div className={style.reviews}>
        {reviewData.map((a, i) => {
          return (
            <>
              <ReviewCard txt_1={a.title} txt_2={a.post} txt_3={a.name} />
            </>
          )
        })}
      </div>
      {/* <div className={style.container_2}>
        <div className={style.btn_line}>
          <Link href={SITE_PATH.HOME.CUSTOMER_STUDENT_REVIEW}>
            {sectionText.txt88}
          </Link>
        </div>
      </div> */}
    </div>
  )
}

const Section9 = () => {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('root')

  type CategoryButtonProps = {
    img: string
    txt_1: string
    txt_2: string
    txt_3: string
    etc: boolean
    href: string
  }

  const CategoryButton: React.FC<CategoryButtonProps> = ({
    img,
    txt_1,
    txt_2,
    txt_3,
    etc,
    href,
  }) => {
    return (
      <Link href={href}>
        <div className={style.category_button}>
          <div className={style.icon_image}>
            <Image src={img} width={100} height={100} alt="" />
          </div>
          <div className={style.txt_1}>{txt_1}</div>
          <div className={style.txt_2}>{txt_2}</div>
          <div className={`${etc ? style.txt_2 : style.txt_3}`}>{txt_3}</div>
        </div>
      </Link>
    )
  }

  return (
    <div className={style.section_9}>
      <div>
        <div className={style.header}>
          <div className={style.txt_3}>
            <b>{sectionText.txt89}</b>
          </div>
          <div className={style.txt_1}>{sectionText.txt90}</div>
          <div className={style.txt_2}>{sectionText.txt91}</div>
        </div>
        <div className={style.buttons}>
          <CategoryButton
            href="/catalog-vi/dodo-abc"
            img="/src/images/@about/section09/ico_prek_icon.svg"
            txt_1={sectionText.txt92}
            txt_2={sectionText.txt93}
            txt_3={sectionText.txt94}
            etc={false}
          />
          <CategoryButton
            href="/catalog-vi/ebook"
            img="/src/images/@about/section09/ico_ebook_icon.svg"
            txt_1={sectionText.txt95}
            txt_2={sectionText.txt96}
            txt_3={sectionText.txt97}
            etc={false}
          />
          <CategoryButton
            href="/catalog-vi/pbook-quiz"
            img="/src/images/@about/section09/ico_quiz_icon.svg"
            txt_1={sectionText.txt98}
            txt_2={sectionText.txt96}
            txt_3={sectionText.txt99}
            etc={false}
          />
          <CategoryButton
            href="/catalog-vi/movie-contents"
            img="/src/images/@about/section09/ico_movie_icon.svg"
            txt_1={sectionText.txt100}
            txt_2={sectionText.txt101}
            txt_3={sectionText.txt102}
            etc={true}
          />
          <CategoryButton
            href="/catalog-vi/ai-speak"
            img="/src/images/@about/section09/ico_speak_icon.png"
            txt_1="AI SPEAK"
            txt_2={sectionText.txt103}
            txt_3={sectionText.txt104}
            etc={true}
          />
          <CategoryButton
            href="/catalog-vi/motivation"
            img="/src/images/@about/section09/ico_level_up_icon.svg"
            txt_1={sectionText.txt105}
            txt_2={sectionText.txt106}
            txt_3={sectionText.txt107}
            etc={true}
          />
        </div>
      </div>
    </div>
  )
}
