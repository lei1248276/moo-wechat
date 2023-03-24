import { audioStore } from '@/store/audio'
import { Playlist } from '@/api/interface/Playlist'

interface Props {
  playlist: Playlist
}

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    playlist: {
      type: Array,
      value: []
    }
  },
  data: <Props>{

  },
  methods: {
    onPlaylist({ mark }: WechatMiniprogram.BaseEvent) {
      const { index } = mark as { index: number }
      const playlist = this.data.playlist

      audioStore.setPlaylist(playlist)
      audioStore.setCurrentSong(playlist[index], index)
    }
  }
})
