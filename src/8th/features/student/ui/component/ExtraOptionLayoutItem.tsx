'use client'

import {
  ExtraOptionContentBodyStyle,
  ExtraOptionContentHeaderStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { TextStyle } from '@/8th/shared/ui/Misc'

/**
 * 연속학습 보기, 학습 일시 중지, 회원 탈퇴 등 하나의 옵션을 표시하는 컴포넌트
 */
export default function ExtraOptionLayoutItem({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <>
      <ExtraOptionContentHeaderStyle>
        <TextStyle fontFamily="sans" fontWeight={'bold'}>
          {title}
        </TextStyle>
      </ExtraOptionContentHeaderStyle>
      <ExtraOptionContentBodyStyle>{children}</ExtraOptionContentBodyStyle>
    </>
  )
}
