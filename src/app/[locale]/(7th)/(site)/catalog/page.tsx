'use client'

import { openWindow } from '@/7th/_function/open-window'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH, { EXTERNAL_URL } from '@/app/site-path'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const STYLE_ID = 'page_catalog'

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
  const backgroundVideo = '/src/videos/about_video_background.mp4'

  return (
    <div className={style.section_1}>
      <div className={style.side_banner}>
        <Image
          src={'/src/images/@about/section01/side_banner.png'}
          width={98}
          height={214}
          alt=""
        />
      </div>
      <div className={style.center_group}>
        <div className={style.main_title}>
          <div className={style.row_1}>
            <span className={style.txt}>시작부터</span>
            <span className={style.line}></span>
            <span className={style.txt}>완성까지</span>
          </div>
          <div className={style.row_2}>
            <span>
              문해력 잡는 <b>영어독서</b> 앱
            </span>
          </div>
          <div className={style.row_3}>
            비결은 제대로 된 <b>다독과 정독!</b>
          </div>
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
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.section_2}>
      <div className={style.hero_text}>
        <div className={style.row_1}>
          <div className={style.col_1}>
            <div className={style.txt_1}>누적 회원 수 74만명!</div>
            <div className={style.txt_2}>초등학교 영어</div>
          </div>
          <div className={style.col_2}></div>
          <div className={style.col_3}>프로그램 공급 1위</div>
        </div>
        <div className={style.row_2}>
          <div className={style.award_item}>
            <div>2019</div>
            <div>올해의</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2020</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2021</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2022</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2023</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2024</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Section3 = () => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.section_3}>
      <div className={style.col_1}></div>
      <div className={style.col_2}>
        <div className={style.txt_1}>영어 실력을 좌우하는 문해력 키우기</div>
        <div className={style.txt_2}>
          <div>‘다독과 정독’이</div>
          <div className={style.dot_box}>
            <div className={style.txt}>정답입니다</div>
            <span className={style.dot}></span>
          </div>
        </div>
        <div className={style.txt_3}>
          {/* 리딩게이트는 총 6,000여 권의 방대한 영어 원서 콘텐츠를 제공하는 국내 최대 온라인 영어도서관입니다.<br />
          수준별로 나눠진 다양한 주제의 영어 원서를 바탕으로 소리 내어 읽고 독후학습 퀴즈를 풀며 문맥과 핵심을 파악하는 능력을 키울 수 있습니다. */}
          리딩게이트는 6,000여 권의 영어 원서를 제공하는 국내 최대 온라인
          영어도서관입니다.
          <br />
          수준별 오디오 스토리북이나 원서를 읽고 퀴즈를 풀며 문맥과 핵심 파악
          능력을 키울 수 있습니다.
        </div>
      </div>
    </div>
  )
}

