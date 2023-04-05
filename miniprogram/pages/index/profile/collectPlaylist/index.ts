import { cacheStore } from '@/store/index'
import type { Playlist } from '@/api/interface/Playlist'
import { spreadArray } from '@/utils/util'

Page({
  data: {
    collectPlaylist: [] as Playlist[],
    count: 0,

    _collectPlaylist: [] as Playlist[]
  },
  onLoad() {
    this.data._collectPlaylist = cacheStore.collectPlaylist
    this.setData({ count: cacheStore.collectPlaylist.length })
    this.onScrollMore()
  },
  toPlaylist({ mark }: WechatMiniprogram.TouchEvent) {
    const { index } = mark as { index: number }
    const playlist = this.data.collectPlaylist[index]
    console.log('%c🚀 ~ method: toPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlist)
    wx.navigateTo({
      url: `/sharedPages/playlist/index`,
      success: (res) => {
        res.eventChannel.emit('acceptPlaylist', playlist)
      },
      fail: (err) => { console.error(err) }
    })
  },
  onDelete({ mark }: WechatMiniprogram.TouchEvent) {
    const { index } = mark as { index: number }
    const { collectPlaylist, _collectPlaylist, count } = this.data

    const [playlist] = _collectPlaylist.splice(index, 1)
    collectPlaylist.splice(index, 1)
    this.setData({ collectPlaylist, count: count - 1 })
    cacheStore.deleteCollectPlaylist(playlist)
  },
  onScrollMore() {
    const { collectPlaylist, _collectPlaylist } = this.data
    if (collectPlaylist.length >= _collectPlaylist.length) return

    const offset = collectPlaylist.length
    const songs = _collectPlaylist.slice(offset, offset + 20)
    this.setData(spreadArray(songs, collectPlaylist, 'collectPlaylist'))
  }
})
