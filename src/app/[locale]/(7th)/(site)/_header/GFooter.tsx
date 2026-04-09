'use client'

import {
  useApplicationType,
  useDevicePlatform,
} from '@/7th/__root/ApplicationContext'
import { useStudentIsLogin } from '@/7th/_client/store/student/info/selector'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/7th/_context/CustomerContext'
import { openWindow } from '@/7th/_function/open-window'
import ChooseLanguage from '@/7th/_ui/common/ChooseLanguage'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'

const STYLE_ID = 'global_footer'

const RG_CUSTOMER_CENTER_TEL = '1599-0533'
const RG_FAX_TEL = '070-8266-8660'
const RG_CUSTOMER_EMAIL = 'rgmanager@readinggate.com'

// 공통하단
export default function Gfooter() {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'

  const { target, custom } = useSiteBlueprint()
  const appType = useApplicationType()
  const logOnStatus = useStudentIsLogin()

  if (appType === 'app' && !logOnStatus) {
    return <></>
  }
  return (
    <div className={style.g_footer}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-m)' }}>
          <ChooseLanguage
            align="left"
            optionLanguages={custom?.footer?.supportLanguage}
          />
        </div>
        {target.private && <PrivateFooter />}
        {target.school && <SchoolFooter />}
        {target.academy && <AcademyFooter />}
        <div style={{ height: isMobile ? '30px' : '15px' }}></div>
      </div>
    </div>
  )
}

function PrivateFooter() {
  const { country } = useSiteBlueprint()
  if (country.vietnam) {
    return <PrivateVnFooter />
  }
  return <PrivateKrFooter />
}

function PrivateKrFooter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const platform = useDevicePlatform()
  const isLogin = useStudentIsLogin()
  const customer = useCustomerInfo()
  const address = `${customer.address} ${customer.detailAddress}`
  const subInfos: { text: string; href?: string; label?: string }[] = [
    { text: t('t551') },
    { text: t('t552') },
    { text: t('t553') },
    {
      text: `${t('t554')} : `,
      href: `tel:${RG_CUSTOMER_CENTER_TEL}`,
      label: RG_CUSTOMER_CENTER_TEL,
    },
    { text: `FAX : ${RG_FAX_TEL}` },
    {
      text: 'Mail : ',
      href: `mailto:${RG_CUSTOMER_EMAIL}`,
      label: RG_CUSTOMER_EMAIL,
    },
  ]

  const isShowGroupSearchLink =
    !isLogin && platform !== 'Android' && platform !== 'iOS'

  return (
    <>
      <div className={style.row_b}>
        <a href={SITE_PATH.HOME.MAIN}>
          <div>{t('t028')}</div>
        </a>
        <Link href={SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM}>
          <div>{t('t297')}</div>
        </Link>
        <Link href={SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY}>
          <div>{t('t299')}</div>
        </Link>
        {isShowGroupSearchLink && (
          <Link href={SITE_PATH.ACCOUNT.GROUP_SEARCH}>
            <div>{t('t259') + ' ' + t('t231')}</div>
          </Link>
        )}
        <Link href={SITE_PATH.CATALOG.HOME}>Catalog</Link>
        <Link
          href={'#'}
          target=""
          onClick={(e) => {
            e.preventDefault()
            openWindow('https://character.readinggate.com/', {
              external: true,
              target: '_blank',
            })
          }}>
          <div>{`DODO & Friends`}</div>
        </Link>
        <Link
          href={'#'}
          target=""
          onClick={(e) => {
            e.preventDefault()
            openWindow(
              'https://util.readinggate.com/Community/BringInInstitution',
              {
                external: true,
                target: '_blank',
              },
            )
          }}>
          <div>{t('t420')}</div>
        </Link>
      </div>
      <div className={style.row_c}>
        <div style={{ marginBottom: '10px' }}>{address}</div>
        <div>
          {subInfos.map((item, i) => {
            const isLastItem = subInfos.length - 1 === i
            return (
              <span key={`i_${i}`}>
                {`${item.text}`}
                {item.href ? <Link href={item.href}>{item.label}</Link> : <></>}
                {!isLastItem && ` ㅣ `}
              </span>
            )
          })}
        </div>
      </div>
    </>
  )
}

