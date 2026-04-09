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
      imgSrc: '/src/images/@about/@dodo-abc/row1_alphabet.gif',
      title: '알파벳',
      exp: '도도와 다락방의 친구들의 애니메이션을 보며, 알파벳 26개의 대소문자를 구분하고, 각 음가와 단어를 배울 수 있습니다. 재미있는 에피소드 영상과 함께, 게임 형식의 단계별 액티비티로 알파벳을 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row2_phonics.gif',
      title: '파닉스',
      exp: '도도와 별의별 잡화점, 참나무 숲의 요정들 애니메이션을 통해 50개의 음가를 배울 수 있습니다. 게임 형식의 단계별 액티비티로 파닉스를 재미있게 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row3_sight_words.gif',
      title: '사이트 워드',
      exp: '도도가 에드몽 왕자와 친구들을 만나는 스토리 애니메이션을 보며, 사이트워드와 패턴 문장을 배울 수 있습니다. 재미있는 에피소드 영상과 함께, 사이트워드를 활용한 초등 교과 과정의 패턴 문장을 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row4_song_n_chant.gif',
      title: '송 & 챈트',
      exp: '도도와 친구들이 부르는 신나는 노래를 듣고, 직접 녹음도 해볼 수 있는 흥미로운 콘텐츠입니다.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row5_game.gif',
      title: '게임',
      exp: '재미있는 게임도 즐기고, 단어도 외울 수 있는 일석이조의 효과를 경험해 보세요.',
    },
  ]

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{ zIndex: 1 }}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader
            titleCol1="기초 영어 프로그램"
            exp="도도와 친구들의 모험을 통해 Alphabet, Phonics, Sight Words를 재미있게 학습할 수 있습니다."
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/@dodo-abc/dodo_abc_main_banner.png" />
            <SubPageContain subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
