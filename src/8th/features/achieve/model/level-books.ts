import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type LevelBook = {
  levelCode: string
  levelName: string
  studyTypeCode: string
  studyTypeName: string
  books: number
  completedBooks: number
  totalBooks: number
}

function makeLevelBook(json: any): LevelBook {
  return {
    levelCode: RenewType.renewString(json?.LevelCode),
    levelName: RenewType.renewString(json?.LevelName),
    studyTypeCode: RenewType.renewString(json?.StudyTypeCode),
    studyTypeName: RenewType.renewString(json?.StudyTypeName),
    books: RenewType.renewNumber(json?.Books),
    completedBooks: RenewType.renewNumber(json?.CompletedBooks),
    totalBooks: RenewType.renewNumber(json?.TotalBooks),
  }
}

function transform(json: any): LevelBooksResponse {
  return {
    eb: json?.EB?.map((item: any) => makeLevelBook(item)),
    pb: json?.PB?.map((item: any) => makeLevelBook(item)),
    preK: json?.PreK?.map((item: any) => makeLevelBook(item)),
    dodoABC: json?.DodoABC?.map((item: any) => makeLevelBook(item)),
    movie: json?.Movie?.map((item: any) => makeLevelBook(item)),
  }
}

export type LevelBooksParams = {}

export type LevelBooksResponse = {
  eb: LevelBook[]
  pb: LevelBook[]
  preK: LevelBook[]
  dodoABC: LevelBook[]
  movie: LevelBook[]
}

export async function getLevelBooks(
  input?: LevelBooksParams,
): Promise<LevelBooksResponse> {
  const request = makeRequest(`api/achievement/level-books`, {
    method: 'get',
  })
  return await execute(request, transform)
}
