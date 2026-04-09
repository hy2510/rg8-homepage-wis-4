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
  const sectionText = useCatalogSectionText('ebook')

  const subPageContainData = [
    {
      imgSrc: '/src/images/@about/@ebook/row1_ka_1.png',
      label: sectionText.txt1,
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
      exp: sectionText.txt2,
    },
    {
      imgSrc: '/src/images/@about/@ebook/row2_1a_1.png',
      label: sectionText.txt3,
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
      exp: sectionText.txt4,
    },
    {
      imgSrc: '/src/images/@about/@ebook/row3_2a.gif',
      label: sectionText.txt5,
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
      exp: sectionText.txt6,
    },
    {
      imgSrc: '/src/images/@about/@ebook/row4_3a.gif',
      label: sectionText.txt7,
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
      exp: sectionText.txt8,
    },
  ]

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{ zIndex: 1 }}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader titleCol1={sectionText.txt9} exp={sectionText.txt10} />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/vi/@ebook/ebook_main_banner.png" />
            <SubPageContain subPageContainData={subPageContainData} />
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}
