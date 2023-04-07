import { getNewSonglist } from '@/api/home'
import type { Songlist } from '@/api/interface/Songlist'
import { rangeRandom } from '@/utils/util'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {

  },
  data: {
    newSonglist: [] as Songlist[]
  },
  lifetimes: {
    attached() {
      this.fetchNewSonglist()
    }
  },
  methods: {
    async fetchNewSonglist() {
      const { playlists } = await getNewSonglist(rangeRandom(0, 100), 4)
      console.log('%c🚀 ~ method: fetchNewSonglist ~', 'color: #F25F5C;font-weight: bold;', playlists)

      this.setData({ newSonglist: playlists })
    }
  }
})
