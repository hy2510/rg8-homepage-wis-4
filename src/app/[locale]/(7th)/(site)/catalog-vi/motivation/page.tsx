'use client'

import { Margin } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import SubPageHeader from '../_cpnt/SubPageHeader'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageNavBar from '../_cpnt/SubPageNavBar'
import { useCatalogSectionText } from '../_i18n/useCatalogText'

const STYLE_ID = 'page_catalog'
const createHtmlMarkup = (html: string) => ({ __html: html })

export default function Page() {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('motivation')

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
            <SubPageMainBanner imgSrc="/src/images/@about/vi/@level-master/level_master_main_banner.png" />
            <div className={`${style.sub_page_contain} ${style.compact}`}>
              <div className={style.level_master_row1}>
                <div className={style.summary}>
                  {/* 독서 후, 북퀴즈를 통과하면 <b>도서별로 독서량과 난이도에 따른 포인트가 부여</b>됩니다. 각 레벨의 
                  목표 포인트를 달성하면 자동으로 레벨 마스터 배지를 획득하게 돼요. 레벨 마스터 배지를 획득하면 <b>인증서를 출력하여 상장</b>으로 활용할 수 있습니다. */}
                  <span
                    dangerouslySetInnerHTML={createHtmlMarkup(
                      `${sectionText.txt13} ${sectionText.txt14} ${sectionText.txt15} ${sectionText.txt16}`,
                    )}
                  />
                </div>
                <div className={style.title}>{sectionText.txt17}</div>
                <div
                  className={
                    style.exp
                  }>{`${sectionText.txt18} ${sectionText.txt19}`}</div>
                <div className={style.table_image_level}>
                  <Image
                    src={'/src/images/@about/vi/@level-master/roadmap.svg'}
                    width={1024}
                    height={200}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.level_master_row2}>
                <div className={style.level_master_col}>
                  <div className={style.thumbnail}>
                    <Image
                      src={'/src/images/@about/@level-master/point.png'}
                      width={480}
                      height={305}
                      alt=""
                    />
                  </div>
                  <div className={style.text_group}>
                    <div className={style.title}>{sectionText.txt20}</div>
                    <div
                      className={
                        style.exp
                      }>{`${sectionText.txt21} ${sectionText.txt22}`}</div>
                  </div>
                </div>
                <div className={style.level_master_col}>
                  <div className={style.thumbnail}>
                    <Image
                      src={'/src/images/@about/@level-master/certificate.png'}
                      width={480}
                      height={305}
                      alt=""
                    />
                  </div>
                  <div className={style.text_group}>
                    <div className={style.title}>{sectionText.txt23}</div>
                    <div
                      className={
                        style.exp
                      }>{`${sectionText.txt24} ${sectionText.txt25}`}</div>
                  </div>
                </div>
              </div>
              <div className={style.level_master_row1}>
                <div className={style.title}>{sectionText.txt26}</div>
                <div
                  className={
                    style.exp
                  }>{`${sectionText.txt27} ${sectionText.txt28} ${sectionText.txt29} ${sectionText.txt30}`}</div>
                <div className={style.table_image}>
                  <Image
                    src={
                      '/src/images/@about/vi/@level-master/dodo_n_friends.png'
                    }
                    width={1024}
                    height={300}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.level_master_row1}>
                <div className={style.title}>{sectionText.txt31}</div>
                <div className={style.exp}>
                  <span
                    dangerouslySetInnerHTML={createHtmlMarkup(
                      `${sectionText.txt32} ${sectionText.txt33} ${sectionText.txt34} ${sectionText.txt35}`,
                    )}
                  />
                </div>
                <div className={style.table_image}>
                  <Image
                    src={'/src/images/@about/vi/@level-master/award.jpg'}
                    width={1024}
                    height={300}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.level_master_row1}>
                <div className={style.title}>{sectionText.txt36}</div>
                <div
                  className={
                    style.exp
                  }>{`${sectionText.txt37} ${sectionText.txt38} ${sectionText.txt39}`}</div>
                <div className={style.table_image}>
                  <Image
                    src={
                      '/src/images/@about/vi/@level-master/king_of_reading.png'
                    }
                    width={1024}
                    height={300}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.level_master_row3}>
                <div className={style.header}>{sectionText.txt40}</div>
                <div className={style.container}>
                  <div className={style.level_master_col}>
                    <div className={style.thumbnail}>
                      <Image
                        src={
                          '/src/images/@about/vi/@level-master/event/001.png'
                        }
                        width={480}
                        height={305}
                        alt=""
                      />
                    </div>
                    <div className={style.text_group}>
                      <div className={style.title}>{sectionText.txt41}</div>
                      <div
                        className={
                          style.exp
                        }>{`${sectionText.txt42} ${sectionText.txt43} ${sectionText.txt44}`}</div>
                    </div>
                  </div>
                  <div className={style.level_master_col}>
                    <div className={style.thumbnail}>
                      <Image
                        src={
                          '/src/images/@about/vi/@level-master/event/002.png'
                        }
                        width={480}
                        height={305}
                        alt=""
                      />
                    </div>
                    <div className={style.text_group}>
                      <div className={style.title}>{sectionText.txt45}</div>
                      <div
                        className={
                          style.exp
                        }>{`${sectionText.txt46} ${sectionText.txt47} ${sectionText.txt48}`}</div>
                    </div>
                  </div>
                  <div className={style.level_master_col}>
                    <div className={style.thumbnail}>
                      <Image
                        src={
                          '/src/images/@about/vi/@level-master/event/003.png'
                        }
                        width={480}
                        height={305}
                        alt=""
                      />
                    </div>
                    <div className={style.text_group}>
                      <div className={style.title}>{sectionText.txt49}</div>
                      <div
                        className={
                          style.exp
                        }>{`${sectionText.txt50} ${sectionText.txt51} ${sectionText.txt52}`}</div>
                    </div>
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
