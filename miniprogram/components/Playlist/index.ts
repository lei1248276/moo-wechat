import { audioStore } from '@/store/audio'
import { Playlist } from '@/api/interface/Playlist'
import { Song } from '@/api/interface/Song'

interface Props {
  playlist: Playlist
  songs: Song[]
}

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    playlist: {
      type: Object,
      value: {}
    },
    songs: {
      type: Array,
      value: []
    }
  },
  data: <Props>{

  },
  methods: {
    onPlaylist({ mark }: WechatMiniprogram.BaseEvent) {
      const { index } = mark as { index: number }
      const { playlist, songs } = this.data

      audioStore.setPlaylist(playlist)
      audioStore.setSongs(songs)
      audioStore.setCurrentSong(songs[index], index)
    }
  }
})
