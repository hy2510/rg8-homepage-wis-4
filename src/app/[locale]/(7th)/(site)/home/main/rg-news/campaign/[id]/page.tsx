'use client'

import { use, useEffect } from 'react'
import { useChangeBoard } from '../../_cpnt/StaticBoardContext'

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const setChangeBoard = useChangeBoard()

  useEffect(() => {
    if (setChangeBoard) {
      setChangeBoard(params.id)
    }
    if (window) {
      window.scrollTo(0, 0)
    }
  }, [setChangeBoard, params.id])

  return null
}
