'use client'

import { useOnLoadAchieveLevelMaster } from '@/7th/_client/store/achieve/level-master/hook'
import { useAchieveLevelMaster } from '@/7th/_client/store/achieve/level-master/selector'
import { useAchieveLevelPoint } from '@/7th/_client/store/achieve/level-point/selector'
import { useOnLoadAchieveLevelTest } from '@/7th/_client/store/achieve/level-test/hook'
import { useAchieveLevelTest } from '@/7th/_client/store/achieve/level-test/selector'
import { useFetchSetStudentDailyLearningLevel } from '@/7th/_client/store/student/daily-learning/hook'
import { useSelectStudyLevel } from '@/7th/_client/store/student/daily-learning/selector'
import { useLevelTestInfo } from '@/7th/_client/store/student/level-test-info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { goToLevelTest } from '@/7th/_function/study-start'
import {
  Button,
  EmptyMessage,
  Nav,
  NavItem,
  SelectBox,
  SelectBoxItem,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

const STYLE_ID = 'global_option_my_rg'

// 나의 학습 레벨
export function MyStudyLevel({
  isLevelTestView = false,
  onModalClose,
}: {
  isLevelTestView?: boolean
  onModalClose?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [isStudyLevel, _isStudyLevel] = useState(!isLevelTestView)
  const [isLevelTestHistory, _isLevelTestHistory] = useState(isLevelTestView)

  return (
    <div className={style.my_study_level}>
      <div className={style.row_a}>
        <Nav>
          <NavItem
            active={isStudyLevel}
            width="100%"
            onClick={() => {
              _isStudyLevel(true)
              _isLevelTestHistory(false)
            }}>
            {t('t101')}
          </NavItem>
          <NavItem
            active={isLevelTestHistory}
            width="100%"
            onClick={() => {
              _isStudyLevel(false)
              _isLevelTestHistory(true)
            }}>
            {t('t102')}
          </NavItem>
        </Nav>
      </div>
      <div className={style.row_b}>
        {isStudyLevel && (
          <CurrentStudyLevel
            onModalClose={() => onModalClose && onModalClose()}
          />
        )}
        {isLevelTestHistory && <LevelTestHistory />}
      </div>
    </div>
  )
}

// 나의 학습 레벨 > 진행중인 전체 학습 레벨
function CurrentStudyLevel({ onModalClose }: { onModalClose?: () => void }) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const pathname = usePathname()

  const { loading: isLevelMasterLoading } = useOnLoadAchieveLevelMaster()
  const { loading: isLevelChangeLoading, fetch: fetchLevelChange } =
    useFetchSetStudentDailyLearningLevel()

  const levelPoints = useAchieveLevelPoint().payload
  const levelMaster = useAchieveLevelMaster().payload
  const defaultLevel = useSelectStudyLevel()

  const levelList = useMemo(() => {
    const levelList = levelPoints.map((p) => {
      return {
        level: p.levelName,
        process: NumberUtils.getHundredPercentage(
          p.myRgPoint,
          p.requiredRgPoint,
        ),
        isMaster: false,
      }
    })
    levelMaster.forEach((lm) => {
      levelList.forEach((ll) => {
        if (lm.masterLevelName === ll.level) {
          ll.isMaster = true
        }
      })
    })
    return levelList
  }, [levelMaster, levelPoints])

  const [level, setLevel] = useState(defaultLevel)

  const onLevelChange = () => {
    if (!isLevelChangeLoading) {
      fetchLevelChange(level, (isSuccess) => {
        if (isSuccess) {
          onModalClose && onModalClose()
          if (level === 'PK') {
            router.push(SITE_PATH.BASIC.HOME)
          } else if (!pathname.includes(SITE_PATH.LIBRARY.HOME)) {
            router.push(SITE_PATH.LIBRARY.HOME)
          } else {
            window.location.replace(SITE_PATH.LIBRARY.HOME)
          }
        }
      })
    }
  }

  const t129 = t('t129')

  return (
    <>
      <div className={style.current_study_level}>
        <div>
          <div className={style.txt_h}>{t('t103')}</div>
          <div className={style.txt_p}>{t('t104')}</div>
          <SelectBox
            value={level}
            onChange={(e) => {
              const level = e.target.value
              setLevel(level)
            }}>
            <SelectBoxItem value="PK">{t('t105')}</SelectBoxItem>
            <SelectBoxItem value="KA">{t('t106')}</SelectBoxItem>
            <SelectBoxItem value="KB">{t('t107')}</SelectBoxItem>
            <SelectBoxItem value="KC">{t('t108')}</SelectBoxItem>
            <SelectBoxItem value="1A">{t('t109')}</SelectBoxItem>
            <SelectBoxItem value="1B">{t('t110')}</SelectBoxItem>
            <SelectBoxItem value="1C">{t('t111')}</SelectBoxItem>
            <SelectBoxItem value="2A">{t('t112')}</SelectBoxItem>
            <SelectBoxItem value="2B">{t('t113')}</SelectBoxItem>
            <SelectBoxItem value="2C">{t('t114')}</SelectBoxItem>
            <SelectBoxItem value="3A">{t('t115')}</SelectBoxItem>
            <SelectBoxItem value="3B">{t('t116')}</SelectBoxItem>
            <SelectBoxItem value="3C">{t('t117')}</SelectBoxItem>
            <SelectBoxItem value="4A">{t('t118')}</SelectBoxItem>
            <SelectBoxItem value="4B">{t('t119')}</SelectBoxItem>
            <SelectBoxItem value="4C">{t('t120')}</SelectBoxItem>
            <SelectBoxItem value="5A">{t('t121')}</SelectBoxItem>
            <SelectBoxItem value="5B">{t('t122')}</SelectBoxItem>
            <SelectBoxItem value="5C">{t('t123')}</SelectBoxItem>
            <SelectBoxItem value="6A">{t('t124')}</SelectBoxItem>
            <SelectBoxItem value="6B">{t('t125')}</SelectBoxItem>
            <SelectBoxItem value="6C">{t('t126')}</SelectBoxItem>
          </SelectBox>
        </div>
        {/*         
        <div>
          <div className={style.txt_h}>전체 레벨</div>
          <div className={style.txt_p}>
            전체 레벨과 레벨업 진행 상태를 확인할 수 있어요. 레벨업을 완료하면
            레벨 마스터 배지가 표시됩니다.
          </div>
        </div>
        <div className={style.current_study_level_container}>
          {levelList.map((lv, i) => {
            return (
              <div key={`LevelStudyStatus_${lv.level}`}>
                <LeveledStudyStatusItem
                  level={lv.level}
                  progress={lv.progress}
                  isLevelMaster={lv.isMaster}
                  isStudentLevel={level === lv.level}
                />
              </div>
            )
          })}
        </div> */}
      </div>
      {/* 레벨을 셀렉트 박스에서 변경했을 때 활성화 됨 */}
      {level !== defaultLevel && (
        <div className={style.change_current_study_level}>
          <div
            className={style.txt_p}
            dangerouslySetInnerHTML={{ __html: t129 }}></div>
          <div className={style.confirm}>
            <div
              className={style.button}
              onClick={() => {
                onLevelChange()
              }}>
              {t('t130')}
            </div>
            <div
              className={style.button}
              onClick={() => setLevel(defaultLevel)}>
              {t('t131')}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// 나의 학습 레벨 > 레벨 테스트 이력
function LevelTestHistory() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { language } = useLanguagePackContext()
  const { loading: isTestHistoryLoading } = useOnLoadAchieveLevelTest()

  const { target } = useSiteBlueprint()

  const history = useAchieveLevelTest().payload
  const levelTestInfo = useLevelTestInfo().payload
  const reportUrl = levelTestInfo.report

  const isEmpty = history.length === 0

  const onStartLevelTest = () => {
    goToLevelTest({ language })
  }

  const t135 = t('t135')

  return (
    <>
      <div className={style.level_test_history}>
        <div>
          <div className={style.txt_h}>{t('t132')}</div>
          <div className={style.txt_p}>
            {target.academy
              ? '레벨 테스트 응시 결과를 확인할 수 있어요.'
              : t('t133')}
          </div>
        </div>
        {/* 레벨 테스트 이력이 없을 때 */}
        {!isTestHistoryLoading && isEmpty && (
          <EmptyMessage>{t('t134')}</EmptyMessage>
        )}
        {!isTestHistoryLoading &&
          history.map((h, i) => {
            const click =
              reportUrl && i === 0
                ? () => {
                    window?.open(reportUrl)
                  }
                : undefined
            return (
              <LevelTestHistoryItem
                key={`LtHistory-${h.levelName}-${i}`}
                testResultLevel={h.levelName}
                testDate={h.levelDate}
                onClick={click}
              />
            )
          })}
      </div>
      {/* 레벨 테스트가 가능인 상태일 때 활성화 됨 */}
      {levelTestInfo.isAvailableLevelTest && (
        <div className={style.level_test_ready}>
          <div
            className={style.txt_p}
            dangerouslySetInnerHTML={{ __html: t135 }}></div>
          <Button shadow onClick={onStartLevelTest}>
            {t('t136')}
          </Button>
        </div>
      )}
    </>
  )
}

// 나의 학습 레벨 > 레벨 테스트 이력 > 레벨 테스트 결과 아이템
const LevelTestHistoryItem = ({
  testResultLevel,
  testDate,
  onClick,
}: {
  testResultLevel: string
  testDate: string
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.level_test_history_item}>
      <div className={style.col_a}>
        {/* <div className={style.level_symbol_box}>{testResultLevel}</div> */}
        <div className={style.test_result_info}>
          <div className={style.txt_l}>{testDate}</div>
          <div className={style.txt_p2}>
            {t('t137')} <b>{testResultLevel}</b>
          </div>
        </div>
      </div>
      {onClick && (
        <div className={style.col_b} onClick={onClick}>
          Report
        </div>
      )}
    </div>
  )
}
