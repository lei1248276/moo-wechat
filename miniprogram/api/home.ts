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
