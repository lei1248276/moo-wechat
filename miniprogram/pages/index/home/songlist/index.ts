import { getSonglist } from '@/api/songlist'
import type { Songlist } from '@/api/interface/Songlist'
import { spreadArray } from '@/utils/util'
import Toast from '@/utils/toast'

Page({
  data: {
    songlist: [] as Songlist[],

    _total: 0
  },
  onLoad() {
    this.fetchSonglist()
  },
  async onScrollMore() {
    Toast.start()
    if (this.data.songlist.length >= this.data._total) return Toast.fail('没有更多了。。。')

    await this.fetchSonglist()
    Toast.close()
  },
  async fetchSonglist() {
    const { songlist } = this.data
    const { playlists, total } = await getSonglist(songlist.length, 20)
    console.log('%c🚀 ~ method: fetchSonglist ~', 'color: #F25F5C;font-weight: bold;', playlists)

    this.data._total = total
    this.setData(spreadArray(playlists, songlist, 'songlist'))
  }
})
