import { audioStore } from '@/store/index'
import { getLyric } from '@/api/play'
import { autorun } from 'mobx-miniprogram'

interface Matches {
  time: number
  lyric: string
}

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
    transLyric: '',

    _lrcMatches: [] as Matches[],
    _transLrcMatches: [] as Matches[],
    _disposer: () => {}
  },
  lifetimes: {
    async attached() {
      await this.fetchLyric()

      const _lrcMatches = this.data._lrcMatches
      const _transLrcMatches = this.data._transLrcMatches
      const lrcIndex = { index: 0 }
      const transLrcIndex = { index: 0 }

      this.data._disposer = autorun(() => {
        const lyric = this.matchLyric(_lrcMatches, lrcIndex, audioStore.currentTime)
        lyric && this.setData({ lyric })

        const transLyric = this.matchLyric(_transLrcMatches, transLrcIndex, audioStore.currentTime)
        transLyric && this.setData({ transLyric })
      })
    },
    detached() {
      this.data._disposer()
    }
  },
  methods: {
    matchLyric(matches: Matches[], matchIndex: {index: number}, currentTime: number) {
      while (matchIndex.index < matches.length) {
        if (matches[matchIndex.index].time > currentTime) return

        // * 避免重复setData
        const nextMatch = matches[matchIndex.index + 1]
        if (nextMatch && nextMatch.time < currentTime) {
          matchIndex.index++
          continue
        }

        return matches[matchIndex.index++].lyric
      }
      return
    },
    transLyric(lyric: string) {
      const regex = /\[(\d{2}:\d{2}\.\d{2,})\]([^[]+)/g

      const matches: Matches[] = []
      let match
      while ((match = regex.exec(lyric)) !== null) {
        const [m, s] = match[1].split(':')
        matches.push({
          time: Number(m) * 60 + Number(s),
          lyric: match[2]
        })
      }

      return matches
    },
    async fetchLyric() {
      const data = await getLyric(this.data.songId)
      console.log('%c🚀 ~ method: fetchLyric ~', 'color: #F25F5C;font-weight: bold;', data)
      this.data._lrcMatches = this.transLyric(data.lrc.lyric)
      this.data._transLrcMatches = this.transLyric(data.tlyric.lyric)
    }
  }
})
