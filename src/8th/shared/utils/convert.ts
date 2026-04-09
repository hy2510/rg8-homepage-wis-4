export function convertEBPBFilter(status: string, genre: string, sort: string) {
  let cvStatus = status.length > 6 ? status.substring(6) : 'All'
  if (cvStatus === 'Completed') {
    cvStatus = '2ndComplete'
  } else if (
    cvStatus !== '1stCompleteOrBefore' &&
    cvStatus !== '1stComplete' &&
    cvStatus !== '2ndComplete' &&
    cvStatus !== 'Before'
  ) {
    cvStatus = 'All'
  }
  let cvGenre = genre.length > 5 ? genre.substring(5) : 'All'
  if (cvGenre === 'NonFiction') {
    cvGenre = 'Nonfiction'
  } else if (cvGenre !== 'Fiction') {
    cvGenre = 'All'
  }
  return { status: cvStatus, genre: cvGenre, sort }
}
