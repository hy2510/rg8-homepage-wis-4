import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  code: string
  i: number
  deviceType: string
  loginType: string
}

type Output = {
  success: boolean
  staff?: boolean
  student?: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/signin-with-code', {
    method: 'post',
    body: {
      code: input.code,
      i: input.i,
      deviceType: input.deviceType,
      t: input.loginType,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
      staff: json.staff,
      student: json.student,
    }
  })
}

export { action as postSigninWithCode }

function newInstance(): Output {
  return { success: false }
}
export { newInstance as newSigninWithCode }
