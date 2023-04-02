import { audioStore } from '@/store/audio'
import { sleep } from '@/utils/util'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    currentPage: {
      type: String,
      value: 'profile'
    }
  },
  observers: {
    async currentPage(page) {
      if (page === 'profile') {
        await sleep(333)

        const [
          collectSongs,
          collectPlaylist,
          ,
          historyPlays
        ] = this.data.shelf

        if (collectSongs.count !== audioStore.collectSongs.length) {
          this.setData({
            'shelf[0].count': audioStore.collectSongs.length,
            'shelf[0].list': audioStore.collectSongs.slice(0, 3).map((song) => song.al.picUrl)
          })
        }

        if (collectPlaylist.count !== audioStore.collectPlaylist.length) {
          this.setData({
            'shelf[1].count': audioStore.collectPlaylist.length,
            'shelf[1].list': audioStore.collectPlaylist.slice(0, 3).map((playlist) => playlist.coverImgUrl)
          })
        }

        if (historyPlays.count !== audioStore.historyPlays.length) {
          this.setData({
            'shelf[3].count': audioStore.historyPlays.length,
            'shelf[3].list': audioStore.historyPlays.slice(0, 3).map((song) => song.al.picUrl)
          })
        }
      }
    }
  },
  data: {
    shelf: [
      { description: '收藏音乐', count: 0, icon: 'heart', list: [], url: './profile/collectSongs/index' },
      { description: '收藏歌单', count: 0, icon: 'playlist', list: [], url: '' },
      { description: '本地歌曲', count: 0, icon: 'file', list: [], url: '' },
      { description: '最近播放', count: 0, icon: 'time', list: [], url: './profile/historyPlays/index' }
    ] as { description: string, count: number, icon: string, list: any[], url: string }[]
  },
  methods: {

  }
})
