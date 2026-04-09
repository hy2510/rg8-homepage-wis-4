import 'server-only'
import fs from 'fs'
import path from 'path'

// @@ FIXME : MEMO : 7-8차 사용량 분석용도의 소스코드

type State = {
  stream: fs.WriteStream
  currentDate: string
  buffer: string[]
  timer: NodeJS.Timeout | null
  flushing: boolean
}

function getToday(): string {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

function createStream(date: string): fs.WriteStream {
  const filePath = path.join(process.cwd(), 'logs', `logactive-${date}.log`)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  return fs.createWriteStream(filePath, { flags: 'a' })
}

function createState(): State {
  const currentDate = getToday()

  return {
    currentDate,
    stream: createStream(currentDate),
    buffer: [],
    timer: null,
    flushing: false,
  }
}

function getState(): State {
  if (!globalThis.__logactiveState) {
    globalThis.__logactiveState = createState()
    // startFlushTimer(globalThis.__logactiveState)
  }

  return globalThis.__logactiveState
}

function rotateIfNeeded(state: State) {
  const today = getToday()

  if (today !== state.currentDate) {
    state.stream.end()
    state.currentDate = today
    state.stream = createStream(today)
  }
}

function flush() {
  const state = getState()

  if (state.flushing) return
  if (state.buffer.length === 0) return

  state.flushing = true

  rotateIfNeeded(state)

  const batch = state.buffer.join('')
  state.buffer = []

  state.stream.write(batch, () => {
    state.flushing = false
  })
}

function startFlushTimer(state: State) {
  if (state.timer) return

  state.timer = setInterval(() => {
    flush()
  }, 100)
}

function scheduleFlush(state: State) {
  if (state.timer) return

  state.timer = setTimeout(() => {
    state.timer = null
    flush()
  }, 200)
}

export function logwrite(line: string) {
  const state = getState()
  state.buffer.push(line + '\n')
  scheduleFlush(state)
}

declare global {
  // eslint-disable-next-line no-var
  var __logactiveState: State | undefined
}
