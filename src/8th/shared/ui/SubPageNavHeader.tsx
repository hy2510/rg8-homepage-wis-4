import { Assets } from '@/8th/assets/asset-library'
import { SubPageNavHeaderStyle } from '@/8th/shared/styled/SharedStyled'
import { TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface SubPageNavHeaderProps {
  title?: string
  subTitle?: string
  iconSrc?: string
  parentPath?: string
  onOverrideBack?: () => void
  /** E-Book / P-Book Quiz 라이브러리 하위 페이지에서 타이틀 오른쪽에 (E-Book) 등 표시 */
  libraryBookType?: 'EB' | 'PB'
}

export function SubPageNavHeader({
  title,
  subTitle,
  iconSrc,
  parentPath,
  onOverrideBack,
  libraryBookType,
}: SubPageNavHeaderProps) {
  // @Language 'common'
  const { t } = useTranslation()
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

  const librarySuffix =
    libraryBookType === 'EB'
      ? `(${t('t8th325')})`
      : libraryBookType === 'PB'
        ? `(${t('t8th326')})`
        : null

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
      {librarySuffix && (
        <TextStyle fontSize="var(--font-size-large)" fontColor="secondary">
          {librarySuffix}
        </TextStyle>
      )}
      {subTitle && (
        <TextStyle fontSize="var(--font-size-large)" fontColor="secondary">
          {subTitle}
        </TextStyle>
      )}
    </SubPageNavHeaderStyle>
  )
}
