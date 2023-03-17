import { getRecommend, getPlaylist } from '@/api/home'
import type { Song } from '@/api/interface'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    newSongs: [] as Song[]
  },
  lifetimes: {
    attached() {
      this.fetchNewSong()
    }
  },
  methods: {
    async fetchNewSong() {
      const { result: [{ id }] } = await getRecommend(1)
      const { playlist: { tracks }} = await getPlaylist(id)
      console.log('%c🚀 ~ method: fetchNewSong ~', 'color: #F25F5C;font-weight: bold;', tracks)

      this.setData({ newSongs: tracks.slice(0, 4) })
    }
  }
})
