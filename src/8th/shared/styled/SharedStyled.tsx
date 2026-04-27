'use client'

import { Assets } from '@/8th/assets/asset-library'
import styled from 'styled-components'
import {
  displayBlockLabtopL,
  displayBlockLabtopS,
  displayBlockPc,
  displayBlockPhone,
  displayBlockTabletL,
  displayBlockTabletS,
  displayNoneLabtopL,
  displayNoneLabtopS,
  displayNonePc,
  displayNonePhone,
  displayNoneTabletL,
  displayNoneTabletS,
  labtopL,
  labtopS,
  phone,
} from './StyleUtils'

// Display None을 위한 스타일 컴포넌트
export const DisplayNoneStyle = styled.div<{
  hideOnLabtopL?: boolean
  hideOnLabtopS?: boolean
  hideOnTabletL?: boolean
  hideOnTabletS?: boolean
  hideOnPhone?: boolean
  hideOnPc?: boolean
}>`
  ${({ hideOnLabtopL }) => hideOnLabtopL && displayNoneLabtopL('')}
  ${({ hideOnLabtopS }) => hideOnLabtopS && displayNoneLabtopS('')}
  ${({ hideOnTabletL }) => hideOnTabletL && displayNoneTabletL('')}
  ${({ hideOnTabletS }) => hideOnTabletS && displayNoneTabletS('')}
  ${({ hideOnPhone }) => hideOnPhone && displayNonePhone('')}
  ${({ hideOnPc }) => hideOnPc && displayNonePc('')}
`

// Display Block을 위한 스타일 컴포넌트
export const DisplayBlockStyle = styled.div<{
  showOnLabtopL?: boolean
  showOnLabtopS?: boolean
  showOnTabletL?: boolean
  showOnTabletS?: boolean
  showOnPhone?: boolean
  showOnPc?: boolean
}>`
  display: none; /* 기본적으로 숨김 */
  ${({ showOnLabtopL }) => showOnLabtopL && displayBlockLabtopL('')}
  ${({ showOnLabtopS }) => showOnLabtopS && displayBlockLabtopS('')}
  ${({ showOnTabletL }) => showOnTabletL && displayBlockTabletL('')}
  ${({ showOnTabletS }) => showOnTabletS && displayBlockTabletS('')}
  ${({ showOnPhone }) => showOnPhone && displayBlockPhone('')}
  ${({ showOnPc }) => showOnPc && displayBlockPc('')}
`

export const ActionBarHeaderStyle = styled.div`
  font-size: var(--font-size-large);
  color: var(--font-color-secondary);
  border-top: 1px solid var(--line-color-primary);
  padding: 20px 10px;
  display: flex;
  align-items: center;
  gap: 20px;
`

export const ActionBarContainerStyle = styled.div<{
  isBottom?: boolean
  isPeriodSearch?: boolean
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  border-top: ${({ isBottom }) =>
    isBottom ? 'none' : '1px solid var(--line-color-primary)'};
  border-bottom: 1px solid var(--line-color-primary);
  background-color: ${({ isPeriodSearch }) =>
    isPeriodSearch ? 'var(--color-gray-light)' : 'transparent'};
  font-size: ${({ isBottom }) =>
    isBottom ? '16px' : 'var(--font-size-medium)'};

  ${phone(`
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    padding: 15px 10px;
`)}

  ${({ isBottom, isPeriodSearch }) =>
    isBottom &&
    !isPeriodSearch &&
    phone(`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    z-index: 1000;
    border-top: 1px solid var(--line-color-primary);
    font-size: 1em !important;
  `)}

  input {
    width: 100%;
    max-width: calc(50vw - 50px);
    height: 40px;
    padding: 8px 12px;
    border: 1px solid var(--line-color-primary);
    border-radius: 12px;
    color: var(--font-color-secondary);
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-small);
    background-color: #fff;

    @media (max-width: 340px) {
      &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
      }

      &[type='date'],
      &[type='datetime-local'],
      &[type='time'] {
        &::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
      }
    }

    &.title-search {
      min-width: 200px;
      max-width: 500px;
    }
  }

  .mobile-divider {
    ${phone(`
      width: 100%;
      height: 1px;
      border-bottom: 1px dotted var(--line-color-primary);
    `)}
  }

  .period-search-text {
    font-family: var(--font-family-rg-b);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.01em;

    .value {
      font-family: var(--font-family-secondary);
      font-size: 14px;
      font-weight: 800;
    }
  }

  .tab-button-container {
    display: flex;
    background-color: #fff;
    width: fit-content;
    border-radius: 12px;
    padding: 3px;

    .tab-button {
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 10px;
      font-family: var(--font-family-secondary);
      font-size: var(--font-size-small);
      font-weight: 600;
      background-color: #fff;
      color: var(--font-color-secondary);

      &.active {
        background-color: var(--color-gray-light);
        border-radius: 10px;
        padding: 8px 12px;
        color: var(--font-color-primary);
      }
    }
  }
`

export const DailyRgResultActionBarStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  border-top: 1px solid var(--line-color-primary);
  border-bottom: 1px solid var(--line-color-primary);
  font-size: var(--font-size-medium);

  ${phone(`
    padding: 15px 10px;
  `)}
`

export const BasicGridLayoutStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(0, 320px);
  gap: 50px;
  position: relative;
  padding: 20px 0;
  width: 100%;
  max-width: 100%;

  ${labtopL(`
    gap: 30px;
  `)}

  ${labtopS(`
    width: 100%;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0 15px;
  `)}

  .right-container-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 900;
  }
`

export const MobileTopPlaceholderStyle = styled.div`
  height: 0;

  ${labtopS(`
    height: 65px;
  `)}
