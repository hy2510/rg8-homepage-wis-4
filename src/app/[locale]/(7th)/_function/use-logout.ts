import { useApplicationType } from '@/7th/__root/ApplicationContext'
import { useFetchSignout } from '@/7th/_client/store/account/signout/hook'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'

export default function useLogout() {
  const appType = useApplicationType()
  const router = useRouter()
  const { custom } = useSiteBlueprint()
  const destination = custom?.signOutAction

  const { fetch: logoutFetch } = useFetchSignout()
  const onLogout = () => {
    logoutFetch({
      callback: (data) => {
        if (data) {
          if (destination) {
            window.location.replace(destination)
          } else if (appType === 'app') {
            router.replace(SITE_PATH.ACCOUNT.MAIN)
          } else {
            router.replace(SITE_PATH.HOME.MAIN)
          }
        }
      },
    })
  }

  return onLogout
}
