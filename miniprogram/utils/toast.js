import Toast from '@vant/weapp/toast/toast'

const toast = {
  state: {
    isFail: false
  },
  toastStart(message) {
    Toast.loading({
      duration: 0,
      message: message || '加载中...',
      forbidClick: true
    })
  },
  toastEnd() {
    !this.state.isFail && Toast.clear()
  },
  success(message, callback) {
    Toast.success({
      type: 'success',
      message,
      duration: 1000,
      onClose: () => {
        callback && callback()
      }
    })
  },
  fail(message, callback) {
    this.state.isFail = true
    setTimeout(() => {
      this.state.isFail = false
      Toast.clear()
    }, 2000)

    Toast.fail({
      type: 'fail',
      message,
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
