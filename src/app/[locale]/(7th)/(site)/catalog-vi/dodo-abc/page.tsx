'use client'

import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SubPageContain from '../_cpnt/SubPageContain'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageNavBar from '../_cpnt/SubPageNavBar'
import { useCatalogSectionText } from '../_i18n/useCatalogText'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('dodo-abc')

  const subPageContainData = [
    {
      imgSrc: '/src/images/@about/@dodo-abc/row1_alphabet.gif',
      title: sectionText.txt1,
      exp: sectionText.txt2,
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row2_phonics.gif',
      title: sectionText.txt3,
      exp: sectionText.txt4,
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row3_sight_words.gif',
      title: sectionText.txt5,
      exp: sectionText.txt6,
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row4_song_n_chant.gif',
      title: sectionText.txt7,
      exp: sectionText.txt8,
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row5_game.gif',
      title: sectionText.txt9,
      exp: sectionText.txt10,
    },
  ]

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
            <SubPageMainBanner imgSrc="/src/images/@about/vi/@dodo-abc/dodo_abc_main_banner.png" />
            <SubPageContain subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
