import type { Songlist } from '@/api/interface/Songlist'

interface Props {
  songlist: Songlist[]
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
    onSonglist({ mark }: WechatMiniprogram.BaseEvent) {
      const index = (mark as { index: number }).index
      const Songlist = this.data.songlist[index]

      wx.navigateTo({
        url: `/sharedPages/playlist/index`,
        success: (res) => {
          res.eventChannel.emit('acceptSonglist', Songlist)
        },
        fail: (err) => { console.error(err) }
      })
    }
  }
})
