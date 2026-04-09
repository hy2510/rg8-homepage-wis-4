'use client'

import { useFetchRegistTicket } from '@/7th/_client/store/payment/ticket/hook'
import { useStudentInfoMainPhone } from '@/7th/_client/store/student/info/selector'
import { Button, Modal } from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import PayerInfo from './PayerInfo'
import PaymentStudentInfo from './PaymentStudentInfo'
import TicketInput from './TicketInput'

const STYLE_ID = 'page_ticket'

const EMPTY_TICKET = ['', '', '', '']
const MAX_TICKET = 2

export default function Ticket({
  isChangeUserInfo = true,
}: {
  isChangeUserInfo?: boolean
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const [isPolicyAgree, setPolicyAgree] = useState(!isChangeUserInfo)
  const [tickets, setTickets] = useState<{ id: string; ticket: string[] }[]>([
    { id: 'id0', ticket: [...EMPTY_TICKET] },
  ])

  const { fetch: fetchRegist, loading: registLoading } = useFetchRegistTicket()
  const [registResult, setRegistResult] = useState<
    { ticket: string; code: number }[] | undefined
  >(undefined)
  const [isRegistLoading, setRegistLoading] = useState(false)

  const userPhone = useStudentInfoMainPhone()

  const onRegistTicketClick = () => {
    if (!isPolicyAgree) {
      alert(t('t709')) // 티켓을 등록하기 위해서는 개인정보 수집에 동의하셔야 합니다.
      return
    }

    if (!userPhone) {
      // alert('전화번호를 등록해야 티켓등록이 가능합니다.')
      // return
    }

    const ticket: string[] = tickets.map((item) => {
      return item.ticket.reduce((previous, current) =>
        current ? `${previous}-${current}` : previous,
      )
    })
    let isTicketCheck = ticket[0].length === 19
    if (isTicketCheck) {
      for (let i = 1; i < ticket.length; i++) {
        if (ticket[i] !== '' && ticket[i].length !== 19) {
          isTicketCheck = false
          break
        }
      }
    }
    if (!isTicketCheck) {
      alert(t('t710')) // 입력한 티켓번호가 잘못되었습니다. 다시 확인해 주세요.
      return
    }

    const ticketSet = new Set<string>(ticket)
    if (ticket.length > 1 && ticket.length !== ticketSet.size) {
      alert(t('t711')) // 중복된 티켓번호를 입력할 수 없습니다.
      return
    }

    setRegistLoading(true)
    fetchRegist({
      tickets: ticket.filter((ticketNum) => !!ticketNum),
      callback: (isSuccess, result) => {
        if (!isSuccess) {
          const newTicket: { id: string; ticket: string[] }[] = []
          result?.result.forEach((item, idx) => {
            if (item.code !== 0) {
              newTicket.push({
                id: `id${idx + Math.random()}`,
                ticket: [...item.ticket.split('-')],
              })
            }
          })
          setRegistResult(result?.result)
          setTickets(newTicket)
        } else {
          setTickets([{ id: `id${Math.random()}`, ticket: [...EMPTY_TICKET] }])
          alert(t('t712')) // 이용권 등록이 완료되었습니다.
        }
        setRegistLoading(false)
      },
    })
  }
  const isRegistButtonActive = isPolicyAgree && !!userPhone

  return (
    <div className={style.ticket}>
      <PaymentStudentInfo STYLE_ID={STYLE_ID} />
      <div className={style.page_container}>
        <div className={style.col_left}>
          <div className={style.ticket_input_field}>
            <div className={style.section_title}>
              {/* 티켓 등록 */}
              {t('t713')}
            </div>
            <div className={style.txt_comment}>
              {/* 티켓번호를 가지고 있는 경우, 입력해 주세요. */}
              {t('t714')}
            </div>
            {tickets.map((item, i) => {
              return (
                <TicketInput
                  key={`${item.id}`}
                  STYLE_ID={STYLE_ID}
                  defaultValue={item.ticket}
                  onChange={(texts) => {
                    const newTickets = [...tickets]
                    newTickets[i].ticket = [...texts]
                    setTickets(newTickets)
                  }}
                />
              )
            })}
            {tickets.length < MAX_TICKET && (
              <Button
                onClick={() => {
                  if (tickets.length < MAX_TICKET) {
                    const newTickets = [...tickets]
                    newTickets.push({
                      id: `item${Math.random()}`,
                      ticket: [...EMPTY_TICKET],
                    })
                    setTickets(newTickets)
                  }
                }}
                color="dark">
                {/* 티켓 추가 입력 */}
                {`+ ${t('t715')}`}
              </Button>
            )}
          </div>
          <PayerInfo
            STYLE_ID={STYLE_ID}
            isChangeUserInfo={isChangeUserInfo}
            onPolicyAgreeChange={(checked) => {
              setPolicyAgree(checked)
            }}
          />
          <div className={style.payment_method}>
            <Button
              shadow
              color={isRegistButtonActive ? 'blue' : 'gray'}
              onClick={onRegistTicketClick}>
              {/* 티켓 등록하기 */}
              {t('t716')}
            </Button>
          </div>
        </div>
        <div className={style.col_right}>
          <div className={style.ticket_comment}>
            <div>•</div>
            <div>
              <b>
                {/* 티켓 등록이 완료되면 즉시 남은 학습 기간에 구매한 날수만큼 합산 됩니다. */}
                {t('t717')}
              </b>
            </div>
            <div>•</div>
            <div>
              {/* 티켓 문자 내 표시된 유효기간을 확인해주시고, 반드시 유효기간 만료 전에 티켓을 등록해 주세요. */}
              {t('t718')}
            </div>
            <div>•</div>
            <div>
              {/* 유효기간 내 등록 또는 사용하지 않은 티켓은 전액 환불이 불가능합니다. */}
              {t('t719')}
            </div>
            <div>•</div>
            <div>
              {/* 사용한 티켓이나 유효기간이 지난 티켓은 (주)리딩게이트 환불 규정에 따라 부분 환불만 가능합니다. */}
              {t('t720')}
            </div>
          </div>
        </div>
      </div>
      {registResult && (
        <TicketRegistFailedModal
          failedTicketInfo={registResult}
          onCloseClick={() => setRegistResult(undefined)}
        />
      )}
      {isRegistLoading && <LoadingScreen />}
    </div>
  )
}

function TicketRegistFailedModal({
  failedTicketInfo,
  onCloseClick,
}: {
  failedTicketInfo: { ticket: string; code: number }[]
  onCloseClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  return (
    <Modal
      title={t('t721')} // 티켓등록 결과
      header
      compact
      onClickDelete={onCloseClick}
      onClickLightbox={onCloseClick}>
      <div className={style.ticket_regist_failed_modal}>
        <h3>
          {/* 티켓등록에 실패하였습니다. */}
          {t('t722')}
        </h3>
        <ol>
          {failedTicketInfo.map((info, idx) => {
            let message = t('t723') // 유효하지 않는 티켓입니다.
            if (info.code === -3) {
              message = t('t724') // 이미 사용이 완료된 티켓입니다.
            } else if (info.code === 0) {
              message = t('t725') // 성공적으로 등록 되었습니다.
            }
            return (
              <li
                key={`${info.ticket}-${idx}`}
                style={{ marginTop: 'var(--space-m)' }}>
                <h4>{message}</h4>
                <div style={{ marginTop: 'var(--space-xxs)' }}>
                  {info.ticket}
                </div>
              </li>
            )
          })}
        </ol>
        <div>
          <p>
            {/* 입력한 티켓번호가 올바른지 확인해주세요. */}
            {t('t726')}
          </p>
          <p>
            {/* 티켓등록에 문제가 발생하였다면 리딩게이트 고객센터(1599-0533)로 문의주세요. */}
            {t('t727')}
          </p>
        </div>
        <div>
          <Button shadow onClick={onCloseClick}>
            {t('t728')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
