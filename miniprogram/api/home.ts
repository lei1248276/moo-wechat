import simpleAxios from '@/utils/request'
import type { Banners, Recommend, Playlist, Album } from '@/api/interface'

export { getPlaylist } from '@/api/playlist'

// * 获取轮播图
export function getBanner() {
  return simpleAxios.get<{
    code: number
    banners: Banners[]
  }>('/banner')
}

// * 获取推荐歌单
export function getRecommend(limit = 3) {
  return simpleAxios.get<{
    code: number
    category: number
    hasTaste: boolean
    result: Recommend[]
  }>(`/personalized?limit=${limit}`)
}

// * 获取新歌单
export function getNewSonglist(offset: number, limit: number) {
  return simpleAxios.get<{
    code: number
    cat: string
    total: number
    playlists: Playlist[]
  }>(`/top/playlist?limit=${limit}&order=all&offset=${offset}`)
}

// * 获取新专辑
export function getNewAlbum(limit = 3) {
  return simpleAxios.get<{
    code: number
    products: Album[]
  }>(`/album/list?limit=${limit}`)
}
