import type { Song } from '@/api/interface/Song'
import { audioStoreBehavior } from '@/behavior/audioStore'
import { audioStore } from '@/store/audio'
import { getSongUrl } from '@/api/play'
import Toast from '@/utils/toast'

interface Props {
  song: Song
}

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    song: {
      type: Object,
      value: {}
    }
  },
  data: <Props>{
  },
  behaviors: [audioStoreBehavior],
  methods: {
    onSong() {
      const { song } = this.data
      const { audio, songInfo } = audioStore
      console.log('%c🚀 ~ method: onSong ~', 'color: #F25F5C;font-weight: bold;', song.id, songInfo?.song.id, audioStore)

      if (song.id === songInfo?.song.id) {
        return audioStore.isPlay ? audio.pause() : audio.play()
      }

      this.fetchSongInfo(song)
    },
    async fetchSongInfo(song: Song) {
      const { data: [urlInfo] } = await getSongUrl(song.id)
      console.log('%c🚀 ~ method: setSongInfo ~', 'color: #F25F5C;font-weight: bold;', urlInfo)
      if (!urlInfo.url) return Toast.fail('url无效，无法播放')

      audioStore.audio.src = urlInfo.url
      audioStore.setSongInfo({ song, urlInfo })
    }
  }
})
