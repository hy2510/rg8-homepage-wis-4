import RenewType from '@/util/string-utils'

export type Pagination = {
  page: number
  size: number
  totalPages: number
  totalRecords: number
}

function makePagination(json: any): Pagination {
  return {
    page: RenewType.renewNumber(json?.Page),
    size: RenewType.renewNumber(json?.RecordPerPage),
    totalPages: RenewType.renewNumber(json?.TotalPages),
    totalRecords: RenewType.renewNumber(json?.TotalRecords),
  }
}

export function transformPagination(json: any): Pagination {
  return makePagination(json)
}
