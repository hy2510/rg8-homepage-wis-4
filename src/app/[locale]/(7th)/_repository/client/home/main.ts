import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { Main, makeMain } from '../object/main'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  template: string
  platform: string
}

type Output = Main

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/home', {
    method: 'get',
    queryString: {
      template: input.template,
      platform: input.platform,
    },
  })
  return await execute(request, (json): Output => {
    return makeMain(json)
  })
}

export { action as getMain }
export type { Output as MainResponse }
