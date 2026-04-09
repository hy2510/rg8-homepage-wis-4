import { Button } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'

const STYLE_ID = 'home_main_log_in'

export default function LogIn({
  isLogin,
  onClick,
}: {
  isLogin: boolean
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.log_in}>
      <div className={style.row_1}>
        <div className={style.group_1}>
          <div className={style.txt_1}>{t('t455')}</div>
          <div className={style.txt_1}>{t('t456')}</div>
        </div>
        {/* <div className={style.txt_2}>{t('t206')}</div> */}
        <Image
          src="/src/images/@home/logo_full.svg"
          width={182}
          height={24}
          alt=""
          style={{ width: '150px', height: 'auto', marginTop: '10px' }}
        />
      </div>
      <div className={style.row_2}>
        <div className={style.group_1}>
          <Link href={''}>
            <Button
              color={'red'}
              shadow
              onClick={(e) => {
                e?.preventDefault()
                onClick && onClick()
              }}>
              {!isLogin ? t('t214') : t('t457')}
            </Button>
          </Link>
        </div>

        <div className={style.position_img_1}>
          {/* <FlyChild /> */}
          <Image
            alt=""
            src="/src/images/@home/img_dodo_book.png"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  )
}
