import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const STYLE_ID = 'home_main_quick_menu'

export const HomeMainQuickMenu = ({
  children,
  label,
}: {
  children?: ReactNode
  label: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.home_main_quick_menu}>
      <div className={style.label}>{label}</div>
      <div className={style.menu}>{children}</div>
    </div>
  )
}

export const HomeMainQuickMenuItem = ({
  title,
  bgColor,
  imgSrc = '',
  href,
  target,
  onClick,
}: {
  title: string
  href: string | '#'
  bgColor?: string
  imgSrc?: string
  target?: string
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <Link
      href={href ? href : ''}
      target={target || '_self'}
      onClick={
        href === '#'
          ? (e) => {
              e.preventDefault()
              if (onClick) {
                onClick()
              }
            }
          : undefined
      }>
      <div className={style.home_main_quick_menu_item}>
        <span
          className={style.icon_box}
          style={{ backgroundColor: bgColor ? bgColor : '#E8EBED' }}>
          <Image src={imgSrc} width={20} height={20} alt="" />
        </span>
        <span>{title}</span>
      </div>
    </Link>
    // <div className={style.row_2}>
    //   <div className={style.label}>자주 찾는 메뉴</div>
    //   <div className={style.menu_box}>
    //     <Link href='/home/user-guide'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#E8EBED'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/find.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>학습 이용 방법</span>
    //       </div>
    //     </Link>
    //     <Link href='/ranking'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#FFF3BB'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/star.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           랭킹
    //         </span>
    //       </div>
    //     </Link>
    //     <Link href='/home/main/rg-news/new-contents/'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#D9F8FF'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/new_book.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           신규 도서
    //         </span>
    //       </div>
    //     </Link>
    //     <Link href='/home/rg-membership/payment/purchase'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#D9F8FF'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/payment.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           이용권 구매하기
    //         </span>
    //       </div>
    //     </Link>
    //     <Link href='https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1' target='_blank'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#E8F1FF'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/work_book.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           워크북 구매하기
    //         </span>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
  )
}
