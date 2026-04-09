import { Assets } from '@/8th/assets/asset-library'
import { SubPageNavHeaderStyle } from '@/8th/shared/styled/SharedStyled'
import { TextStyle } from '@/8th/shared/ui/Misc'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface SubPageNavHeaderProps {
  title?: string
  subTitle?: string
  iconSrc?: string
  parentPath?: string
  onOverrideBack?: () => void
}

export function SubPageNavHeader({
  title,
  subTitle,
  iconSrc,
  parentPath,
  onOverrideBack,
}: SubPageNavHeaderProps) {
  const router = useRouter()

  const onBackClick = () => {
    if (onOverrideBack) {
      onOverrideBack()
    } else {
      if (parentPath) {
        router.push(parentPath)
      } else {
        router.back()
      }
    }
  }

  const isDefaultStyle = !iconSrc && !title && !subTitle

  return (
    <SubPageNavHeaderStyle onClick={onBackClick}>
      <Image
        src={Assets.Icon.arrowLeftGray}
        alt="back"
        width={24}
        height={24}
      />
      {isDefaultStyle && (
        <TextStyle
          fontColor="secondary"
          fontSize="var(--font-size-xlarge)"
          padding="2px 0 0 0">
          Back
        </TextStyle>
      )}
      {iconSrc && <Image src={iconSrc} alt="simbol" width={30} height={30} />}
      {title && (
        <TextStyle fontSize="var(--font-size-large)">{title}</TextStyle>
      )}
      {subTitle && (
        <TextStyle fontSize="var(--font-size-large)" fontColor="secondary">
          {subTitle}
        </TextStyle>
      )}
    </SubPageNavHeaderStyle>
  )
}