`

export const LeftContainerStyle = styled.div<{ leftContainerGap?: number }>`
  display: flex;
  flex-direction: column;
  grid-column: 1;
  gap: ${({ leftContainerGap }) => leftContainerGap || 30}px;

  .left-container-title-box {
    display: none;

    .title {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .menu {
      display: none;

      ${labtopS(`
        display: flex;
        align-items: center;
      `)}
    }

    ${labtopL(`
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--font-size-xlarge);
      color: var(--font-color-primary);
      letter-spacing: -0.05em;
      align-items: center;
      gap: 10px;
      
    `)}

    ${labtopS(`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 70px;
      z-index: 900;
      font-size: var(--font-size-large);
      color: var(--font-color-primary);
      letter-spacing: -0.05em;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid var(--line-color-primary);
      padding: 0 15px;
      background-color: #fff;
    `)}

    img {
      display: block;
    }
  }
`

export const RightContainerStyle = styled.div`
  width: 100%;
  max-width: 320px;
  min-width: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  top: 0;
  bottom: auto;
  right: max(0px, calc((100vw - 1308px) / 2));
  z-index: 901;
  max-height: calc(100vh - var(--footer-offset, 0px));
  overflow-y: auto;
  padding-top: 50px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overscroll-behavior-y: none;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    scrollbar-width: none;
  }

  ${labtopL(`
    right: max(0px, calc((100vw - 1100px) / 2));
  `)}

  ${labtopS(`
    display: none;

    &.active {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 400px;
      height: auto;
      position: fixed;
      max-height: none;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 15px;
      padding-top: calc(15px + env(safe-area-inset-top));
      padding-bottom: calc(15px + env(safe-area-inset-bottom));
      background-color: #fff;
      z-index: 901;
      overscroll-behavior-y: none;
      -webkit-overflow-scrolling: touch;
    }
  `)}

  .right-container-close-button {
    display: none;

    ${labtopS(`
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 902;
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--color-gray-light);
    `)}
  }
`

export const BodyContainerStyle = styled.div`
  padding-left: 288px;
  min-height: 100dvh;
  min-width: 100%;
  max-width: 100%;

  ${labtopL(`
    padding-left: 80px;
  `)}

  ${labtopS(`
    padding: 0;
  `)}
`

export const ContentsWrapperStyle = styled.div`
  margin: 0 auto;
  max-width: 1020px;
  width: 100%;
  min-height: 100dvh;
  padding: 30px 0;
`

export const StartButtonStyle = styled.button<{ isMobile?: boolean }>`
  cursor: pointer;
  border-radius: 12px;
  background: var(--color-red-medium);
  box-shadow: 0 3px 0 0 var(--color-red-medium-shadow);
  width: ${({ isMobile }) => (isMobile ? '100%' : '100px')};
  min-height: ${({ isMobile }) => (isMobile ? '50px' : '46px')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  color: #fff;
  text-align: center;
  margin-top: 5px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '4px' : '0')};

  &:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 0 var(--color-red-medium-shadow);
  }

  &.mobile-activated {
    width: calc(100% - 10px);
    margin: 5px;
    margin-bottom: 10px;
    margin-top: 0;
  }

  &.animated,
  &.mobile-animated {
    position: relative;
    overflow: hidden;
  }

  &.animated::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-image: url('${Assets.Image.GlossyBgSmall.src}');
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
    animation: sheen 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  &.mobile-animated::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-image: url('${Assets.Image.GlossyBgSmall.src}');
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
    animation: sheen 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes sheen {
    0% {
      left: -100%;
    }
    100% {
      left: 200%;
    }
  }
`

export const ResourceDownloadButtonStyle = styled.div<{
  isMobile?: boolean
}>`
  position: relative;
  padding-right: ${({ isMobile }) => (isMobile ? '0' : '10px')};

  .download-button-trigger {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-light-blue-opacity-10);
    }

    &:focus {
      outline: 2px solid var(--color-light-blue);
      outline-offset: 2px;
    }
  }

  img {
    display: block;
  }
`

export const RoundedFullButtonStyle = styled.button<{
  marginTop?: number
  marginBottom?: number
  isSmall?: boolean
  fontColor?: string
  bgColor?: 'primary' | 'secondary'
  active?: boolean
  tabs?: boolean
  fontFamily?: string
}>`
  cursor: pointer;
  width: fit-content;
  min-width: fit-content;
  min-height: ${({ isSmall }) => (isSmall ? '36px' : '44px')};
  padding: ${({ isSmall }) => (isSmall ? '0 20px' : '0 20px')};
  border-radius: 100px;
  color: ${({ fontColor }) => fontColor || 'var(--font-color-secondary)'};
  font-size: var(--font-size-medium);
  background: ${({ bgColor, tabs }) =>
    bgColor === 'primary'
      ? '#3c4b62'
      : bgColor === 'secondary'
        ? 'var(--color-gray-light)'
        : tabs
          ? 'var(--color-gray-medium)'
          : 'var(--color-gray-light)'};
  margin: 0 auto;
  margin-top: ${({ marginTop }) => marginTop}px;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  ${({ active }) =>
    active &&
    `
      background: #3c4b62;
      color: #fff;
    `}
  font-family: ${({ tabs, fontFamily }) =>
    fontFamily === 'round'
      ? 'var(--font-family-primary)'
      : fontFamily === 'sans'
        ? 'var(--font-family-secondary)'
        : tabs
          ? 'var(--font-family-secondary)'
          : 'var(--font-family-primary)'};
  font-weight: ${({ fontFamily, tabs }) =>
    fontFamily === 'round'
      ? '500'
      : fontFamily === 'sans'
        ? '700'
        : tabs
          ? '700'
          : '500'};
`

export const MoreHorizontalButtonStyle = styled.button`
  cursor: pointer;
  width: 46px;
  min-height: 46px;
  border-radius: 12px;
  background: #3c4b62;
  box-shadow: 0 3px 0 0 #293445;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  position: relative;

  &:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 0 #293445;
  }
`

export const LogoutButtonStyle = styled.button`
  cursor: pointer;
  width: 100%;
  min-height: 46px;
  background-color: var(--color-gray-light);
  font-size: var(--font-size-medium);
  font-family: var(--font-family-secondary);
  font-weight: 700;
  color: var(--font-color-secondary);
  padding: 10px;
  border-radius: 12px;
  border: none;
  outline: none;
  transition: all 0.2s ease;
  &:hover {
    background-color: var(--color-gray-medium);
  }
  &:active {
    transform: translateY(2px);
  }
`

export const GoTo7thButtonStyle = styled.div`
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-small);
  font-family: var(--font-family-secondary);
  font-weight: 700;
  color: var(--font-color-secondary);
`

export const HiddenCheckboxStyle = styled.input`
  width: fit-content;
  position: absolute;
  opacity: 0;
  pointer-events: none;
`

export const CheckboxStyle = styled.div<{
  checked: boolean
  disabled?: boolean
}>`
  width: 20px;
  height: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: 2px solid
    ${({ disabled }) =>
      disabled ? 'var(--line-color-gray)' : 'var(--font-color-light-blue)'};
  border-radius: 5px;
  background-color: ${({ checked, disabled }) =>
    disabled ? '#f5f5f5' : checked ? 'var(--font-color-light-blue)' : '#fff'};
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    border-color: ${({ disabled }) =>
      disabled ? 'var(--line-color-gray)' : 'var(--font-color-light-blue)'};
  }
