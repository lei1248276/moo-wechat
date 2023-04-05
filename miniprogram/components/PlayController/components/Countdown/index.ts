import { audioStore } from '@/store/audio'
import { reaction } from 'mobx-miniprogram'

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
    seconds: '00'
  },
  pageLifetimes: {
    show() {
      this.disposer = reaction(
        () => audioStore.currentTime,
        (time) => {
          if (!audioStore.duration) return

          time = audioStore.duration - time
          let minute = Math.floor(time / 60) + ''
          let seconds = time % 60 + ''
          minute.length === 1 && (minute = '0' + minute)
          seconds.length === 1 && (seconds = '0' + seconds)
          // console.log({ time, minute, seconds })

          this.setData({ minute, seconds })
        }
      )
    },
    hide() {
      this.disposer()
    }
  },
  lifetimes: {
    detached() {
      this.disposer()
    }
  }
})
