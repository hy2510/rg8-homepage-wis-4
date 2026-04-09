'use client'

import {
  useFetchAdjustChange,
  useFetchAdjustHistory,
} from '@/7th/_client/store/payment/adjust/hook'
import { useStudentHistory } from '@/7th/_client/store/student/history/selector'
import { useFetchReloadStudentStudyState } from '@/7th/_client/store/student/info/hook'
import { useStudentStudyable } from '@/7th/_client/store/student/info/selector'
import { AdjustHistory } from '@/7th/_repository/client/object/adjust-history'
import { Modal } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import { useEffect, useState } from 'react'

const STYLE_ID = 'page_account_info'

export default function StudySuspend() {
  const { loading: isReloadStudentStudyLoading, fetch: reloadStudentStudy } =
    useFetchReloadStudentStudyState()
  const { loading, fetch } = useFetchAdjustHistory()
  const isLoading = isReloadStudentStudyLoading || loading

  const [payload, setPayload] = useState<AdjustHistory[] | undefined>(undefined)

  const onReloadAdjustHistory = (isInit?: boolean) => {
    fetch({
      callback: (isSuccess, payload) => {
        if (isSuccess) {
          setPayload(payload)
        }
      },
    })
    if (!isInit) {
      reloadStudentStudy({})
    }
  }

  useEffect(() => {
    onReloadAdjustHistory(true)
  }, [])

  if (isLoading || !payload) {
    return <div></div>
  }
  return (
    <SuspendView
      payload={payload}
      onReloadAdjustHistory={onReloadAdjustHistory}
    />
  )
}

