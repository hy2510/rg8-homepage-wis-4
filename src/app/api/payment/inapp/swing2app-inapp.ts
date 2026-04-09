const SWING_2_APP_URL = process.env.SWING2APP_API_URL
const SWING_2_APP_ID = process.env.SWING2APP_ID
const IOS_APP_APPLE_ID = 1207688674
const IOS_APP_BUNDLE_ID = 'com.aoneedu.readinggate'

/**
 * 안드로이드 인앱 구독 정보 조회
 * @param params 구매 토큰
 * @returns 조회 결과
 */
async function getAndroidSubInfo(params: {
  token: string
}): Promise<ApiResponse<InAppReceiptSubscribeDetailAndroid>> {
  const requestURL = `${SWING_2_APP_URL}inappapi/android/purchases_subscriptions_v2_get`
  const queryString = `app_id=${SWING_2_APP_ID}&token=${params.token}`

  return await wrapFetchAction<InAppReceiptSubscribeDetailAndroid>(
    requestURL,
    queryString,
  )
}

/**
 * 안드로이드 인앱 구독 확인
 * @param params 결제 토큰, 상품 ID
 * @returns 조회 결과
 */
async function subscribeAcknowledgeForAndroid(params: {
  token: string
  productId: string
}): Promise<ApiResponse<InAppSubscribeAcknowledgeAndroid>> {
  const requestURL = `${SWING_2_APP_URL}inappapi/android/purchases_subscriptions_acknowledge`
  const queryString = `app_id=${SWING_2_APP_ID}&token=${params.token}&subscription_id=${params.productId}`

  return await wrapFetchAction<InAppSubscribeAcknowledgeAndroid>(
    requestURL,
    queryString,
  )
}

/**
 * 안드로이드 인앱 1회성 상품 구매 정보 조회
 * @param params 결제 토큰, 상품 ID
 * @returns 조회 결과
 */
async function getAndroidPurchaseInfo(params: {
  token: string
  productId: string
}): Promise<ApiResponse<InAppReceiptConsumeDetailAndroid>> {
  const requestURL = `${SWING_2_APP_URL}inappapi/android/purchases_get_products`
  const queryString = `app_id=${SWING_2_APP_ID}&token=${params.token}&product_id=${params.productId}`

  return await wrapFetchAction<InAppReceiptConsumeDetailAndroid>(
    requestURL,
    queryString,
  )
}

/**
 * iOS 인앱 구독 정보 조회
 * @param params 결제 ID, 샌드박스 Y/N
 * @returns 조회 결과
 */
async function getIosSubInfo(params: {
  transactionId: string
  isSendbox: boolean
}): Promise<ApiResponse<InAppReceiptDetailIOS>> {
  const requestURL = `${SWING_2_APP_URL}inappapi/ios/get_all_subscription_statuses`
  const queryString = `app_id=${SWING_2_APP_ID}&transaction_id=${params.transactionId}&is_sandbox_yn=${params.isSendbox ? 'Y' : 'N'}`

  return await wrapFetchAction<InAppReceiptDetailIOS>(requestURL, queryString)
}

/**
 * iOS 인앱 거래 정보 조회
 * @param params 결제 ID, 샌드박스 Y/N
 * @returns 조회 결과
 */
async function getIosTransactionInfo(params: {
  transactionId: string
  isSendbox: boolean
}): Promise<ApiResponse<InAppTransactionInfoIOS>> {
  const requestURL = `${SWING_2_APP_URL}inappapi/ios/get_transaction_info`
  const queryString = `app_id=${SWING_2_APP_ID}&transaction_id=${params.transactionId}&is_sandbox_yn=${params.isSendbox ? 'Y' : 'N'}`

  return await wrapFetchAction<InAppTransactionInfoIOS>(requestURL, queryString)
}

/**
 * Http로 API에 요청한다.
 * @param requestURL API요청 URL
 * @param queryString API요청 입력 데이터
 * @returns API 결과
 */
async function wrapFetchAction<T>(
  requestURL: string,
  queryString: string,
): Promise<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    code: 0,
    payload: undefined,
    error: undefined,
  }
  try {
    const fetchResponse = await fetch(requestURL, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString,
    })
    if (fetchResponse.ok) {
      const data = await fetchResponse.json()
      response.payload = data as T
    } else {
      response.code = fetchResponse.status
      response.error = 'fetch failed'
    }
  } catch (error) {
    response.code = -9999
    response.error = 'fetch exception'
  }
  return response
}

type ApiResponse<T> = {
  code: number
  payload?: T
  error?: unknown
}

type InAppReceiptSubscribeDetailAndroid = {
  resultMap: {
    lineItems?: any[]
    regionCode?: string
    kind?: string
    acknowledgementState?: string
    subscriptionState?: string
    startTime?: string
    latestOrderId?: string
    testPurchase?: any
    error?: {
      code: number
      message?: string
      errors?: any[]
    }
    responseCode: number
  }
}

