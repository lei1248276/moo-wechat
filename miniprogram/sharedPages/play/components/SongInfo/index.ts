import { audioStore } from '@/store/audio'
import Toast from '@/utils/toast'

Component({
  options: {
    styleIsolation: 'shared'
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
    },
    isCollect: {
      type: Boolean
    }
  },
  data: {

  },
  methods: {
    onMenu() {
      this.triggerEvent('menu')
    },
    onCollect() {
      const { isCollect, songId } = this.data

      if (isCollect) {
        audioStore.deleteCollectSong(songId) && Toast.success('歌曲已删除')
      } else {
        Toast.success('添加成功')
        audioStore.setCollectSong(audioStore.currentSongInfo!.song)
      }

      this.setData({ isCollect: !isCollect })
    }
  }
})
