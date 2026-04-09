'use client'

import {
  useChangeListenAndRepeat,
  useChangeStudentAvatar,
  useChangeStudySettingReadingUnit,
  useChangeStudySettingStartScreen,
  useChangeStudySettings,
  useStudentAvatarList,
  useStudentEarnReadingUnit,
  useStudentLocalConfig,
  useUpdateStudentLocalConfig,
} from '@/8th/features/student/service/setting-query'
import { useStudent } from '@/8th/features/student/service/student-query'
import SettingCheckSelector from '@/8th/features/student/ui/component/SettingCheckSelector'
import SettingHeader from '@/8th/features/student/ui/component/SettingHeader'
import SettingImageSelector from '@/8th/features/student/ui/component/SettingImageSelector'
import SettingRadioSelector from '@/8th/features/student/ui/component/SettingRadioSelector'
import {
  useCustomerConfiguration,
  useCustomerInfo,
} from '@/8th/shared/context/CustomerContext'
import CustomCheckbox from '@/8th/shared/ui/CustomCheckbox'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useMemo, useState } from 'react'

export default function AccountSetting() {
  const { menu } = useCustomerConfiguration()
  const setting = menu.account.setting

  // @language 'common'
  const { t } = useTranslation()

  const { data, isLoading } = useStudent()
  const { data: avatarData, isLoading: isAvatarDataLoading } =
    useStudentAvatarList()
  const { data: readingUnitData, isLoading: isReadingUnitDataLoading } =
    useStudentEarnReadingUnit()

  const customerId = useCustomerInfo()?.customerId || ''
  const studentId = data?.student?.studentId || ''
  const userConfig = useStudentLocalConfig({ customerId, studentId })

  const avatarList = useMemo(() => {
    if (avatarData?.list) {
      return avatarData.list.map((avatar) => ({
        label: avatar.name,
        value: avatar.avatarId,
        image: avatar.imageLarge,
      }))
    }
    return []
  }, [avatarData?.list])

  const readingUnitList = useMemo(() => {
    if (readingUnitData?.list) {
      return readingUnitData.list.map((unit) => ({
        label: unit.name,
        value: unit.readingUnitId,
        image: unit.image,
      }))
    }
    return []
  }, [readingUnitData?.list])

  if (
    isLoading ||
    isAvatarDataLoading ||
    isReadingUnitDataLoading ||
    !data ||
    !avatarData ||
    !readingUnitData
  ) {
    return <div></div>
  }

  const screenTypes = ['DailyRG', 'eBook', 'pBook', 'Todo']
  let startScreen: 'DailyRG' | 'eBook' | 'pBook' | 'Todo' = 'DailyRG'
  if (screenTypes.includes(data.student.startScreen)) {
    startScreen = data.student.startScreen as
      | 'DailyRG'
      | 'eBook'
      | 'pBook'
      | 'Todo'
  }
  const isOpenHomeScreen =
    setting.homeScreen.open &&
    [
      menu.activity.todo.open,
      menu.eb.open,
      menu.pb.open,
      menu.dailyRg.open,
    ].filter((isOpen) => isOpen).length > 1

  const myAvatar = avatarData.avatarId || '097971'
  const myReadingUnit = data.student.studyReadingUnitId

  return (
    <>
      <SubPageNavHeader
        title={t('t8th082')}
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
      <BoxStyle>
        {isOpenHomeScreen && (
          <MainScreenSetting
            startScreen={startScreen}
            isOpenTodo={menu.activity.todo.open}
            isOpenEBook={menu.eb.open}
            isOpenPBook={menu.pb.open}
            isOpenDailyRG={menu.dailyRg.open}
          />
        )}
        {setting.avatar.open && (
          <AvatarSetting avatar={myAvatar} avatarList={avatarList} />
        )}
        {setting.quizFriends.open && (
          <QuizFriendSetting
            readingUnit={myReadingUnit}
            readingUnitList={readingUnitList}
          />
        )}
        {setting.listenAndRepeat.open && (
          <ListenAndRepeatSetting
            levelK={data.student.eBKListenRepeat || false}
            isOpenLevelK={setting.listenAndRepeat.levelK.open}
            level1={data.student.eB1ListenRepeat || false}
            isOpenLevel1={setting.listenAndRepeat.level1.open}
          />
        )}
        {setting.quizHelper.open && (
          <QuizHelperSetting
            hint={data.student.viewStep2Skip || false}
            isOpenHint={setting.quizHelper.hint.open}
            chance={data.student.viewStep3Hint || false}
            isOpenChance={setting.quizHelper.chance.open}
          />
        )}
        {userConfig && (
          <LevelGuidanceSetting
            levelChange={userConfig.levelGuidanceLevelChange}
            tryOtherLevel={userConfig.levelGuidanceTryOtherLevel}
          />
        )}
      </BoxStyle>
    </>
  )
}

