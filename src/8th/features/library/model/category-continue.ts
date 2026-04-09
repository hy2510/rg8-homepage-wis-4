import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type CategoryContinue = {
  eb: {
    level: string
    series: string
  }
  pb: {
    level: string
    series: string
  }
}

function makeCategoryContinue(json: any): CategoryContinue {
  return {
    eb: {
      level: RenewType.renewString(json?.Continue?.EB?.LevelName),
      series: RenewType.renewString(json?.Continue?.EB?.SeriesName),
    },
    pb: {
      level: RenewType.renewString(json?.Continue?.PB?.LevelName),
      series: RenewType.renewString(json?.Continue?.PB?.SeriesName),
    },
  }
}

function transform(json: any): CategoryContinueResponse {
  return {
    continue: makeCategoryContinue(json),
    // continue: {
    //   eb: {
    //     level: 'PK(Dodo ABC (Alphabet))',
    //     series: "Children's Stories (Korea)",
    //   },
    //   pb: {
    //     level: '4A',
    //     series: 'STEPPING STONES',
    //   },
    // },
  }
}

export type CategoryContinueParams = {}

export type CategoryContinueResponse = {
  continue: CategoryContinue
}

export async function getCategoryContinue(
  input?: CategoryContinueParams,
): Promise<CategoryContinueResponse> {
  const request = makeRequest(`api/library/category/continue`, {
    method: 'get',
    queryString: {},
  })
  return await execute(request, transform)
}
