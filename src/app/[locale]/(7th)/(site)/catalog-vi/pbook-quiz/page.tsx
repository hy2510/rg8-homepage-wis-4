'use client'

import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SubPageContainPbookQuiz from '../_cpnt/SubPageContainPbookQuiz'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageNavBar from '../_cpnt/SubPageNavBar'
import { useCatalogSectionText } from '../_i18n/useCatalogText'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('pbook-quiz')

  const subPageContainData = [
    {
      title: 'Level K',
      step: [
        {
          name: sectionText.txt1,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step01.png',
          exp1: 'Listening Activity',
          exp2: sectionText.txt2,
        },
        {
          name: sectionText.txt3,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step02.png',
          exp1: 'Vocabulray Test',
          exp2: sectionText.txt4,
        },
        {
          name: sectionText.txt5,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step03.png',
          exp1: 'Reading Comprehension',
          exp2: sectionText.txt6,
        },
        {
          name: sectionText.txt7,
          imgSrc: '/src/images/@about/@pbook-quiz/row1_k_step04.png',
          exp1: 'Writing Activity',
          exp2: sectionText.txt8,
        },
      ],
    },
    {
      title: 'Level 1',
      step: [
        {
          name: sectionText.txt1,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step01.png',
          exp1: 'Listening Activity',
          exp2: sectionText.txt9,
        },
        {
          name: sectionText.txt3,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step02.png',
          exp1: 'Vocabulray Test',
          exp2: sectionText.txt10,
        },
        {
          name: sectionText.txt5,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step03.png',
          exp1: 'Reading Comprehension',
          exp2: sectionText.txt11,
        },
        {
          name: sectionText.txt12,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step04.png',
          exp1: 'Summary Test',
          exp2: sectionText.txt13,
        },
        {
          name: sectionText.txt14,
          imgSrc: '/src/images/@about/@pbook-quiz/row2_1_step05.png',
          exp1: 'Writing Activity',
          exp2: sectionText.txt15,
        },
      ],
    },
    {
      title: 'Level 2~6',
      step: [
        {
          name: sectionText.txt16,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step01.png',
          exp1: 'Reading Comprehension',
          exp2: sectionText.txt11,
        },
        {
          name: sectionText.txt3,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step02.png',
          exp1: 'Vocabulray Test',
          exp2: sectionText.txt17,
        },
        {
          name: sectionText.txt18,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step03_1.png',
          exp1: 'Summary Test',
          exp2: sectionText.txt19,
        },
        {
          name: sectionText.txt20,
          imgSrc: '/src/images/@about/@pbook-quiz/row3_2_step04.png',
          exp1: 'Cloze Test',
          exp2: sectionText.txt21,
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
            titleCol1={sectionText.txt22}
            titleCol2={sectionText.txt23}
            exp={sectionText.txt24}
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/vi/@pbook-quiz/pbook_quiz_main_banner.png" />
            <SubPageContainPbookQuiz subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
