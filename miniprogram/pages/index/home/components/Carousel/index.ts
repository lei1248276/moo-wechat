import { getBanner } from '@/api/home'
import type { Banner } from '@/api/interface/Banner'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    autoplay: true,
    bannerList: [] as Banner[]
  },
  lifetimes: {
    attached() {
      this.fetchBanner()
    }
  },
  pageLifetimes: {
    show() {
      this.setData({ autoplay: true })
    },
    hide() {
      this.setData({ autoplay: false })
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
