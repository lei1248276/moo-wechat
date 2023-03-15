import Toast from '@vant/weapp/toast/toast'

const toast = {
  state: {
    isFail: false
  },
  start(message?: string) {
    Toast.loading({
      duration: 0,
      message: message || '加载中...',
      forbidClick: true
    })
  },
  close() {
    !this.state.isFail && Toast.clear()
  },
  success(message: string, callback?: Function) {
    Toast.success({
      type: 'success',
      message,
      duration: 1000,
      onClose: () => {
        callback && callback()
      }
    })
  },
  fail(message?: string, callback?: Function) {
    this.state.isFail = true
    setTimeout(() => {
      this.state.isFail = false
      Toast.clear()
    }, 2000)

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
    Toast.loading({
      message: '加载中...',
      duration: 1000,
      forbidClick: true
    })
  }
}

export default toast
