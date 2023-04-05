import { audioStore } from '@/store/audio'
import { autorun } from 'mobx-miniprogram'

Component({
  externalClasses: ['custom-class'],
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    customStyle: {
      type: String
    }
  },
  data: {
    minute: '00',
    seconds: '00',

    _disposer: () => {}
  },
  pageLifetimes: {
    show() {
      this.data._disposer = autorun(() => {
        if (!audioStore.duration) return

        const time = Math.floor(audioStore.duration - audioStore.currentTime)
        let minute = Math.floor(time / 60) + ''
        let seconds = time % 60 + ''
        minute.length === 1 && (minute = '0' + minute)
        seconds.length === 1 && (seconds = '0' + seconds)

        if (seconds === this.data.seconds) return
        // console.log({ time, minute, seconds })

        this.setData({ minute, seconds })
      })
    },
    hide() {
      this.data._disposer()
    }
  },
  lifetimes: {
    detached() {
      this.data._disposer()
    }
  }
})