`

export const CheckboxLabelStyle = styled.label`
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-medium);
  font-weight: 700;
  color: var(--font-color-primary);
  cursor: pointer;
  user-select: none;
`

export interface DropdownContainerStyleProps {
  position?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topRight'
    | 'leftTop'
    | 'leftCenter'
    | 'leftBottom'
    | 'rightTop'
    | 'rightCenter'
    | 'rightBottom'
  viewGrid?: boolean
}

export const DropdownContainerStyle = styled.div<DropdownContainerStyleProps>`
  position: absolute;

  ${({ position }) => {
    const styles: Record<
      NonNullable<DropdownContainerStyleProps['position']>,
      {
        top?: string
        bottom?: string
        left?: string
        right?: string
        transform?: string
        marginTop?: string
        marginBottom?: string
      }
    > = {
      bottomLeft: {
        top: '100%',
        left: '0',
        bottom: 'auto',
        marginTop: '10px',
      },
      bottomRight: {
        top: '100%',
        right: '0',
        bottom: 'auto',
        marginTop: '10px',
      },
      topLeft: {
        top: 'auto',
        left: '0',
        bottom: '100%',
        marginBottom: '10px',
      },
      topRight: {
        top: 'auto',
        right: '0',
        bottom: '100%',
        marginBottom: '10px',
      },
      leftTop: {
        top: '0',
        left: 'auto',
        bottom: 'auto',
        right: 'calc(100% + 5px)',
      },
      leftCenter: {
        top: '50%',
        transform: 'translateY(-50%)',
        right: 'calc(100% + 5px)',
        bottom: 'auto',
      },
      leftBottom: {
        top: 'auto',
        left: 'auto',
        bottom: '0',
        right: 'calc(100% + 5px)',
      },
      rightTop: {
        top: '0',
        left: 'calc(100% + 5px)',
        bottom: 'auto',
      },
      rightCenter: {
        top: '50%',
        transform: 'translateY(-50%)',
        left: 'calc(100% + 5px)',
        bottom: 'auto',
      },
      rightBottom: {
        top: 'auto',
        left: 'calc(100% + 5px)',
        bottom: '0',
      },
    }

    if (!position) {
      return ''
    }

    const currentStyle = styles[position as NonNullable<typeof position>] as any
    return `
      top: ${currentStyle.top || 'auto'};
      bottom: ${currentStyle.bottom || 'auto'};
      left: ${currentStyle.left || 'auto'};
      ${currentStyle.right ? `right: ${currentStyle.right};` : ''}
      ${currentStyle.transform ? `transform: ${currentStyle.transform};` : ''}
      ${currentStyle.marginTop ? `margin-top: ${currentStyle.marginTop};` : ''}
      ${currentStyle.marginBottom ? `margin-bottom: ${currentStyle.marginBottom};` : ''}
    `
  }}

  z-index: 1000;
  min-width: 200px;
  background-color: ${({ viewGrid }) => (viewGrid ? '#f0f2f5' : '#fff')};
  border: 1px solid var(--line-color-primary);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: ${({ viewGrid }) => (viewGrid ? 'grid' : 'block')};
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  line-height: 1.5;
  gap: ${({ viewGrid }) => (viewGrid ? '1px' : '10px')};
`

export const DropdownItemStyle = styled.div<{
  viewGrid: boolean
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 18px 20px;
  border-bottom: ${({ viewGrid }) =>
    viewGrid ? 'none' : '1px solid var(--line-color-primary)'};
  background-color: #fff;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-light-blue-opacity-10);
  }

  .link-text {
    font-size: 1em;
    text-align: left;
    font-family: var(--font-family-secondary);
    font-weight: 700;
    color: var(--font-color-light-blue);
  }

  .sub-text {
    font-size: var(--font-size-small);
    font-family: var(--font-family-secondary);
    font-weight: 800;
    text-align: left;
    color: var(--font-color-secondary);
  }

  .icon {
    width: 10px;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`

export const DropdownButtonBigStyle = styled.div`
  cursor: pointer;
  color: var(--font-color-primary);
  display: flex;
  align-items: center;
  gap: 5px;

  img {
    display: block;
    width: 16px;
    height: 16px;
  }
`

export const DropdownButtonSmallContainerStyle = styled.div`
  position: relative;
`

export const DropdownButtonSmallStyle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  .link-text {
    font-size: 14px;
    font-family: var(--font-family-rg-b);
    letter-spacing: 0.01em;
    color: var(--font-color-secondary);
    font-weight: 600;

    &.black {
      color: var(--font-color-primary);
    }

    &.large-text {
      font-size: 18px;
      color: var(--font-color-primary);
    }
  }

  .icon {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: 100%;
      height: 100%;
      transition: transform 0.2s ease;
    }
  }
`

export const DropdownSmallMenuStyle = styled.div<{
  isMobile?: boolean
  position?: 'left' | 'right'
}>`
  position: absolute;
  top: 100%;
  left: ${({ position }) => (position === 'left' ? '-25px' : 'auto')};
  right: ${({ position }) => (position === 'right' ? '-25px' : '0')};
  padding: 10px;
  min-width: 180px;
  background-color: #fff;
  border: 1px solid var(--line-color-primary);
  border-radius: 15px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  overflow: hidden;
`

export const DropdownStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const DropdownStatusDivider = styled.div`
  height: 1px;
  background-color: var(--line-color-primary);
  margin: 8px 0;
`
export const DropdownSmallItemStyle = styled.div<{
  isSelected: boolean
  isExportDropdown?: boolean
}>`
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item-text {
    font-size: 14px;
    color: ${({ isSelected, isExportDropdown }) =>
      isExportDropdown
        ? 'var(--font-color-light-blue)'
        : isSelected
          ? 'var(--font-color-light-blue)'
          : 'var(--font-color-secondary)'};
    font-family: var(--font-family-secondary);
    font-weight: 800;
  }

  img {
    display: block;
  }
