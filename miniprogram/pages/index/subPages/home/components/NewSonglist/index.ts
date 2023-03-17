import { getNewSonglist } from '@/api/home'
import type { Playlist } from '@/api/interface'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    newSonglist: [] as Playlist[]
  },
  lifetimes: {
    attached() {
      this.fetchNewSonglist()
    }
  },
  methods: {
    async fetchNewSonglist() {
      const { playlists } = await getNewSonglist(0, 4)
      console.log('%c🚀 ~ method: fetchNewSonglist ~', 'color: #F25F5C;font-weight: bold;', playlists)

      this.setData({ newSonglist: playlists })
    }
  }
})
