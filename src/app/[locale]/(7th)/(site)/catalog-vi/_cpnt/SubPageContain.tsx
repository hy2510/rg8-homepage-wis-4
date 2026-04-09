'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const STYLE_ID = 'page_catalog'

interface SubPageDataItemLevel {
  name: string
  imgSrc: string[]
}

interface SubPageDataItem {
  imgSrc: string
  label?: string
  title: string
  level?: SubPageDataItemLevel[]
  exp?: string
}

interface SubPageContainProps {
  subPageContainData: SubPageDataItem[]
}

export default function SubPageContain({
  subPageContainData,
}: SubPageContainProps) {
  const style = useStyle(STYLE_ID)

  const data = [...subPageContainData]

  return (
    <div className={`${style.sub_page_contain} ${style.compact}`}>
      {data.map((a, i) => {
        return <ContainView key={a.title} subPageData={a} />
      })}
    </div>
  )
}

function ContainView({ subPageData }: { subPageData: SubPageDataItem }) {
  const style = useStyle(STYLE_ID)

  const [level, setLevel] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const imageLength = subPageData.level
    ? subPageData.level[level].imgSrc.length
    : 0

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setImgIndex((prevIndex) => (prevIndex + 1) % imageLength)
        setFade(true)
      }, 200)
    }, 3000)
    return () => clearInterval(timer)
  }, [imageLength])

  return (
    <>
      <div className={style.row}>
        <div className={style.col_left}>
          <div className={style.thumbnail}>
            {subPageData.level ? (
              <Image
                src={subPageData.level[level].imgSrc[imgIndex]}
                width={530}
                height={300}
                alt=""
                className={fade ? 'slide-in-right' : 'slide-out-left'}
              />
            ) : (
              <Image src={subPageData.imgSrc} width={530} height={300} alt="" />
            )}
            {subPageData.level && <div className={style.bar}></div>}
          </div>
        </div>
        <div className={style.col_right}>
          <div>
            {subPageData.label && (
              <div className={style.col_right_label}>{subPageData.label}</div>
            )}
            <div className={style.col_right_title}>{subPageData.title}</div>
          </div>
          {subPageData.level ? (
            <div className={style.col_right_levels}>
              {subPageData.level?.map((lv, i) => {
                return (
                  <span
                    key={lv.name}
                    className={`${style.level_item} ${level === i && style.active}`}
                    onClick={() => {
                      setLevel(i)
                    }}>
                    {lv.name}
                  </span>
                )
              })}
            </div>
          ) : (
            <></>
          )}
          <div className={style.col_right_exp}>{subPageData.exp}</div>
        </div>
      </div>
      <div className={style.line}></div>
    </>
  )
}
