import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../../utils'

type Input = {
  levelNames: string[]
}

type Output = string

async function action(input: Input): Promise<ApiResponse<Output>> {
  let levelNames = ''
  input.levelNames.forEach((levelName) => {
    levelNames += `${levelName}|`
  })
  if (levelNames.length > 0) {
    levelNames = levelNames
      .substring(0, levelNames.length - 1)
      .replace(/-/g, '')
      .toUpperCase()
  }
  const request = makeRequest('api/export/worksheet', {
    method: 'get',
    queryString: {
      levelNames,
    },
  })
  return await execute(request, (json): Output => {
    return json.Url
  })
}

export { action as getExportWorksheet }