function useSavedMarker() {
  const [isSaved, setSaved] = useState(false)

  useEffect(() => {
    const timer = isSaved
      ? setTimeout(() => {
          setSaved(false)
        }, 3000)
      : undefined
    return () => {
      clearTimeout(timer)
    }
  }, [isSaved])

  const activeSaved = () => {
    setSaved(true)
  }
  const clearSaved = () => {
    setSaved(false)
  }
  return { isSaved, activeSaved, clearSaved }
}

function MainScreenSetting({
  startScreen,
  isOpenTodo,
  isOpenEBook,
  isOpenPBook,
  isOpenDailyRG,
}: {
  startScreen: 'DailyRG' | 'eBook' | 'pBook' | 'Todo'
  isOpenTodo: boolean
  isOpenEBook: boolean
  isOpenPBook: boolean
  isOpenDailyRG: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const options: {
    value: 'DailyRG' | 'eBook' | 'pBook' | 'Todo'
    label: string
  }[] = []
  if (isOpenDailyRG) {
    options.push({ value: 'DailyRG', label: 'DAILY RG' })
  }
  if (isOpenEBook) {
    options.push({ value: 'eBook', label: 'E-BOOK' })
  }
  if (isOpenPBook) {
    options.push({ value: 'pBook', label: 'P-BOOK QUIZ' })
  }
  if (isOpenTodo) {
    options.push({ value: 'Todo', label: 'To-Do' })
  }

  const { mutate: changeStartScreen } = useChangeStudySettingStartScreen({
    onSuccess: () => {
      activeSaved()
      setValue(chooseValue)
    },
  })

  const [value, setValue] = useState(startScreen)
  const [chooseValue, setChooseValue] = useState(value)
  const { isSaved, activeSaved, clearSaved } = useSavedMarker()

  const onSaveClick = () => {
    changeStartScreen({ startScreen: chooseValue })
  }

  const onCancelClick = () => {
    setChooseValue(value)
  }

  const onChangeItem = (newValue: string) => {
    if (isSaved) {
      clearSaved()
    }
    setChooseValue(newValue as 'DailyRG' | 'eBook' | 'pBook' | 'Todo')
  }

  return (
    <>
      <SettingHeader
        title={t('t8th083')}
        isChanged={chooseValue !== value}
        isSaved={isSaved}
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
      <SettingRadioSelector
        value={chooseValue}
        list={options}
        onChange={onChangeItem}
      />
    </>
  )
}

function AvatarSetting({
  avatar,
  avatarList,
}: {
  avatar: string
  avatarList: { label: string; value: string; image: string }[]
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const { mutate: changeAvatar } = useChangeStudentAvatar({
    onSuccess: () => {
      activeSaved()
      setValue(chooseValue)
    },
  })

  const [value, setValue] = useState(avatar)
  const [chooseValue, setChooseValue] = useState(value)
  const { isSaved, activeSaved, clearSaved } = useSavedMarker()

  const onSaveClick = () => {
    changeAvatar(chooseValue)
  }

  const onCancelClick = () => {
    setChooseValue(avatar)
  }

  const onChangeItem = (newValue: string) => {
    if (isSaved) {
      clearSaved()
    }
    setChooseValue(newValue)
  }

  const isChanged = value !== chooseValue
  return (
    <>
      <SettingHeader
        title={t('t8th084')}
        isChanged={isChanged}
        isSaved={isSaved}
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
      <SettingImageSelector
        value={chooseValue}
        list={avatarList}
        onChange={onChangeItem}
      />
    </>
  )
}

function QuizFriendSetting({
  readingUnit,
  readingUnitList,
}: {
  readingUnit: string
  readingUnitList: { label: string; value: string; image: string }[]
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const { mutate: changeStudySettingReadingUnit } =
    useChangeStudySettingReadingUnit({
      onSuccess: () => {
        activeSaved()
        setValue(chooseValue)
      },
    })
  const [value, setValue] = useState(readingUnit)
  const [chooseValue, setChooseValue] = useState(value)
  const { isSaved, activeSaved, clearSaved } = useSavedMarker()

  const onSaveClick = () => {
    changeStudySettingReadingUnit(chooseValue)
  }

  const onCancelClick = () => {
    setChooseValue(value)
  }

  const onChangeItem = (newValue: string) => {
    if (isSaved) {
      clearSaved()
    }
    setChooseValue(newValue)
  }
  return (
    <>
      <SettingHeader
        title={t('t8th085')}
        isChanged={chooseValue !== value}
        isSaved={isSaved}
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
      <SettingImageSelector
        value={chooseValue}
        list={readingUnitList}
        onChange={onChangeItem}
      />
    </>
  )
}

function ListenAndRepeatSetting({
  levelK,
  level1,
  isOpenLevelK,
  isOpenLevel1,
}: {
  levelK: boolean
  level1: boolean
  isOpenLevelK: boolean
  isOpenLevel1: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const ListenAndRepeatSelectOption: {
    value: 'levelK' | 'level1'
    label: string
  }[] = []
  if (isOpenLevelK) {
    ListenAndRepeatSelectOption.push({
      value: 'levelK',
      label: t('t8th087', { txt: 'K' }),
    })
  }
  if (isOpenLevel1) {
    ListenAndRepeatSelectOption.push({
      value: 'level1',
      label: t('t8th087', { txt: '1' }),
    })
  }
  const { mutate: changeListenAndRepeat } = useChangeListenAndRepeat({
    onSuccess: () => {
      activeSaved()
      setValue([...chooseValue])
    },
  })

  const [value, setValue] = useState<string[]>(
    [levelK ? 'levelK' : '', level1 ? 'level1' : '']
      .filter((item) => !!item)
      .sort(),
  )
  const [chooseValue, setChooseValue] = useState<string[]>([...value])
  const { isSaved, activeSaved, clearSaved } = useSavedMarker()

  const onSaveClick = () => {
    const levelK =
      value.includes('levelK') === chooseValue.includes('levelK')
        ? 'none'
        : chooseValue.includes('levelK')
    const level1 =
      value.includes('level1') === chooseValue.includes('level1')
        ? 'none'
        : chooseValue.includes('level1')
    changeListenAndRepeat({
      levelK,
      level1,
    })
  }

  const onCancelClick = () => {
    setChooseValue(value)
  }

  const onChangeItem = (newValue: string[]) => {
    if (isSaved) {
      clearSaved()
    }
    setChooseValue([...newValue])
  }

  const isChanged = !(
    chooseValue.length === value.length &&
    chooseValue.every((item, index) => item === value[index])
  )
  return (
    <>
      <SettingHeader
        title={t('t8th086')}
        isChanged={isChanged}
        isSaved={isSaved}
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
      <SettingCheckSelector
        values={chooseValue}
        list={ListenAndRepeatSelectOption}
        onChange={onChangeItem}
      />
    </>
  )
}

function QuizHelperSetting({
  hint,
  chance,
  isOpenHint,
  isOpenChance,
}: {
  hint: boolean
  chance: boolean
  isOpenHint: boolean
  isOpenChance: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const StudyQuizHelperOptions: { value: 'hint' | 'chance'; label: string }[] =
    []
  if (isOpenHint) {
    StudyQuizHelperOptions.push({
      value: 'hint',
      label: t('t8th089'),
    })
  }
  if (isOpenChance) {
    StudyQuizHelperOptions.push({
      value: 'chance',
      label: t('t8th090'),
    })
  }

  const { mutate: changeStudySettings } = useChangeStudySettings({
    onSuccess: () => {
      activeSaved()
      setValue([...chooseValue])
    },
  })
  const [value, setValue] = useState<string[]>(
    [hint ? 'hint' : '', chance ? 'chance' : '']
      .filter((item) => !!item)
      .sort(),
  )
  const [chooseValue, setChooseValue] = useState<string[]>([...value])
  const { isSaved, activeSaved, clearSaved } = useSavedMarker()

  const onSaveClick = () => {
    const hint =
      value.includes('hint') === chooseValue.includes('hint')
        ? 'none'
        : chooseValue.includes('hint')
    const chance =
      value.includes('chance') === chooseValue.includes('chance')
        ? 'none'
        : chooseValue.includes('chance')
    changeStudySettings({ hint, chance })
  }

  const onCancelClick = () => {
    setChooseValue(value)
  }

  const onChangeItem = (newValue: string[]) => {
    if (isSaved) {
      clearSaved()
    }
    setChooseValue([...newValue])
  }

  const isChanged = !(
    chooseValue.length === value.length &&
    chooseValue.every((item, index) => item === value[index])
  )
  return (
    <>
      <SettingHeader
        title={t('t8th088')}
        isChanged={isChanged}
        isSaved={isSaved}
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
      <SettingCheckSelector
        values={chooseValue}
        list={StudyQuizHelperOptions}
        onChange={onChangeItem}
      />
    </>
  )
}

function LevelGuidanceSetting({
  levelChange,
  tryOtherLevel,
}: {
  levelChange: boolean
  tryOtherLevel: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const customerId = useCustomerInfo()?.customerId || ''
  const { data, isLoading } = useStudent()
  const studentId = data?.student?.studentId || ''
  const userConfig = useStudentLocalConfig({ customerId, studentId })
  const updateSetting = useUpdateStudentLocalConfig()

  const LevelGuidanceOptions = [
    {
      value: 'levelChange',
      label: t('t8th310'),
      description: t('t8th311'),
    },
    {
      value: 'tryOtherLevel',
      label: t('t8th308'),
      description: t('t8th309'),
    },
  ]

  const [value, setValue] = useState<string[]>(
    [levelChange ? 'levelChange' : '', tryOtherLevel ? 'tryOtherLevel' : '']
      .filter((item) => !!item)
      .sort(),
  )
  const [chooseValue, setChooseValue] = useState<string[]>([...value])
  const { isSaved, activeSaved, clearSaved } = useSavedMarker()

  const onSaveClick = () => {
    const levelChange =
      value.includes('levelChange') === chooseValue.includes('levelChange')
        ? 'none'
        : chooseValue.includes('levelChange')
    const tryOtherLevel =
      value.includes('tryOtherLevel') === chooseValue.includes('tryOtherLevel')
        ? 'none'
        : chooseValue.includes('tryOtherLevel')

    updateSetting({
      customerId,
      studentId,
      levelGuidanceTryOtherLevel:
        tryOtherLevel === 'none'
          ? userConfig?.levelGuidanceTryOtherLevel
          : tryOtherLevel,
      levelGuidanceLevelChange:
        levelChange === 'none'
          ? userConfig?.levelGuidanceLevelChange
          : levelChange,
    })
    setValue([...chooseValue])
    activeSaved()
  }

  const onCancelClick = () => {
    setChooseValue(value)
  }

  const handleChange = (optionValue: string, checked: boolean) => {
    if (isSaved) {
      clearSaved()
    }
    const newValues = [...chooseValue]
    if (checked) {
      if (!newValues.includes(optionValue)) {
        newValues.push(optionValue)
      }
    } else {
      if (newValues.includes(optionValue)) {
        newValues.splice(newValues.indexOf(optionValue), 1)
      }
    }
    setChooseValue(newValues.sort())
  }

  const isChanged = !(
    chooseValue.length === value.length &&
    chooseValue.every((item, index) => item === value[index])
  )

  return (
    <>
      <SettingHeader
        title={'Level Guidance'}
        isChanged={isChanged}
        isSaved={isSaved}
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
      <BoxStyle display="flex" flexDirection="column" gap={20} padding="20px">
        {LevelGuidanceOptions.map((option) => (
          <BoxStyle
            key={option.value}
            display="flex"
            flexDirection="column"
            gap={8}>
            <CustomCheckbox
              id={option.value}
              checked={chooseValue.includes(option.value)}
              onChange={(checked) => handleChange(option.value, checked)}
              label={option.label}
            />
            {option.description && (
              <BoxStyle padding="0 0 0 32px">
                <TextStyle
                  fontFamily="sans"
                  fontSize="small"
                  fontColor="secondary">
                  {option.description}
                </TextStyle>
              </BoxStyle>
            )}
          </BoxStyle>
        ))}
      </BoxStyle>
    </>
  )
}
