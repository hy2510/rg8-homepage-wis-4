const UPLOAD_FILE_URL = process.env.NEXT_PUBLIC_BOARD_UPLOAD_FILE_URL

type BoardType = 'Notice' | 'Gallery'
export async function writeFileUpload(
  customerId: string,
  type: BoardType,
  file: File,
): Promise<{
  status: number
  data?: {
    originalFileName: string
    hashFileName: string
  }
}> {
  const baseUrl = UPLOAD_FILE_URL
  const uniqueId = generateUUIDv4().replace(/-/g, '')
  const fileExt = file.name.substring(file.name.lastIndexOf('.')) || ''
  const url = `${baseUrl}/FileTransferHandler.ashx?f=${type}&c=${customerId}&u=${uniqueId}`

  const form = new FormData()
  form.append('file', file)

  const res = await fetch(url, { method: 'post', body: form })
  if (res.ok) {
    return {
      status: res.status,
      data: {
        originalFileName: file.name,
        hashFileName: `${uniqueId}${fileExt}`,
      },
    }
  } else {
    return { status: res.status }
  }
}

export function getUploadFileUrl(
  customerId: string,
  type: BoardType,
  fileName: string,
): string {
  const baseUrl = UPLOAD_FILE_URL
  return `${baseUrl}/UPLOADFILE/${type}/${customerId}/${fileName}`
}

function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
