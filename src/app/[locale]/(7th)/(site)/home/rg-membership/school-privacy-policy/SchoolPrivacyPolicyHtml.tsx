'use client'

import IFrameWrapper from '@/7th/_app/IFrameWrapper'

export function PrivacyPolicyHtml() {
  const pcUrl =
    '/src/html/page-contents/pc/rg-membership/membership_06_school_privacy_policy.html'
  return <IFrameWrapper pcUrl={pcUrl} mobileUrl={pcUrl} />
}
