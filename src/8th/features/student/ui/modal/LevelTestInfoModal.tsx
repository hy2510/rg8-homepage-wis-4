/**
 * 레벨테스트 모달
 */
import { useLevelTest } from '@/8th/features/achieve/service/achieve-query'
import { useLevelTestInfo } from '@/8th/features/student/service/learning-query'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { useStartLevelTest } from '@/8th/shared/hook/useStartStudy'
import {
  ModalBodyStyle,
  ModalFooterStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, Gap, TextStyle } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import { openWindow } from '@/8th/shared/utils/open-window'
import useTranslation from '@/localization/client/useTranslations'
import { useMemo } from 'react'

interface LevelTestHistoryData {
  id: string
  level: string // levelname
  date: string // leveldate
}

interface LevelTestInfoModalProps {
  onCloseModal: () => void
}

export default function LevelTestInfoModal({
  onCloseModal,
}: LevelTestInfoModalProps) {
  // @language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const levelTestHistory = useLevelTest()
  const levelTestInfo = useLevelTestInfo()

  const isLoading = levelTestHistory.isFetching || levelTestInfo.isFetching

  const levelTestHistoryData: LevelTestHistoryData[] = useMemo(() => {
    if (isLoading || !levelTestHistory.data) {
      return []
    }
    return levelTestHistory.data.list.map((item) => ({
      id: item.levelHistoryId,
      date: item.levelDate,
      level: item.levelName,
    }))
  }, [isLoading, levelTestHistory.data])

  const onStartLevelTest = useStartLevelTest()

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th259')}</div>
        <div className="btn-close" onClick={onCloseModal} />
      </ModalHeaderStyle>
      <ModalBodyStyle>
        <BoxStyle
          display="flex"
          flexDirection="column"
          gap={10}
          minHeight="300px">
          <TextStyle
            fontSize="medium"
            fontFamily="sans"
            fontColor="secondary"
            fontWeight="bold">
            {t('t8th260')}
          </TextStyle>
          {/* 레벨 테스트 이력이 없을 때 */}

          {!isLoading && levelTestHistoryData.length === 0 && (
            <TextStyle
              fontSize="medium"
              fontFamily="sans"
              fontColor="primary"
              fontWeight="bold">
              {`💡 ${t('t8th263')}`}
            </TextStyle>
          )}

          {/* 레벨 테스트 이력이 있을 때 */}
          {!isLoading &&
            levelTestHistoryData.length > 0 &&
            levelTestHistoryData.map((item, i) => {
              const levelTestReportUrl = levelTestInfo.data?.report
              let viewReport: (() => void) | undefined = undefined
              if (!!levelTestReportUrl && i === 0) {
                viewReport = () => {
                  openWindow(levelTestReportUrl, {
                    external: true,
                    target: '_blank',
                    feature: 'noopener, noreferrer',
                  })
                }
              }
              return (
                <HistoryItem
                  key={item.id}
                  date={item.date}
                  level={item.level}
                  viewReport={viewReport}
                />
              )
            })}
        </BoxStyle>
        <Gap size={20} />
      </ModalBodyStyle>
      <ModalFooterStyle isFixedBottom={isPhone}>
        <BoxStyle
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={10}>
          {!isLoading && levelTestInfo.data?.isAvailableLevelTest && (
            <>
              <TextStyle fontFamily="sans" fontWeight="bold">
                {`${t('t8th264')}`}
              </TextStyle>
              <TextStyle
                onClick={() => {
                  onStartLevelTest()
                }}
                fontFamily="sans"
                fontWeight="bold"
                fontColor="lightBlue"
                margin="0 10px 0 0">
                {t('t8th265')}
              </TextStyle>
            </>
          )}
        </BoxStyle>
      </ModalFooterStyle>
    </ModalContainer>
  )
}

function HistoryItem({
  date,
  level,
  viewReport,
}: {
  date: string
  level: string
  viewReport?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  return (
    <BoxStyle
      backgroundColor="var(--color-gray-light)"
      borderRadius={15}
      padding={'20px'}>
      <TextStyle
        fontSize="medium"
        fontFamily="sans"
        fontColor="secondary"
        fontWeight="bold"
        margin="0 0 5px 0">
        {date}
      </TextStyle>
      <BoxStyle
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={10}>
        <TextStyle fontFamily="sans" fontWeight="bold">
          {`${t('t8th261', { txt: level })}`}
        </TextStyle>
        {viewReport && (
          <TextStyle
            fontSize="medium"
            fontFamily="rg-b"
            fontColor="lightBlue"
            onClick={viewReport}>
            {t('t8th262')}
          </TextStyle>
        )}
      </BoxStyle>
    </BoxStyle>
  )
}
