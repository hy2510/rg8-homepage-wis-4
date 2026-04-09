'use client'

import style from './home-main-component.module.scss'
import { useStudentIsLogin } from '@/7th/_client/store/student/info/selector'
import { openWindow } from '@/7th/_function/open-window'
import { HomeExtraData, HomeLayout } from '@/7th/_repository/client/object/main'
import { Button, Margin, Modal } from '@/7th/_ui/common/common-components'
import { useScreenMode } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import {
  HomeMainQuickMenu,
  HomeMainQuickMenuItem,
} from './home-main-quick-menu'

type TypeQuickMenu = {
  title: string
  items: {
    title: string
    link: string
    icon: string
    bgColor: string
    option?: string
  }[]
}

// 작업 공지 띠 배너
export const NoticeBanner = ({
  children,
  bgColor,
  href,
  target,
  isExternalLink,
}: {
  children: ReactNode
  bgColor?: string
  href?: string
  target?: string
  isExternalLink?: boolean
}) => {
  const link = isExternalLink ? '#' : href ? href : ''
  return (
    <div style={{ padding: '20px 15px 0' }}>
      <Link
        href={link}
        target={isExternalLink ? undefined : target}
        onClick={
          isExternalLink
            ? (e) => {
                e.preventDefault()
                openExternalLink(href || '')
              }
            : undefined
        }>
        <div
          style={{
            backgroundColor: bgColor ? bgColor : '#85E7E6',
            textAlign: 'center',
            borderRadius: '12px',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children}
        </div>
      </Link>
    </div>
  )
}

export const QuickMenuLayout = ({
  quickmenu,
  isPaymentable = false,
}: {
  quickmenu: TypeQuickMenu
  isPaymentable?: boolean
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <HomeMainQuickMenu label={getText(t, quickmenu.title)}>
      {quickmenu.items
        .filter((menu) => {
          if (menu.option) {
            return menu.option === 'payment' && isPaymentable
          }
          return true
        })
        .map((menu, i) => {
          const title = getText(t, menu.title)
          const isExternal =
            menu.link.startsWith('http:') || menu.link.startsWith('https:')
          const href = isExternal ? '#' : menu.link
          const onClick = () => {
            openExternalLink(menu.link)
          }

          return (
            <HomeMainQuickMenuItem
              key={`quick_${i}`}
              title={title}
              href={href}
              bgColor={menu.bgColor}
              imgSrc={menu.icon}
              target={undefined}
              onClick={isExternal ? onClick : undefined}
            />
          )
        })}
    </HomeMainQuickMenu>
  )
}

export function HomeMainCard({
  data,
  extra,
  isEnabledTicket,
}: {
  data: HomeLayout
  extra: HomeExtraData
  isEnabledTicket: boolean
}): ReactNode {
  // @Language 'common'
  const { t } = useTranslation()

  const type = data.type

  if (type === 'newsboard') {
    return (
      <RgNesNoticeCard
        titleText={getText(t, data.title)}
        moreText={getText(t, data.sub)}
        notice={extra.notice}
      />
    )
  } else if (type === 'image') {
    return <ImageCard href={data.link} bgImage={data.image} />
  } else if (type === 'basic') {
    const isExternal =
      data.link?.startsWith('http:') || data.link?.startsWith('https:')
    const onClick = isExternal ? openExternalLink : undefined
    return (
      <BasicCard
        title={getText(t, data.title)}
        txtColor={data.titleColor}
        sub={getText(t, data.sub)}
        subColor={data.subColor}
        comment={getText(t, data.comment)}
        commentColor={data.commentColor}
        bgColor={data.bgColor}
        bgImage={data.icon}
        href={data.link}
        target={undefined}
        onOpenUrl={onClick}
      />
    )
  } else if (type === 'customer-center') {
    return (
      <CustomerSupportCard title={data.title} link={data.link} cs={data.cs} />
    )
  } else if (type === 'channel') {
    return (
      <ChannelCard
        title1={getText(t, data.title)}
        title2={getText(t, data.title2)}
        linkTxt1={getText(t, data.linkText)}
        link1={data.link}
        linkTxt2={getText(t, data.linkText2)}
        link2={data.link2}
        bgColor={data.bgColor}
        bgImage={data.icon}
      />
    )
  } else if (type === 'donation') {
    return <DonationCard link={data.link || ''} donation={extra.campaign} />
  } else if (type === 'pri-rg-partnership') {
    return <HomePartnership />
  } else if (type === 'sch-rg-partnership') {
    return <HomePartnershipSchool />
  } else if (type === 'pri-rg-shop') {
    return <HomeBannerRgShop shoplink={data.link} workbooklink={data.link2} />
  } else if (type === 'pri-rg-membership') {
    return <HomeBannerRgMembership isEnabledTicket={isEnabledTicket} />
  } else if (type === 'vn-rg-membership') {
    return <HomeBannerRgMembershipVn isEnabledTicket={isEnabledTicket} />
  }
  return type
}

// 공지사항 카드
const RgNesNoticeCard = ({
  titleText = 'Notice',
  moreText = 'more',
  notice = [],
}: {
  titleText?: string
  moreText?: string
  notice?: { title: string; link?: string; date?: string; self?: boolean }[]
}) => {
  return (
    <RgNewsTable titleText={titleText} moreText={moreText}>
      {notice.map((content) => {
        return (
          <RgNewsTableItem
            key={content.link}
            title={content.title}
            date={content.date}
            href={content.link}
            target={content.self ? '' : '_blank'}
          />
        )
      })}
    </RgNewsTable>
  )
}

// 기본 카드
const BasicCard = ({
  title,
  txtColor,
  sub,
  subColor,
  comment,
  commentColor,
  bgColor,
  bgImage,
  href,
  target,
  onOpenUrl,
}: {
  children?: ReactNode
  title: string
  txtColor?: string
  sub?: string
  subColor?: string
  comment?: string
  commentColor?: string
  bgColor?: string
  bgImage?: string
  href?: string
  target?: string
  onOpenUrl?: (url: string) => void
}) => {
  const card = (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: bgColor,
      }}>
      <div
        className={`${style.home_banner}`}
        style={{
          height: '100%',
          color: txtColor ? txtColor : '#000',
          backgroundImage: `url(${bgImage})`,
        }}>
        <div>
          {sub ? (
            <div
              className={style.sub}
              style={{ color: subColor ? subColor : '#000' }}>
              {sub}
            </div>
          ) : null}
          <div className={style.title}>{title}</div>
          {comment ? (
            <div
              className={`${style.comment} ${style.txt_white}`}
              style={{
                color: commentColor ? commentColor : '#999',
                opacity: '0.8',
              }}>
              {comment}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
  if (href) {
    const isExternal = !!onOpenUrl
    return (
      <Link
        href={isExternal ? '#' : href}
        target={target}
        style={{ display: 'block', height: '100%' }}
        onClick={
          isExternal
            ? (e) => {
                e.preventDefault()
                if (onOpenUrl) {
                  onOpenUrl(href)
                }
              }
            : undefined
        }>
        {card}
      </Link>
    )
  }
  return <>{card}</>
}

// 이미지 카드
const ImageCard = ({
  bgColor,
  bgImage,
  href,
  target,
}: {
  bgColor?: string
  bgImage?: string
  href?: string
  target?: string
}) => {
  const card = (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: bgColor ? bgColor : '#fff',
        backgroundImage: `url(${bgImage})`,
      }}></div>
  )

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        style={{ display: 'block', height: '100%' }}>
        {card}
      </Link>
    )
  }
  return <>{card}</>
}

