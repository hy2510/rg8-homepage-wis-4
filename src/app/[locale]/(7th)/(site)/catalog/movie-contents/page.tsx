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
      imgSrc: '/src/images/@about/@movie-contents/thumbnail/001.png',
      title: '무비북',
      exp: '영어를 처음 접하는 학습자들이 영어를 친숙하고 즐겁게 접근할 수 있도록 낮은 레벨에서 선별한 400여 편의 원서들을 무비북으로 만들었습니다. 책 읽기와 병행하여 Listening에도 활용할 수 있습니다.',
    },
    {
      imgSrc: '/src/images/@about/@movie-contents/thumbnail/002.png',
      title: '코믹 애니북',
      exp: '국내 유명 웹툰작가들과 함께 신나는 모험과 우정 등을 다룬 코믹 애니 시리즈들은 문자, 그림, 애니메이션, 음성 등을 통한 생생하고 사실적인 언어 사용으로 영어 학습 효과를 높일수 있습니다.',
    },
    {
      imgSrc: '/src/images/@about/@movie-contents/thumbnail/003.png',
      title: '너서리 라임 & 챈트송',
      exp: '도도와 친구들이 주인공인 너서리라임과 챈트송을 신나는 율동과 함께 따라 부르며 즐겁게 영어를 시작할 수 있습니다. 특히, 반복되는 라임과 구조로 되어 있어 영어의 리듬을 자연스럽게 익힐 수 있습니다.',
    },
    {
      imgSrc: '/src/images/@about/@movie-contents/thumbnail/004.png',
      title: '캐릭터 스토리',
      exp: '마법 소녀 도도가 먼나먼 행성의 왕자 에드몽을 만나기 위해 여행을 하면서 친구들을 사귀면서 겪는 여러 에피소드들이 펼쳐집니다.',
    },
    {
      imgSrc: '/src/images/@about/@movie-contents/thumbnail/005.png',
      title: '풍부한 액티비티',
      exp: '영어를 시작하는 학습자들이 보다 쉽게 영어를 익힐 수 있도록 놀이 활동과 영어 학습을 접목한 액비티비 콘텐츠들을 제공하여 학습 효과를 높여 주고 있습니다.',
    },
  ]

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{ zIndex: 1 }}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader
            titleCol1="영상 콘텐츠"
            exp="영어 원서뿐 아니라 애니메이션, 액티비티, 너서리라임 등 다양한 영어 콘텐츠로 영어가 즐거워집니다!"
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/@movie-contents/movie_contents_main_banner.png" />
            <SubPageContain subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
