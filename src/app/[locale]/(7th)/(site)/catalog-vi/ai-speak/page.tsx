'use client'

import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageNavBar from '../_cpnt/SubPageNavBar'
import { useCatalogSectionText } from '../_i18n/useCatalogText'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('ai-speak')

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{ zIndex: 1 }}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader
            titleCol1={sectionText.txt11}
            exp={sectionText.txt12}
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/@ai-speak/ai_speak_main_banner.png" />
            <div className={`${style.sub_page_contain} ${style.compact}`}>
              <div className={style.ai_speak_row1}>
                <div className={style.title} style={{ marginTop: '16px' }}>
                  {sectionText.txt13}
                </div>
                <div
                  className={
                    style.exp
                  }>{`${sectionText.txt14} ${sectionText.txt15}`}</div>
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
                <div className={style.title}>{sectionText.txt16}</div>
                <div
                  className={
                    style.exp
                  }>{`${sectionText.txt17} ${sectionText.txt18}`}</div>
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
                  <div
                    className={
                      style.exp
                    }>{`${sectionText.txt19} ${sectionText.txt20}`}</div>
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
                  <div className={style.title}>{sectionText.txt21}</div>
                  <div
                    className={
                      style.exp
                    }>{`${sectionText.txt22} ${sectionText.txt23}`}</div>
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
