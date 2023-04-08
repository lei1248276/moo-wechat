import { audioStore } from '@/store/index'
import { getLyric } from '@/api/play'
import { reaction } from 'mobx-miniprogram'

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
    lyrics: [] as string[],

    _disposer: () => {}
  },
  lifetimes: {
    async attached() {
      const lyricMatches = await this.fetchLyric()
      if (!lyricMatches) return

      this.data._disposer = reaction(
        () => audioStore.currentTime,
        (currentTime) => {
          const lyrics = lyricMatches
            .map(matches => this.matchLyric(matches, currentTime))
            .filter(v => typeof v === 'string')

          lyrics.length && this.setData({ lyrics: lyrics as string[] })
        }
      )
    },
    detached() {
      this.data._disposer()
    }
  },
  methods: {
    matchLyric(matches: Matches[], currentTime: number) {
      if (!matches[0] || matches[0].time > currentTime) return

      // * 避免重复setData（针对播放中进入场景）
      while (matches[1]) {
        if (matches[1].time < currentTime) {
          matches.shift()
          continue
        }
        break
      }

      return matches.shift()!.lyric
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
    async fetchLyric(): Promise<Array<Matches[]> | null> {
      const { lrc, tlyric, needDesc } = await getLyric(this.data.songId)
      console.log('%c🚀 ~ method: fetchLyric ~', 'color: #F25F5C;font-weight: bold;', lrc, tlyric)

      if (!lrc.lyric) {
        return null
      } else if (needDesc) { // * 纯音乐（直接显示描述）
        this.setData({ lyrics: this.transLyric(lrc.lyric).map(({ lyric }) => lyric) })
        return null
      } else {
        return tlyric && tlyric.lyric
          ? [this.transLyric(lrc.lyric), this.transLyric(tlyric.lyric)]
          : [this.transLyric(lrc.lyric)]
      }
    }
  }
})
