import { audioStore } from '@/store/audio'
import { autorun } from 'mobx-miniprogram'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    shelf: [
      { description: '收藏音乐', count: 0, icon: 'heart', list: [], url: './profile/collectSongs/index' },
      { description: '收藏歌单', count: 0, icon: 'playlist', list: [], url: './profile/collectPlaylist/index' },
      { description: '本地歌曲', count: 0, icon: 'file', list: [], url: '' },
      { description: '最近播放', count: 0, icon: 'time', list: [], url: './profile/historyPlays/index' }
    ] as { description: string, count: number, icon: string, list: any[], url: string }[]
  },
  lifetimes: {
    attached() {
      autorun(() => {
        this.setData({
          'shelf[0].count': audioStore.collectSongs.length,
          'shelf[0].list': audioStore.collectSongs.slice(0, 3).map((song) => song.al.picUrl)
        })
      })

      autorun(() => {
        this.setData({
          'shelf[1].count': audioStore.collectPlaylist.length,
          'shelf[1].list': audioStore.collectPlaylist.slice(0, 3).map((playlist) => playlist.coverImgUrl)
        })
      })

      autorun(() => {
        this.setData({
          'shelf[3].count': audioStore.historyPlays.length,
          'shelf[3].list': audioStore.historyPlays.slice(0, 3).map((song) => song.al.picUrl)
        })
      })
    }
  },
  methods: {

  }
})
