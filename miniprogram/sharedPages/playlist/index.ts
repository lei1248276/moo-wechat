import { Playlist, Song } from '@/api/interface'
import { getSongs, getPlaylist } from '@/api/playlist'
import { spreadArray } from '@/utils/util'
import Toast from '@/utils/toast'

Page({
  data: {
    playlist: {} as Playlist,
    songs: [] as Song[],
    isCollect: false
  },
  async onLoad({ id }) {
    this.getOpenerEventChannel().on('acceptPlaylist', async(playlist: Playlist) => {
      console.log('%c🚀 ~ method: acceptPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlist)
      const { name, id } = playlist
      let { tracks } = playlist
      wx.setNavigationBarTitle({ title: name })

      // ! 歌单有可能为null，需要重新请求歌单
      if (!tracks) {
        playlist = await this.fetchPlaylist(id)
        tracks = playlist.tracks
      }

      this.setData({ playlist, songs: tracks || [] })
    })
    // const { playlist } = await getPlaylist(Number(id))
    // console.log('%c🚀 ~ method: acceptPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlist)
    // wx.setNavigationBarTitle({ title: playlist.name })
    // this.setData({ playlist, songs: playlist.tracks || [] })
  },
  onCollect() {
    this.setData({ isCollect: !this.data.isCollect })
  },
  async onScrollMore() {
    const { playlist: { trackCount }, songs } = this.data
    if (songs.length >= trackCount) return Toast.fail('没有更多了')

    await this.fetchSongs()
  },
  async fetchSongs() {
    const { playlist: { trackIds }, songs } = this.data

    const offset = songs.length
    const _trackIds = trackIds.slice(offset, offset + 20)
    const ids = _trackIds.reduce((acc, cur) => (acc += cur.id + ','), '')
    const { songs: newSongs = [] } = await getSongs(ids.slice(0, -1))
    console.log('%c🚀 ~ method: onScrollMore ~', 'color: #F25F5C;font-weight: bold;', newSongs)

    this.setData(spreadArray(newSongs, songs, 'songs'))
  },
  async fetchPlaylist(id: number) {
    const { playlist } = await getPlaylist(id)
    console.log('%c🚀 ~ method: fetchPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlist)
    this.setData({ playlist: playlist || [] })

    return playlist
  }
})
