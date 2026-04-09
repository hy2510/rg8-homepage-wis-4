'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'common'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function noticeMainList(customer: string) {
  const request = makeRequest({
    customer,
    path: getPath('board/notice-main'),
  })
  return await execute(request)
}

async function noticeList(
  token: {
    token?: string
    customer?: string
  },
  input: {
    page: string
  },
) {
  const request = makeRequest({
    token: token.token,
    customer: token.customer,
    path: getPath('board/notice'),
    option: {
      queryString: {
        page: input.page,
      },
    },
  })
  return await execute(request)
}

async function noticeDetail(
  token: {
    token?: string
    customer?: string
  },
  input: { id: string },
) {
  const request = makeRequest({
    token: token.token,
    customer: token.customer,
    path: getPath('board/notice' + `/${input.id}`),
  })
  return await execute(request)
}

async function noticePost(
  token: string,
  input: {
    title: string
    content: string
    attachFileName?: string
    attachFileOriginName?: string
    imageFileName?: string
    imageFileOriginName?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`board/notice`),
    option: {
      method: 'post',
      body: {
        title: input.title,
        content: input.content,
        attachFileName: input.attachFileName,
        attachFileOriginName: input.attachFileOriginName,
        imageFileName: input.imageFileName,
        imageFileOriginName: input.imageFileOriginName,
      },
    },
  })
  return await execute(request)
}

async function noticeModify(
  token: string,
  input: {
    notifyId: string
    title: string
    content: string
    attachFileName?: string
    attachFileOriginName?: string
    imageFileName?: string
    imageFileOriginName?: string
    registStaffId: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`board/notice/modify`),
    option: {
      method: 'post',
      body: {
        notifyId: input.notifyId,
        title: input.title,
        content: input.content,
        attachFileName: input.attachFileName,
        attachFileOriginName: input.attachFileOriginName,
        imageFileName: input.imageFileName,
        imageFileOriginName: input.imageFileOriginName,
        registStaffId: input.registStaffId,
      },
    },
  })
  return await execute(request)
}

async function noticeDelete(
  token: string,
  input: {
    notifyId: string
    registStaffId: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`board/notice`),
    option: {
      method: 'delete',
      queryString: {
        notifyId: input.notifyId,
        registStaffId: input.registStaffId,
      },
    },
  })
  return await execute(request)
}

async function slidingBanner(customer: string) {
  const request = makeRequest({
    customer,
    path: getPath('sliding-banner'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function statisticRead() {
  const request = makeRequest({
    path: getPath('statistic-read'),
    option: {
      method: 'get',
    },
  })
  return await execute(request, {
    next: { revalidate: 3600, tags: ['data:cdn', `statistic:read`] },
  })
}

async function galleryList(
  token: {
    token?: string
    customer?: string
  },
  input: { page: string },
) {
  const request = makeRequest({
    token: token.token,
    customer: token.customer,
    path: getPath('board/gallery'),
    option: {
      queryString: {},
    },
  })
  return await execute(request)
}

async function galleryDetail(
  token: {
    token?: string
    customer?: string
  },
  input: { id: string },
) {
  const request = makeRequest({
    token: token.token,
    customer: token.customer,
    path: getPath('board/gallery' + `/${input.id}`),
  })
  return await execute(request)
}

async function galleryPost(
  token: string,
  input: {
    title: string
    content: string
    imageFileName: string
    imageFileOriginName: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`board/gallery`),
    option: {
      method: 'post',
      body: {
        title: input.title,
        content: input.content,
        imageFileName: input.imageFileName,
        imageFileOriginName: input.imageFileOriginName,
      },
    },
  })
  return await execute(request)
}

async function galleryModify(
  token: string,
  input: {
    boardId: string
    title: string
    content: string
    imageFileName?: string
    imageFileOriginName?: string
    registStaffId: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`board/gallery/modify`),
    option: {
      method: 'post',
      body: {
        boardId: input.boardId,
        title: input.title,
        content: input.content,
        imageFileName: input.imageFileName,
        imageFileOriginName: input.imageFileOriginName,
        registStaffId: input.registStaffId,
      },
    },
  })
  return await execute(request)
}

async function galleryDelete(
  token: string,
  input: {
    boardId: string
    registStaffId: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`board/gallery`),
    option: {
      method: 'delete',
      queryString: {
        boardId: input.boardId,
        registStaffId: input.registStaffId,
      },
    },
  })
  return await execute(request)
}

async function customerReviewList(
  customer: string,
  input: { writeType: string; page: string },
) {
  const request = makeRequest({
    customer,
    path: getPath(`board/handwritten/${input.writeType}`),
    option: {
      queryString: {
        page: input.page,
      },
    },
  })
  return await execute(request)
}

async function customerReviewDetail(
  customer: string,
  input: { writeType: string; id: string },
) {
  const request = makeRequest({
    customer,
    path: getPath(`board/handwritten/${input.writeType}/${input.id}`),
  })
  return await execute(request)
}

async function saveMarketingReferer(
  customer: string,
  input: { userIp: string; userAgent: string; referer: string },
) {
  const request = makeRequest({
    customer,
    path: getPath(`save-marketing-referer`),
    option: {
      method: 'post',
      body: {
        userIp: input.userIp,
        userAgent: input.userAgent,
        referer: input.referer,
      },
    },
  })
  return await execute(request)
}

const Home = {
  statisticRead,
  noticeMainList,
  slidingBanner,
  noticeList,
  noticeDetail,
  noticePost,
  noticeModify,
  noticeDelete,
  galleryList,
  galleryDetail,
  galleryPost,
  galleryModify,
  galleryDelete,
  customerReviewList,
  customerReviewDetail,
  saveMarketingReferer,
}
export default Home
