import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  RankReadingkingGroup,
  makeRankReadingkingGroup,
} from '../object/rank-readingking-group'
import {
  executeWithAuth,
  makeRequestOption,
  makeRequestWithCustomer,
} from '../utils'

type Input = {
  isLogin?: boolean
  eventId: string
}

type Output = {
  me: RankReadingkingGroup
  list: RankReadingkingGroup[]
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const path = `api/ranking/readingking/group`
  const option = makeRequestOption({
    method: 'get',
    queryString: {
      eventId: input.eventId,
    },
  })
  const request = makeRequestWithCustomer(path, option)
  const doAction = input.isLogin ? executeWithAuth : execute

  return await doAction(request, (json): Output => {
    const me = makeRankReadingkingGroup(json.Me)
    const list = json.Rank.map((json: any) => {
      return makeRankReadingkingGroup(json)
    })
    return {
      me,
      list,
    }
  })
}

export { action as getRankingReadingkingGroup }
export type { Output as RankingReadingkingGroupResponse }

function newInstance(): Output {
  return {
    me: makeRankReadingkingGroup(),
    list: [],
  }
}
export { newInstance as newRankingReadingkingGroup }
