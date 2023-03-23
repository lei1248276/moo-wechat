import { audioStoreBehavior } from '@/behavior/audioStore'
import { audioStore } from '@/store/audio'

Page({
  data: {
    currentPage: 1
  },
  behaviors: [audioStoreBehavior],
  onLoad() {
    const { audio } = audioStore
    audio.autoplay = true

    audio.onPlay(() => {
      console.log('onPlay')
      audioStore.setIsPlay(true)
    })

    audio.onPause(() => {
      console.log('onPause')
      audioStore.setIsPlay(false)
    })

    audio.onEnded(() => {
      console.log('onEnded')
      audioStore.setIsPlay(false)
    })

    /* audio.onTimeUpdate(() => {

    })*/

    audio.onError((err) => {
      console.error(err.errMsg)
    })
  },
  onSwiper(page: WechatMiniprogram.SwiperChange) {
    this.setData({ currentPage: page.detail.current })
  }
})
