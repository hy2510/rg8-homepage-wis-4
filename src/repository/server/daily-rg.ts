'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'daily'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function stage(token: string, input?: {}) {
  const request = makeRequest({
    token,
    path: getPath('stage'),
    option: {
      method: 'get',
      queryString: {},
    },
  })
  return await execute(request)
}

async function section(
  token: string,
  input: {
    stageId: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('section'),
    option: {
      method: 'get',
      queryString: {
        stageId: input.stageId,
      },
    },
  })
  return await execute(request)
}

async function search(
  token: string,
  input: {
    stageId: string
    sectionId: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search'),
    option: {
      method: 'get',
      queryString: {
        stageId: input.stageId,
        sectionId: input.sectionId,
      },
    },
  })
  return await execute(request)
}

const DailyRG = {
  stage,
  section,
  search,
}
export default DailyRG
