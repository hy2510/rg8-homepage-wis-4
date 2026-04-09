'use client'

import {
  useChangeGroupClass,
  useChangeableGroupClassInfo,
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, SelectBox, TextStyle } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SelfStudentClassChangeModal({
  onClassGroupChangeResult,
}: {
  onClassGroupChangeResult?: (isCancel?: boolean) => void
}) {
  const router = useRouter()

  const { data: student } = useStudent()
  const studentName = student?.student.name
  const studentHistory = useStudentHistoryList()

  const { data: changeableGroupClassInfo, isLoading } =
    useChangeableGroupClassInfo()
  const { mutate: changeGroupClass } = useChangeGroupClass({
    onSuccess: (data) => {
      if (data.success) {
        alert('반 변경이 완료되었습니다.')
        if (onClassGroupChangeResult) {
          onClassGroupChangeResult(false)
        }
      } else {
        alert(
          '반을 변경할 수 없습니다.\n잠시 후 다시 시도해 주세요.\n계속해서 문제가 발생하는 경우, 고객센터(1599-0533)로 연락주십시오.',
        )
      }
    },
  })

  const endDateYear = Number(
    changeableGroupClassInfo?.changeEndDate?.substring(0, 4),
  )
  const endDateMonth = Number(
    changeableGroupClassInfo?.changeEndDate?.substring(4, 6),
  )
  const endDateDay = Number(
    changeableGroupClassInfo?.changeEndDate?.substring(6, 8),
  )
  const year = endDateYear

  const before = changeableGroupClassInfo?.before
  const current = changeableGroupClassInfo?.current
  const classList: { classId: string; className: string }[] =
    changeableGroupClassInfo?.classList || []
  const cancelable = changeableGroupClassInfo?.cancelable

  const currentStudentHistoryId = studentHistory?.data?.list?.find(
    (shid) => shid.classId === current?.classId,
  )?.studentHistoryId

  const [nextClass, setNextClass] = useState<
    { key: string; label: string } | undefined
  >(undefined)

  const onMoveClassGroup = () => {
    if (!nextClass) {
      alert('반을 선택해주세요.')
      return
    }
    const targetClass = classList.find(
      (cls) => nextClass && cls.classId === nextClass?.key,
    )
    if (
      targetClass &&
      currentStudentHistoryId &&
      confirm(`${targetClass.className}반으로 변경하시겠습니까?`)
    ) {
      changeGroupClass({
        studentHistoryId: currentStudentHistoryId,
        newClassId: targetClass?.classId,
      })
    }
  }

  if (isLoading) {
    return (
      <ModalContainer>
        <ModalHeaderStyle>
          <div className="title">⚠️ 진급한 반으로 변경해 주세요!</div>
        </ModalHeaderStyle>
        <ModalBodyStyle></ModalBodyStyle>
      </ModalContainer>
    )
  }

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">⚠️ 진급한 반으로 변경해 주세요!</div>
      </ModalHeaderStyle>
      <ModalBodyStyle>
        <BoxStyle display="flex" flexDirection="column" gap={20}>
          <BoxStyle
            backgroundColor="var(--color-gray-medium)"
            padding="20px"
            borderRadius="10px">
            <TextStyle
              type="div"
              fontSize="large"
              fontColor="primary"
              fontWeight="bold"
              fontFamily="sans">
              알림
            </TextStyle>
            <BoxStyle margin="10px 0 0 0">
              <span
                style={{
                  fontSize: 'var(--font-size-medium)',
                  fontFamily: 'var(--font-family-secondary)',
                  fontWeight: 500,
                }}>
                {`${endDateMonth}월 ${endDateDay}일부터는 반드시 새로운 반을 선택해야 프로그램을 이용하실
                수 있습니다.`}
              </span>
            </BoxStyle>
          </BoxStyle>
          <BoxStyle
            backgroundColor="var(--color-gray-medium)"
            padding="20px"
            borderRadius="10px">
            <TextStyle
              type="div"
              fontSize="large"
              fontColor="primary"
              fontWeight="bold"
              fontFamily="sans">
              변경 방법
            </TextStyle>
            <BoxStyle margin="10px 0 0 0">
              <ol style={{ paddingLeft: '20px' }}>
                <span
                  style={{
                    fontSize: 'var(--font-size-medium)',
                    fontWeight: 500,
                  }}>
                  <li style={{ fontFamily: 'var(--font-family-secondary)' }}>
                    작년에 소속된 학년과 반이 맞는지 확인합니다.
                  </li>
                </span>
                <span
                  style={{
                    fontSize: 'var(--font-size-medium)',
                    fontWeight: 500,
                  }}>
                  <li style={{ fontFamily: 'var(--font-family-secondary)' }}>
                    이번 해에 진급한 새로운 반을 선택한 후, 변경하기를 누르세요.
                  </li>
                </span>
                <span
                  style={{
                    fontSize: 'var(--font-size-medium)',
                    fontWeight: 500,
                  }}>
                  <li style={{ fontFamily: 'var(--font-family-secondary)' }}>
                    변경할 반이 없거나, 진급 반 변경 후 수정이 필요하면
                    고객센터(1599-0533)로 연락 주세요.
                  </li>
                </span>
              </ol>
            </BoxStyle>
          </BoxStyle>
          <BoxStyle display="flex" flexDirection="row" margin="20px 0">
            <BoxStyle
              flex="1"
              display="flex"
              flexDirection="column"
              padding="0 0 0 20px">
              <TextStyle
                type="div"
                fontSize="large"
                fontColor="primary"
                fontFamily="sans"
                margin="0 0 20px 0">
                {year - 1}년도
              </TextStyle>
              <BoxStyle display="grid" gridTemplateColumns="1fr 2fr" gap={10}>
                <TextStyle fontSize="var(--font-size-medium)" fontFamily="sans">
                  학년/반
                </TextStyle>
                <TextStyle fontSize="var(--font-size-medium)" fontFamily="sans">
                  {before ? before.className : '정보 없음'}
                </TextStyle>
                <BoxStyle display="flex" alignItems="center">
                  <TextStyle
                    fontSize="var(--font-size-medium)"
                    fontFamily="sans">
                    이름
                  </TextStyle>
                </BoxStyle>
                <BoxStyle display="flex" alignItems="center">
                  <TextStyle
                    fontSize="var(--font-size-medium)"
                    fontFamily="sans">
                    {studentName}
                  </TextStyle>
                </BoxStyle>
              </BoxStyle>
            </BoxStyle>
            <BoxStyle
              flex="1"
              display="flex"
              flexDirection="column"
              padding="0 0 0 20px"
              borderLeft="2px solid black">
              <TextStyle
                type="div"
                fontSize="large"
                fontColor="primary"
                fontFamily="sans"
                margin="0 0 20px 0">
                {year}년도
              </TextStyle>
              <BoxStyle display="grid" gridTemplateColumns="1fr 2fr" gap={10}>
                <TextStyle fontSize="var(--font-size-medium)" fontFamily="sans">
                  학년
                </TextStyle>
                <TextStyle fontSize="var(--font-size-medium)" fontFamily="sans">
                  {current?.classGroupName}
                </TextStyle>
                <BoxStyle display="flex" alignItems="center">
                  <TextStyle
                    fontSize="var(--font-size-medium)"
                    fontFamily="sans">
                    진급 반
                  </TextStyle>
                </BoxStyle>
                <BoxStyle>
                  <SelectBox
                    selectedValue={nextClass ? nextClass.label : ''}
                    placeholder="반 선택"
                    onChange={(value) => setNextClass({ ...value })}
                    options={classList.map((cls) => ({
                      key: cls.classId,
                      label: cls.className,
                    }))}
                  />
                </BoxStyle>
              </BoxStyle>
            </BoxStyle>
          </BoxStyle>
          <BoxStyle
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            {/* 변경이 안된 경우 -> '진급 반을 변경해 주세요.' 변경한 경우 -> ***반으로 변경하시겠습니까? */}
            <button
              style={{
                width: '100%',
                padding: '16px 20px',
                backgroundColor: 'var(--font-color-light-blue)',
                color: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => onMoveClassGroup()}>
              변경하기
            </button>
            {/* 변경할 기간이 지난경우 안보이게 하기 */}
            <button
              style={{
                display: 'inline-block',
                marginTop: '10px',
                width: 'fit-content',
                color: 'var(--font-color-secondary)',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (cancelable) {
                  if (onClassGroupChangeResult) {
                    if (
                      confirm(
                        `${endDateMonth}월 ${endDateDay}일부터는 반드시 새로운 반을 선택해야 프로그램을 이용하실 수 있습니다.\n나중에 변경 하시겠습니까?`,
                      )
                    ) {
                      onClassGroupChangeResult(true)
                    }
                  }
                } else {
                  router.replace('/signoff')
                }
              }}>
              {cancelable ? '나중에 하기' : '로그아웃'}
            </button>
          </BoxStyle>
        </BoxStyle>
      </ModalBodyStyle>
    </ModalContainer>
  )
}

