import { audioStore } from '@/store/audio'

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
    currentPage(page) {
      if (page === 'profile') {
        const collectSong = {
          description: '收藏音乐',
          count: 0,
          icon: 'heart',
          list: [],
          url: ''
        }
        const collectSonglist = {
          description: '收藏歌单',
          count: 0,
          icon: 'playlist',
          list: [],
          url: ''
        }
        const localSong = {
          description: '本地歌曲',
          count: 0,
          icon: 'file',
          list: [],
          url: ''
        }
        const historyPlays = {
          description: '最近播放',
          count: audioStore.historyPlays.length,
          icon: 'time',
          list: audioStore.historyPlays.slice(0, 3).map((song) => song.al.picUrl),
          url: './profile/historyPlays/index'
        }

        this.setData({
          shelf: [collectSong, collectSonglist, localSong, historyPlays]
        })
      }
    }
  },
  data: {
    shelf: [
      { description: '收藏音乐', count: 0, icon: 'heart', list: [], url: '' },
      { description: '收藏歌单', count: 0, icon: 'playlist', list: [], url: '' },
      { description: '本地歌曲', count: 0, icon: 'file', list: [], url: '' },
      { description: '最近播放', count: 0, icon: 'time', list: [], url: '' }
    ] as { description: string, count: number, icon: string, list: any[], url: string }[]
  },
  methods: {

  }
})
