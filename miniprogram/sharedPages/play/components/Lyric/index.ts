import { audioStore } from '@/store/audio'
import { getLyric } from '@/api/play'

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

    _matches: [] as { time: number, lyric: string }[]
  },
  observers: {
    async songId() {
      audioStore.audio.offTimeUpdate()
      await this.fetchLyric()

      const audio = audioStore.audio
      const _matches = this.data._matches
      let index = 0
      audio.onTimeUpdate(() => {
        while (index < _matches.length) {
          if (_matches[index].time > audio.currentTime) return

          // * 避免重复setData
          if (_matches[index + 1] && _matches[index + 1].time < audio.currentTime) {
            index++
            continue
          }

          this.setData({ lyric: _matches[index++].lyric })
        }
      })
    }
  },
  lifetimes: {
    detached() {
      audioStore.audio.offTimeUpdate()
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
