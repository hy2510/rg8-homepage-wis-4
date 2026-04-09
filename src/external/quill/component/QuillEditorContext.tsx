'use client'

import '@/public/src/editor/quill-2.0.3-min.snow.css'
import Script from 'next/script'
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import initQuillEditor, { QuillEditorType } from '../quilljs'

type QuillEditorContextType = {
  get: QuillEditorType | null
  set: (instance: QuillEditorType) => void
}
const QuillEditorContext = React.createContext<
  QuillEditorContextType | undefined
>(undefined)

export default function QuillEditorProvider({
  children,
}: {
  children?: ReactNode
}) {
  const [quill, setQuill] = useState<QuillEditorType | null>(null)
  const contextValue = {
    get: quill,
    set: setQuill,
  }

  const [loaded, setLoaded] = useState(false)

  const checkLoad = () => {
    const quillObjectLoad = !!(window as any).Quill
    const editorLoad = !!(window as any).decodeHTMLEntities

    if (quillObjectLoad && editorLoad) {
      setLoaded(true)
    }
  }

  useEffect(() => {
    checkLoad()
  }, [])

  return (
    <QuillEditorContext.Provider value={contextValue}>
      <Script
        src="/src/editor/quill-2.0.3-min.js"
        strategy="afterInteractive"
        onLoad={() => {
          checkLoad()
        }}
      />
      <Script
        src="/src/editor/quill-editor.js"
        strategy="afterInteractive"
        onLoad={() => {
          checkLoad()
        }}
      />

      <QuillEditorWrapper ready={loaded}>{children}</QuillEditorWrapper>
    </QuillEditorContext.Provider>
  )
}

function QuillEditorWrapper({
  children,
  ready,
}: {
  children?: ReactNode
  ready: boolean
}) {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/src/editor/editor.css' // public 폴더에 있는 CSS 파일
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link) // cleanup
    }
  }, [])
  if (!ready) {
    return <>Not Ready</>
  }
  return <>{children}</>
}

export function QuillEditor({ height }: { height?: string }) {
  const context = useContext(QuillEditorContext)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && containerRef.current.childNodes.length === 0) {
      const quillType = initQuillEditor(containerRef.current)
      if (context && context.set) {
        context.set(quillType)
      }
    }
  }, [context])

  return (
    <div style={{ height: height || 'auto' }}>
      <div ref={containerRef}></div>
    </div>
  )
}

export function useQuillEditorAction() {
  const context = useContext(QuillEditorContext)
  if (!context) {
    throw Error('Unbind QuillEditorContext')
  }
  return context.get
}
