'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'payment'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function history(token: string) {
  const request = makeRequest({
    token,
    path: getPath('history'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function adjustHistory(token: string) {
  const request = makeRequest({
    token,
    path: getPath('adjust-history'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function adjustPause(token: string) {
  const request = makeRequest({
    token,
    path: getPath('adjust-pause'),
    option: {
      method: 'put',
    },
  })
  return await execute(request)
}

async function adjustRelease(token: string) {
  const request = makeRequest({
    token,
    path: getPath('adjust-release'),
    option: {
      method: 'put',
    },
  })
  return await execute(request)
}

async function purchaseProductList(token: string, type: string) {
  const request = makeRequest({
    token,
    path: getPath(`product-list/${type}`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function unpaidBalance(token: string) {
  const request = makeRequest({
    token,
    path: getPath(`unpaid-balance`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function registTicket(token: string, input: { ticketNum: string }) {
  const request = makeRequest({
    token,
    path: getPath(`regist-ticket`),
    option: {
      method: 'put',
      body: input,
    },
  })
  return await execute(request)
}

async function inappPurchase(
  token: string,
  platform: 'android' | 'ios',
  input: { productId: string; receipt: string; key: string },
) {
  const request = makeRequest({
    token,
    path: getPath(`inapp-purchase/${platform}`),
    option: {
      method: 'post',
      body: input,
    },
  })
  return await execute(request)
}

const Payment = {
  history,
  adjustHistory,
  adjustPause,
  adjustRelease,
  purchaseProductList,
  unpaidBalance,
  registTicket,
  inappPurchase,
}
export default Payment
