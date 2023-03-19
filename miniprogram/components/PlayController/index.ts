Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    isPlay: false,
    pivot: (450 / 2) - (130 / 2), // * 中心点

    _moved: 0 // * 最终滑动的距离
  },
  lifetimes: {
    attached() {

    }
  },
  methods: {
    onPlay() {
      this.setData({ isPlay: !this.data.isPlay })
    },
    onMoveChange({ detail: { x, source }}: WechatMiniprogram.MovableViewChange) {
      if (!source) return
      this.data._moved = x
    },
    onMoveEnd() {
      const { pivot, _moved } = this.data
      this.setData({ pivot }) // * 滑动结束后手动归位

      const distance = pivot / 2 // * 可移动距离
      const limit = distance * 3 / 4 // * 触发的阈值
      console.log({ _moved, pivot, distance, limit, next: distance + limit, pre: distance - limit })

      if (_moved > distance + limit) {
        console.log('next: ')
        return
      } else if (_moved < distance - limit) {
        console.log('pre: ')
        return
      }
    }
  }
})
