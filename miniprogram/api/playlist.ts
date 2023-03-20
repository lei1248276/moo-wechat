// * 获取歌曲（可以是多首）详情数据
import simpleAxios from '@/utils/request'
import type { PlaylistResponse } from '@/api/interface/Playlist'
import type { SongResponse } from '@/api/interface/Song'

// * 获取指定歌单歌曲列表
export function getPlaylist(id: number) {
  return simpleAxios.get<PlaylistResponse>(`/playlist/detail?id=${id}`)
}

// * 查询歌曲信息（可以是多首以 "," 分割）
export function getSongs(ids: string | number) {
  return simpleAxios.get<SongResponse>(`/song/detail?ids=${ids}`)
}
