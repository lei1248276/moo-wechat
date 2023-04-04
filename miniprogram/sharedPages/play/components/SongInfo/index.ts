import { audioStore } from '@/store/audio'
import Toast from '@/utils/toast'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    tags: {
      type: Array
    },
    name: {
      type: String
    },
    singers: {
      type: Array
    },
    songId: {
      type: Number
    }
  },
  data: {
    isCollect: false
  },
  lifetimes: {
    attached() {
      if (audioStore.collectSongs.some(v => v.id === this.data.songId)) {
        this.setData({ isCollect: true })
      }
    }
  },
  methods: {
    onMenu() {
      this.triggerEvent('menu')
    },
    onCollect() {
      const { isCollect } = this.data
      const song = audioStore.currentSongInfo!.song

      if (isCollect) {
        audioStore.deleteCollectSong(song)
        Toast.success('歌曲已删除')
      } else {
        audioStore.setCollectSong(song)
        Toast.success('添加成功')
      }

      this.setData({ isCollect: !isCollect })
    }
  }
})
