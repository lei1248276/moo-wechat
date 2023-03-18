import { Playlist } from '@/api/interface'

interface Props {
  songlist: Playlist[]
}

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    songlist: {
      type: Array,
      value: []
    }
  },
  data: {

  } as Props,
  methods: {
    onPlaylist({ mark }: WechatMiniprogram.BaseEvent) {
      const index = (mark as { index: number }).index
      const playlist = this.data.songlist[index]

      wx.navigateTo({
        url: `/sharedPages/playlist/index`,
        success: (res) => {
          res.eventChannel.emit('acceptPlaylist', playlist)
        },
        fail: (err) => { console.error(err) }
      })
    }
  }
})