// 개인회원 굿즈
export const HomeBannerRgShop = ({
  shoplink = '#',
  workbooklink = '#',
}: {
  shoplink?: string
  workbooklink?: string
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  const card = (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}>
      <div
        className={`${style.home_banner} ${style.bg_top}`}
        style={{
          height: '100%',
          backgroundImage: `url('/src/images/@home/shop/goods.png')`,
        }}>
        <div>
          <div className={style.title}>{t('t888')}</div>
        </div>
        <div className={style.home_banner_buttons}>
          <Link
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              openExternalLink(shoplink)
            }}>
            <div className={style.option_button}>
              <Image
                src="/src/images/@home/shop/shop.svg"
                width={20}
                height={20}
                alt=""
              />
              <span>{t('t889')}</span>
            </div>
          </Link>
          <Link
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              openExternalLink(workbooklink)
            }}>
            <div className={style.option_button}>
              <Image
                src="/src/images/@home/shop/workbook.svg"
                width={20}
                height={20}
                alt=""
              />
              <span>{t('t890')}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
  return <>{card}</>
}

// 멤버쉽
const HomeBannerRgMembership = ({
  isEnabledTicket,
}: {
  isEnabledTicket?: boolean
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const isMobile = useScreenMode() === 'mobile'
  const [viewModal, _viewModal] = useState(false)
  const isLogin = useStudentIsLogin()

  return (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}>
      <div
        className={`${style.home_banner} ${style.bg_top}`}
        style={{
          height: '100%',
          backgroundImage: `url('/src/images/@home/payment/symbol.png')`,
        }}>
        <div>
          <div className={style.title}>{t('t891')}</div>
          <div
            className={style.link}
            onClick={() => {
              viewModal ? _viewModal(false) : _viewModal(true)
            }}>
            {t('t892')}
          </div>
          {viewModal && (
            <Modal
              header={true}
              title={''}
              compact={false}
              onClickDelete={() => {
                _viewModal(false)
              }}
              onClickLightbox={() => {
                _viewModal(false)
              }}>
              <iframe
                width={'100%'}
                frameBorder="0"
                scrolling="no"
                src={
                  isMobile
                    ? '/src/html/page-contents/mobile/rg-membership/membership_pop01.html'
                    : '/src/html/page-contents/pc/rg-membership/membership_pop01.html'
                }
                style={{
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  overflow: 'hidden',
                  height: '73vh',
                }}
              />
              <Margin height={20} />
              <div style={{ width: '300px', margin: 'auto' }}>
                <Button
                  shadow
                  onClick={() => {
                    if (isLogin) {
                      router.push(SITE_PATH.HOME.MEMBERSHIP_PAYMENT)
                    } else {
                      // 로그인이 안 된 상태에서만 실행
                      // 한국어 : 이용권 안내 로그인 또는 회원가입 후 이용 가능합니다. 로그인(회원가입) 하시겠습니까?
                      // 영어 : Access to the subscription information is available after logging in or signing up. Would you like to log in or sign up?
                      // 베트남어 : Thông tin về gói dịch vụ sẽ có sẵn sau khi bạn đăng nhập hoặc đăng ký tài khoản. Bạn có muốn đăng nhập hoặc đăng ký không?
                      if (
                        confirm(
                          '이용권 안내는 로그인 또는 회원가입 후 이용하실 수 있습니다. 로그인(회원가입)을 진행하시겠습니까?',
                        )
                      ) {
                        router.push(SITE_PATH.ACCOUNT.MAIN)
                      }
                    }
                  }}>
                  {t('t334')}
                </Button>
              </div>
              <Margin height={30} />
            </Modal>
          )}
        </div>
        <div className={style.home_banner_buttons}>
          <Link href="/home/rg-membership/payment/purchase">
            <div className={style.option_button}>
              <Image
                src="/src/images/@home/payment/subscription.svg"
                width={20}
                height={20}
                alt=""
              />
              <span>{t('t893')}</span>
            </div>
          </Link>
          {isEnabledTicket && (
            <Link href="/home/rg-membership/payment/ticket">
              <div className={style.option_button}>
                <Image
                  src="/src/images/@home/payment/ticket.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <span>{t('t894')}</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const HomeBannerRgMembershipVn = ({
  isEnabledTicket,
}: {
  isEnabledTicket?: boolean
}) => {
  return (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}>
      <div
        className={`${style.home_banner} ${style.bg_top}`}
        style={{
          height: '100%',
          backgroundImage: `url('/src/images/@home/payment/symbol.png')`,
        }}>
        <div>
          <div className={style.title}>RG MEMBERSHIP</div>
        </div>
        <div className={style.home_banner_buttons}>
          <Link href="/home/rg-membership/payment/purchase">
            <div className={style.option_button}>
              <Image
                src="/src/images/@home/payment/subscription.svg"
                width={20}
                height={20}
                alt=""
              />
              <span>Mua Quyền sử dụng</span>
            </div>
          </Link>
          {isEnabledTicket && (
            <Link href="/home/rg-membership/payment/ticket">
              <div className={style.option_button}>
                <Image
                  src="/src/images/@home/payment/ticket.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <span>Kích hoạt voucher</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

//파트너쉽
const HomePartnership = () => {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div
      className={style.home_banner}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}>
      <div className={style.home_partnership} style={{ height: '100%' }}>
        <div className={style.row}>
          <div className={style.title}>{t('t905')}</div>
          <div className={style.partner_banner_group}>
            <Link
              href={'#'}
              onClick={(e) => {
                e.preventDefault()
                openExternalLink('https://woodo.onelink.me/NHC1/ejr31tcv')
              }}>
              <div className={`${style.partner_banner} ${style.woodo}`}></div>
            </Link>
          </div>

          <div className={style.title}>{t('t906')}</div>
          <div className={style.partner_banner_group}>
            <Link
              href={'#'}
              onClick={(e) => {
                e.preventDefault()
                openExternalLink('https://www.millie.co.kr/')
              }}>
              <div className={`${style.partner_banner} ${style.millie}`}></div>
            </Link>
          </div>

          {/* <div className={style.title}>{'스토리텔 제휴'}</div>
          <div className={style.partner_banner_group}>
            <Link href={'https://www.storytel.com/kr'} target="_blank">
              <div
                className={`${style.partner_banner} ${style.storytel}`}></div>
            </Link>
          </div> */}

          <div className={style.title}>{'차이홍 중국어 체험 제휴'}</div>
          <div className={style.partner_banner_group}>
            <Link
              href={'#'}
              onClick={(e) => {
                e.preventDefault()
                openExternalLink('https://www.caihong.co.kr/info/child')
              }}>
              <div className={`${style.partner_banner} ${style.caihong}`}></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const HomePartnershipSchool = () => {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div
      className={style.home_banner}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}>
      <div className={style.home_partnership} style={{ height: '100%' }}>
        <div className={style.row}>
          <div className={style.title}>{t('t905')}</div>
          <div className={style.partner_banner_group}>
            <Link
              href={'#'}
              onClick={(e) => {
                e.preventDefault()
                openExternalLink('https://woodo.onelink.me/NHC1/ejr31tcv')
              }}>
              <div className={`${style.partner_banner} ${style.woodo}`}></div>
            </Link>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.title}>{t('t906')}</div>
          <div className={style.partner_banner_group}>
            <Link
              href={'#'}
              onClick={(e) => {
                e.preventDefault()
                openExternalLink('https://www.millie.co.kr/')
              }}>
              <div className={`${style.partner_banner} ${style.millie}`}></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Cafe, Blog 등 광고 카드
const ChannelCard = ({
  title1,
  title2,
  linkTxt1,
  link1,
  linkTxt2,
  link2,
  bgColor,
  bgImage,
}: {
  title1?: string
  title2?: string
  href?: string
  linkTxt1?: string
  linkTxt2?: string
  link1?: string
  link2?: string
  bgColor?: string
  bgImage?: string
}) => {
  return (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: bgColor,
      }}>
      <div
        className={`${style.home_banner} ${style.txt_white}`}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}>
        <div>
          <div className={`${style.title} ${style.mg_bottom_none}`}>
            {title1}
          </div>
          <div className={`${style.title} ${style.txt_yellow}`}>{title2}</div>
          <Link
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              openExternalLink(link1 || '')
            }}>
            <div
              className={`${style.link} ${style.txt_white}`}
              style={{ marginBottom: '10px' }}>
              {linkTxt1}
            </div>
          </Link>
          {linkTxt2 ? (
            <Link
              href={'#'}
              onClick={(e) => {
                e.preventDefault()
                openExternalLink(link2 || '')
              }}>
              <div className={`${style.link} ${style.txt_white}`}>
                {linkTxt2}
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

// 다독다독 캠페인 카드
const DonationCard = ({
  link,
  donation,
}: {
  link: string
  donation: number
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#C92343',
        backgroundImage: 'url("/src/images/@home/donation/campaign_bg.png")',
      }}>
      <div className={`${style.home_banner} ${style.txt_white}`}>
        <div>
          <div className={`${style.title} ${style.mg_bottom_none}`}>
            {t('t912')}
          </div>
          <div className={`${style.title}`}>{t('t913')}</div>
          <Link
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              openExternalLink(link)
            }}>
            <div
              className={`${style.link} ${style.txt_white}`}
              style={{ marginBottom: '10px' }}>
              {t('t914')}
            </div>
          </Link>
          <div className={`${style.donation}`}>
            <span className={`${style.unit}`}>{'₩'}</span>
            <span
              className={`${style.value}`}>{`${NumberUtils.toBigNumberString(donation * 1)}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 고객센터 카드
const CustomerSupportCard = ({
  title,
  link,
  cs,
}: {
  title?: string
  link?: string
  cs?: { label: string; link: string; icon?: string; color?: string }[]
}) => {
  const isMobile = useScreenMode() === 'mobile'
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div
      className={style.ad_banner_type_4}
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}>
      <div className={style.home_banner}>
        <div>
          {!isMobile && (
            <div style={{ marginBottom: '10px' }}>
              <Image
                src="/src/images/@home/logo_color_full.svg"
                width={275}
                height={36}
                alt=""
                style={{ width: 'auto', height: '20px' }}
              />
            </div>
          )}
          <Link
            href={'#'}
            onClick={(e) => {
              e.preventDefault()
              openExternalLink(link || '')
            }}>
            <div className={`${style.title} ${style.title_link}`}>
              {getText(t, title)}
            </div>
          </Link>
        </div>
        <div className={style.customer_center_menu_list}>
          {cs?.map((item) => {
            return (
              <Link
                key={`${item.link}_${item.label}`}
                href={'#'}
                onClick={(e) => {
                  e.preventDefault()
                  openExternalLink(item.link)
                }}>
                <div
                  className={`${style.menu_item}`}
                  style={{ backgroundColor: item.color || undefined }}>
                  <span>{getText(t, item.label)}</span>
                  <div
                    style={{
                      position: 'absolute',
                      right: '8px',
                      bottom: '0',
                      width: '50px',
                      height: '50px',
                      backgroundPosition: 'center',
                      backgroundSize: '50px auto',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: `url("${item.icon}")` || undefined,
                    }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 공지사항 테이블 리스트 아이템
const RgNewsTableItem = ({
  title,
  date,
  href,
  target,
}: {
  title: string
  date?: string
  href?: string
  target?: string
}) => {
  return (
    <Link
      href={href ? href : ''}
      className={style.rg_news_table_item}
      target={target ? target : '_self'}>
      <div className={style.title}>{title}</div>
      <div className={style.date}>{date}</div>
    </Link>
  )
}
// 공지사항 테이블 컨테이너
const RgNewsTable = ({
  titleText,
  moreText,
  children,
}: {
  titleText: string
  moreText: string
  children?: ReactNode
}) => {
  return (
    <div className={style.rg_news_table} style={{ width: '100%' }}>
      <div className={style.header}>
        <div className={style.label}>{titleText}</div>
        <Link href="/home/main/rg-news/notice">
          <div className={style.more_button}>{moreText}</div>
        </Link>
      </div>
      {children}
    </div>
  )
}

// 문자열을 반환한다. 문자열이 리소스이면 리소스로 변환하여 반환한다.
function getText(t: (text: string) => string | undefined, text?: string) {
  const ret = text || ''
  if (text && text.startsWith('t@')) {
    const findText = t(text.substring(2))
    return findText || text
  }
  return ret
}

function openExternalLink(url: string) {
  openWindow(url, {
    external: true,
    target: '_blank',
  })
}
