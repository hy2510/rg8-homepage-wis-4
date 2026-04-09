import RenewType from '@/util/string-utils'

export interface BoardGallery {
  boardId: string
  boardType: string
  category: string
  depth: number
  step: number
  parentBoardId: string
  title: string
  content: string
  originFileName: string
  fileName: string
  readCount: number
  topYn: boolean
  deleteYn: boolean
  registDate: string
  registerId: string
  registerName: string
  modifyDate: string
  modifierId: string
  mdifierName: string
  prevBoardId: string
  nextBoardId: string
  editableYn: boolean
  attachImageName: string
  attachOriginImageName: string
  attachImagePath: string
}

export function makeBoardGallery(json?: any): BoardGallery {
  return {
    boardId: RenewType.renewString(json?.BoardId),
    boardType: RenewType.renewString(json?.BoardType),
    category: RenewType.renewString(json?.Category),
    depth: RenewType.renewNumber(json?.Depth),
    step: RenewType.renewNumber(json?.Step),
    parentBoardId: RenewType.renewString(json?.ParentBoardId),
    title: RenewType.renewString(json?.Title),
    content: RenewType.renewString(json?.Content),
    originFileName: RenewType.renewString(json?.OriginFileName),
    fileName: RenewType.renewString(json?.FileName),
    readCount: RenewType.renewNumber(json?.ReadCount),
    topYn: RenewType.renewBoolean(json?.TopYn),
    deleteYn: RenewType.renewBoolean(json?.DeleteYn),
    registDate: RenewType.renewString(json?.RegistDate),
    registerId: RenewType.renewString(json?.RegisterId),
    registerName: RenewType.renewString(json?.RegisterName),
    modifyDate: RenewType.renewString(json?.ModifyDate),
    modifierId: RenewType.renewString(json?.ModifierId),
    mdifierName: RenewType.renewString(json?.ModifierName),
    prevBoardId: RenewType.renewString(json?.PrevBoardId),
    nextBoardId: RenewType.renewString(json?.NextBoardId),
    editableYn: RenewType.renewBoolean(json?.EditableYn),
    attachImageName: RenewType.renewString(json?.AttachImageName),
    attachOriginImageName: RenewType.renewString(json?.AttachOriginImageName),
    attachImagePath: RenewType.renewString(json?.AttachImagePath),
  }
}
