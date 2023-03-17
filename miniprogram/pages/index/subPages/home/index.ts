import { getSonglist } from '@/api/home'
import type { Playlist } from '@/api/interface'

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    Songlist: [] as Playlist[]
  },
  lifetimes: {
    attached() {
      this.fetchPlaylist()
    }
  },
  methods: {
    onPlay() {

    },
    async fetchPlaylist() {
      const { playlists } = await getSonglist(0, 4)
      console.log('%c🚀 ~ method: fetchPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlists)

      this.setData({ Songlist: playlists })
    }
  }
})
