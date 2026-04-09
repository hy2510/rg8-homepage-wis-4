import animationData from '@/public/src/lottie/in_progress.json'
import Lottie from 'react-lottie'

export default function InProgress() {
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
      <div className="in_progress">
        <Lottie options={defaultOptions} height={30} width={30} />
      </div>
    </>
  )
}