function PrivateVnFooter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const address = `Tầng 1 tòa nhà số 165 Nguyễn Văn Trỗi, phường 1, quận Phú Nhuận, TP.HCM`
  const VN_CUSTOMER_TEL = '028-7303-9199'
  const VN_CUSTOMER_MEAIL = 'supportvn@vn-readinggate.com'

  const subInfos: { text: string; href?: string; label?: string }[] = [
    { text: `CEO: Ông Trịnh Thế Phong` },
    { text: `${t('t552')}: 0315641991` },
    {
      text: `${t('t554')} : `,
      href: `tel:${VN_CUSTOMER_TEL}`,
      label: VN_CUSTOMER_TEL,
    },
    {
      text: 'Mail : ',
      href: `mailto:${VN_CUSTOMER_MEAIL}`,
      label: VN_CUSTOMER_MEAIL,
    },
  ]
  return (
    <>
      <div className={style.row_b}>
        <a href={SITE_PATH.HOME.MAIN}>
          <div>{t('t028')}</div>
        </a>
        <Link href={SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM}>
          <div>{t('t297')}</div>
        </Link>
        <Link href={SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY}>
          <div>{t('t299')}</div>
        </Link>
        <Link href={SITE_PATH.CATALOG_VI.HOME}>Catalog</Link>
      </div>
      <div className={style.row_c}>
        <div style={{ marginBottom: '10px' }}>{address}</div>
        <div>
          {subInfos.map((item, i) => {
            const isLastItem = subInfos.length - 1 === i
            return (
              <span key={`i_${i}`}>
                {`${item.text}`}
                {item.href ? <Link href={item.href}>{item.label}</Link> : <></>}
                {!isLastItem && ` ㅣ `}
              </span>
            )
          })}
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <a href="http://online.gov.vn/Website/chi-tiet-59891">
          <Image
            alt=""
            title=""
            width="240"
            height="91"
            src={`https://wcfresource.a1edu.com/newsystem/7th/home/etc/logo-sale-noti.png`}
          />
        </a>
      </div>
    </>
  )
}

function SchoolFooter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()
  const { customerCenterUrl, custom } = useSiteBlueprint()
  const customerName = useCustomerInfo().name

  return (
    <>
      <div className={style.row_b}>
        {custom?.footer?.hideHome !== true && (
          <a href={SITE_PATH.HOME.MAIN}>
            <div>{t('t028')}</div>
          </a>
        )}
        <Link href={customerCenterUrl} target="_blank">
          <span>{t('t321')}</span>
        </Link>
        <Link href={SITE_PATH.HOME.MEMBERSHIP_SCHOOL_PRIVACY_POLICY}>
          <div>{t('t299')}</div>
        </Link>
      </div>
      <div className={style.row_b}>
        <h3>{customerName}</h3>
      </div>
      <div className={style.row_c}>
        <RgServiceInform />
      </div>
    </>
  )
}

function AcademyFooter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { customerCenterUrl, custom } = useSiteBlueprint()
  const customer = useCustomerInfo()
  const address = `${customer.address} ${customer.detailAddress}`

  return (
    <>
      <div className={style.row_b}>
        {custom?.footer?.hideHome !== true && (
          <a href={SITE_PATH.HOME.MAIN}>
            <div>{t('t028')}</div>
          </a>
        )}
        <Link href={customerCenterUrl} target="_blank">
          <span>{t('t321')}</span>
        </Link>
      </div>
      <div className={style.row_b}>
        <h3>{customer.name}</h3>
      </div>
      <div className={style.row_c}>
        <div>{address}</div>
        <br />
        {customer.telephone && (
          <div>
            <span>
              {`${t('t554')} : `} {/* 대표번호 */}
              <Link href={`tel:${customer.telephone}`}>
                {customer.telephone}
              </Link>
            </span>
          </div>
        )}
        {/* <RgServiceInform /> */}
      </div>
    </>
  )
}

function RgServiceInform() {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div>
      {`${t('t555')} `} {/* 리딩게이트 고객센터 */}
      <Link href={`tel:${RG_CUSTOMER_CENTER_TEL}`}>
        {RG_CUSTOMER_CENTER_TEL}
      </Link>
      {' (평일 09:00~18:00 / 점심시간 12:30~13:30)'}
    </div>
  )
}
