'use client'

import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SubPageContain from '../_cpnt/SubPageContain'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageNavBar from '../_cpnt/SubPageNavBar'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)

  const subPageContainData = [
    {
      imgSrc: '/src/images/@about/@ebook/row1_ka_1.png',
      label: '초등 저학년 수준',
      title: 'Level K',
      level: [
        {
          name: 'KA',
          imgSrc: [
            '/src/images/@about/@ebook/row1_ka_1.png',
            '/src/images/@about/@ebook/row1_ka_2.png',
            '/src/images/@about/@ebook/row1_ka_3.png',
          ],
        },
        {
          name: 'KB',
          imgSrc: [
            '/src/images/@about/@ebook/row1_kb_1.png',
            '/src/images/@about/@ebook/row1_kb_2.png',
            '/src/images/@about/@ebook/row1_kb_3.png',
          ],
        },
        {
          name: 'KC',
          imgSrc: [
            '/src/images/@about/@ebook/row1_kc_1.png',
            '/src/images/@about/@ebook/row1_kc_2.png',
            '/src/images/@about/@ebook/row1_kc_3.png',
          ],
        },
      ],
      exp: '페이지마다 그림과 1~3개의 짧은 문장이 나오는 가장 기본적인 그림책입니다. 문장 구조나 단어를 잘 몰라도, 제공되는 음원과 그림을 통해 영어 환경에 자연스럽게 노출될 수 있도록 제작되었습니다.',
    },
    {
      imgSrc: '/src/images/@about/@ebook/row2_1a_1.png',
      label: '초등 고학년 수준',
      title: 'Level 1',
      level: [
        {
          name: '1A',
          imgSrc: [
            '/src/images/@about/@ebook/row2_1a_1.png',
            '/src/images/@about/@ebook/row2_1a_2.png',
            '/src/images/@about/@ebook/row2_1a_3.png',
          ],
        },
        {
          name: '1B',
          imgSrc: [
            '/src/images/@about/@ebook/row2_1b_1.png',
            '/src/images/@about/@ebook/row2_1b_2.png',
            '/src/images/@about/@ebook/row2_1b_3.png',
          ],
        },
        {
          name: '1C',
          imgSrc: [
            '/src/images/@about/@ebook/row2_1c_1.png',
            '/src/images/@about/@ebook/row2_1c_2.png',
            '/src/images/@about/@ebook/row2_1c_3.png',
          ],
        },
      ],
      exp: '코믹북, 세계 명작, 유명 원서, 논픽션 등 다양한 종류의 책으로 구성되어 있습니다. 조금 더 복잡한 문장과 다양한 표현이 등장하며, 스토리의 흐름을 따라 자연스럽게 문맥을 파악할 수 있도록 제작되었습니다.',
    },
    {
      imgSrc: '/src/images/@about/@ebook/row3_2a.gif',
      label: '중학생 수준',
      title: 'Level 2',
      level: [
        {
          name: '2A',
          imgSrc: [
            '/src/images/@about/@ebook/row3_2a_1.png',
            '/src/images/@about/@ebook/row3_2a_2.png',
            '/src/images/@about/@ebook/row3_2a_3.png',
          ],
        },
        {
          name: '2B',
          imgSrc: [
            '/src/images/@about/@ebook/row3_2b_1.png',
            '/src/images/@about/@ebook/row3_2b_2.png',
            '/src/images/@about/@ebook/row3_2b_3.png',
          ],
        },
        {
          name: '2C',
          imgSrc: [
            '/src/images/@about/@ebook/row3_2c_1.png',
            '/src/images/@about/@ebook/row3_2c_2.png',
            '/src/images/@about/@ebook/row3_2c_3.png',
          ],
        },
      ],
      exp: '본격적인 챕터북부터 미국 어린이 소설 등 난도가 높은 책들로 구성되어 있습니다. 독해력 강화 단계를 위해, 점점 그림 없이 스스로 텍스트를 읽고 이해하기 어려운 표현도 맥락 속에서 유추할 수 있도록 제작되었습니다.',
    },
    {
      imgSrc: '/src/images/@about/@ebook/row4_3a.gif',
      label: '고등학생 ~ 성인',
      title: 'Level 3~6',
      level: [
        {
          name: '3',
          imgSrc: [
            '/src/images/@about/@ebook/row4_3a_1.png',
            '/src/images/@about/@ebook/row4_3a_2.png',
            '/src/images/@about/@ebook/row4_3a_3.png',
          ],
        },
        {
          name: '4',
          imgSrc: [
            '/src/images/@about/@ebook/row4_4a_1.png',
            '/src/images/@about/@ebook/row4_4a_2.png',
            '/src/images/@about/@ebook/row4_4a_3.png',
          ],
        },
        {
          name: '5',
          imgSrc: [
            '/src/images/@about/@ebook/row4_5a_1.png',
            '/src/images/@about/@ebook/row4_5a_2.png',
            '/src/images/@about/@ebook/row4_5a_3.png',
          ],
        },
        {
          name: '6',
          imgSrc: [
            '/src/images/@about/@ebook/row4_6a_1.png',
            '/src/images/@about/@ebook/row4_6a_2.png',
            '/src/images/@about/@ebook/row4_6a_3.png',
          ],
        },
      ],
      exp: '자유로운 영어 독서를 위한 마지막 단계로, 대입 수능 수준의 소설, 문학, 비문학 등으로 구성되어 있습니다. 이를 통해 영어권에서 소통하기 위한 다양한 지식을 습득할 수 있습니다.',
    },
  ]

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{ zIndex: 1 }}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader
            titleCol1="오디오 스토리북"
            exp="리딩게이트의 오디오 스토리북은 해외 유명 출판사의 대표 원서, 국내 창작동화 번역본, 자체 개발 콘텐츠로 구성되어 있습니다."
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/@ebook/ebook_main_banner.png" />
            <SubPageContain subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
