'use client'

import { useFetchUpdateStudentContinuousStudyViewType } from '@/7th/_client/store/student/continuous-study/hook'
import { useStudentContinuousStudy } from '@/7th/_client/store/student/continuous-study/selector'
import { CheckBox } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'

const STYLE_ID = 'page_account_info'

export default function StreakViewMethod() {
  // @language 'common'
  const { t } = useTranslation()
  const style = useStyle(STYLE_ID)

  const continuousStudy = useStudentContinuousStudy()
  const isViewModeNewType = continuousStudy.isViewModeNewType

  const { fetch: changeContinuousViewType } =
    useFetchUpdateStudentContinuousStudyViewType()

  const onToggleContinuousStudyViewType = () => {
    const nextViewMode = isViewModeNewType ? '6' : '7'
    changeContinuousViewType({ viewType: nextViewMode })
  }

  return (
    <div className={style.streak_view_method}>
      <div
        className={style.txt_1}
        style={{ cursor: 'pointer' }}
        onClick={onToggleContinuousStudyViewType}>
        <CheckBox check={isViewModeNewType} />
        {/* 연속학습 어워드 보기 */}
        {t('t575')}
      </div>
      {/* 보기를 선택하면 20일 단위로 획득한 연속 학습 어워드와 누적 기록을 확인할 수 있습니다. 선택하지 않으면 어워드와 누적 기록은 표시되지 않고, 현재 진행중인 실제 연속 학습 일수만 표시됩니다. */}
      <div className={style.txt_2}>{t('t576')}</div>
    </div>
  )
}
