'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'student'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function student(token: string) {
  const request = makeRequest({
    token,
    path: getPath(''),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function studentHistoryList(token: string) {
  const request = makeRequest({
    token,
    path: getPath('history-and-class-list'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function studentDailyLearning(token: string) {
  const request = makeRequest({
    token,
    path: getPath('daily-learning'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function studentDailyLearningSaveLevel(
  token: string,
  input: { level: string },
) {
  const request = makeRequest({
    token,
    path: getPath(`daily-learning-study-level`),
    option: {
      method: 'put',
      queryString: {
        level: input.level,
      },
    },
  })
  return await execute(request)
}

async function studentDailyLearningSave(
  token: string,
  input: { type: string; level: string; value: number },
) {
  const request = makeRequest({
    token,
    path: getPath(`daily-learning-study`),
    option: {
      method: 'put',
      queryString: {
        type: input.type,
        level: input.level,
        value: input.value,
      },
    },
  })
  return await execute(request)
}

async function studentDailyLearningHistory(token: string) {
  const request = makeRequest({
    token,
    path: getPath('daily-learning-history'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function studentAvatarList(token: string) {
  const request = makeRequest({
    token,
    path: getPath(`avatar`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function studentAvatarChange(token: string, input: { avatarId: string }) {
  const request = makeRequest({
    token,
    path: getPath(`avatar`),
    option: {
      method: 'put',
      queryString: {
        avatarId: input.avatarId,
      },
    },
  })
  return await execute(request)
}

async function todayStudyLearning(token: string) {
  const request = makeRequest({
    token,
    path: getPath(`today-study-learning`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function levelTestInfo(token: string) {
  const request = makeRequest({
    token,
    path: getPath(`level-test-info`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function continuousStudy(token: string) {
  const request = makeRequest({
    token,
    path: getPath(`continuous-study`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function changeContinuousStudyViewType(
  token: string,
  input: { viewType: string },
) {
  const request = makeRequest({
    token,
    path: getPath(`continuous-study`),
    option: {
      method: 'put',
      body: {
        viewType: input.viewType,
      },
    },
  })
  return await execute(request)
}

async function changeStudentName(
  token: string,
  input: { newUserName: string },
) {
  const request = makeRequest({
    token,
    path: getPath(`change-student-name`),
    option: {
      method: 'put',
      body: {
        newUserName: input.newUserName,
      },
    },
  })
  return await execute(request)
}

async function changePassword(
  token: string,
  input: { oldPassword: string; newPassword: string },
) {
  const request = makeRequest({
    token,
    path: getPath(`change-password`),
    option: {
      method: 'post',
      body: {
        oldPassword: input.oldPassword,
        newPassword: input.newPassword,
      },
    },
  })
  return await execute(request)
}

async function overwritePassword(
  token: string,
  input: { newPassword: string },
) {
  const request = makeRequest({
    token,
    path: getPath(`overwrite-password`),
    option: {
      method: 'post',
      body: {
        newPassword: input.newPassword,
      },
    },
  })
  return await execute(request)
}

async function changeSmsAgree(
  token: string,
  input: { studyReportYn: boolean; eventInformationYn: boolean },
) {
  const request = makeRequest({
    token,
    path: getPath(`change-sms-agree`),
    option: {
      method: 'post',
      body: {
        studyReportYn: input.studyReportYn,
        eventInformationYn: input.eventInformationYn,
      },
    },
  })
  return await execute(request)
}

async function changeStudySetting(
  token: string,
  input: {
    type: string
    startScreen?: string
    isEbkListenRepeat?: boolean
    isEb1ListenRepeat?: boolean
    isViewStep3Hint?: boolean
    isViewStep2Skip?: boolean
    studyReadingUnitId?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`study-setting`),
    option: {
      method: 'post',
      body: {
        type: input.type,
        startScreen: input.startScreen,
        isEbkListenRepeat: input.isEbkListenRepeat,
        isEb1ListenRepeat: input.isEb1ListenRepeat,
        isViewStep3Hint: input.isViewStep3Hint,
        isViewStep2Skip: input.isViewStep2Skip,
        studyReadingUnitId: input.studyReadingUnitId,
      },
    },
  })
  return await execute(request)
}

async function attendance(
  token: string,
  input: {
    date: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`attendance`),
    option: {
      method: 'get',
      queryString: {
        date: input.date,
      },
    },
  })
  return await execute(request)
}

async function attendanceInsert(
  token: string,
  input: {
    ip: string
    deviceType: string
    mobileYn: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`attendance`),
    option: {
      method: 'put',
      body: {
        ip: input.ip,
        deviceType: input.deviceType,
        mobileYn: input.mobileYn,
      },
    },
  })
  return await execute(request)
}

async function withdraw(
  token: string,
  input: {
    cause: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`withdraw`),
    option: {
      method: 'post',
      body: {
        cause: input.cause,
      },
    },
  })
  return await execute(request)
}

async function studentEarnReadingUnit(token: string) {
  const request = makeRequest({
    token,
    path: getPath(`earn-reading-unit`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function studentPhoneNumberRequestKR(
  token: string,
  input: {
    phoneNumber: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`phone-certification-request-kr`),
    option: {
      method: 'post',
      body: {
        phoneNumber: input.phoneNumber,
      },
    },
  })
  return await execute(request)
}

async function studentPhoneNumberCert(
  token: string,
  input: { phoneNumber: string; certification: string },
) {
  const request = makeRequest({
    token,
    path: getPath(`phone-certification-result`),
    option: {
      method: 'post',
      body: {
        phoneNumber: input.phoneNumber,
        certification: input.certification,
      },
    },
  })
  return await execute(request)
}

async function changePhoneNumber(
  token: string,
  input: {
    phoneNumber: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`change-phone-number`),
    option: {
      method: 'post',
      body: {
        phoneNumber: input.phoneNumber,
      },
    },
  })
  return await execute(request)
}

async function changeableClassGroupInfo(token: string) {
  const request = makeRequest({
    token,
    path: getPath(`changeable-class-info`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function changeClass(
  token: string,
  input: {
    studentHistoryId: string
    newClassId: string
    workDate?: string
    registStaffId?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath(`change-class`),
    option: {
      method: 'post',
      body: {
        studentHistoryId: input.studentHistoryId,
        newClassId: input.newClassId,
        workDate: input.workDate,
        registStaffId: input.registStaffId,
      },
    },
  })
  return await execute(request)
}

const Student = {
  student,
  studentHistoryList,
  studentDailyLearning,
  studentDailyLearningSaveLevel,
  studentDailyLearningSave,
  studentDailyLearningHistory,
  studentAvatarList,
  studentAvatarChange,
  todayStudyLearning,
  levelTestInfo,
  continuousStudy,
  changeContinuousStudyViewType,
  changePassword,
  overwritePassword,
  changeStudentName,
  changeSmsAgree,
  changeStudySetting,
  attendance,
  attendanceInsert,
  withdraw,
  studentEarnReadingUnit,
  studentPhoneNumberRequestKR,
  studentPhoneNumberCert,
  changePhoneNumber,
  changeableClassGroupInfo,
  changeClass,
}
export default Student
