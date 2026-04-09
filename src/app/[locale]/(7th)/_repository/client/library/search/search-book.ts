import { SearchBook, makeSearchBook } from '../../object/search-book'

type Output = {
  book: SearchBook[]
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
  download?: string
}
export function convertSearchBook(json: any): Output {
  return {
    book: json.Books.map((item: any) => makeSearchBook(item)),
    page: {
      page: Number(json.Pagination.Page),
      size: Number(json.Pagination.RecordPerPage),
      totalPages: Number(json.Pagination.TotalPages),
      totalRecords: Number(json.Pagination.TotalRecords),
    },
    download: json.ExcelDownload,
  }
}
export type { Output as SearchBookResponse }
export function newSearchBook() {
  return {
    book: [],
    page: {
      page: 0,
      size: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  }
}
