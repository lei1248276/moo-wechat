import simpleAxios from '@/utils/request'

export interface BannerResponse{
  banners: {
    bannerBizType: string
    imageUrl: string
    targetId: number
    targetType: number
    titleColor: string
    typeTitle: string
  }[]
  code: number
}
export function getBanner() {
  return simpleAxios.get<BannerResponse>('/banner')
}

export interface RecommendResponse{
  code: number
  category: number
  hasTaste: boolean
  result: {
    alg: string
    canDislike: boolean
    copywriter: string
    highQuality: boolean
    id: number
    name: string
    picUrl: string
    playCount: number
    trackCount: number
    trackNumberUpdateTime: number
    type: number
    }[]
}
export function getRecommend() {
  return simpleAxios.get<RecommendResponse>('/personalized?limit=3')
}

export interface SonglistResponse<T = Record<string, any>>{
  code: number
  cat: string
  playlists: {
    coverImgUrl: string
    createTime: number
    updateTime: number
    creator: T
    description: string
    name: string
    playCount: number
    subscribedCount: number
    tags: string[]
  }[]
  total: number
}
export function getSonglist(offset: number, limit: number) {
  return simpleAxios.get<SonglistResponse>(`/top/playlist?limit=${limit}&order=all&offset=${offset}`)
}
