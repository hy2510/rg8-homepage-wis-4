import animationData from '@/public/src/lottie/hidodo-logo.json'
import Lottie from 'react-lottie'

export default function HiDodoBannerAni() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      <Lottie options={defaultOptions} height={60} width={220} />
    </>
  )
}
