import { audioStoreBehavior } from '@/behavior/audioStore'
import { audioStore } from '@/store/audio'

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    hidden: false,
    pivot: (450 / 2) - (130 / 2), // * 中心点

    _moved: -1 // * 最终滑动的距离
  },
  behaviors: [audioStoreBehavior],
  lifetimes: {
    attached() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audioStore.audio.onSeeked((this.onResetControlCount = () => {
        console.log('%c🚀 ~ method: ??? ~', 'color: #F25F5C;font-weight: bold;', 'onSeeked')
        this.selectComponent('.control-count-down').reset()
      }))
    },
    detached() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audioStore.audio.offSeeked(this.onResetControlCount)
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
    onRecord() {
      audioStore.currentSongInfo && wx.navigateTo({ url: '/sharedPages/play/index' })
    },
    onPlay() {
      if (!audioStore.currentSongInfo) return

      if (audioStore.isPlay) {
        audioStore.audio.pause()
        this.selectComponent('.control-count-down').pause()
      } else {
        audioStore.audio.play()
        this.selectComponent('.control-count-down').start()
      }
    },
    onMoveChange({ detail: { x, source }}: WechatMiniprogram.MovableViewChange) {
      if (!source) return
      this.data._moved = x
    },
    onMoveEnd() {
      const { pivot, _moved: moved } = this.data;
      (this.data._moved = -1) && this.setData({ pivot }) // * 滑动结束后手动归位
      // ! 误触直接退出
      if (moved === -1 || !audioStore.currentSongInfo) return

      const distance = pivot / 2 // * 可移动距离
      const limit = distance * 3 / 4 // * 触发的阈值
      const next = distance + limit // * 下一首
      const pre = distance - limit // * 上一首
      console.log({ moved, pivot, distance, limit, next, pre })

      if (moved > next) {
        console.log('next: ')
        audioStore.setNextSong()
      } else if (moved < pre) {
        console.log('pre: ')
        audioStore.setPreSong()
      }
    }
  }
})
