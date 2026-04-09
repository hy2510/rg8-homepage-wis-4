import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  id: string
  password: string
  deviceType: string
  loginType: string
}

type Output = {
  success: boolean
  staff?: boolean
  student?: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/signin', {
    method: 'post',
    body: {
      id: input.id,
      password: input.password,
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

export { action as postSignin }
export type { Output as SigninResponse }

function newInstance(): Output {
  return { success: false }
}
export { newInstance as newSignin }
