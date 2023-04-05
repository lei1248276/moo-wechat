import { audioStore, cacheStore } from '@/store/index'
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
      if (cacheStore.collectSongs.some(v => v.id === this.data.songId)) {
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
        cacheStore.deleteCollectSong(song)
        Toast.success('歌曲已删除')
      } else {
        cacheStore.setCollectSong(song)
        Toast.success('添加成功')
      }

      this.setData({ isCollect: !isCollect })
    }
  }
})
