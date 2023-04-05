import { audioStore } from '@/store/index'
import { Playlist } from '@/api/interface/Playlist'
import { Song } from '@/api/interface/Song'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

interface Props {
  playlist: Playlist
  songs: Song[]
}

const audioStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: audioStore,
    fields: ['currentSongInfo', 'isPlay'],
    actions: []
  }
})

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
