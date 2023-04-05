import type { Songlist } from '@/api/interface/Songlist'
import type { Playlist } from '@/api/interface/Playlist'
import type { Song } from '@/api/interface/Song'
import { getSongs, getPlaylist } from '@/api/playlist'
import { debounce, spreadArray } from '@/utils/util'

Page({
  data: {
    title: '',
    playlist: {} as Playlist,
    songs: [] as Song[],
    isCollect: false
  },
  async onLoad() {
    const opener = this.getOpenerEventChannel()
    opener.on('acceptSonglist', async(songlist: Songlist) => {
      console.log('%c🚀 ~ method: acceptSonglist ~', 'color: #F25F5C;font-weight: bold;', songlist)
      this.setData({ title: songlist.name })

      // *（tracks === songs）歌单歌曲列表，每个歌单会额外携带前20首歌曲
      // ! 歌单播放列表有可能为null，需要重新请求歌单
      if (!songlist.tracks) {
        const playlist = await this.fetchPlaylist(songlist.id)
        const songs = playlist.tracks
        this.setData({ playlist, songs })
        return
      }

      // ! songlist少了一些playlist属性，不过暂时用不到，所以断言逃逸掉（避免多发一次请求）
      this.setData({ playlist: songlist as Playlist, songs: songlist.tracks })
    })

    opener.on('acceptPlaylist', (playlist: Playlist) => {
      console.log('%c🚀 ~ method: acceptPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlist)
      const { name: title, tracks: songs } = playlist
      this.setData({ playlist, songs, title })
    })
  },
  onScrollMore: debounce(async function(this: any) {
    const { playlist: { trackCount }, songs } = this.data
    if (songs.length >= trackCount) return

    await this.fetchSongs()
  }, 1000, true),
  async fetchSongs() {
    const { playlist: { trackIds }, songs } = this.data

    const offset = songs.length
    const _trackIds = trackIds.slice(offset, offset + 20)
    const ids = _trackIds.reduce((acc, cur) => (acc += cur.id + ','), '')
    const { songs: newSongs = [] } = await getSongs(ids.slice(0, -1))
    console.log('%c🚀 ~ method: onScrollMore ~', 'color: #F25F5C;font-weight: bold;', newSongs)

    this.setData(spreadArray(newSongs, songs, 'songs'))
  },
  async fetchPlaylist(id: number): Promise<Playlist> {
    const { playlist } = await getPlaylist(id)
    console.log('%c🚀 ~ method: fetchPlaylist ~', 'color: #F25F5C;font-weight: bold;', playlist)
    this.setData({ playlist })

    return playlist
  }
})
