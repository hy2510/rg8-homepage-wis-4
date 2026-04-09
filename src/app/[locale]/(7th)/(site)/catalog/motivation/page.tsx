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
            titleCol1="학습 동기부여 기능"
            exp={`리딩게이트는 영어 학습을 꾸준히 이어가며 실력을 향상시킬 수 있도록 동기부여와 성취감을 제공하는 다양한 기능을 제공합니다.`}
          />
          <div>
            <SubPageMainBanner imgSrc="/src/images/@about/@level-master/level_master_main_banner.png" />
            <div className={`${style.sub_page_contain} ${style.compact}`}>
              <div className={style.level_master_row1}>
                <div className={style.summary}>
                  {/* 독서 후, 북퀴즈를 통과하면 <b>도서별로 독서량과 난이도에 따른 포인트가 부여</b>됩니다. 각 레벨의 
                  목표 포인트를 달성하면 자동으로 레벨 마스터 배지를 획득하게 돼요. 레벨 마스터 배지를 획득하면 <b>인증서를 출력하여 상장</b>으로 활용할 수 있습니다. */}
                  독서 후 북퀴즈를 통과하면 학습 도서의{' '}
                  <b>독서량과 난이도에 따라 포인트가 부여</b>됩니다. 목표
                  포인트를 달성하면 레벨 마스터 배지를 얻고,{' '}
                  <b>인증서를 출력해 상장</b>으로 활용할 수 있습니다.
                </div>
                <div className={style.title}>레벨 마스터 체계</div>
                <div className={style.exp}>
                  리딩게이트의 레벨은 미국 Pre-K ~ 6th Grade 수준의 영어 실력을
                  기준으로 설정되어, 체계적인 학습을 제공합니다.
                </div>
                <div className={style.table_image_level}>
                  <Image
                    src={'/src/images/@about/@level-master/roadmap.svg'}
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
                    <div className={style.title}>레벨 마스터 진행율 확인</div>
                    <div className={style.exp}>
                      각 레벨의 레벨 마스터 목표 달성을 위한 학습 진행률을
                      실시간으로 확인하며 학습할 수 있습니다.
                    </div>
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
                    <div className={style.title}>
                      레벨 마스터 달성 및 인증서 출력
                    </div>
                    <div className={style.exp}>
                      레벨 마스터를 달성하면 배지를 획득하고 인증서(상장)를
                      출력할 수 있습니다.
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.level_master_row1}>
                <div className={style.title}>도도와 친구들</div>
                <div className={style.exp}>
                  레벨 마스터 여정을 함께하는 도도와 친구들의 퀘스트입니다.
                  포인트가 쌓일수록 친구들의 성장 스토리가 공개되며, 꿈을 이루는
                  과정을 함께할 수 있어요. 획득한 캐릭터는 학습 중 등장해 소소한
                  재미를 더해줍니다.
                </div>
                <div className={style.table_image}>
                  <Image
                    src={'/src/images/@about/@level-master/dodo_n_friends.jpg'}
                    width={1024}
                    height={300}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.level_master_row1}>
                <div className={style.title}>어워드 시스템</div>
                <div className={style.exp}>
                  20일간 매일 1권 이상 학습하면 <b>연속 학습 어워드</b>, 25일간
                  일일 목표를 누적 달성하면 <b>일일 목표 어워드</b>를 받을 수
                  있습니다. 하루를 놓쳐도 이전 어워드 날짜부터 다시 시작할 수
                  있어 학습을 포기하지 않도록 도와줍니다.
                </div>
                <div className={style.table_image}>
                  <Image
                    src={'/src/images/@about/@level-master/award.jpg'}
                    width={1024}
                    height={300}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.level_master_row1}>
                <div className={style.title}>영어 독서왕 챌린지</div>
                <div className={style.exp}>
                  매년 상·하반기에 열리는 영어독서왕 챌린지에서는 시상 기준을
                  충족한 모든 학생에게 상장과 상품을 제공합니다. 대회 참여로
                  동기부여와 실력 향상의 두 가지 효과를 얻을 수 있어요.
                </div>
                <div className={style.table_image}>
                  <Image
                    src={'/src/images/@about/@level-master/king_of_reading.jpg'}
                    width={1024}
                    height={300}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.level_master_row3}>
                <div className={style.header}>그밖에 다양한 이벤트</div>
                <div className={style.container}>
                  <div className={style.level_master_col}>
                    <div className={style.thumbnail}>
                      <Image
                        src={'/src/images/@about/@level-master/event/001.png'}
                        width={480}
                        height={305}
                        alt=""
                      />
                    </div>
                    <div className={style.text_group}>
                      <div className={style.title}>RG 슈퍼스타 선발대회</div>
                      <div className={style.exp}>
                        RG 슈퍼스타 선발대회는 아이들이 리딩게이트로 쌓은 영어
                        실력을 뽐내며 꿈과 끼를 발산하고 영어 실력을 자랑할 수
                        있는 기회를 제공합니다.
                      </div>
                    </div>
                  </div>
                  <div className={style.level_master_col}>
                    <div className={style.thumbnail}>
                      <Image
                        src={'/src/images/@about/@level-master/event/002.png'}
                        width={480}
                        height={305}
                        alt=""
                      />
                    </div>
                    <div className={style.text_group}>
                      <div className={style.title}>공식 카페 프로젝트</div>
                      <div className={style.exp}>
                        공식 카페에서는 다양한 프로젝트를 통해 아이들이 영어
                        독서 습관을 기르고 영어 실력을 향상할 수 있도록 독려하고
                        있습니다.
                      </div>
                    </div>
                  </div>
                  <div className={style.level_master_col}>
                    <div className={style.thumbnail}>
                      <Image
                        src={'/src/images/@about/@level-master/event/003.png'}
                        width={480}
                        height={305}
                        alt=""
                      />
                    </div>
                    <div className={style.text_group}>
                      <div className={style.title}>티타늄 시상식</div>
                      <div className={style.exp}>
                        리딩게이트를 꾸준히 학습하면 명예의 전당에 오를 수
                        있으며, 최고 등급인 티타늄 등급에 도달하면 상패와 혜택은
                        물론 개인 시상식에 참여할 경험도 제공합니다.
                      </div>
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
