'use client'

import ClientTo from '@/7th/_app/ClientTo'
import { useLibraryHome } from '@/7th/_client/store/library/home/selector'
import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import { getStudentLocalConfig } from '@/8th/features/student/model/student-local-config'
import SITE_PATH from '@/app/site-path'

export default function Page() {
  const { customerId } = useCustomerInfo()
  const { studentId } = useStudentInfo()
  const mode = useLibraryHome().mode

  let redirect = SITE_PATH.RANKING.POINT
  if (!mode) {
    const config = getStudentLocalConfig({
      studentId,
      customerId,
    })
    if (config?.mode === 'challenge') {
      redirect = SITE_PATH.RANKING.CAHLLENGE
    }
  } else if (mode === 'challenge') {
    redirect = SITE_PATH.RANKING.CAHLLENGE
  }

  return <ClientTo to={redirect} isReplace />
}
