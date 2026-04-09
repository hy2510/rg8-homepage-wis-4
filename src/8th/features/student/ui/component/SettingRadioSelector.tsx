import {
  CustomRadioInputStyle,
  RadioLabelStyle,
  RadioSelectorItemStyle,
  SettingRadioSelectorStyle,
} from '@/8th/shared/styled/FeaturesStyled'

interface SettingRadioSelectorProps {
  value?: string
  list?: { value: string; label: string }[]
  onChange?: (value: string) => void
}

/**
 * Radio Select Option
 */
export default function SettingRadioSelector({
  value,
  list,
  onChange,
}: SettingRadioSelectorProps) {
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <SettingRadioSelectorStyle>
      {list?.map((item) => (
        <RadioSelectorItem
          key={item.value}
          title={item.label}
          value={item.value}
          isSelected={value === item.value}
          onChange={handleChange}
        />
      ))}
    </SettingRadioSelectorStyle>
  )
}

function RadioSelectorItem({
  title,
  value,
  isSelected,
  onChange,
}: {
  title: string
  value: string
  isSelected: boolean
  onChange: (value: string) => void
}) {
  return (
    <RadioSelectorItemStyle
      className="radio-selector-item"
      onClick={() => onChange(value)}>
      <CustomRadioInputStyle
        type="radio"
        name="radio-selector-item"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
      />
      <RadioLabelStyle>{title}</RadioLabelStyle>
    </RadioSelectorItemStyle>
  )
}
