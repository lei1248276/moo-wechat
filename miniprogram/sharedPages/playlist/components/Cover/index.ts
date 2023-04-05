import { Playlist } from '@/api/interface/Playlist'
import { cacheStore } from '@/store/index'
import Toast from '@/utils/toast'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    image: {
      type: String
    },
    description: {
      type: String
    },
    playlistId: {
      type: Number
    }
  },
  data: {
    isCollect: false
  },
  lifetimes: {
    attached() {
      if (cacheStore.collectPlaylist.some(v => v.id === this.data.playlistId)) {
        this.setData({ isCollect: true })
      }
    }
  },
  methods: {
    onCollect() {
      const { isCollect } = this.data
      const page = getCurrentPages().pop()
      const playlist = page!.data.playlist as Playlist

      if (isCollect) {
        cacheStore.deleteCollectPlaylist(playlist)
        Toast.success('已删除歌单')
      } else {
        cacheStore.setCollectPlaylist(playlist)
        Toast.success('添加成功')
      }

      this.setData({ isCollect: !isCollect })
    }
  }
})
