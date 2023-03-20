import { getRecommend } from '@/api/home'
import type { Recommend } from '@/api/interface/Recommend'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    isPlay: false,
    recommendList: [] as Recommend[]
  },
  lifetimes: {
    attached() {
      this.fetchRecommend()
    }
  },
  methods: {
    onPlay() {
      this.setData({ isPlay: !this.data.isPlay })
    },
    async fetchRecommend() {
      const { result } = await getRecommend()
      console.log('%c🚀 ~ method: fetchRecommend ~', 'color: #F25F5C;font-weight: bold;', result)

      this.setData({ recommendList: result })
    }
  }
})
