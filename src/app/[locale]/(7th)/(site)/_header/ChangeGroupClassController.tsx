'use client'

import {
  useFetchClassMove,
  useOnLoadChangeableClassInfo,
} from '@/7th/_client/store/student/class-move/hook'
import { useStudentHistory } from '@/7th/_client/store/student/history/selector'
import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import { Button, Modal } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import DateUtils from '@/util/date-utils'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const STYLE_ID = 'global_move_class'

// 승급반 다음에 변경하기 눌렀을 때 다시 체크하는 시간
const NEXT_CHECK_TIME = 2 * 60 * 60 * 1000 //2시간

export default function ChangeGroupClassController({
  children,
}: {
  children: React.ReactNode
}) {
  const [isShowPopup, setShowPopup] = useState(false)

  const onClassGroupChangeResult = (isCancel?: boolean) => {
    if (isCancel) {
      updateChangeGroupClassPassingTime()
    } else {
      clearChangeGroupClassPassingTime()
    }
    setShowPopup(false)
  }

  const changeGroupClassPassingTime = Number(
    (window &&
      window.sessionStorage &&
      window.sessionStorage.getItem('CHANGE_GROUP_POPUP')) ||
      '0',
  )
  const updateChangeGroupClassPassingTime = () => {
    if (window && window.sessionStorage) {
      const now = Date.now()
      window.sessionStorage.setItem(
        'CHANGE_GROUP_POPUP',
        String(now + NEXT_CHECK_TIME),
      )
    }
  }

  const { studentId, needGroupClassYn: isNeedGroupClass } = useStudentInfo()

  useEffect(() => {
    const now = Date.now()
    if (studentId && isNeedGroupClass && now >= changeGroupClassPassingTime) {
      setShowPopup(true)
    }
  }, [studentId, isNeedGroupClass, changeGroupClassPassingTime])

  return (
    <>
      {children}
      {isShowPopup && (
        <MoveClassModal onChangeResult={onClassGroupChangeResult} />
      )}
    </>
  )
}

export function clearChangeGroupClassPassingTime() {
  if (window && window.sessionStorage) {
    window.sessionStorage.removeItem('CHANGE_GROUP_POPUP')
  }
}