// 승급반 다음에 변경하기 눌렀을 때 다시 체크하는 시간
const NEXT_CHECK_TIME = 2 * 60 * 60 * 1000 //2시간

export function useSelfStudentChangeInfo() {
  const [isShowSelfStudentChangeModal, setShowSelfStudentChangeModal] =
    useState(false)

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

  const clearChangeGroupClassPassingTime = () => {
    if (window && window.sessionStorage) {
      window.sessionStorage.removeItem('CHANGE_GROUP_POPUP')
    }
  }

  const onClassGroupChangeResult = (isCancel?: boolean) => {
    if (isCancel) {
      updateChangeGroupClassPassingTime()
    } else {
      clearChangeGroupClassPassingTime()
    }
    setShowSelfStudentChangeModal(false)
  }

  const { data: student } = useStudent()

  const studentId = student?.student.studentId
  const isNeedGroupClass = student?.student.needGroupClassYn

  useEffect(() => {
    const now = Date.now()
    if (studentId && isNeedGroupClass && now >= changeGroupClassPassingTime) {
      setShowSelfStudentChangeModal(true)
    }
  }, [studentId, isNeedGroupClass, changeGroupClassPassingTime])

  return {
    isShowSelfStudentChangeModal,
    onClassGroupChangeResult,
  }
}
