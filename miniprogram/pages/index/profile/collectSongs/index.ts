import { audioStore, cacheStore } from '@/store/index'
import type { Song } from '@/api/interface/Song'
import { spreadArray } from '@/utils/util'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

const audioStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: audioStore,
    fields: ['currentSongInfo', 'isPlay'],
    actions: []
  }
})

Page({
  behaviors: [audioStoreBehavior],
  data: {
    collectSongs: [] as Song[],
    count: 0,

    _collectSongs: [] as Song[]
  },
  onLoad() {
    this.data._collectSongs = cacheStore.collectSongs
    this.setData({ count: cacheStore.collectSongs.length })
    this.onScrollMore()
  },
  onCollectList({ mark }: WechatMiniprogram.TouchEvent) {
    const { index } = mark as { index: number }
    const { collectSongs } = this.data
    if (audioStore.songs !== collectSongs || audioStore.songs.length !== collectSongs.length) {
      audioStore.setSongs(collectSongs)
    }

    audioStore.setCurrentSong(collectSongs[index], index)
  },
  onDelete({ mark }: WechatMiniprogram.TouchEvent) {
    const { index } = mark as { index: number }
    const { collectSongs, _collectSongs, count } = this.data

    const [song] = _collectSongs.splice(index, 1)
    collectSongs.splice(index, 1)
    this.setData({ collectSongs, count: count - 1 })
    cacheStore.deleteCollectSong(song)
  },
  onScrollMore() {
    const { collectSongs, _collectSongs } = this.data
    if (collectSongs.length >= _collectSongs.length) return

    const offset = collectSongs.length
    const songs = _collectSongs.slice(offset, offset + 20)
    this.setData(spreadArray(songs, collectSongs, 'collectSongs'))
  }
})
