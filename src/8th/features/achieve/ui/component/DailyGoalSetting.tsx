'use client'

import { Assets } from '@/8th/assets/asset-library'
// useHoldRepeat.ts
import { DailyGoalSettingStyle } from '@/8th/shared/styled/FeaturesStyled'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_POINTS = 150
const MAX_BOOKS = 15

interface DailyGoalSettingProps {
  initialMethod: 'Points' | 'Books'
  initialPoints: number
  initialBooks: number
  changeHistoryList: {
    method: 'Points' | 'Books'
    value: number
    date: string
  }[]
  onChangeDailyGoal?: (method: 'Books' | 'Points', value: number) => void
}

/**
 * 일일목표설정
 */
export default function DailyGoalSetting({
  initialMethod,
  initialPoints,
  initialBooks,
  changeHistoryList,
  onChangeDailyGoal,
}: DailyGoalSettingProps) {
  return (
    <DailyGoalSettingStyle>
      <SettingSection
        initialMethod={initialMethod}
        initialPoints={initialPoints}
        initialBooks={initialBooks}
        onChangeDailyGoal={onChangeDailyGoal}
      />
      <HistorySection historyData={changeHistoryList} />
    </DailyGoalSettingStyle>
  )
}

/**
 * 학습 목표 변경 설정 섹션 컴포넌트
 */
