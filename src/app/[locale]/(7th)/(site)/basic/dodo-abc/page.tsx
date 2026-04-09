'use client'

import { useSearchParams } from 'next/navigation'
import DodoABCContainer from './_cpnt/DodoABCContainer'

export default function Page() {
  const searchParams = useSearchParams()
  const activity = searchParams.get('activity')
  return <DodoABCContainer activity={activity || ''} />
}
