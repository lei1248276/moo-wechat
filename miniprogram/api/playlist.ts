// * 获取歌曲（可以是多首）详情数据
import simpleAxios from '@/utils/request'
import { Playlist, Song } from '@/api/interface'

// * 获取指定歌单歌曲列表
export function getPlaylist(id: number) {
  return simpleAxios.get<{
    code: number
    playlist: Playlist
  }>(`/playlist/detail?id=${id}`)
}

// * 查询歌曲信息（可以是多首以 "," 分割）
export function getSongs(ids: string | number) {
  return simpleAxios.get<{
    code: number
    songs: Song[]
  }>(`/song/detail?ids=${ids}`)
}