function SettingSection({
  onChangeDailyGoal,
  initialMethod,
  initialPoints,
  initialBooks,
}: {
  initialMethod: 'Books' | 'Points'
  initialPoints: number
  initialBooks: number
  onChangeDailyGoal?: (method: 'Books' | 'Points', value: number) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const initialValue = initialMethod === 'Points' ? initialPoints : initialBooks

  const [selectedMethod, setSelectedMethod] = useState(initialMethod)
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    setSelectedMethod(initialMethod)
    setValue(initialValue)
  }, [initialMethod, initialValue])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const goalMethods = [
    { value: 'Points', label: t('t8th205') },
    { value: 'Books', label: t('t8th206') },
  ]
  const dropdownItems = goalMethods.map((method) => ({
    text: method.label,
    onClick: () => {
      setSelectedMethod(method.value as 'Points' | 'Books')
      if (method.value === 'Points') {
        setValue(initialPoints)
      } else {
        setValue(initialBooks)
      }
      setIsDropdownOpen(false)
    },
  }))

  const onSave = () => {
    if (onChangeDailyGoal) {
      onChangeDailyGoal(selectedMethod, value)
    }
  }

  const max = selectedMethod === 'Points' ? MAX_POINTS : MAX_BOOKS
  const onIncrementValue = () => {
    // if (value + 1 > max) {
    //   setValue(max)
    // } else {
    //   setValue(Math.ceil(value + 1))
    // }
    setValue((value) => {
      if (value + 1 > max) {
        return max
      } else {
        return Math.ceil(value + 1)
      }
    })
  }

  const onDecrementValue = () => {
    // if (value > 1) {
    //   setValue(Math.ceil(value - 1))
    // } else {
    //   setValue(1)
    // }
    setValue((value) => {
      if (value - 1 < 1) {
        return 1
      } else {
        return Math.ceil(value - 1)
      }
    })
  }

  const incHold = useHoldRepeat(onIncrementValue, { disabled: max <= value })
  const decHold = useHoldRepeat(onDecrementValue, { disabled: value <= 1 })

  const selectedLabel =
    selectedMethod === 'Points' ? t('t8th205') : t('t8th206')

  const countText =
    selectedMethod === 'Points'
      ? t('t8th203', { num: value })
      : t('t8th204', { num: value })

  const isChanged = selectedMethod !== initialMethod || value !== initialValue

  return (
    <>
      <div className="goal-method-section">
        <span className="section-title">{t('t8th207')}</span>
        <div className="goal-method-header">
          <div
            className="goal-method-select-container"
            style={{ position: 'relative' }}>
            <div
              className="goal-method-item"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
              }}>
              <span className="goal-method-item-text">{selectedLabel}</span>
              <Image
                src={Assets.Icon.chevronDownGraySmall}
                alt="chevronDown"
                width={16}
                height={16}
              />
            </div>
            {isDropdownOpen && (
              <div className="goal-method-dropdown">
                {dropdownItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={item.onClick}
                    className="goal-method-dropdown-item">
                    {item.text}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="goal-method-actions">
            {isChanged && (
              <>
                <span
                  className="cancel-button"
                  onClick={() => {
                    setSelectedMethod(initialMethod)
                    setValue(initialValue)
                  }}>
                  {'cancel'}
                </span>
                <span className="save-button" onClick={onSave}>
                  {'save'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="count-box">
        <div
          className="btn-count"
          style={{ touchAction: 'none' }}
          {...decHold.handlers}>
          -
        </div>
        <span className="count-text">{countText}</span>
        <div
          className="btn-count"
          style={{ touchAction: 'none' }}
          {...incHold.handlers}>
          +
        </div>
      </div>
    </>
  )
}

/**
 * 변경 이력 섹션 컴포넌트
 */
const HISTORY_MIN_ITEM_COUNT = 3
function HistorySection({
  historyData,
}: {
  historyData: { method: 'Points' | 'Books'; value: number; date: string }[]
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [visibleItemCount, setVisibleItemCount] = useState<number | 'All'>(
    HISTORY_MIN_ITEM_COUNT,
  )

  const visibleItems =
    visibleItemCount === 'All'
      ? historyData
      : historyData.slice(0, visibleItemCount)

  return (
    <div className="change-history-section">
      <span className="section-title">{t('t8th208')}</span>
      {visibleItems.map((item, i) => {
        const title =
          item.method === 'Points'
            ? t('t8th203', { num: item.value })
            : t('t8th204', { num: item.value })
        return (
          <div key={`history_item_${i}`} className="change-history-item">
            <span className="history-item-title">· {title}</span>
            <span className="history-item-date">{item.date}</span>
          </div>
        )
      })}
      {historyData.length > HISTORY_MIN_ITEM_COUNT && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 5,
          }}>
          {visibleItemCount !== 'All' ? (
            <>
              <span
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: 'var(--font-color-secondary)',
                  fontSize: 'var(--font-size-small)',
                }}
                onClick={() => setVisibleItemCount('All')}>
                {` ${t('t8th209')} `}
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: 'var(--font-color-secondary)',
                  fontSize: 'var(--font-size-small)',
                }}
                onClick={() => setVisibleItemCount(HISTORY_MIN_ITEM_COUNT)}>
                {` ${t('t8th210')} `}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// useHoldRepeat.ts
type Options = {
  initialDelay?: number // 반복 시작 전 지연(ms)
  interval?: number // 반복 주기(ms)
  disabled?: boolean
  onStart?: () => void
  onEnd?: () => void
}

export function useHoldRepeat(action: () => void, opts: Options = {}) {
  const {
    initialDelay = 300,
    interval = 80,
    disabled = false,
    onStart,
    onEnd,
  } = opts

  const tRef = useRef<number | null>(null)
  const iRef = useRef<number | null>(null)
  const activeRef = useRef(false)
  const targetRef = useRef<Element | null>(null)
  const pointerIdRef = useRef<number | null>(null)

  const clearTimers = useCallback(
    (callOnEnd = true) => {
      if (tRef.current != null) window.clearTimeout(tRef.current)
      if (iRef.current != null) window.clearInterval(iRef.current)
      tRef.current = null
      iRef.current = null

      if (activeRef.current && callOnEnd) onEnd?.()
      activeRef.current = false

      // 포인터 캡처 해제
      try {
        if (
          targetRef.current &&
          pointerIdRef.current != null &&
          (targetRef.current as any).releasePointerCapture
        ) {
          ;(targetRef.current as any).releasePointerCapture(
            pointerIdRef.current,
          )
        }
      } catch {
        /* noop */
      }

      targetRef.current = null
      pointerIdRef.current = null
    },
    [onEnd],
  )

  // disabled가 true로 바뀌면 즉시 중단
  useEffect(() => {
    if (disabled) clearTimers()
  }, [disabled, clearTimers])

  // 언마운트/탭 전환/윈도우 블러 시 안전 정리
  useEffect(() => {
    const stopAll = () => clearTimers()
    const onVisibilityChange = () => {
      if (document.hidden) clearTimers()
    }

    window.addEventListener('blur', stopAll)
    window.addEventListener('pointerup', stopAll, { passive: true }) // 바깥에서 놓는 경우 대비 (캡처 실패 대비)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('blur', stopAll)
      window.removeEventListener('pointerup', stopAll)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearTimers(false)
    }
  }, [clearTimers])

  const start = useCallback(
    (target?: Element, pointerId?: number) => {
      if (disabled || activeRef.current) return

      activeRef.current = true
      if (onStart) {
        onStart()
      }

      action()

      targetRef.current = target ?? null
      pointerIdRef.current = pointerId ?? null
      try {
        const targetAny = target as any
        if (targetAny && pointerId != null && targetAny.setPointerCapture) {
          targetAny.setPointerCapture(pointerId)
        }
      } catch {
        /* noop */
      }

      // 일정 지연 후 반복
      tRef.current = window.setTimeout(() => {
        iRef.current = window.setInterval(() => {
          if (!disabled) action()
        }, interval)
      }, initialDelay)
    },
    [action, disabled, initialDelay, interval, onStart],
  )

  const stop = useCallback(() => clearTimers(), [clearTimers])

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      // 모바일 롱프레스 메뉴/스크롤 방지
      e.preventDefault()
      start(e.currentTarget, e.pointerId)
    },
    onPointerUp: () => stop(),
    onPointerCancel: () => stop(),
    onBlur: () => stop(),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(), // iOS 롱프레스 메뉴 방지
  } as const

  return { handlers, start, stop }
}
