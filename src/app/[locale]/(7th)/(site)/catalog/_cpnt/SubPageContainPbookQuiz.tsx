'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import { useState } from 'react'

const STYLE_ID = 'page_catalog'

interface SubPageDataItem {
  title: string
  step?: SubPageDataItemLevel[]
}

interface SubPageDataItemLevel {
  name: string
  imgSrc: string
  exp1: string
  exp2: string
}

interface SubPageContainProps {
  subPageContainData: SubPageDataItem[]
}

export default function SubPageContainPbookQuiz({
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

  const [step, setStep] = useState(0)

  return (
    <>
      <div className={style.pbook_quiz_row}>
        <div className={style.title}>{subPageData.title}</div>
        <div className={style.tabs}>
          {subPageData.step?.map((s, i) => {
            return (
              <div
                key={s.name}
                className={`${style.btn_tab} ${step === i && style.active}`}
                onClick={() => {
                  setStep(i)
                }}>
                {s.name}
              </div>
            )
          })}
        </div>
        <div className={style.imgage_contain}>
          {subPageData.step?.map((s, i) => {
            return (
              <>
                {step === i && (
                  <Image src={s.imgSrc} width={598} height={450} alt="" />
                )}
              </>
            )
          })}
        </div>
        <div>
          {subPageData.step?.map((b, i) => {
            return (
              <>
                {step === i && (
                  <>
                    <div className={style.exp1}>{b.exp1}</div>
                    <div className={style.exp2}>{b.exp2}</div>
                  </>
                )}
              </>
            )
          })}
        </div>
      </div>
      <div className={style.line}></div>
    </>
  )
}
