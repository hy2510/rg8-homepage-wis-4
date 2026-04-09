// React 훅 import

// Media Query Mixins for styled-components
export const labtopL = (styles: string) => `
  @media (max-width: 1440px) {
    ${styles}
  }
`

export const labtopS = (styles: string) => `
  @media (max-width: 1200px) {
    ${styles}
  }
`

export const tabletL = (styles: string) => `
  @media (max-width: 1024px) {
    ${styles}
  }
`

export const tabletS = (styles: string) => `
  @media (max-width: 768px) {
    ${styles}
  }
`

export const phone = (styles: string) => `
  @media (max-width: 480px) {
    ${styles}
  }
`

// CSS 변수를 사용하는 미디어 쿼리들
export const pc = (styles: string) => `
  @media (max-width: 1600px) {
    ${styles}
  }
`

// Display None을 위한 미디어 쿼리들
export const displayNoneLabtopL = (styles: string) => `
  @media (max-width: 1440px) {
    display: none;
    ${styles}
  }
`

export const displayNoneLabtopS = (styles: string) => `
  @media (max-width: 1200px) {
    display: none;
    ${styles}
  }
`

export const displayNoneTabletL = (styles: string) => `
  @media (max-width: 1024px) {
    display: none;
    ${styles}
  }
`

export const displayNoneTabletS = (styles: string) => `
  @media (max-width: 768px) {
    display: none;
    ${styles}
  }
`

export const displayNonePhone = (styles: string) => `
  @media (max-width: 480px) {
    display: none;
    ${styles}
  }
`

export const displayNonePc = (styles: string) => `
  @media (max-width: 1600px) {
    display: none;
    ${styles}
  }
`

// Display Block을 위한 미디어 쿼리들
export const displayBlockLabtopL = (styles: string) => `
  @media (max-width: 1440px) {
    display: block;
    ${styles}
  }
`

export const displayBlockLabtopS = (styles: string) => `
  @media (max-width: 1200px) {
    display: block;
    ${styles}
  }
`

export const displayBlockTabletL = (styles: string) => `
  @media (max-width: 1024px) {
    display: block;
    ${styles}
  }
`

export const displayBlockTabletS = (styles: string) => `
  @media (max-width: 768px) {
    display: block;
    ${styles}
  }
`

export const displayBlockPhone = (styles: string) => `
  @media (max-width: 480px) {
    display: block;
    ${styles}
  }
`

export const displayBlockPc = (styles: string) => `
  @media (max-width: 1600px) {
    display: block;
    ${styles}
  }
`
