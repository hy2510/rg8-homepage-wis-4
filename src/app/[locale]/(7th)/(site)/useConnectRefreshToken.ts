import useLogout from '@/7th/_function/use-logout'
import {
  registRejectRefreshToken,
  unregistRejectRefreshToken,
} from '@/7th/_repository/client/utils'
import { useEffect } from 'react'

export default function useConnectRefreshToken() {
  const onLogout = useLogout()
  useEffect(() => {
    registRejectRefreshToken(() => {
      onLogout()
    })
    return () => {
      unregistRejectRefreshToken()
    }
  }, [onLogout])

  return onLogout
}
