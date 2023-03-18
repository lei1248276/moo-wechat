import { getSonglist } from '@/api/songlist'
import { Playlist } from '@/api/interface'
import { spreadArray } from '@/utils/util'
import Toast from '@/utils/toast'

Page({
  total: 0,
  data: {
    songlist: [] as Playlist[]
  },
  onLoad() {
    this.fetchSonglist()
  },
  onReachBottom() {
    if (this.data.songlist.length >= this.total) return Toast.fail('没有更多了。。。')

    this.fetchSonglist()
  },
  async fetchSonglist() {
    const { songlist } = this.data
    const { playlists, total } = await getSonglist(songlist.length, 20)
    console.log('%c🚀 ~ method: fetchSonglist ~', 'color: #F25F5C;font-weight: bold;', playlists)

    this.total = total
    this.setData(spreadArray(playlists, songlist, 'songlist'))
  }
})