function SuspendView({
  payload,
  onReloadAdjustHistory,
}: {
  payload: AdjustHistory[]
  onReloadAdjustHistory?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { loading, fetch } = useFetchAdjustChange()
  const [isShowSettingModal, setShowSettingModal] = useState(false)

  const { isStudyEnd, value: studyState } = useStudentStudyable()
  const studentHistory = useStudentHistory().payload

  let latestPauseDate = undefined
  if (payload.length > 0) {
    const latestPause = payload[payload.length - 1]
    latestPauseDate = DateUtils.toStringDate(
      DateUtils.createDate(latestPause.startDate),
    )
  }

  let isSuspendPauseActive = false
  let suspendTitle = t('t577') // 학습 일시중지를 이용할 수 없습니다.
  if (studyState === 'PAUSED') {
    suspendTitle = t('t578') // 현재 일시중지 상태입니다.
  } else if (!isStudyEnd && studyState !== 'END' && payload.length < 3) {
    suspendTitle = t('t579') // 학습 일시중지가 가능합니다.
    isSuspendPauseActive = true
  }

  if (isSuspendPauseActive && studentHistory.length === 1) {
    const className = studentHistory[0].className.toUpperCase()
    const exceptionCaseClass = [
      '신규회원반',
      '도치맘형제반',
      '에듀팡체험반',
      '서포터즈반',
      '채터스마케터반',
      '쑥쑥체험반',
      '도치맘체험반',
      'GS체험반',
      'CJ체험반',
      '셰익스피어공구반',
      '명예의전당',
      '명예의전당_W',
      'TRIAL',
    ]
    if (exceptionCaseClass.includes(className)) {
      isSuspendPauseActive = false
      suspendTitle = t('t580') // 무료체험 기간에는 학습 일시중지를 이용할 수 없습니다.
    }
  }

  const onShowSuspendSettingPopup = () => {
    if (studyState === 'PAUSED' && payload.length > 0) {
      const latestPause = payload[payload.length - 1]
      const nowDateString = DateUtils.toStringDate(new Date())
      if (
        nowDateString ===
        DateUtils.toStringDate(DateUtils.createDate(latestPause.startDate))
      ) {
        alert(t('t581')) // 일시중지를 신청한 당일은 일시중지 해제가 불가능합니다.
        return
      }
    }
    setShowSettingModal(true)
  }

  const onSuspendAction = () => {
    const isRequestPause = studyState !== 'PAUSED'
    fetch({
      isRequestPause,
      callback: (isSuccess) => {
        if (isSuccess) {
          onReloadAdjustHistory && onReloadAdjustHistory()
          if (isRequestPause) {
            alert(
              t('t582'), // 학습 일시중지가 신청되었습니다. 지금부터 학습이 불가능합니다.
            )
          } else {
            alert(
              t('t583'), // 학습 일시중지가 해제되었습니다. 지금부터 학습을 시작할 수 있습니다.
            )
          }
          setShowSettingModal(false)
        } else {
          alert(t('t584')) // 학습 일시중지 변경에 실패하였습니다.
        }
      },
    })
  }

  const suspendMessages = t('t588').split('\n')

  return (
    <>
      <div className={style.suspend_view}>
        <div className={style.txt_1}>{suspendTitle}</div>
        <div className={style.txt_2}>
          {payload && payload.length > 0 && (
            <>
              {/* 총 3회 중 ${payload.length}회 일시중지하였습니다. */}
              <div>{t('t585', { num: payload.length })}</div>
              {payload.map((item, idx) => {
                return (
                  <div
                    key={`${item.startDate}-${item.endDate}`}>{`• ${idx + 1}${idx + 1 == 1 ? 'Time' : 'Times'}: ${DateUtils.toStringDate(DateUtils.createDate(item.startDate))} ~ ${DateUtils.toStringDate(DateUtils.createDate(item.endDate))}`}</div>
                )
              })}
            </>
          )}
        </div>
        {/* 1) 매년 3회씩 사용할 수 있습니다. (ex: 매년 1월 1일 3회 재생성)\n 2) 1회 신청 시 최대30일 중지가 가능하며, 일시중지 기간동안 학습일수는 차감되지 않습니다.\n 3)  일시 중지 기간안에도 해지하여 다시 학습이 가능합니다. (단, 중지 신청 당일 해지불가. 익일부터 해지가능)\n 4) 일시 중지 상태에서는 티켓등록 및 학습일 결제가 되지 않습니다. */}
        <div className={style.txt_3}>
          {suspendMessages.map((msg, i) => {
            return (
              <span key={`msg_${i}`}>
                {msg}
                <br />
              </span>
            )
          })}
        </div>

        <div></div>

        {studyState === 'PAUSED' && (
          // 일시중지 해제
          <div
            className={style.btn_link}
            onClick={() => onShowSuspendSettingPopup()}>
            {t('t590')}
          </div>
        )}
        {isSuspendPauseActive && (
          // 일시중지 신청
          <div
            className={style.btn_link}
            onClick={() => onShowSuspendSettingPopup()}>
            {t('t591')}
          </div>
        )}
      </div>
      {isShowSettingModal && (
        <SuspendSettingModal
          currentPause={studyState === 'PAUSED'}
          onConfirmClick={() => {
            onSuspendAction()
          }}
          onCancelClick={() => setShowSettingModal(false)}
        />
      )}
    </>
  )
}

function SuspendSettingModal({
  currentPause,
  onConfirmClick,
  onCancelClick,
}: {
  currentPause: boolean
  onConfirmClick?: () => void
  onCancelClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <Modal
      onClickLightbox={() => onCancelClick && onCancelClick()}
      compact
      header
      // 학습 일시 중지 해제   학습 일시 중지 신청
      title={currentPause ? t('t592') : t('t593')}>
      <div className={style.suspend_setting_modal}>
        {currentPause ? (
          // 학습 일시중지를 해제하면 오늘부터 잔여학습일수가 차감됩니다. 학습은 일시중지 해제 이후 즉시 가능합니다. 학습 일시중지를 해제하시겠습니까?
          <div>{t('t594')}</div>
        ) : (
          // 학습 일시중지는 유료회원에 한하여 아이디당 연 3회까지 사용할 수 있으며 1회 신청시 자동으로 30일 중지되고, 기간 종료 익일부터 자동으로 잔여 학습일수가 차감됩니다. 학습 일시중지를 신청한 당일에는 해지를 할 수 없습니다. 학습을 중지하시겠습니까?
          <div>{t('t595')}</div>
        )}
        <div className={style.buttons}>
          {/* 예 */}
          <div
            className={style.btn_light}
            onClick={() => onConfirmClick && onConfirmClick()}>
            {t('t130')}
          </div>
          {/* 아니오 */}
          <div
            className={style.btn_light}
            onClick={() => onCancelClick && onCancelClick()}>
            {t('t131')}
          </div>
        </div>
      </div>
    </Modal>
  )
}
