import { observable, action } from 'mobx-miniprogram'
import { Playlist } from '@/api/interface/Playlist'
import { Song } from '@/api/interface/Song'
import { SongUrl } from '@/api/interface/SongUrl'
import { getSongUrl } from '@/api/play'
import Toast from '@/utils/toast'

interface SongInfo {
  song: Song
  urlInfo: SongUrl
}

export interface AudioStore {
  audio: WechatMiniprogram.InnerAudioContext
  isPlay: boolean
  duration: number

  playlist?: Playlist
  songs?: Song[]
  currentSongIndex: number
  currentSongInfo?: SongInfo

  setPlaylist(playlist: Playlist): void
  setSongs(songs: Song[]): void
  setIsPlay(isPlay: boolean): void
  setDuration(time: number): void

  setPreSong(): void
  setNextSong(): void
  setCurrentSong(song: Song, songIndex: number): void
}

export const audioStore = observable<AudioStore>({
  audio: wx.createInnerAudioContext(),
  playlist: undefined,
  songs: undefined,
  isPlay: false,
  duration: 0,

  currentSongIndex: -1,
  currentSongInfo: undefined,

  setIsPlay: action(function(this: AudioStore, isPlay: boolean) {
    this.isPlay = isPlay
  }),
  setDuration: action(function(this: AudioStore, time: number) {
    // * 因为音源问题duration可能相同，值相同会导致倒计时不会刷新
    this.duration = time === this.duration ? time + Math.random() : time
  }),
  setPlaylist: action(function(this: AudioStore, playlist: Playlist) {
    this.playlist = playlist
  }),
  setSongs: action(function(this: AudioStore, songs: Song[]) {
    this.songs = songs
  }),

  setPreSong: action(function(this: AudioStore) {
    if (!this.songs) return

    const last = this.songs.length - 1
    const currentIndex = this.currentSongIndex
    const preIndex = currentIndex === 0 ? last : currentIndex - 1
    this.setCurrentSong(this.songs[preIndex], preIndex)
  }),
  setNextSong: action(function(this: AudioStore) {
    if (!this.songs) return

    const last = this.songs.length - 1
    const currentIndex = this.currentSongIndex
    const nextIndex = currentIndex === last ? 0 : currentIndex + 1
    this.setCurrentSong(this.songs[nextIndex], nextIndex)
  }),
  setCurrentSong: action(async function(this: AudioStore, song: Song, songIndex: number) {
    if (this.currentSongInfo && song.id === this.currentSongInfo.song.id) {
      return (this.audio.seek(0), this.audio.play())
    }

    this.currentSongIndex = songIndex
    const { data: [urlInfo] } = await getSongUrl(song.id)
    console.log('%c🚀 ~ method: setCurrentSong ~', 'color: #F25F5C;font-weight: bold;', urlInfo)
    if (!urlInfo.url) return Toast.fail('播放地址失效')

    this.audio.src = urlInfo.url
    this.currentSongInfo = { song, urlInfo }
  })
})
