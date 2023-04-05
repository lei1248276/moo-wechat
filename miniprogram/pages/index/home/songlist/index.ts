import { getSonglist } from '@/api/songlist'
import type { Songlist } from '@/api/interface/Songlist'
import { debounce, spreadArray } from '@/utils/util'

Page({
  data: {
    songlist: [] as Songlist[],

    _total: 0
  },
  onLoad() {
    this.fetchSonglist()
  },
  onScrollMore: debounce(async function(this: any) {
    if (this.data.songlist.length >= this.data._total) return

    await this.fetchSonglist()
  }, 1000, true),
  async fetchSonglist() {
    const { songlist } = this.data
    const { playlists, total } = await getSonglist(songlist.length, 20)
    console.log('%c🚀 ~ method: fetchSonglist ~', 'color: #F25F5C;font-weight: bold;', playlists)

    this.data._total = total
    this.setData(spreadArray(playlists, songlist, 'songlist'))
  }
})
