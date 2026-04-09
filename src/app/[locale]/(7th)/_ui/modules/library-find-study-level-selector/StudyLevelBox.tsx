import { useStyle } from '@/7th/_ui/context/StyleContext'
import { ReactNode } from 'react'

const STYLE_ID = 'study_level_selector'
export default function StudyLevelBox({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)
  return <div className={style.study_level_selector}>{children}</div>
}
