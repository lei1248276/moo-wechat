import { audioStore } from '@/store/audio'
import { Song } from '@/api/interface/Song'
import Toast from '@/utils/toast'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    tags: {
      type: Array
    },
    song: {
      type: Object
    }
  },
  data: {

  },
  methods: {
    onMenu() {
      this.triggerEvent('menu')
    },
    onCollect() {
      const song = this.data.song
      const isCollect = audioStore.collectSongs.some((v) => v.id === song.id)

      if (isCollect) {
        Toast.fail('歌曲已存在')
      } else {
        Toast.success('添加成功')
        audioStore.setCollectSong(song as Song)
      }
    }
  }
})