`

export const GlobalNavBarStyle = styled.div<{ zIndex?: number }>`
  width: 288px;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid rgb(212, 220, 230, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex || 100};
  padding: 10px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  ${labtopL(`
    width: 80px;
    padding: 0;

  `)}

  ${labtopS(`
    width: 100%;
    height: fit-content;
    min-height: 70px;
    padding: 5px;
    border-right: none;
    border-top: 1px solid var(--line-color-primary);
    top: auto;
    bottom: 0;
    left: 0;
    z-index: 900;
    display: flex;
    align-items: center;
    justify-content: center;
  `)}

  .logo-container {
    width: 188px;
    height: auto;

    ${labtopL(`
      display: none;
    `)}

    .logo {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .menu-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 100%;

    ${labtopS(`
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 30px;
      padding: 0;
      width: 100%;
      height: 100%;
    `)}

    ${phone(`
      justify-content: space-evenly;
      gap: 0;
    `)}

    .divider {
      width: 100%;
      height: 1px;
      background-color: var(--line-color-primary);

      ${labtopS(`
        display: none;
      `)}
    }
  }
`

export const MenuItemStyle = styled.div`
  cursor: pointer;
  color: var(--font-color-secondary);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  position: relative;

  ${labtopL(`
    flex-direction: column;
    position: relative;
    gap: 4px;
    padding: 6px;
  `)}

  &.is-active {
    background-color: var(--color-light-blue-opacity-10);
    border: 1px solid var(--line-color-light-blue);
    color: var(--font-color-light-blue);
  }

  .menu-item-icon {
    img {
      display: block;
    }
  }

  .menu-item-text {
    width: 100%;
    font-size: var(--font-size-medium);
    font-weight: 400;
    text-align: start;

    ${labtopL(`
      // display: none;
      width: 47px;
      font-size: 0.55em;
      text-align: center;
    `)}
  }

  &.menu-item-streak-disabled {
    cursor: default;
    pointer-events: none;
  }

  &.menu-item-avatar-with-level .menu-item-avatar-level-label,
  &.menu-item-streak-with-count .menu-item-streak-count-label {
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    z-index: 4;
    font-size: 0.58rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    color: #fff;
    max-width: 50px;
    padding: 2px 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-family-secondary);
    text-align: center;
    pointer-events: none;
    background: #3c4b62;
    border-radius: 100px;
  }
`

export const MobileMoreMenuItemBoxStyle = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 70px;
  padding: 5px;
  border-right: none;
  border-top: 1px solid var(--line-color-primary);
  position: fixed;
  top: auto;
  bottom: 70px;
  left: 0;
  z-index: 901;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`

