'use client'

import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageNavBar from '../_cpnt/SubPageNavBar'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{ zIndex: 1 }}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader
            titleCol1="AI SPEAK 프로그램"
            exp={`원어민 음성을 듣고 따라 말하면 AI 음소 단위 발음 분석이 제공되어 더 효과적인 말하기 연습이 가능합니다.`}
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/@ai-speak/ai_speak_main_banner.png" />
            <div className={`${style.sub_page_contain} ${style.compact}`}>
              <div className={style.ai_speak_row1}>
                <div className={style.title}>Sight Words 단어와 문장 읽기</div>
                <div className={style.exp}>
                  기초 영어 학습 단계부터 단어와 문장을 통해 말하기 연습을 할 수
                  있습니다.
                </div>
                <div className={style.images}>
                  <Image
                    src={'/src/images/@about/@ai-speak/images02/001.png'}
                    width={300}
                    height={200}
                    alt=""
                  />
                  <Image
                    src={'/src/images/@about/@ai-speak/images02/002.png'}
                    width={300}
                    height={200}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.ai_speak_row1}>
                <div className={style.title}>eBook KC~1C 레벨 문장 읽기</div>
                <div className={style.exp}>
                  문장 발음 결과를 억양 그래프와 음소 단위 합치율로 간편하게
                  확인할 수 있습니다.
                </div>
                <div className={style.images}>
                  <Image
                    src={'/src/images/@about/@ai-speak/images01/001.png'}
                    width={300}
                    height={200}
                    alt=""
                  />
                  <Image
                    src={'/src/images/@about/@ai-speak/images01/002.png'}
                    width={300}
                    height={200}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.ai_speak_row2}>
                <div className={style.box}>
                  <div className={style.title}>Song & Chant</div>
                  <div className={style.exp}>
                    기초 영어의 Song & Chant에서 신나는 영어 동요를 듣고 따라
                    부르며 녹음할 수 있습니다.
                  </div>
                  <div className={style.image}>
                    <Image
                      src={'/src/images/@about/@ai-speak/images03/002.png'}
                      width={300}
                      height={200}
                      alt=""
                    />
                  </div>
                </div>
                <div className={style.box}>
                  <div className={style.title}>독후 단어 학습</div>
                  <div className={style.exp}>
                    모든 레벨의 단어 학습에서도 음소 단위 발음 연습이
                    가능합니다.
                  </div>
                  <div className={style.image}>
                    <Image
                      src={'/src/images/@about/@ai-speak/images03/001.png'}
                      width={300}
                      height={200}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
