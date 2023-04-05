import { cacheStore } from '@/store/index'
import type { Song } from '@/api/interface/Song'
import { spreadArray } from '@/utils/util'

Page({
  data: {
    historyPlays: [] as Song[],
    count: 0,

    _historyPlays: [] as Song[]
  },
  onLoad() {
    this.data._historyPlays = cacheStore.historyPlays
    this.setData({ count: cacheStore.historyPlays.length })
    this.onScrollMore()
  },
  onScrollMore() {
    const { historyPlays, _historyPlays } = this.data
    if (historyPlays.length >= _historyPlays.length) return

    const offset = historyPlays.length
    const songs = _historyPlays.slice(offset, offset + 20)
    this.setData(spreadArray(songs, historyPlays, 'historyPlays'))
  }
})
