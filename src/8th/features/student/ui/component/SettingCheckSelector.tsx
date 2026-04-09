import { SettingCheckSelectorStyle } from '@/8th/shared/styled/FeaturesStyled'
import CustomCheckbox from '@/8th/shared/ui/CustomCheckbox'

interface SettingCheckSelectorProps {
  values?: string[]
  list?: { value: string; label: string }[]
  onChange?: (values: string[]) => void
}

/**
 * Checkbox Select Option
 */
export default function SettingCheckSelector({
  values,
  list,
  onChange,
}: SettingCheckSelectorProps) {
  const handleChange = (value: string, checked: boolean) => {
    const newValues = [...(values || [])]
    if (checked) {
      if (!newValues.includes(value)) {
        newValues.push(value)
      }
    } else {
      if (newValues.includes(value)) {
        newValues.splice(newValues.indexOf(value), 1)
      }
    }
    if (onChange) {
      onChange(newValues.sort())
    }
  }

  return (
    <SettingCheckSelectorStyle>
      {list?.map((option) => (
        <CustomCheckbox
          key={option.value}
          id={option.value}
          checked={values?.includes(option.value)}
          onChange={(checked) => handleChange(option.value, checked)}
          label={option.label}
        />
      ))}
    </SettingCheckSelectorStyle>
  )
}
