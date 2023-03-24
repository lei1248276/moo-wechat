import { audioStoreBehavior } from '@/behavior/audioStore'
import { audioStore } from '@/store/audio'

Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    pivot: (450 / 2) - (130 / 2), // * 中心点

    _moved: -1 // * 最终滑动的距离
  },
  behaviors: [audioStoreBehavior],
  lifetimes: {
    attached() {
      audioStore.audio.onSeeked(() => {
        this.selectComponent('.control-count-down').reset()
      })
    }
  },
  methods: {
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
      const { pivot, _moved } = this.data
      this.setData({ pivot }) // * 滑动结束后手动归位
      // ! 误触直接退出
      if (_moved === -1 || !audioStore.currentSongInfo) return

      const distance = pivot / 2 // * 可移动距离
      const limit = distance * 3 / 4 // * 触发的阈值
      const next = distance + limit // * 下一首
      const pre = distance - limit // * 上一首
      console.log({ _moved, pivot, distance, limit, next, pre })

      if (_moved > next) {
        console.log('next: ')
        audioStore.setNextSong()
      } else if (_moved < pre) {
        console.log('pre: ')
        audioStore.setPreSong()
      }
    }
  }
})
