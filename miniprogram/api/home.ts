import simpleAxios from '@/utils/request'
import type { BannerResponse } from '@/api/interface/Banner'
import type { RecommendResponse } from '@/api/interface/Recommend'
import type { AlbumResponse } from '@/api/interface/Album'
import type { SonglistResponse } from '@/api/interface/Songlist'

export { getPlaylist } from '@/api/playlist'

// * 获取轮播图
export function getBanner() {
  return simpleAxios.get<BannerResponse>('/banner')
}

// * 获取推荐歌单
export function getRecommend(limit = 3) {
  return simpleAxios.get<RecommendResponse>(`/personalized?limit=${limit}`)
}

// * 获取新歌单
export function getNewSonglist(offset: number, limit: number) {
  return simpleAxios.get<SonglistResponse>(`/top/playlist?limit=${limit}&order=all&offset=${offset}`)
}

// * 获取新专辑
export function getNewAlbum(limit = 3) {
  return simpleAxios.get<AlbumResponse>(`/album/list?limit=${limit}`)
}