function MoveClassModal({
  onChangeResult,
}: {
  onChangeResult: (isCancel?: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  const { loading, error, payload } = useOnLoadChangeableClassInfo()
  const { loading: loadingUpdate, fetch } = useFetchClassMove()
  const { name: studentName } = useStudentInfo()
  const studentHistoryList = useStudentHistory().payload

  const router = useRouter()

  const [nextClass, setNextClass] = useState<string>('')

  const isChangeable = payload?.changeable
  useEffect(() => {
    if (isChangeable === false) {
      onChangeResult()
    }
  }, [isChangeable, onChangeResult])

  const endDateObj = useMemo(() => {
    let isEndDateOver = false
    let month = 0
    let day = 0
    if (payload?.changeEndDate) {
      const now = new Date()
      const year = Number(payload.changeEndDate.substring(0, 4))
      month = Number(payload.changeEndDate.substring(4, 6))
      day = Number(payload.changeEndDate.substring(6, 8))

      const endDate = new Date()
      endDate.setSeconds(0)
      endDate.setMinutes(0)
      endDate.setHours(0)
      endDate.setDate(day)
      endDate.setMonth(month - 1)
      endDate.setFullYear(year)
      const dd = DateUtils.dayDistance(now, endDate)
      isEndDateOver = dd <= 0
    }
    return {
      isEndDateOver,
      month,
      day,
    }
  }, [payload?.changeEndDate])

  if (loading || !payload) {
    return <div>Now Loading..</div>
  }

  const year = new Date().getFullYear()
  const { before, current, classList } = payload

  const targetStudentHistoryId = studentHistoryList.find(
    (shid) => shid.classId === payload.current.classId,
  )
  if (error || !targetStudentHistoryId) {
    return <div>{'반 정보를 불러 올 수 없습니다. '}</div>
  }
  if (!payload) {
    return <></>
  }

  const onMoveClassGroup = () => {
    if (loadingUpdate || !targetStudentHistoryId) {
      return
    }
    if (!nextClass) {
      alert('반을 선택해주세요.')
      return
    }
    const targetClass = classList.find((cls) => cls.classId === nextClass)
    if (
      targetClass &&
      confirm(`${targetClass.className}반으로 변경하시겠습니까?`)
    ) {
      fetch({
        studentHistoryId: targetStudentHistoryId.studentHistoryId,
        classId: nextClass,
        callback: (isSuccess) => {
          if (isSuccess) {
            alert('반 변경이 완료되었습니다.')
            onChangeResult(false)
          } else {
            alert(
              '반을 변경할 수 없습니다.\n잠시 후 다시 시도해 주세요.\n계속해서 문제가 발생하는 경우, 고객센터(1599-0533)로 연락주십시오.',
            )
          }
        },
      })
    }
  }

  return (
    <Modal compact>
      <div className={style.move_class}>
        <div className={style.txt_title}>⚠️ 진급한 반으로 변경해 주세요!</div>
        <div className={style.guide}>
          <div className={style.txt_guide_title}>알림</div>
          {payload.cancelable ? (
            <ul>
              <li>
                {`${endDateObj.month}월 ${endDateObj.day}일부터는 반드시 새로운 반을 선택해야 프로그램을 이용하실
                수 있습니다.`}
              </li>
            </ul>
          ) : (
            <ul>
              <li>새로운 반을 선택해야 학습을 하실 수 있습니다!</li>
            </ul>
          )}
        </div>
        <div className={style.guide}>
          <div className={style.txt_guide_title}>변경 방법</div>
          <ol>
            <li>작년에 소속된 학년과 반이 맞는지 확인합니다.</li>
            <li>
              이번 해에 진급한 새로운 반을 선택한 후, 변경하기를 누르세요.
            </li>
            <li>
              변경할 반이 없거나, 진급 반 변경 후 수정이 필요하면
              고객센터(1599-0533)로 연락 주세요.
            </li>
          </ol>
        </div>
        <div className={style.class_info}>
          <div className={style.before_class_info}>
            <div className={style.title}>{year - 1}년도</div>
            <div className={style.student_info}>
              <div>학년/반</div>
              <div>{before ? before.className : '정보 없음'}</div>
              <div>이름</div>
              <div>{studentName}</div>
            </div>
          </div>
          <div className={style.after_class_info}>
            <div className={style.title}>{year}년도</div>
            <div className={style.student_info}>
              <div>학년</div>
              <div>{current.classGroupName}</div>
              <div>진급 반</div>
              <div>
                <select onChange={(e) => setNextClass(e.target.value)}>
                  <option value="">선택</option>
                  {classList.map((cls) => {
                    return (
                      <option key={cls.classId} value={cls.classId}>
                        {cls.className}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* 변경이 안된 경우 -> '진급 반을 변경해 주세요.' 변경한 경우 -> ***반으로 변경하시겠습니까? */}
        <Button color={'red'} shadow onClick={() => onMoveClassGroup()}>
          변경하기
        </Button>
        {/* 변경할 기간이 지난경우 안보이게 하기 */}
        {payload.cancelable && (
          <div
            className={style.link_cancel}
            onClick={() => {
              if (
                confirm(
                  `${endDateObj.month}월 ${endDateObj.day}일부터는 반드시 새로운 반을 선택해야 프로그램을 이용하실 수 있습니다.\n나중에 변경 하시겠습니까?`,
                )
              ) {
                onChangeResult(true)
              }
            }}>
            나중에 하기
          </div>
        )}
        {!payload.cancelable && (
          <div
            className={style.link_cancel}
            onClick={() => {
              router.replace('/signoff')
            }}>
            로그아웃
          </div>
        )}
      </div>
    </Modal>
  )
}
