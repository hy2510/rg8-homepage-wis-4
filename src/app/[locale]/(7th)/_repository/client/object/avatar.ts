import RenewType from '@/util/string-utils'

export interface Avatar {
  avatarId: string
  name: string
  imageLarge: string
  imageSmall: string
  imageCircle: string
}

export function makeAvatar(json?: any): Avatar {
  return {
    avatarId: RenewType.renewString(json?.AvatarId),
    name: RenewType.renewString(json?.Name),
    imageLarge: RenewType.renewString(json?.ImageLarge),
    imageSmall: RenewType.renewString(json?.ImageSmall),
    imageCircle: RenewType.renewString(json?.ImageCircle),
  }
}