export const BoxStyled = styled.div<{
  onClick?: () => void
  padding?: string
  margin?: string
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  border?: string
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  borderWidth?: string
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  borderColor?: 'primary' | 'secondary' | 'gray' | 'lightBlue'
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  backgroundAttachment?: 'scroll' | 'fixed' | 'local'
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box'
  backgroundOrigin?: 'border-box' | 'padding-box' | 'content-box'
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto'
  boxShadow?: string
  transform?: string
  opacity?: number
  visibility?: 'visible' | 'hidden' | 'collapse'
  cursor?:
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'grab'
    | 'grabbing'
    | 'e-resize'
    | 'n-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 's-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'w-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'col-resize'
    | 'row-resize'
    | 'all-scroll'
  // Text properties
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
  lineHeight?: string | number
  letterSpacing?: string
  wordSpacing?: string
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  whiteSpace?:
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'pre-wrap'
    | 'pre-line'
    | 'break-spaces'
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word'
  textOverflow?: 'clip' | 'ellipsis' | string
  verticalAlign?:
    | 'baseline'
    | 'sub'
    | 'super'
    | 'top'
    | 'text-top'
    | 'middle'
    | 'bottom'
    | 'text-bottom'
  // Box model
  boxSizing?: 'content-box' | 'border-box'
  // Flex properties
  display?:
    | 'block'
    | 'flex'
    | 'grid'
    | 'inline'
    | 'inline-block'
    | 'inline-flex'
    | 'inline-grid'
    | 'none'
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number
  flex?: string
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string
  // Grid properties
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridTemplateAreas?: string
  gridAutoColumns?: string
  gridAutoRows?: string
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense'
  placeItems?: 'start' | 'end' | 'center' | 'stretch'
  placeContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  // Transition and animation
  transition?: string
  transitionProperty?: string
  transitionDuration?: string
  transitionTimingFunction?: string
  transitionDelay?: string
  animation?: string
  animationName?: string
  animationDuration?: string
  animationTimingFunction?: string
  animationDelay?: string
  animationIterationCount?: string | number
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  animationPlayState?: 'running' | 'paused'
  // Scroll behavior
  scrollBehavior?: 'auto' | 'smooth'
  scrollbarWidth?: 'auto' | 'thin' | 'none'
  scrollbarColor?: string
  // Pseudo selectors
  hover?: React.CSSProperties
  focus?: React.CSSProperties
  active?: React.CSSProperties
  before?: React.CSSProperties
  after?: React.CSSProperties
}>`
  cursor: ${({ cursor, onClick }) => cursor || (onClick ? 'pointer' : '')};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  min-height: ${({ minHeight }) => minHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : '0'};
  border-top-left-radius: ${({ borderTopLeftRadius }) =>
    borderTopLeftRadius ? `${borderTopLeftRadius}px` : undefined};
  border-top-right-radius: ${({ borderTopRightRadius }) =>
    borderTopRightRadius ? `${borderTopRightRadius}px` : undefined};
  border-bottom-left-radius: ${({ borderBottomLeftRadius }) =>
    borderBottomLeftRadius ? `${borderBottomLeftRadius}px` : undefined};
  border-bottom-right-radius: ${({ borderBottomRightRadius }) =>
    borderBottomRightRadius ? `${borderBottomRightRadius}px` : undefined};
  border-style: ${({ borderStyle }) => borderStyle};
  border-width: ${({ borderWidth }) => borderWidth};
  border-top: ${({ borderTop }) => borderTop};
  border-right: ${({ borderRight }) => borderRight};
  border-bottom: ${({ borderBottom }) => borderBottom};
  border-left: ${({ borderLeft }) => borderLeft};
  border-color: ${({ borderColor }) =>
    borderColor === 'lightBlue'
      ? 'var(--line-color-light-blue)'
      : borderColor === 'gray'
        ? 'var(--line-color-gray)'
        : borderColor === 'secondary'
          ? 'var(--line-color-secondary)'
          : 'var(--line-color-primary)'};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  z-index: ${({ zIndex }) => zIndex};
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: ${({ backgroundImage }) => backgroundImage};
  background-size: ${({ backgroundSize }) => backgroundSize};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
  background-repeat: ${({ backgroundRepeat }) => backgroundRepeat};
  background-attachment: ${({ backgroundAttachment }) => backgroundAttachment};
  background-clip: ${({ backgroundClip }) => backgroundClip};
  background-origin: ${({ backgroundOrigin }) => backgroundOrigin};
  box-shadow: ${({ boxShadow }) => boxShadow};
  overflow: ${({ overflow }) => overflow};
  overflow-x: ${({ overflowX }) => overflowX};
  overflow-y: ${({ overflowY }) => overflowY};
  transform: ${({ transform }) => transform};
  opacity: ${({ opacity }) => opacity};
  visibility: ${({ visibility }) => visibility};

  /* Text properties */
  text-align: ${({ textAlign }) => textAlign};
  line-height: ${({ lineHeight }) => lineHeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  word-spacing: ${({ wordSpacing }) => wordSpacing};
  text-decoration: ${({ textDecoration }) => textDecoration};
  text-transform: ${({ textTransform }) => textTransform};
  white-space: ${({ whiteSpace }) => whiteSpace};
  word-break: ${({ wordBreak }) => wordBreak};
  text-overflow: ${({ textOverflow }) => textOverflow};
  vertical-align: ${({ verticalAlign }) => verticalAlign};

  /* Box model */
  box-sizing: ${({ boxSizing }) => boxSizing || 'content-box'};

  /* Flex properties */
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};
  flex: ${({ flex }) => flex};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-basis: ${({ flexBasis }) => flexBasis};

  /* Grid properties */
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  grid-auto-columns: ${({ gridAutoColumns }) => gridAutoColumns};
  grid-auto-rows: ${({ gridAutoRows }) => gridAutoRows};
  grid-auto-flow: ${({ gridAutoFlow }) => gridAutoFlow};
  place-items: ${({ placeItems }) => placeItems};
  place-content: ${({ placeContent }) => placeContent};

  /* Transition and animation */
  transition: ${({ transition }) => transition};
  transition-property: ${({ transitionProperty }) => transitionProperty};
  transition-duration: ${({ transitionDuration }) => transitionDuration};
  transition-timing-function: ${({ transitionTimingFunction }) =>
    transitionTimingFunction};
  transition-delay: ${({ transitionDelay }) => transitionDelay};
  animation: ${({ animation }) => animation};
  animation-name: ${({ animationName }) => animationName};
  animation-duration: ${({ animationDuration }) => animationDuration};
  animation-timing-function: ${({ animationTimingFunction }) =>
    animationTimingFunction};
  animation-delay: ${({ animationDelay }) => animationDelay};
  animation-iteration-count: ${({ animationIterationCount }) =>
    animationIterationCount};
  animation-direction: ${({ animationDirection }) => animationDirection};
  animation-fill-mode: ${({ animationFillMode }) => animationFillMode};
  animation-play-state: ${({ animationPlayState }) => animationPlayState};

  /* Scroll behavior */
  scroll-behavior: ${({ scrollBehavior }) => scrollBehavior};
  scrollbar-width: ${({ scrollbarWidth }) => scrollbarWidth};
  scrollbar-color: ${({ scrollbarColor }) => scrollbarColor};

  /* Pseudo selectors */
  &:hover {
    ${({ hover }) =>
      hover &&
      Object.entries(hover)
        .map(
          ([key, value]) =>
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`,
        )
        .join('\n    ')}
  }

  &:focus {
    ${({ focus }) =>
      focus &&
      Object.entries(focus)
        .map(
          ([key, value]) =>
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`,
        )
        .join('\n    ')}
  }

  &:active {
    ${({ active }) =>
      active &&
      Object.entries(active)
        .map(
          ([key, value]) =>
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`,
        )
        .join('\n    ')}
  }

  &::before {
    ${({ before }) =>
      before &&
      Object.entries(before)
        .map(
          ([key, value]) =>
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`,
        )
        .join('\n    ')}
  }

  &::after {
    ${({ after }) =>
      after &&
      Object.entries(after)
        .map(
          ([key, value]) =>
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`,
        )
        .join('\n    ')}
  }
`

export const TextDivStyled = styled.div<{
  padding?: string
  margin?: string
  width?: string
  height?: string
  fontSize?:
    | 'basic'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | string
  fontWeight?: 'normal' | 'bold' | 'bolder' | number
  fontColor?:
    | 'primary'
    | 'primaryShadow'
    | 'secondary'
    | 'darkBlue'
    | 'lightBlue'
    | string
  onClick?: () => void
  fontFamily?: 'round' | 'sans' | 'rg-b'
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
}>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  font-size: ${({ fontSize }) =>
    fontSize === 'basic'
      ? '16px'
      : fontSize === 'small'
        ? 'var(--font-size-small)'
        : fontSize === 'medium'
          ? 'var(--font-size-medium)'
          : fontSize === 'large'
            ? 'var(--font-size-large)'
            : fontSize === 'xlarge'
              ? 'var(--font-size-xlarge)'
              : fontSize === 'xxlarge'
                ? 'var(--font-size-xxlarge)'
                : fontSize};
  font-weight: ${({ fontWeight }) =>
    fontWeight === 'normal'
      ? 500
      : fontWeight === 'bold'
        ? 600
        : fontWeight === 'bolder'
          ? 800
          : fontWeight};
  color: ${({ fontColor }) =>
    fontColor === 'primary'
      ? 'var(--font-color-primary)'
      : fontColor === 'lightBlue'
        ? 'var(--font-color-light-blue)'
        : fontColor === 'primaryShadow'
          ? 'var(--font-color-primary-shadow)'
          : fontColor === 'secondary'
            ? 'var(--font-color-secondary)'
            : fontColor === 'darkBlue'
              ? 'var(--font-color-dark-blue)'
              : fontColor};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : '')};
  font-family: ${({ fontFamily }) =>
    fontFamily === 'sans'
      ? 'var(--font-family-secondary)'
      : fontFamily === 'rg-b'
        ? 'var(--font-family-rg-b)'
        : 'var(--font-family-primary)'};
  text-align: ${({ textAlign }) => textAlign};
`

