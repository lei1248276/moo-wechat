import Toast from '@vant/weapp/toast/toast'

const toast = {
  state: {
    isFail: false,
    count: 0
  },
  start(message?: string): number | void {
    if (this.state.count === 0) return ++this.state.count

    Toast.loading({
      duration: 0,
      message: message || '加载中...',
      forbidClick: true
    })
    ++this.state.count
  },
  close(): number | void {
    if (this.state.count > 1) return --this.state.count

    Toast.clear()
    --this.state.count
  },
  success(message: string, callback?: () => void) {
    Toast.success({
      type: 'success',
      message,
      duration: 1000,
      onClose: () => {
        callback && callback()
      }
    })
  },
  fail(message?: string, callback?: () => void) {
    this.state.count = 0

    Toast.fail({
      type: 'fail',
      message: message || '请求失败',
      duration: 2000,
      onClose: () => {
        callback && callback()
      }
    })
  },
  loading() {
    this.state.count = 0

    Toast.loading({
      message: '加载中...',
      duration: 1000,
      forbidClick: true
    })
  }
}

export default toast
