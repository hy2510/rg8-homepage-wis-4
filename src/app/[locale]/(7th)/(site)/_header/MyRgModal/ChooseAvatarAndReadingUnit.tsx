'use client'

import { useStudentAvatar } from '@/7th/_client/store/student/avatar/selector'
import { useFetchSetStudentAvatarAndReadingUnit } from '@/7th/_client/store/student/info/hook'
import { useStudentReadingUnit } from '@/7th/_client/store/student/reading-unit/selector'
import {
  Button,
  SelectBox,
  SelectBoxItem,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'

const STYLE_ID = 'global_option_my_rg'

// 아바타 (리딩유닛) 수정
export function ChooseAvatarAndReadingUnit({
  defaultAvatar,
  defaultReadingUnit,
  onChangeAvatarAndReadingUnit,
}: {
  defaultAvatar: string
  defaultReadingUnit: string
  onChangeAvatarAndReadingUnit?: (
    avatarId: string,
    readingUnitId: string,
  ) => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { userAvatar, avatarList } = useStudentAvatar()
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar)

  const { earnReadingUnit } = useStudentReadingUnit()
  const [selectedReadingUnit, setSelectedReadingUnit] =
    useState(defaultReadingUnit)

  const { fetch: changeFetch, loading: changeLoading } =
    useFetchSetStudentAvatarAndReadingUnit()

  const onChangeOption = () => {
    if (!changeLoading) {
      changeFetch({
        avatarId: selectedAvatar,
        readingUnitId: selectedReadingUnit,
        callback: (isSuccess) => {
          if (isSuccess) {
            onChangeAvatarAndReadingUnit &&
              onChangeAvatarAndReadingUnit(selectedAvatar, selectedReadingUnit)
          }
        },
      })
    }
  }

  return (
    <div className={style.choose_avatar}>
      {/* 학습 캐릭터 */}
      <div className={style.txt_label}>Reading Unit</div>
      {/* 학습 캐릭터는 '퀘스트'에서 새로운 친구의 스토리를 잠금 해제할 때마다 자동으로 추가 됩니다. */}
      <div className={style.txt_comment}>{t('t549')}</div>
      <SelectBox
        onChange={(e) => {
          setSelectedReadingUnit(e.target.value)
        }}
        value={selectedReadingUnit}>
        {earnReadingUnit.map((unit) => {
          return (
            <SelectBoxItem key={unit.readingUnitId} value={unit.readingUnitId}>
              {unit.name}
            </SelectBoxItem>
          )
        })}
      </SelectBox>
      <div className={style.txt_label}>My Avatar</div>
      <div className={style.choose_avatar_container}>
        {avatarList.map((avatar) => {
          return (
            <div key={`choose_${avatar.avatarId}`}>
              <AvatarItem
                avtImgSrc={avatar.imageLarge}
                avtName={avatar.name}
                selected={selectedAvatar === avatar.avatarId}
                onClickAvatar={() => setSelectedAvatar(avatar.avatarId)}
              />
            </div>
          )
        })}
      </div>
      <Button
        shadow
        onClick={() => {
          onChangeOption()
        }}>
        {t('t083')}
      </Button>
    </div>
  )
}

// 아바타 수정 > 아바타 아이템
function AvatarItem({
  selected,
  check,
  avtImgSrc,
  avtName,
  onClickAvatar,
}: {
  selected: boolean
  check?: boolean
  avtImgSrc: string
  avtName: string
  onClickAvatar?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={style.avatar_item}
      onClick={() => {
        onClickAvatar && onClickAvatar()
      }}>
      <div
        className={`${style.avatar} ${selected && style.selected} ${
          check && style.check
        }`}>
        <div
          className={style.avatar_image}
          style={{ backgroundImage: `url(${avtImgSrc})` }}></div>
      </div>
      <div className={`${style.avatar_name} ${selected && style.selected}`}>
        {avtName}
      </div>
    </div>
  )
}