type InAppReceiptConsumeDetailAndroid = {
  resultMap: {
    consumptionState?: number
    regionCode?: string
    orderId?: string
    kind?: string
    acknowledgementState?: string
    developerPayload?: string
    purchaseState?: number
    purchaseTimeMillis?: number
    purchaseType?: number
    error?: {
      code: number
      message?: string
      errors?: any[]
    }
    responseCode: number
  }
}

type InAppSubscribeAcknowledgeAndroid = {
  resultMap: {
    error?: {
      code: number
      message?: string
      errors?: any[]
    }
    responseCode: number
  }
}

type InAppReceiptDetailIOS = {
  resultMap: {
    environment: string
    data: {
      subscriptionGroupIdentifier?: string
      lastTransactions?: {
        originalTransactionId?: string
        status?: number
        signedTransactionInfo?: {
          transactionId?: string
          originalTransactionId?: string
          webOrderLineItemId?: string
          bundleId?: string
          productId?: string
          subscriptionGroupIdentifier?: string
          purchaseDate?: string
          originalPurchaseDate?: number
          expiresDate?: number
          quantity?: number
          type?: string
          inAppOwnershipType?: string
          signedDate?: number
          environment?: string
          transactionReason?: string
          storefront?: string
          storefrontId?: string
          price?: number
          currency?: string
        }
        signedRenewalInfo?: {
          expirationIntent?: number
          originalTransactionId?: string
          autoRenewProductId?: string
          productId?: string
          autoRenewStatus?: number
          isInBillingRetryPeriod?: boolean
          signedDate?: number
          environment?: string
          recentSubscriptionStartDate?: number
          renewalDate?: number
        }
      }[]
    }[]
    bundleId?: string
    appAppleId?: number
    responseCode: number
  }
}
type InAppTransactionInfoIOS = {
  resultMap: {
    signedTransactionInfo?: string
    responseCode: number
  }
  transactionInfo?: {
    transactionId?: string
    inAppOwnershipType?: string
    purchaseDate?: number
    quantity?: number
    productId?: string
    bundleId?: string
    storefrontId?: string
    type?: string
    transactionReason?: string
    environment?: string
    originalTransactionId?: string
    price?: number
    signedDate?: number
    currency?: string
    originalPurchaseDate?: number
    storefront?: string
  }
}

/**
 * 안드로이드 인앱 구독 결제 상품의 결제를 검사한다.
 * @param param
 * @returns 인앱 검사 결과, 성공 시 code 0
 */
export async function androidValidateInappSubscribeReceipt({
  purchaseToken: token,
  productId,
  orderId,
}: {
  purchaseToken: string
  productId: string
  orderId: string
}): Promise<{ success: boolean; code: number; message: string; extra?: any }> {
  let code = -9999
  let message = ''
  let extra: any = undefined

  const infoRes = await getAndroidSubInfo({ token })

  if (infoRes.code === 0) {
    code = 0
    if (!infoRes.payload) {
      code = 11001
      message = `[${code}][getSubInfo]: payload null`
    } else {
      const payload = infoRes.payload
      const responseCode = payload.resultMap.responseCode
      const latestOrderId = payload.resultMap.latestOrderId
      if (responseCode < 200 || responseCode >= 300) {
        code = 11002
        message = `[${code}][getSubInfo]: responseCode Not Passed`
      } else if (orderId !== latestOrderId) {
        code = 11003
        message = `[${code}][getSubInfo]: OrderId missmatch`
      }
    }
  } else {
    if (infoRes.code > 0) {
      code = 11000 + infoRes.code
      message = `[${code}][getSubInfo]: Request Not Passed.`
    } else {
      code = 11999
      message = `[${code}][getSubInfo]: Requst ERROR.`
    }
  }
  if (code !== 0) {
    return {
      success: false,
      code,
      message,
      extra,
    }
  }

  const ackRes = await subscribeAcknowledgeForAndroid({ token, productId })
  if (ackRes.code === 0) {
    code = 0
    if (!ackRes.payload) {
      code = 12001
      message = `[${code}][subscribeAcknowledge]: payload null`
    } else {
      const result = ackRes.payload.resultMap
      const responseCode = result.responseCode
      if (responseCode < 200 || responseCode >= 300) {
        code = 12002
        message = `[${code}][subscribeAcknowledge]: responseCode Not Passed`
      } else if (!!result.error) {
        code = 12003
        message = `[${code}][subscribeAcknowledge]: response error return`
        extra = result.error
      }
    }
  } else {
    if (ackRes.code > 0) {
      code = 12000 + infoRes.code
      message = `[${code}][subscribeAcknowledge]: Request Not Passed.`
    } else {
      code = 12999
      message = `[${code}][subscribeAcknowledge]: Requst ERROR.`
    }
  }
  return {
    success: code === 0,
    code,
    message,
    extra,
  }
}

/**
 * 안드로이드 인앱 1회성 상품 결제 상품의 결제를 검사한다.
 * @param param
 * @returns 인앱 검사 결과, 성공 시 code 0
 */