export const TextSpanStyled = styled.span<{
  padding?: string
  margin?: string
  width?: string
  height?: string
  fontSize?:
    | 'basic'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | string
  fontWeight?: 'normal' | 'bold' | 'bolder' | number
  fontColor?:
    | 'primary'
    | 'primaryShadow'
    | 'secondary'
    | 'darkBlue'
    | 'lightBlue'
    | string
  onClick?: () => void
  fontFamily?: 'round' | 'sans' | 'rg-b'
  color?: string
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
}>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  font-size: ${({ fontSize }) =>
    fontSize === 'basic'
      ? '16px'
      : fontSize === 'small'
        ? 'var(--font-size-small)'
        : fontSize === 'medium'
          ? 'var(--font-size-medium)'
          : fontSize === 'large'
            ? 'var(--font-size-large)'
            : fontSize === 'xlarge'
              ? 'var(--font-size-xlarge)'
              : fontSize === 'xxlarge'
                ? 'var(--font-size-xxlarge)'
                : fontSize};
  font-weight: ${({ fontWeight }) =>
    fontWeight === 'normal'
      ? 500
      : fontWeight === 'bold'
        ? 600
        : fontWeight === 'bolder'
          ? 700
          : fontWeight};
  color: ${({ fontColor }) =>
    fontColor === 'primary'
      ? 'var(--font-color-primary)'
      : fontColor === 'lightBlue'
        ? 'var(--font-color-light-blue)'
        : fontColor === 'primaryShadow'
          ? 'var(--font-color-primary-shadow)'
          : fontColor === 'secondary'
            ? 'var(--font-color-secondary)'
            : fontColor === 'darkBlue'
              ? 'var(--font-color-dark-blue)'
              : fontColor};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  font-family: ${({ fontFamily }) =>
    fontFamily === 'sans'
      ? 'var(--font-family-secondary)'
      : fontFamily === 'rg-b'
        ? 'var(--font-family-rg-b)'
        : 'var(--font-family-primary)'};
  color: ${({ color }) => color};
  text-align: ${({ textAlign }) => textAlign};
`

export const DivideStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
`

export const DivideLineStyle = styled.div<{ borderWidth?: string }>`
  width: 100%;
  height: ${({ borderWidth }) => (borderWidth ? `${borderWidth}px` : '2px')};
  background-color: var(--color-gray-medium);
  border-radius: 100px;
`

export const GapStyle = styled.div<{ size: number }>`
  height: ${({ size }) => (size ? `${size}px` : '0')};
`

export const ModalContainerStyle = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  max-height: calc(100vh - 20px);
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;

  ${phone(`
    max-width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    position: relative;
    border-radius: 0;
  `)}
`

export const ModalHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--line-color-primary);

  .calendar-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .nav-button {
    width: 32px;
    height: 32px;
    border: none;
    background-color: var(--color-gray-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    color: var(--font-color-primary);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-gray-medium);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .title {
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-xlarge);
    font-weight: 800;
    color: var(--font-color-primary);
    min-width: 120px;
  }

  .btn-close {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: var(--color-gray-light);
    background-image: url(${Assets.Icon.deleteBlack.src});
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
  }
`

export const ModalBodyStyle = styled.div<{
  viewCloud?: boolean
  calendarBody?: boolean
  bookInfoBody?: boolean
}>`
  padding: ${({ calendarBody, bookInfoBody }) =>
    calendarBody ? '0' : bookInfoBody ? '15px' : '25px'};
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 133px);
  ${({ viewCloud }) =>
    viewCloud &&
    `
    background-image:
      url(${Assets.Image.Cloud1.src}), url(${Assets.Image.Cloud2.src});
    background-size: 140px, 120px;
    background-repeat: no-repeat;
    background-position:
      top 50px left -120px,
      top 300px left -120px;
    animation: cloudFloat 20s linear infinite;

    @keyframes cloudFloat {
      0% {
        background-position:
          top 50px left -120px,
          top 300px left -120px;
      }
      100% {
        background-position:
          top 50px left calc(100% + 500px),
          top 300px left calc(100% + 120px);
        }
      }
  `}
`

export const ModalFooterStyle = styled.div<{ isFixedBottom?: boolean }>`
  width: 100%;
  min-height: 80px;
  padding: 20px;
  border-top: 1px solid var(--line-color-primary);
  position: ${({ isFixedBottom }) => (isFixedBottom ? 'fixed' : 'sticky')};
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1;
`

export const MiniModalContainerStyle = styled.div<{ minHeight?: string }>`
  width: 100%;
  max-width: 300px;
  min-height: ${({ minHeight }) => minHeight || '300px'};
  max-height: calc(100vh - 20px);
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  .mini-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid var(--line-color-primary);

    .header-title {
      font-size: var(--font-size-medium);
      margin-left: 10px;
    }

    .btn-close {
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .mini-modal-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .select-box-container {
      width: 100%;
      height: 40px;
      border: 1px solid var(--line-color-primary);
      border-radius: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      .select-box-label {
        font-size: var(--font-size-small);
        font-family: var(--font-family-secondary);
        color: var(--font-color-secondary);
        padding-bottom: 2px;
      }
    }
  }

  .btn-print {
    width: calc(100% - 40px);
    height: 40px;
    border-radius: 10px;
    background-color: var(--font-color-primary);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-medium);
    font-weight: 700;
    font-family: var(--font-family-secondary);
    cursor: pointer;
    margin: 20px;
    margin-top: 0;
  }
`

export const SubPageNavHeaderStyle = styled.div`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    display: block;
  }
`

export const BackNavHeaderStyle = styled.div`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    display: block;
  }
`

export const PagenationStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  ${phone(`
    gap: 10px;
  `)}
`

export const PagenationItemStyle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-gray-medium);
  color: var(--font-color-primary);
  font-size: var(--font-size-small);

  &.active {
    background-color: var(--font-color-primary);
    color: #fff;
  }
`

