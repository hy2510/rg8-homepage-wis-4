import RenewType from '@/util/string-utils'

const CONFIG_STORAGE_KEY = 'user_conf'

export type StudentLocalConfig = {
  _id: string
  mode: string
  levelGuidanceTryOtherLevel: boolean
  levelGuidanceLevelChange: boolean
  levelGuidanceLevelChangeRequestLevel: string
  levelGuidanceLevelUpBackRequest: string
  appUserGuideAutoShow: boolean
  continueDefaultTab: 'todo' | 'level' | undefined
}
type StudentLocalConfigId = {
  customerId: string
  studentId: string
}

const DEFAULT_STUDENT_LOCAL_CONFIG: StudentLocalConfig = {
  _id: '',
  mode: '',
  levelGuidanceTryOtherLevel: true,
  levelGuidanceLevelChange: true,
  levelGuidanceLevelChangeRequestLevel: '',
  levelGuidanceLevelUpBackRequest: '',
  appUserGuideAutoShow: true,
  continueDefaultTab: undefined,
}

function createStudentLocalConfig(configId: string): StudentLocalConfig {
  return {
    ...DEFAULT_STUDENT_LOCAL_CONFIG,
    _id: configId,
  }
}

function parseStudentLocalConfig(json: any): StudentLocalConfig {
  return {
    _id:
      json?._id === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG._id
        : RenewType.renewString(json?._id),
    mode:
      json?.mode === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG.mode
        : RenewType.renewString(json?.mode),
    levelGuidanceTryOtherLevel:
      json?.levelGuidanceTryOtherLevel === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG.levelGuidanceTryOtherLevel
        : RenewType.renewBoolean(json?.levelGuidanceTryOtherLevel),
    levelGuidanceLevelChange:
      json?.levelGuidanceLevelChange === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG.levelGuidanceLevelChange
        : RenewType.renewBoolean(json?.levelGuidanceLevelChange),
    levelGuidanceLevelChangeRequestLevel:
      json?.levelGuidanceLevelChangeRequestLevel === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG.levelGuidanceLevelChangeRequestLevel
        : RenewType.renewString(json?.levelGuidanceLevelChangeRequestLevel),
    levelGuidanceLevelUpBackRequest:
      json?.levelGuidanceLevelUpBackRequest === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG.levelGuidanceLevelUpBackRequest
        : RenewType.renewString(json?.levelGuidanceLevelUpBackRequest),
    appUserGuideAutoShow:
      json?.appUserGuideAutoShow === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG.appUserGuideAutoShow
        : RenewType.renewBoolean(json?.appUserGuideAutoShow),
    continueDefaultTab:
      json?.continueDefaultTab === undefined
        ? DEFAULT_STUDENT_LOCAL_CONFIG.continueDefaultTab
        : (RenewType.renewString(json?.continueDefaultTab) as 'todo' | 'level'),
  }
}

function getAllStudentLocalConfigs(): StudentLocalConfig[] {
  if (typeof window === 'undefined') return []

  try {
    const configJson = window.localStorage.getItem(CONFIG_STORAGE_KEY)
    if (!configJson) return []

    const parsed = JSON.parse(configJson)
    if (!Array.isArray(parsed)) return []

    return parsed.map(parseStudentLocalConfig).filter((v) => !!v._id)
  } catch {
    return []
  }
}

export function getStudentLocalConfig(
  info: StudentLocalConfigId,
): StudentLocalConfig {
  const configId = getConfigId(info)
  if (!configId) return createStudentLocalConfig('')

  const allConfigs = getAllStudentLocalConfigs()
  const config = allConfigs.find((config) => config._id === configId)
  if (!config) {
    return createStudentLocalConfig(configId)
  }
  return config
}

export function updateStudentLocalConfig(
  update: StudentLocalConfigId & Partial<Omit<StudentLocalConfig, '_id'>>,
) {
  if (typeof window === 'undefined') return

  const { customerId, studentId, ...rawPatch } = update
  if (customerId === '' || studentId === '') return

  const configId = getConfigId(update)
  const allConfigs = getAllStudentLocalConfigs()
  const myConfigIndex = allConfigs.findIndex(
    (config) => config._id === configId,
  )
  const base =
    myConfigIndex >= 0
      ? allConfigs[myConfigIndex]
      : createStudentLocalConfig(configId)
  const patch = Object.fromEntries(
    Object.entries(rawPatch).filter(([, v]) => v !== undefined),
  ) as Partial<Omit<StudentLocalConfig, '_id'>>

  const next: StudentLocalConfig = { ...base, ...patch, _id: configId }

  if (myConfigIndex >= 0) {
    allConfigs[myConfigIndex] = next
  } else {
    allConfigs.push(next)
  }

  window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(allConfigs))
}

function getConfigId({ customerId, studentId }: StudentLocalConfigId) {
  if (customerId === '' || studentId === '') return ''
  return `${customerId}#${studentId}`
}
