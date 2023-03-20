import { getNewAlbum } from '@/api/home'
import type { Album } from '@/api/interface/Album'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    newAlbum: [] as Album[]
  },
  lifetimes: {
    attached() {
      this.fetchNewAlbum()
    }
  },
  methods: {
    async fetchNewAlbum() {
      const { products } = await getNewAlbum()
      console.log('%c🚀 ~ method: fetchNewAlbum ~', 'color: #F25F5C;font-weight: bold;', products)

      this.setData({ newAlbum: products })
    }
  }
})
