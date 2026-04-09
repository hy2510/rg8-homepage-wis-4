'use client'

import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { VIETNAMESE } from '@/localization/localize-config'
import DateUtils from '@/util/date-utils'

export default function PaymentStudentInfo({ STYLE_ID }: { STYLE_ID: string }) {
  // @Language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const style = useStyle(STYLE_ID)

  const student = useStudentInfo()
  let studyEndDate = ''
  if (student.studyEndDate) {
    let endDate: Date | undefined = undefined
    if (
      student.studyEndDate.length === 8 ||
      student.studyEndDate.length === 10
    ) {
      endDate = DateUtils.createDate(student.studyEndDate)
    }
    if (endDate) {
      endDate.setDate(endDate.getDate() - 1)
      if (language === VIETNAMESE) {
        studyEndDate = `${endDate.getDate()}. ${endDate.getMonth() + 1}. ${endDate.getFullYear()}`
      } else {
        studyEndDate = DateUtils.toStringDate(endDate, {
          divide: '.',
          digitfix: false,
        })
      }
    }
  }

  return (
    <div className={style.user_info_bar}>
      <div className={style.user_name}>{student.name}</div>
      <div className={style.period}>
        {/* 남은 학습기간  일 */}
        {`${t('t671')} ${student.studyEndDay} ${t('t672')}`}
      </div>
      {student.studyEndDay > 0 && (
        <div className={style.end_date}>
          {language === VIETNAMESE
            ? `${t('t673')} ${studyEndDate}`
            : `${studyEndDate} ${t('t673')}`}
        </div> // 에 종료
      )}
    </div>
  )
}
