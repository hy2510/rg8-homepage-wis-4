import { useRootCreateStore } from '../../store'

export const useStudentAvatarAction = () => {
  return useRootCreateStore((state) => state.student.avatar.action)
}

export const useStudentAvatar = () => {
  const data = useRootCreateStore((state) => state.student.avatar).payload
  const userAvatarId = data.avatarId || '097971'
  const avatarList = data.avatars
  const filteredAvatar = avatarList.filter(
    (item) => item.avatarId === userAvatarId,
  )

  let userAvatar: {
    avatarId: string
    name: string
    imageLarge: string
    imageSmall: string
    imageCircle: string
  }
  if (filteredAvatar.length > 0) {
    userAvatar = { ...filteredAvatar[0] }
  } else {
    userAvatar = { ...avatarList[0] }
  }

  return {
    userAvatar,
    avatarList,
  }
}