const Section4 = () => {
  const style = useStyle(STYLE_ID)

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

  return (
    <div className={style.section_4}>
      <div className={style.row_1}>
        <div className={style.txt_1}>다독을 위한 최적의 환경!</div>
        <div className={style.txt_2}>3,000권 이상의 오디오 스토리북</div>
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

  const isMobile = useScreenMode() === 'mobile'

  const [tabActive, setTabActive] = useState(0)

  const subPageContainData = [
    {
      title: 'Level K',
      step: [
        {
          name: 'STEP01 듣기 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step01.png',
          exp1: 'Listening Activity',
          exp2: '(소리를 듣고 알맞은 그림을 고르기)',
        },
        {
          name: 'STEP02 단어 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step02.png',
          exp1: 'Vocabulray Test',
          exp2: '(그림을 보고 올바른 단어를 고르기)',
        },
        {
          name: 'STEP03 이해력 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step03.png',
          exp1: 'Reading Comprehension',
          exp2: '(질문에 맞는 알맞은 그림을 고르기)',
        },
        {
          name: 'STEP04 문장 만들기',
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step04.png',
          exp1: 'Writing Activity',
          exp2: '(카드를 보고 순서대로 나열하기)',
        },
      ],
    },
    {
      title: 'Level 1',
      step: [
        {
          name: 'STEP01 듣기 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step01.png',
          exp1: 'Listening Activity',
          exp2: '(그림을 보고 올바른 답을 고르기)',
        },
        {
          name: 'STEP02 단어 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step02.png',
          exp1: 'Vocabulray Test',
          exp2: '(그림과 문장을 보고 올바른 단어를 고르기)',
        },
        {
          name: 'STEP03 이해력 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step03.png',
          exp1: 'Reading Comprehension',
          exp2: '(질문에 맞는 알맞은 답을 고르기)',
        },
        {
          name: 'STEP04 서머리 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step04.png',
          exp1: 'Summary Test',
          exp2: '(책 내용의 흐름에 맞게 문장을 나열하기)',
        },
        {
          name: 'STEP05 문장 만들기',
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step05.png',
          exp1: 'Writing Activity',
          exp2: '(카드를 보고 올바른 순서대로 나열하기)',
        },
      ],
    },
    {
      title: 'Level 2~6',
      step: [
        {
          name: 'STEP01 이해력 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step01.png',
          exp1: 'Reading Comprehension',
          exp2: '(질문에 맞는 알맞은 답을 고르기)',
        },
        {
          name: 'STEP02 단어 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step02.png',
          exp1: 'Vocabulray Test',
          exp2: '(단어의 뜻을 보고 단어를 입력하기)',
        },
        {
          name: 'STEP03 서머리 평가',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step03_1.png',
          exp1: 'Summary Test',
          exp2: '(책 내용의 흐름에 맞춰 문장을 나열하기)',
        },
        {
          name: 'STEP05 빈칸 채우기',
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step04.png',
          exp1: 'Cloze Test',
          exp2: '(문장을 보고 빈칸에 알맞은 답을 채우기)',
        },
      ],
    },
  ]

  const Tabs = () => {
    return (
      <div className={style.tabs}>
        <TabButton
          txt1={'Level K'}
          txt2={'초등 저학년'}
          active={tabActive === 0}
          onClick={() => {
            setTabActive(0)
          }}
        />
        <TabButton
          txt1={'Level 1'}
          txt2={'초등 고학년'}
          active={tabActive === 1}
          onClick={() => {
            setTabActive(1)
          }}
        />
        <TabButton
          txt1={'Level 2~6'}
          txt2={'중학생 이상'}
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
          <div className={style.txt_1}>제대로 된 정독 훈련!</div>
          <div className={style.txt_2}>영어 원서 북퀴즈 6,000편 이상</div>
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
              src={'/src/images/@about/section04/img_speak_mo.png'}
              width={360}
              height={523}
              alt=""
            />
          </>
        ) : (
          <>
            <Image
              src={'/src/images/@about/section04/img_speak.png'}
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

  return (
    <div className={style.section_6}>
      <div className={style.container}>
        <div className={style.col_left}>
          <div className={style.title}>
            {/* <div className={style.txt_1}>다양한</div> */}
            <div className={style.txt_2}>다양한 학습</div>
            <div className={style.txt_3}>동기부여 기능</div>
          </div>
        </div>
        <div className={style.col_right}>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/section06/img_symbol_01.png'}
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
              <div className={style.txt_2}>레벨 마스터</div>
              <div className={style.txt_3}>
                {/* 도서를 학습한 후 북퀴즈를 통과하면 포인트가 지급됩니다.
                포인트가 쌓여 레벨별 목표 포인트에 도달하면 레벨 마스터 배지를 획득할 수 있습니다.
                레벨 마스터 배지를 획득하면 인증서를 출력할 수 있으며,
                인증서를 상장으로 활용하면 성취감을 느끼고 앞으로의 학습에도 동기부여가 될 거예요. */}
                도서를 학습하고 북퀴즈를 통과하면 포인트가 지급됩니다. 목표
                포인트에 도달하면 레벨 마스터 배지와 인증서를 받을 수 있어
                성취감을 느끼고 학습 동기부여가 됩니다.
              </div>
            </div>
          </div>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/section06/img_symbol_04.png'}
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
              <div className={style.txt_2}>도도와 친구들</div>
              <div className={style.txt_3}>
                {/* 레벨 마스터로 가는 과정이 너무 멀게 느껴지지 않도록, 도도와 친구들이 함께해 줘요.
                포인트가 쌓일수록 친구들이 성장하며 꿈을 향해 나아갑니다.
                친구들의 성장을 보며 함께 힘차게 학습할 수 있어요. */}
                레벨 마스터까지 도도와 친구들이 함께하며 성장합니다. 친구들의
                성장을 보며 학습에 힘을 얻을 수 있어요.
              </div>
            </div>
          </div>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/section06/img_symbol_02.png'}
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
              <div className={style.txt_2}>학습 어워드</div>
              <div className={style.txt_3}>
                {/* 매일 꾸준한 영어 학습도 리딩게이트와 함께라면 어렵지 않아요.
                일일 목표와 연속 학습 목표를 달성하면 어워드를 획득하여 성취감을 느끼고 영어 학습 습관을 유지할 수 있어요. */}
                리딩게이트와 함께라면 매일 꾸준한 영어 학습이 쉬워집니다. 목표
                달성으로 어워드를 받아 성취감을 느끼고 학습 습관을 유지할 수
                있어요.
              </div>
            </div>
          </div>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image
                src={'/src/images/@about/section06/img_symbol_03.png'}
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
              <div className={style.txt_2}>영어독서왕 챌린지</div>
              <div className={style.txt_3}>
                {/* 매년 상·하반기에 한 번씩 영어 독서왕 선발 대회를 개최하고 있어요.
                이 대회의 특별한 점은 시상 기준을 달성한 모든 학습자가 선물을 받을 수 있다는 거예요.
                학습자들은 이 대회에 참여하면서 동기부여와 실력 향상, 두 마리 토끼를 잡을 수 있어요. */}
                매년 상·하반기에 열리는 영어 독서왕 대회는 시상 기준을 달성한
                모든 학습자가 선물을 받는 특별한 대회입니다. 참여를 통해 실력
                향상과 성취감을 동시에 얻을 수 있어요.
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

  const slideCards = [
    {
      txt1: '주간/월간 리포트',
      txt2: '매주, 매월 독서 및 학습 리포트가 알림톡으로 발송됩니다.',
      imgSrc: '/src/images/@about/section07/contents03.png',
    },
    {
      txt1: '레벨 테스트',
      txt2: '레벨 테스트로 정기적으로 학습 수준을 확인할 수 있습니다.',
      imgSrc: '/src/images/@about/section07/contents01.png',
    },
    {
      txt1: '알림 서비스',
      txt2: '학습 목표를 성취할 때마다 인증 알림톡이 발송됩니다.',
      imgSrc: '/src/images/@about/section07/contents07.png',
    },
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
        <div className={style.txt_1}>꼼꼼한</div>
        <div className={style.txt_2}>학습 케어 서비스</div>
      </div>
      <div className={style.jumbotron}>
        <div className={style.col_left}>
          <div className={style.text_group}>
            <div className={style.txt_1}>{slideCards[slideNum].txt1}</div>
            <div className={style.txt_2}>{slideCards[slideNum].txt2}</div>
          </div>
          <div className={style.arrows}>
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
          </div>
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

  const reviewData = [
    {
      title: '4살 아이! 보고 또 보니',
      post: '영어로 대답해요!',
      name: '허니* 님',
    },
    {
      title: '5살 아이! 놀이처럼 했더니',
      post: '단어가 저절로!',
      name: '팬더** 님',
    },
    {
      title: '엄마와 함께 목표를 세우고',
      post: '독후프로그램까지 으쌰으쌰!',
      name: '하나** 님',
    },
    {
      title: '수준에 맞는 eBook으로',
      post: '문제풀이까지 non-stop',
      name: '김*아 님',
    },
    {
      title: '학원 도움 없이도',
      post: '단어, 문제풀기까지 커버 가능!',
      name: '김*영님',
    },
    {
      title: '4살 아이! 보고 또 보니',
      post: '영어로 대답해요!',
      name: '허니* 님',
    },
    {
      title: '5살 아이! 놀이처럼 했더니',
      post: '단어가 저절로!',
      name: '팬더** 님',
    },
    {
      title: '엄마와 함께 목표를 세우고',
      post: '독후프로그램까지 으쌰으쌰!',
      name: '하나** 님',
    },
    {
      title: '수준에 맞는 eBook으로',
      post: '문제풀이까지 non-stop',
      name: '김*아 님',
    },
    {
      title: '학원 도움 없이도',
      post: '단어, 문제풀기까지 커버 가능!',
      name: '김*영님',
    },
    {
      title: '4살 아이! 보고 또 보니',
      post: '영어로 대답해요!',
      name: '허니* 님',
    },
    {
      title: '5살 아이! 놀이처럼 했더니',
      post: '단어가 저절로!',
      name: '팬더** 님',
    },
    {
      title: '엄마와 함께 목표를 세우고',
      post: '독후프로그램까지 으쌰으쌰!',
      name: '하나** 님',
    },
    {
      title: '수준에 맞는 eBook으로',
      post: '문제풀이까지 non-stop',
      name: '김*아 님',
    },
    {
      title: '학원 도움 없이도',
      post: '단어, 문제풀기까지 커버 가능!',
      name: '김*영님',
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
        <div className={style.txt_1}>{txt_1}</div>
        <div className={style.line}></div>
        <div className={style.txt_2}>{txt_2}</div>
        <div className={style.line}></div>
        <div className={style.txt_3}>{txt_3}</div>
      </div>
    )
  }

  return (
    <div className={style.section_8}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.txt_1}>꿈을 이룬 놀라운 경험!</div>
          <div className={style.txt_2}>생생 이용 후기</div>
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
            src="https://www.youtube.com/embed/VZE-tDzBcxA?si=ONCujaG5TnjmGvsg"
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
      <div className={style.container_2}>
        <div className={style.btn_line}>
          <Link href={SITE_PATH.HOME.CUSTOMER_STUDENT_REVIEW}>
            다른 후기 더보기
          </Link>
        </div>
      </div>
    </div>
  )
}

const Section9 = () => {
  const style = useStyle(STYLE_ID)

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
            <b>리딩게이트</b>
          </div>
          <div className={style.txt_1}>국내외 1,000여개 교육기관이 선택!</div>
          <div className={style.txt_2}>
            선생님들이 검증하고 학부모들이 인정한 제대로된 영어독서 앱
          </div>
        </div>
        <div className={style.buttons}>
          <CategoryButton
            href="/catalog/dodo-abc"
            img="/src/images/@about/section09/ico_prek_icon.svg"
            txt_1="기초 영어"
            txt_2="유치원 ~ 초등 저학년까지"
            txt_3="307편"
            etc={false}
          />
          <CategoryButton
            href="/catalog/ebook"
            img="/src/images/@about/section09/ico_ebook_icon.svg"
            txt_1="오디오 스토리북"
            txt_2="초등 저학년 ~ 성인까지"
            txt_3="3,000권 이상"
            etc={false}
          />
          <CategoryButton
            href="/catalog/pbook-quiz"
            img="/src/images/@about/section09/ico_quiz_icon.svg"
            txt_1="영어 원서 북퀴즈"
            txt_2="초등 저학년 ~ 성인까지"
            txt_3="6,000편 이상"
            etc={false}
          />
          <CategoryButton
            href="/catalog/movie-contents"
            img="/src/images/@about/section09/ico_movie_icon.svg"
            txt_1="영상 콘텐츠"
            txt_2="다양한 영어 콘텐츠로"
            txt_3="즐거운 영어"
            etc={true}
          />
          <CategoryButton
            href="/catalog/ai-speak"
            img="/src/images/@about/section09/ico_speak_icon.png"
            txt_1="AI SPEAK"
            txt_2="리딩에서 말하기까지 완성하는"
            txt_3="AI 음성 인식 프로그램"
            etc={true}
          />
          <CategoryButton
            href="/catalog/motivation"
            img="/src/images/@about/section09/ico_level_up_icon.svg"
            txt_1="학습 동기부여"
            txt_2="수준별 자기주도 학습을 위한"
            txt_3="학습 동기부여 시스템"
            etc={true}
          />
        </div>
      </div>
    </div>
  )
}
