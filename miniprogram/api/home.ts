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
