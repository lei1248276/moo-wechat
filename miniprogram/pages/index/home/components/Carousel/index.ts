import { getBanner } from '@/api/home'
import type { Banner } from '@/api/interface/Banner'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    autoplay: {
      type: Boolean,
      value: true
    }
  },
  data: {
    hidden: false,
    bannerList: [] as Banner[]
  },
  lifetimes: {
    attached() {
      this.fetchBanner()
    }
  },
  pageLifetimes: {
    show() {
      this.setData({ hidden: false })
    },
    hide() {
      this.setData({ hidden: true })
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
