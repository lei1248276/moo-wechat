import { audioStore } from '@/store/index'
import { getLyric } from '@/api/play'
import { autorun } from 'mobx-miniprogram'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    songId: {
      type: Number
    }
  },
  data: {
    lyric: '',

    _matches: [] as { time: number, lyric: string }[],
    _disposer: () => {}
  },
  lifetimes: {
    async attached() {
      await this.fetchLyric()

      const _matches = this.data._matches
      let index = 0
      this.data._disposer = autorun(() => {
        while (index < _matches.length) {
          if (_matches[index].time > audioStore.currentTime) return

          // * 避免重复setData
          if (_matches[index + 1] && _matches[index + 1].time < audioStore.currentTime) {
            index++
            continue
          }

          this.setData({ lyric: _matches[index++].lyric })
        }
      })
    },
    detached() {
      this.data._disposer()
    }
  },
  methods: {
    transLyric(lyric: string) {
      const regex = /\[(\d{2}:\d{2}\.\d{2,})\]([^[]+)/g

      const matches = []
      let match
      while ((match = regex.exec(lyric)) !== null) {
        const [m, s] = match[1].split(':')
        matches.push({
          time: Number(m) * 60 + Number(s),
          lyric: match[2]
        })
      }

      this.data._matches = matches
    },
    async fetchLyric() {
      const { lrc } = await getLyric(this.data.songId)
      console.log('%c🚀 ~ method: fetchLyric ~', 'color: #F25F5C;font-weight: bold;', lrc)
      this.transLyric(lrc.lyric)
    }
  }
})
