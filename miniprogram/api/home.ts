import simpleAxios from '@/utils/request'
import type { BannerResponse } from '@/api/interface/Banner'
import type { RecommendResponse } from '@/api/interface/Recommend'
import type { AlbumResponse } from '@/api/interface/Album'
import type { SonglistResponse } from '@/api/interface/Songlist'

export { getPlaylist } from '@/api/playlist'

// * 获取轮播图（0: pc 1: android 2: iphone 3: ipad）
export function getBanner(type: 0 | 1 | 2 | 3 = 2) {
  return simpleAxios.get<BannerResponse>(`/banner?type=${type}`)
}

// * 获取推荐歌单
export function getRecommend(limit: number) {
  return simpleAxios.get<RecommendResponse>(`/personalized?limit=${limit}`)
}

// * 获取新歌单
export function getNewSonglist(offset: number, limit: number) {
  return simpleAxios.get<SonglistResponse>(`/top/playlist?limit=${limit}&order=hot&offset=${offset}`)
}

// * 获取新歌
export function getNewSong() {
  return simpleAxios.get(`/personalized/newsong`)
}

// * 获取新专辑
export function getNewAlbum(limit = 3) {
  return simpleAxios.get<AlbumResponse>(`/album/list?limit=${limit}`)
}