export const WidgetBoxStyle = styled.div<{
  getAward?: boolean
  todayGoal?: boolean
  height?: string
}>`
  width: 100%;
  min-height: ${({ height }) => height || 'fit-content'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ getAward, todayGoal }) =>
    getAward ? '#3C4B62' : todayGoal ? '#FFCA2B' : '#fff'};
  border-radius: 20px;
  padding: 20px;
  border: 1px solid var(--line-color-primary);
  overflow: hidden;
  background-image: url(${Assets.Icon.glossyPoint.src});
  background-size: 10px 10px;
  background-position: top 7px left 7px;
  background-repeat: no-repeat;
  position: relative;

  ${({ todayGoal }) =>
    todayGoal &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background-image: url(${Assets.Image.GlossyBgWidget.src});
      background-size: contain;
      background-position: top 0 left 0;
      background-repeat: no-repeat;
      animation: var(--animation-glass-complete);
      z-index: 0;
    }
  `}

  ${({ getAward }) =>
    getAward &&
    `
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 20%;
      width: 6px;
      height: 6px;
      background: #ffd700;
      border-radius: 50% 0;
      animation: petal1 4s linear infinite;
      box-shadow: 0 0 6px #ffd700;
    }

    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: 60%;
      width: 4px;
      height: 4px;
      background: #ff6b6b;
      border-radius: 50% 0;
      animation: petal2 3.5s linear infinite;
      box-shadow: 0 0 4px #ff6b6b;
    }

    /* 추가 꽃가루들 */
    .petal3 {
      position: absolute;
      top: -10px;
      left: 40%;
      width: 5px;
      height: 5px;
      background: #ffed4e;
      border-radius: 50% 0;
      animation: petal3 3.8s linear infinite;
      box-shadow: 0 0 5px #ffed4e;
    }

    .petal4 {
      position: absolute;
      top: -10px;
      left: 80%;
      width: 3px;
      height: 3px;
      background: #ff9ff3;
      border-radius: 50% 0;
      animation: petal4 4.2s linear infinite;
      box-shadow: 0 0 3px #ff9ff3;
    }

    .petal5 {
      position: absolute;
      top: -10px;
      left: 10%;
      width: 4px;
      height: 4px;
      background: #54a0ff;
      border-radius: 50% 0;
      animation: petal5 3.2s linear infinite;
      box-shadow: 0 0 4px #54a0ff;
    }

    .petal6 {
      position: absolute;
      top: -10px;
      left: 70%;
      width: 5px;
      height: 5px;
      background: #5f27cd;
      border-radius: 50% 0;
      animation: petal6 4.5s linear infinite;
      box-shadow: 0 0 5px #5f27cd;
    }

    .petal7 {
      position: absolute;
      top: -10px;
      left: 15%;
      width: 4px;
      height: 4px;
      background: #ff6348;
      border-radius: 50% 0;
      animation: petal7 3.7s linear infinite;
      box-shadow: 0 0 4px #ff6348;
    }

    .petal8 {
      position: absolute;
      top: -10px;
      left: 35%;
      width: 3px;
      height: 3px;
      background: #2ed573;
      border-radius: 50% 0;
      animation: petal8 4.1s linear infinite;
      box-shadow: 0 0 3px #2ed573;
    }

    .petal9 {
      position: absolute;
      top: -10px;
      left: 55%;
      width: 6px;
      height: 6px;
      background: #ffa502;
      border-radius: 50% 0;
      animation: petal9 3.9s linear infinite;
      box-shadow: 0 0 6px #ffa502;
    }

    .petal10 {
      position: absolute;
      top: -10px;
      left: 75%;
      width: 4px;
      height: 4px;
      background: #ff3838;
      border-radius: 50% 0;
      animation: petal10 4.3s linear infinite;
      box-shadow: 0 0 4px #ff3838;
    }

    .petal11 {
      position: absolute;
      top: -10px;
      left: 5%;
      width: 5px;
      height: 5px;
      background: #3742fa;
      border-radius: 50% 0;
      animation: petal11 3.6s linear infinite;
      box-shadow: 0 0 5px #3742fa;
    }

    .petal12 {
      position: absolute;
      top: -10px;
      left: 25%;
      width: 3px;
      height: 3px;
      background: #ff6b9d;
      border-radius: 50% 0;
      animation: petal12 4.4s linear infinite;
      box-shadow: 0 0 3px #ff6b9d;
    }

    .petal13 {
      position: absolute;
      top: -10px;
      left: 45%;
      width: 4px;
      height: 4px;
      background: #ff9ff3;
      border-radius: 50% 0;
      animation: petal13 3.4s linear infinite;
      box-shadow: 0 0 4px #ff9ff3;
    }

    .petal14 {
      position: absolute;
      top: -10px;
      left: 85%;
      width: 5px;
      height: 5px;
      background: #ffd32a;
      border-radius: 50% 0;
      animation: petal14 4.0s linear infinite;
      box-shadow: 0 0 5px #ffd32a;
    }

    @keyframes petal1 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(80px) translateX(20px);
        opacity: 0.8;
      }
      100% {
        transform: translateY(160px) translateX(-10px);
        opacity: 0;
      }
    }

    @keyframes petal2 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(90px) translateX(-15px);
        opacity: 0.7;
      }
      100% {
        transform: translateY(180px) translateX(25px);
        opacity: 0;
      }
    }

    @keyframes petal3 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(70px) translateX(10px);
        opacity: 0.6;
      }
      100% {
        transform: translateY(140px) translateX(-20px);
        opacity: 0;
      }
    }

    @keyframes petal4 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(100px) translateX(-25px);
        opacity: 0.8;
      }
      100% {
        transform: translateY(200px) translateX(15px);
        opacity: 0;
      }
    }

    @keyframes petal5 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(85px) translateX(30px);
        opacity: 0.7;
      }
      100% {
        transform: translateY(170px) translateX(-5px);
        opacity: 0;
      }
    }

    @keyframes petal6 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(75px) translateX(-10px);
        opacity: 0.9;
      }
      100% {
        transform: translateY(150px) translateX(35px);
        opacity: 0;
      }
    }

    @keyframes petal7 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(95px) translateX(25px);
        opacity: 0.8;
      }
      100% {
        transform: translateY(190px) translateX(-15px);
        opacity: 0;
      }
    }

    @keyframes petal8 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(65px) translateX(-20px);
        opacity: 0.7;
      }
      100% {
        transform: translateY(130px) translateX(30px);
        opacity: 0;
      }
    }

    @keyframes petal9 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(85px) translateX(15px);
        opacity: 0.9;
      }
      100% {
        transform: translateY(170px) translateX(-25px);
        opacity: 0;
      }
    }

    @keyframes petal10 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(110px) translateX(-30px);
        opacity: 0.8;
      }
      100% {
        transform: translateY(220px) translateX(20px);
        opacity: 0;
      }
    }

    @keyframes petal11 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(80px) translateX(35px);
        opacity: 0.6;
      }
      100% {
        transform: translateY(160px) translateX(-10px);
        opacity: 0;
      }
    }

    @keyframes petal12 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(70px) translateX(-15px);
        opacity: 0.8;
      }
      100% {
        transform: translateY(140px) translateX(40px);
        opacity: 0;
      }
    }

    @keyframes petal13 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(90px) translateX(20px);
        opacity: 0.7;
      }
      100% {
        transform: translateY(180px) translateX(-35px);
        opacity: 0;
      }
    }

    @keyframes petal14 {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(75px) translateX(-5px);
        opacity: 0.9;
      }
      100% {
        transform: translateY(150px) translateX(25px);
        opacity: 0;
      }
    }
  `}
