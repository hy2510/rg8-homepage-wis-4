import animationData from '@/public/src/lottie/fire.json'
import Lottie from 'react-lottie'

export default function StreakFireBig() {
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
      <Lottie options={defaultOptions} height={50} width={50} />
    </>
  )
}
