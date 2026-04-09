'use client'

import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SubPageContainPbookQuiz from '../_cpnt/SubPageContainPbookQuiz'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageNavBar from '../_cpnt/SubPageNavBar'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)

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
          name: 'STEP04 써머리',
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
          name: 'STEP03 써머리',
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

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{ zIndex: 1 }}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader
            titleCol1="영어 원서"
            titleCol2="북퀴즈"
            exp="학습 도서를 읽은 후 독서 이해도를 확인할 수 있는 셀프 테스트 퀴즈를 제공합니다. 오디오 스토리북 퀴즈 3,000여 세트와 종이책 퀴즈 3,000여 세트가 포함되어 있습니다."
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/@pbook-quiz/pbook_quiz_main_banner.png" />
            <SubPageContainPbookQuiz subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