`

export const CommonTitleStyle = styled.div<{
  getAward?: boolean
  todayGoal?: boolean
  noLink?: boolean
}>`
  cursor: ${({ noLink }) => (noLink ? 'default' : 'pointer')};
  width: fit-content;
  font-size: var(--font-size-large);
  font-weight: bold;
  font-family: var(--font-family-secondary);
  color: ${({ getAward, todayGoal }) =>
    getAward ? '#fff' : todayGoal ? '#B2720A' : 'var(--font-color-primary)'};
  position: relative;

  &::before {
    content: '';
    display: ${({ noLink }) => (noLink ? 'none' : 'block')};
    position: absolute;
    top: calc(50% - 6px - 1px);
    left: calc(100% + 5px);
    width: 12px;
    height: 12px;
    background-image: ${({ getAward, todayGoal }) =>
      getAward
        ? `url(${Assets.Icon.arrowUpRightGray.src})`
        : todayGoal
          ? `url(${Assets.Icon.arrowUpRightBrown.src})`
          : `url(${Assets.Icon.arrowUpRightBlack.src})`};
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export const TabBarStyle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px 20px;
  padding: 20px 10px;
  border-top: 1px solid var(--line-color-primary);
  border-bottom: 1px solid var(--line-color-primary);
`

export const SelectBoxStyle = styled.div<{
  largeFont: boolean
  smallFont: boolean
}>`
  width: fit-content;
  height: fit-content;

  select {
    padding: 0;
    border: none;
    background-color: var(--color-white);
    font-size: ${({ largeFont, smallFont }) =>
      largeFont ? '18px' : smallFont ? '14px' : '16px'};
    font-family: var(--font-family-secondary);
    font-weight: ${({ largeFont }) => (largeFont ? '800' : '700')};
    color: var(--font-color-primary);
    cursor: pointer;
    outline: none;
    appearance: none;
    background-image: url(${Assets.Icon.chevronDownGraySmall.src});
    background-position: center right 2px;
    background-repeat: no-repeat;
    background-size: 14px;
    padding-right: 20px;
    min-width: 40px;
  }
`

export const AwardImageStyle = styled.div`
  min-width: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`

export const AwardBgStyle = styled.div`
  min-width: 120px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 1;
  background-image: url(${Assets.Icon.Side.sparklingBg.src});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  animation: sparklingFloat 2s ease-in-out infinite;

  @keyframes sparklingFloat {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
  }
`

export const FooterMenuStyle = styled.div<{ isGnbBottom?: boolean }>`
  width: 100%;
  height: 50px;
  margin-bottom: ${({ isGnbBottom }) => (isGnbBottom ? '80px' : '0px')};
  background-color: #fff;
  border-top: 1px solid var(--line-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  .menu-item {
    cursor: pointer;
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-medium);
    font-weight: bold;
    color: var(--font-color-secondary);
  }
`

// export const StartButtonStyle = styled.button<{ isMobile?: boolean }>`
//   cursor: pointer;
//   border-radius: 12px;
//   background: var(--color-red-medium);
//   box-shadow: 0 3px 0 0 var(--color-red-medium-shadow);
//   width: ${({ isMobile }) => (isMobile ? '100%' : '100px')};
//   min-height: ${({ isMobile }) => (isMobile ? '50px' : '46px')};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1em;
//   color: #fff;
//   text-align: center;
//   margin-top: 5px;
//   margin-bottom: ${({ isMobile }) => (isMobile ? '4px' : '0')};
// }

export const ChallengeAwardBgOverlayStyle = styled.div<{ isMobile?: boolean }>`
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 200vh;
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .bg-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300vw;
    height: 300vh;
    background-color: #877100;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23877100'/%3E%3Cstop offset='1' stop-color='%23FFD500'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23877100'/%3E%3Cstop offset='1' stop-color='%23FFD500'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transform-origin: center center;
    animation: bgRotate 40s linear infinite;
  }
  .content-wrapper {
    position: relative;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: ${({ isMobile }) => (isMobile ? '0px' : '120px')};
    gap: 16px;
    .content-info {
      text-align: center;
      color: #ffffff;
      font-weight: 500;
      .content-info-title {
        font-family:
          'Noto Sans KR', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-size: 1.1em;
      }
      .content-info-award-name {
        font-family:
          'Noto Sans KR', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-size: 1.8em;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .content-info-name {
        font-family:
          'Noto Sans KR', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-size: 1.5em;
      }
      .content-info-date {
        font-family:
          'Noto Sans KR', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-size: 1.1em;
      }
    }
  }
  .confetti {
    position: absolute;
    width: ${({ isMobile }) => (isMobile ? '350px' : '500px')};
    height: ${({ isMobile }) => (isMobile ? '210px' : '300px')};
    background-image: url('${Assets.Challenge.confetti.src}');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    z-index: -1;
    animation: kenburns-top 3s ease-out both;
  }
  .award-image {
    width: 320px;
    height: 320px;
    border-radius: 16px;
    padding: 16px;
    animation: fadeInUp 0.5s ease-out;
  }
  .close-button {
    position: absolute;
    top: -50px;
    right: ${({ isMobile }) => (isMobile ? '-44px' : '-180px')};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    transition: all 0.2s ease;
  }

  @media (max-height: 599px) {
    .award-image {
      width: 200px;
      height: 200px;
    }
  }

  @media (min-height: 600px) and (max-height: 649px) {
    .award-image {
      width: 240px;
      height: 240px;
    }
  }

  @media (min-height: 650px) and (max-height: 699px) {
    .award-image {
      width: 280px;
      height: 280px;
    }
  }

  @keyframes bgRotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes kenburns-top {
    0% {
      transform: scale(1) translateY(0);
      transform-origin: 50% 16%;
    }
    100% {
      transform: scale(1.25) translateY(-15px);
      transform-origin: top;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
