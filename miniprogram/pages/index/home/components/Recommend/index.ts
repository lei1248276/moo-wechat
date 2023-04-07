import { getPlaylist, getRecommend } from '@/api/home'
import type { Recommend } from '@/api/interface/Recommend'
import { audioStore } from '@/store/index'
import { rangeRandom, shuffle } from '@/utils/util'

Component({
  options: {
    styleIsolation: 'apply-shared'
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
    async onPlay() {
      this.setData({ isPlay: true })
      // * 随机获取推荐歌单中某一个
      const recommendList = this.data.recommendList
      const randomIndex = rangeRandom(0, recommendList.length - 1)
      const { id } = recommendList[randomIndex]
      const { playlist } = await getPlaylist(id)

      audioStore.setPlaylist(playlist)
      audioStore.setSongs(playlist.tracks)
      audioStore.setCurrentSong(playlist.tracks[0], 0)

      this.setData({ isPlay: false })
    },
    async fetchRecommend() {
      const { result } = await getRecommend(10)

      // * 先打乱数组然后获取前3位
      this.setData({ recommendList: shuffle(result).slice(0, 3) })
      console.log('%c🚀 ~ method: fetchRecommend ~', 'color: #F25F5C;font-weight: bold;', this.data.recommendList)
    }
  }
})
