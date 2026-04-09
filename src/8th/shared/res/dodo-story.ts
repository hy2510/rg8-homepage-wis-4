import { KOREAN } from '@/localization/localize-config'
import { dodofriendsStoryEn } from './dodo-story-en'
import { dodofriendsStory } from './dodo-story-ko'
import { dodofriendsPoint } from './dodo-story-point'

export interface DodoFriends {
  id: string
  name: string
  minPoint: number
  maxPoint: number
  title: string
  description: string
  imagePath: string
  lockImagePath: string
  list: {
    startPoint: number
    endPoint: number
    title: string
    description: string
    imagePath: string
    imagePath2: string
  }[]
}

export interface DodoFriendsStory {
  id: string
  name: string
  title: string
  description: string
  imagePath: string
  lockImagePath: string
  list: {
    title: string
    description: string
    imagePath: string
    imagePath2: string
  }[]
}

export interface DodoFriendsPoint {
  id: string
  minPoint: number
  maxPoint: number
  list: {
    startPoint: number
    endPoint: number
  }[]
}

function mergeDodoFriends(storyData: DodoFriendsStory[]): DodoFriends[] {
  return dodofriendsPoint.map((point) => {
    const story = storyData.find((s) => s.id === point.id)
    if (!story) {
      throw new Error(`Story not found for id: ${point.id}`)
    }
    return {
      id: point.id,
      name: story.name,
      minPoint: point.minPoint,
      maxPoint: point.maxPoint,
      title: story.title,
      description: story.description,
      imagePath: story.imagePath,
      lockImagePath: story.lockImagePath,
      list: point.list.map((p, index) => ({
        startPoint: p.startPoint,
        endPoint: p.endPoint,
        title: story.list[index]?.title ?? '',
        description: story.list[index]?.description ?? '',
        imagePath: story.list[index]?.imagePath ?? '',
        imagePath2: story.list[index]?.imagePath2 ?? '',
      })),
    }
  })
}

export function getDodoFriendsStory(langCode?: string): DodoFriends[] {
  switch (langCode) {
    case KOREAN:
      return mergeDodoFriends(dodofriendsStory)
    default:
      return mergeDodoFriends(dodofriendsStoryEn)
  }
}
