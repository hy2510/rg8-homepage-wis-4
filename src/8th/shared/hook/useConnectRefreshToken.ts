import {
  registRejectRefreshToken,
  unregistRejectRefreshToken,
} from '@/8th/shared/http'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useConnectRefreshToken() {
  const router = useRouter()

  useEffect(() => {
    registRejectRefreshToken(() => {
      router.replace('/signoff')
    })
    return () => {
      unregistRejectRefreshToken()
    }
  }, [router])

  return
}
