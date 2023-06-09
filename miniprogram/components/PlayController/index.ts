import { audioStore } from '@/store/index'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

const audioStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: audioStore,
    fields: ['isPlay'],
    actions: ['toggle']
  }
})

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  behaviors: [audioStoreBehavior],
  data: {
    pivot: (450 / 2) - (130 / 2), // * 中心点
    isShowPlay: false, // * 控制play播放页面的显示

    _moved: -1 // * 最终滑动的距离
  },
  methods: {
    onHidePlay() {
      this.setData({ isShowPlay: false })
    },
    onShowPlay() {
      audioStore.currentSongInfo && this.setData({ isShowPlay: true })
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
      // console.log({ moved, pivot, distance, limit, next, pre })

      if (moved > next) {
        audioStore.setNextSong()
      } else if (moved < pre) {
        audioStore.setPreSong()
      }
    }
  }
})
