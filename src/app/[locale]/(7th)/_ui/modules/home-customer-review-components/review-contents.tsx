import { Button } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { ReactNode } from 'react'
import { Board, BoardHeader, BoardItem } from './board'

const STYLE_ID = 'review_contents'

export function ReviewContents({
  children,
  no,
  title,
  name,
  date,
  viewCount,
  onClickBackToList,
  onClickGoToList,
}: {
  children?: ReactNode
  no: string
  title: string
  name: string
  date: string
  viewCount?: number
  onClickBackToList?: () => void
  onClickGoToList?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.review_contents}>
      <Board>
        <BoardHeader
          txt_th1={''}
          txt_th2={t('t451')} // 제목
          txt_th3={t('t232')} // 이름
          txt_th4={t('t452')} // 날짜
        />
        <BoardItem txt_td1={no} txt_td2={title} txt_td3={name} txt_td4={date} />
      </Board>
      <div className={style.contents}>{children}</div>
      <div className={style.group_back_button}>
        {/* <Button color={"red"} width={"150px"}>
          수정
        </Button> */}
        <Button color={'gray'} width={'150px'} onClick={onClickBackToList}>
          {/* 뒤로가기 */}
          {t('t453')}
        </Button>
        <Button color={'blue'} width={'150px'} onClick={onClickGoToList}>
          {/* 목록보기 */}
          {t('t454')}
        </Button>
      </div>
    </div>
  )
}
