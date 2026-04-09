import repository from '@/7th/_repository/client'
import {
  BoardCustomerReviewResponse,
  newBoardCustomerReview,
} from '@/7th/_repository/client/home/board-customer-reivew-detail'
import {
  BoardCustomerReviewListResponse,
  newBoardCustomerReviewList,
} from '@/7th/_repository/client/home/board-customer-reivew-list'
import {
  BoardGalleryResponse,
  newBoardGallery,
} from '@/7th/_repository/client/home/board-gallery-detail'
import {
  BoardGalleryListResponse,
  newBoarGalleryList,
} from '@/7th/_repository/client/home/board-gallery-list'
import {
  BoardNoticeResponse,
  newBoardNotice,
} from '@/7th/_repository/client/home/board-notice-detail'
import {
  BoardNoticeListResponse,
  newBoardNoticeList,
} from '@/7th/_repository/client/home/board-notice-list'
import { MainResponse } from '@/7th/_repository/client/home/main'
import { useEffect, useState } from 'react'
import { fetcher } from '../fetcher-action'
import { useFetchBasicState } from '../hooks'

export function useFetchBoardNotice() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    page,
    callback,
  }: {
    page: number
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: BoardNoticeListResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getBoardNoticeList({ page }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}
export function useOnLoadBoardNoticeList({ page }: { page: number }) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [notice, setNotice] =
    useState<BoardNoticeListResponse>(newBoardNoticeList())

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardNoticeList({ page }),
      )
      if (res.isSuccess && res.payload) {
        setNotice(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [page])

  return {
    loading,
    error,
    payload: notice,
  }
}

export function useOnLoadBoardNoticeDetail({ notifyId }: { notifyId: string }) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [notice, setNotice] = useState<BoardNoticeResponse>(newBoardNotice())

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardNotice({ notifyId }),
      )

      if (res.isSuccess && res.payload) {
        setNotice(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [])

  return {
    loading,
    error,
    payload: notice,
  }
}

export function useFetchGalleryList() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    page,
    callback,
  }: {
    page: number
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: BoardNoticeListResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getBoardNoticeList({ page }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}

export function useOnLoadGalleryList({ page }: { page: number }) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [gallery, setGallery] =
    useState<BoardGalleryListResponse>(newBoarGalleryList())

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardGalleryList({ page }),
      )
      if (res.isSuccess && res.payload) {
        setGallery(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [page])

  return {
    loading,
    error,
    payload: gallery,
  }
}

export function useOnLoadGalleryDetail({ boardId }: { boardId: string }) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [gallery, setGallery] =
    useState<BoardGalleryResponse>(newBoardGallery())

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardGallery({ boardId }),
      )

      if (res.isSuccess && res.payload) {
        setGallery(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [])

  return {
    loading,
    error,
    payload: gallery,
  }
}

export function useOnLoadCustomerReviewList({
  writeType,
  page,
}: {
  writeType: string
  page: number
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [list, setList] = useState<BoardCustomerReviewListResponse>(
    newBoardCustomerReviewList(),
  )

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardCustomerReviewList({ writeType, page }),
      )
      if (res.isSuccess && res.payload) {
        setList(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [page])

  return {
    loading,
    error,
    payload: list,
  }
}

export function useOnLoadCustomerReviewDetail({
  writeType,
  boardId,
}: {
  writeType: string
  boardId: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [review, setReview] = useState<BoardCustomerReviewResponse>(
    newBoardCustomerReview(),
  )

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getBoardCustomerReview({ writeType, id: boardId }),
      )

      if (res.isSuccess && res.payload) {
        setReview(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [])

  return {
    loading,
    error,
    payload: review,
  }
}

export function useOnLoadMain(
  target: {
    private: boolean
    academy: boolean
    school: boolean
  },
  platform: string,
  country: {
    korea: boolean
    vietnam: boolean
    indonesia: boolean
    canada: boolean
  },
) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<MainResponse | undefined>(undefined)

  let template = 'private'
  if (target.academy) {
    template = 'academy'
  } else if (target.school) {
    template = 'school'
  }
  if (country.vietnam) {
    template = template + '_vn'
  } else if (country.canada) {
    template = template + '_ca'
  }

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getMain({ template, platform }),
      )

      if (res.isSuccess && res.payload) {
        setPayload(res.payload)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
  }, [template, platform])

  return {
    loading,
    error,
    payload,
  }
}
