import { Playlist } from '@/api/interface/Playlist'
import { audioStore } from '@/store/audio'
import Toast from '@/utils/toast'

Component({
  options: {
    styleIsolation: 'shared'
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
  pageLifetimes: {
    show() {
      if (audioStore.collectPlaylist.some(v => v.id === this.data.playlistId)) {
        this.setData({ isCollect: true })
      }
    }
  },
  methods: {
    onCollect() {
      const { isCollect, playlistId } = this.data

      if (isCollect) {
        audioStore.deleteCollectPlaylist(playlistId) && Toast.success('已删除歌单')
      } else {
        const page = getCurrentPages().pop()
        const playlist = page!.data.playlist as Playlist
        audioStore.setCollectPlaylist(playlist)
        Toast.success('添加成功')
      }

      this.setData({ isCollect: !isCollect })
    }
  }
})
