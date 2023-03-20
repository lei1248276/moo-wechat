import { getRecommend, getPlaylist } from '@/api/home'
import type { Song } from '@/api/interface/Song'
import type { Playlist } from '@/api/interface/Playlist'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {

  },
  data: {
    newSongs: [] as Song[],
    _playlist: {} as Playlist
  },
  lifetimes: {
    attached() {
      this.fetchNewSong()
    }
  },
  methods: {
    toPlaylist() {
      wx.navigateTo({
        url: `/sharedPages/playlist/index`,
        success: (res) => {
          res.eventChannel.emit('acceptPlaylist', this.data._playlist)
        },
        fail: (err) => { console.error(err) }
      })
    },
    async fetchNewSong() {
      const { result: [{ id }] } = await getRecommend(1)
      const { playlist } = await getPlaylist(id)
      const songs = playlist.tracks ? playlist.tracks.slice(0, 4) : []
      console.log('%c🚀 ~ method: fetchNewSong ~', 'color: #F25F5C;font-weight: bold;', songs)

      this.data._playlist = playlist
      this.setData({ newSongs: songs })
    }
  }
})
