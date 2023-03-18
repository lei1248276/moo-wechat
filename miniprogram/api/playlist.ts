// * 获取歌曲（可以是多首）详情数据
import simpleAxios from '@/utils/request'
import { Song } from '@/api/interface'

export { getPlaylist } from '@/api/home'

export function getSongs(ids: string | number) {
  return simpleAxios.get<{
    code: number
    songs: Song[]
  }>(`/song/detail?ids=${ids}`)
}
