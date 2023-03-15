import { getBanner, BannerResponse } from '../../../../api/home'

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    bannerList: [] as BannerResponse['banners']
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
