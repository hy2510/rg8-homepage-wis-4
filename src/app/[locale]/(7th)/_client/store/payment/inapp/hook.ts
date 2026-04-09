import Repository from '@/7th/_repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentHistoryAction } from '../../student/history/selector'
import { useStudentInfoAction } from '../../student/info/selector'

export function useFetchInappPurchase({
  iapInterface,
  platform,
}: {
  iapInterface: any
  platform: 'android' | 'ios'
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const { setInfo } = useStudentInfoAction()
  const { setHistory } = useStudentHistoryAction()

  const requestAndroidPurchase = async ({
    itemId,
    callback,
  }: {
    itemId: string
    callback?: (isSuccess: boolean, code?: number, extra?: string) => void
  }) => {
    const finish = (code: number) => {
      callback && callback(code === 0, code)
      setLoading(false)
    }
    setLoading(true)
    writeLog('IAP_REQ', `Inapp Request [AOS]: ${itemId}`)
    let subscribeResult: InAppPurchaseResult | undefined = undefined
    try {
      /*
       * 2024-11-19 : 안드로이드 인앱 결제 방식을 구독상품에서 1회성 상품으로 변경 처리
       * 3회이상 연속구매 불가능 이슈 및 구글 수수료율 차이 발생으로 구독상품은 사용하지 않음.
      const inappRequest = await promiseInappSubscribe({
        iapInterface,
        platform: 'android',
        itemId,
      })
      */
      const inappRequest = await promiseInappBuy({
        iapInterface,
        platform: 'android',
        itemId,
      })
      writeLog('IAP_REQ', `Inapp Res 1 : ${inappRequest.result}`)
      writeLog('IAP_REQ', `Inapp Res 2 (AOS): ${inappRequest.productId}`)
      writeLog('IAP_REQ', `Inapp Res 3 (AOS): ${inappRequest.purchaseToken}`)
      writeLog(
        'IAP_REQ',
        `Inapp Res 4 (AOS): ${JSON.stringify(inappRequest.originalData)}`,
      )
      subscribeResult = inappRequest
    } catch (error) {
      // ???
      finish(-100)
      return
    }

    const { result: isSuccess, originalData } = subscribeResult
    if (
      isSuccess &&
      originalData &&
      Array.isArray(originalData) &&
      originalData.length > 0
    ) {
      const res = await fetcher.response(
        Repository.postInappPurchase({
          platform,
          productId: itemId,
          receipt: JSON.stringify(originalData),
        }),
      )
      if (res.isSuccess && res.payload?.code === 0) {
        let isUpdateStudentSuccess = false

        const studyRes = await Promise.all([
          fetcher.response(Repository.getStudent()),
          fetcher.response(Repository.getStudentHistoryList()),
        ])
        if (studyRes[0].isSuccess && studyRes[1].isSuccess) {
          setInfo(studyRes[0].payload)
          setHistory(studyRes[1].payload)
          isUpdateStudentSuccess = true
        }
        if (isUpdateStudentSuccess) {
          // 성공
          finish(0)
        } else {
          // 성공했지만 사용자 정보 갱신 실패
          finish(-1)
        }
      } else {
        // 상품 지급 실패
        finish(-2)
      }
    } else {
      // InApp Purchase 취소
    }
    setLoading(false)
  }

  const requestIosPurchase = async ({
    itemId,
    callback,
  }: {
    itemId: string
    callback?: (isSuccess: boolean, code?: number, extra?: string) => void
  }) => {
    const finish = (code: number) => {
      callback && callback(code === 0, code)
      setLoading(false)
    }
    setLoading(true)
    writeLog('IAP_REQ', `Inapp Request [iOS]: ${itemId}`)
    let subscribeResult: InAppPurchaseResult | undefined = undefined
    try {
      const inappRequest = await promiseInappSubscribe({
        iapInterface,
        platform,
        itemId,
      })
      writeLog('IAP_REQ', `Inapp Res 1 : ${inappRequest.result}`)
      writeLog('IAP_REQ', `Inapp Res 2 (iOS): ${inappRequest.receipt}`)
      writeLog('IAP_REQ', `Inapp Res 3 (iOS): ${inappRequest.transactionId}`)
      subscribeResult = inappRequest
    } catch (error) {
      // ???
      finish(-100)
      return
    }

    const { result: isSuccess, transactionId, receipt } = subscribeResult
    if (isSuccess) {
      const res = await fetcher.response(
        Repository.postInappPurchase({
          platform,
          productId: itemId,
          receipt: JSON.stringify({
            receipt: receipt!,
            transactionId,
          }),
        }),
      )
      if (res.isSuccess && res.payload?.code === 0) {
        let isUpdateStudentSuccess = false

        const studyRes = await Promise.all([
          fetcher.response(Repository.getStudent()),
          fetcher.response(Repository.getStudentHistoryList()),
        ])
        if (studyRes[0].isSuccess && studyRes[1].isSuccess) {
          setInfo(studyRes[0].payload)
          setHistory(studyRes[1].payload)
          isUpdateStudentSuccess = true
        }
        if (isUpdateStudentSuccess) {
          // 성공
          finish(0)
        } else {
          // 성공했지만 사용자 정보 갱신 실패
          finish(-1)
        }
      } else {
        // 상품 지급 실패
        finish(-2)
      }
    } else {
      // InApp Purchase 취소
    }
    setLoading(false)
  }

  const fetch = (params: {
    itemId: string
    callback?: (isSuccess: boolean, code?: number, extra?: string) => void
  }) => {
    if (platform === 'android') {
      requestAndroidPurchase(params)
    } else {
      requestIosPurchase(params)
    }
  }
  return {
    fetch,
    loading,
    error,
  }
}

type InAppPurchaseResult = {
  result: boolean
  originalData?: unknown[]
  purchaseToken?: string
  productId?: string
  receipt?: string
  transactionId?: string
}

/**
 * 인앱 구독 상품을 구독한다.
 * @param param 인앱 요청 데이터
 * @returns 인앱 구독 결과
 */
function promiseInappSubscribe({
  iapInterface,
  platform,
  itemId,
}: {
  iapInterface: any
  platform: 'android' | 'ios'
  itemId: string
}): Promise<InAppPurchaseResult> {
  const promise = new Promise<{
    result: boolean
    purchaseToken: string
    productId: string
  }>((resolve, _) => {
    iapInterface.subscribe(
      itemId,
      platform,
      (returnModel: {
        result: boolean
        purchaseToken: string
        productId: string
      }) => {
        resolve(returnModel)
      },
    )
  })
  return promise
}

/**
 * 인앱 1회성 상품을 구매한다.
 * @param param 인앱 요청 데이터
 * @returns 인앱 구매 결과
 */
function promiseInappBuy({
  iapInterface,
  platform,
  itemId,
}: {
  iapInterface: any
  platform: 'android' | 'ios'
  itemId: string
}): Promise<InAppPurchaseResult> {
  const promise = new Promise<{
    result: boolean
    purchaseToken: string
    productId: string
  }>((resolve, _) => {
    iapInterface.buy(
      itemId,
      platform,
      (returnModel: {
        result: boolean
        purchaseToken: string
        productId: string
      }) => {
        resolve(returnModel)
      },
    )
  })
  return promise
}

async function writeLog(tag: string, message: string) {
  // await fetch('/api/a0log', {
  //   method: 'post',
  //   body: JSON.stringify({
  //     tag,
  //     message,
  //   }),
  // })
}
