'use client'

import { useAchieveLevelMaster } from '@/7th/_client/store/achieve/level-master/selector'
import { AlertBar, EmptyMessage } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'

const STYLE_ID = 'global_option_my_rg'

// 레벨마스터 어워드
export function LevelMasterAward() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const awardLevelMaster = useAchieveLevelMaster().payload
  return (
    <div className={style.level_master_award}>
      <AlertBar>{t('t090')}</AlertBar>
      {!awardLevelMaster || awardLevelMaster.length === 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.level_master_award_list}>
          {awardLevelMaster.map((award, i) => {
            const imageLevelName =
              award.masterLevelName === 'PK'
                ? 'prek'
                : award.masterLevelName.toLocaleLowerCase()
            const image = `/src/images/@award-level-master/level_${imageLevelName}.svg`
            return (
              <div key={i}>
                <LevelMasterAwardItem
                  awardImgSrc={image}
                  awardGetDate={award.levelDate}
                  awardLevel={award.masterLevelName}
                  awardCertification={award.certificationPath}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// 레벨마스터 어워드 > 아이템
function LevelMasterAwardItem({
  awardImgSrc,
  awardGetDate,
  awardLevel,
  awardCertification = '',
}: {
  awardImgSrc: string
  awardGetDate: string
  awardLevel: string
  awardCertification?: string
}) {
  const style = useStyle(STYLE_ID)

  const levelBgColor = 'level_' + awardLevel

  const onClickCertification = awardCertification
    ? () => {
        window?.open(`${awardCertification}&args5=true&args6=N`)
      }
    : undefined

  return (
    <div className={style.level_master_award_item}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={`${style.award_image_bg} ${levelBgColor}`}></div>
      </div>
      <div className={`${style.row_b} ${levelBgColor}`}>
        <div className={style.txt_l1} onClick={onClickCertification}>
          Certificate
        </div>
        <div className={style.txt_l2}>{awardGetDate}</div>
      </div>
    </div>
  )
}