export async function androidValidateInappConsumeReceipt({
  purchaseToken: token,
  productId,
  orderId,
}: {
  purchaseToken: string
  productId: string
  orderId: string
}): Promise<{ success: boolean; code: number; message: string; extra?: any }> {
  let code = -9999
  let message = ''
  const extra: any = undefined

  const infoRes = await getAndroidPurchaseInfo({ token, productId })

  if (infoRes.code === 0) {
    code = 0
    if (!infoRes.payload) {
      code = 11001
      message = `[${code}][purchaseInfo]: payload null`
    } else {
      const payload = infoRes.payload
      const responseCode = payload.resultMap.responseCode
      const purchaseOrderId = payload.resultMap.orderId
      if (responseCode < 200 || responseCode >= 300) {
        code = 11002
        message = `[${code}][purchaseInfo]: responseCode Not Passed`
      } else if (purchaseOrderId !== orderId) {
        code = 11003
        message = `[${code}][purchaseInfo]: OrderId missmatch`
      }
    }
  } else {
    if (infoRes.code > 0) {
      code = 11000 + infoRes.code
      message = `[${code}][purchaseInfo]: Request Not Passed.`
    } else {
      code = 11999
      message = `[${code}][purchaseInfo]: Requst ERROR.`
    }
  }
  if (code !== 0) {
    return {
      success: false,
      code,
      message,
      extra,
    }
  }
  return {
    success: code === 0,
    code,
    message,
    extra,
  }
}

/**
 * iOS 인앱 구독 결제 상품의 결제를 검사한다.
 * @param param
 * @returns 인앱 검사 결과, 성공 시 code 0
 */
export async function iosValidateInappReceipt({
  transactionId,
  isSendbox,
}: {
  transactionId: string
  isSendbox?: boolean
}): Promise<{ success: boolean; code: number; message: string; extra?: any }> {
  let code = -9999
  let extra: any = undefined
  let message = ''

  const infoRes = await getIosSubInfo({
    transactionId,
    isSendbox: isSendbox || false,
  })

  if (infoRes.code === 0) {
    code = 0
    if (!infoRes.payload) {
      code = 21001
      message = `[${code}][getSubInfo]: payload null`
    } else {
      const payload = infoRes.payload
      const responseCode = payload.resultMap.responseCode
      const bundleId = payload.resultMap.bundleId
      const appAppleId = payload.resultMap.appAppleId

      if (responseCode < 200 || responseCode >= 300) {
        code = 21002
        message = `[${code}][getSubInfo]: responseCode Not Passed..${responseCode}`
      } else if (!bundleId || bundleId !== IOS_APP_BUNDLE_ID) {
        code = 21003
        message = `[${code}][getSubInfo]: BundleId Invalid.`
      } else if (
        !isSendbox &&
        (!appAppleId || appAppleId !== IOS_APP_APPLE_ID)
      ) {
        code = 21004
        message = `[${code}][getSubInfo]: Apple App Id Invalid.`
      }
    }
    // 비 정기 구독 상품은 data블록에 데이터가 없어서 검증 생략
  } else {
    if (infoRes.code > 0) {
      code = 21000 + infoRes.code
      message = `[${code}][getSubInfo]: Request Not Passed.`
    } else {
      code = 21999
      message = `[${code}][getSubInfo]: Requst ERROR.`
    }
  }
  if (code !== 0) {
    return {
      success: false,
      code,
      message,
    }
  }

  const tranRes = await getIosTransactionInfo({
    transactionId,
    isSendbox: isSendbox || false,
  })
  if (tranRes.code === 0) {
    code = 0
    if (!tranRes.payload || !tranRes.payload.transactionInfo) {
      code = 22001
      message = `[${code}][getTransactionInfo]: payload null`
    } else {
      const payload = tranRes.payload.transactionInfo
      const responseCode = tranRes.payload.resultMap.responseCode
      if (responseCode < 200 || responseCode >= 300) {
        code = 22002
        message = `[${code}][getTransactionInfo]: responseCode Not Passed`
      } else if (payload.bundleId !== 'com.aoneedu.readinggate') {
        code = 22003
        message = `[${code}][getTransactionInfo]: BundleId Invalid.`
      } else if (
        !payload.originalTransactionId ||
        !payload.originalPurchaseDate ||
        !payload.transactionId
      ) {
        code = 22004
        message = `[${code}][getTransactionInfo]: Receipt Invalid.`
      } else if (payload.transactionId !== transactionId) {
        code = 22005
        message = `[${code}][getTransactionInfo]: Other Transaction ID.`
      } else {
        extra = `${payload.originalTransactionId}_${payload.originalPurchaseDate}_7th`
      }
    }
  } else {
    if (tranRes.code > 0) {
      code = 22000 + tranRes.code
      message = `[${code}][getTransactionInfo]: Request Not Passed.`
    } else {
      code = 22999
      message = `[${code}][getTransactionInfo]: Requst ERROR.`
    }
  }
  if (!extra) {
    code = 23000
  }

  return {
    success: code === 0,
    code,
    message,
    extra,
  }
}
