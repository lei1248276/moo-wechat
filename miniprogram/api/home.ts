import simpleAxios from '@/utils/request'
import type { Banners, Recommend, Playlist, Song } from '@/api/interface'

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

// * 获取所有歌单
export function getSonglist(offset: number, limit: number) {
  return simpleAxios.get<{
    code: number
    cat: string
    total: number
    playlists: Playlist[]
  }>(`/top/playlist?limit=${limit}&order=all&offset=${offset}`)
}

// * 获取指定歌单歌曲列表
export function getPlaylist(id: number) {
  return simpleAxios.get<{
    code: number
    playlist: Playlist
  }>(`/playlist/detail?id=${id}`)
}

// * 获取歌曲（可以是多首）详情数据
export function getSongs(ids: string | number) {
  return simpleAxios.get<{
    code: number
    songs: Song
  }>(`/song/detail?ids=${ids}`)
}
