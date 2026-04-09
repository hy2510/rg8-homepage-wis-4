'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import Image from 'next/image'

export default function Page() {
  const { country, target } = useSiteBlueprint()

  let src = '/src/images/@user-guide/rg_use_guide_indi.png'
  let height = 14182
  if (country.canada) {
    src = '/src/images/@user-guide/rg_use_guide_global.png'
    height = 15431
  } else if (target.academy || target.school) {
    src = '/src/images/@user-guide/rg_use_guide_school.png'
    height = 15243
  }

  return (
    <main
      className={`container`}
      style={{ display: 'flex', justifyContent: 'center' }}>
      <Image
        src={src}
        width={1080}
        height={height}
        alt=""
        style={{
          width: '100%',
          maxWidth: '850px',
          height: 'auto',
          borderRadius: '20px',
          backgroundColor: '#ffffff50',
          padding: '10px',
        }}
      />
    </main>
  )
}
