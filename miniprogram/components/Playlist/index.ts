import { audioStoreBehavior } from '@/behavior/audioStore'
import { audioStore } from '@/store/audio'
import { Playlist } from '@/api/interface/Playlist'
import { Song } from '@/api/interface/Song'

interface Props {
  playlist: Playlist
  songs: Song[]
}

Component({
  externalClasses: ['custom-class'],
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    playlist: {
      type: Object,
      value: {}
    },
    songs: {
      type: Array,
      value: []
    },
    customStyle: {
      type: String,
      value: ''
    }
  },
  behaviors: [audioStoreBehavior],
  data: <Props>{

  },
  methods: {
    onPlaylist({ mark }: WechatMiniprogram.BaseEvent) {
      const { index } = mark as { index: number }
      const { playlist, songs } = this.data

      if (audioStore.playlist !== playlist) {
        audioStore.setPlaylist(playlist)
      }

      if (audioStore.songs !== songs || audioStore.songs.length !== songs.length) {
        audioStore.setSongs(songs)
      }

      audioStore.setCurrentSong(songs[index], index)
    }
  }
})
