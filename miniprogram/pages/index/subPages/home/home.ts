import { getSonglist, SonglistResponse } from '@/api/home'

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    Songlist: [] as SonglistResponse['playlists']
  },
  lifetimes: {
    attached() {
      this.fetchPlaylist()
    }
  },
  methods: {
    async fetchPlaylist() {
      const { playlists } = await getSonglist(0, 4)
      console.log('%c🚀 ~ method: fetchPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlists)

      this.setData({ Songlist: playlists })
    }
  }
})
