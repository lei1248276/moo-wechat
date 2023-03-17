import { getBanner } from '@/api/home'
import { Banners } from '@/api/interface'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    bannerList: [] as Banners[]
  },
  lifetimes: {
    attached() {
      this.fetchBanner()
    }
  },
  methods: {
    async fetchBanner() {
      const { banners } = await getBanner()
      console.log('%c🚀 ~ method: fetchBanner ~', 'color: #F25F5C;font-weight: bold;', banners)

      this.setData({ bannerList: banners })
    }
  }
})
