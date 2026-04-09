'use client'

import { useSearchParams } from 'next/navigation'
import PreKContainer from './_cpnt/PreKContainer'

export default function Page() {
  const searchParams = useSearchParams()
  const activity = searchParams.get('activity')
  return <PreKContainer activity={activity || ''} />
}
