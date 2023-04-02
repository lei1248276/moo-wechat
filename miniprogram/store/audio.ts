import { observable, action } from 'mobx-miniprogram'
import { Playlist } from '@/api/interface/Playlist'
import { Song } from '@/api/interface/Song'
import { SongUrl } from '@/api/interface/SongUrl'
import { getSongUrl } from '@/api/play'
import Toast from '@/utils/toast'
import Hooks from '@/utils/hooks'

interface SongInfo {
  song: Song
  urlInfo: SongUrl
}

export const audioStore = observable({
  audio: wx.createInnerAudioContext(),
  isPlay: false,
  duration: 0,

  playlist: undefined as undefined | Playlist,
  songs: undefined as undefined | Song[],
  currentSongIndex: -1,
  currentSongInfo: undefined as undefined | SongInfo,

  historyPlays: [] as Song[],
  collectSongs: [] as Song[],
  collectPlaylist: [] as Playlist[],

  previousHooks: new Hooks(), // * 监听播放上一首的事件回调
  nextHooks: new Hooks(), // * 监听播放下一首的事件回调

  setIsPlay: action(function(isPlay: boolean) {
    audioStore.isPlay = isPlay
  }),
  setDuration: action(function(time: number) {
    // * 因为音源问题duration可能相同，值相同会导致倒计时不会刷新
    audioStore.duration = time === audioStore.duration ? time + Math.random() : time
  }),
  setPlaylist: action(function(playlist: Playlist) {
    audioStore.playlist = playlist
  }),
  setSongs: action(function(songs: Song[]) {
    audioStore.songs = songs
  }),

  setPreSong: action(function() {
    if (!audioStore.songs) return

    const last = audioStore.songs.length - 1
    const currentIndex = audioStore.currentSongIndex
    const preIndex = currentIndex === 0 ? last : currentIndex - 1
    audioStore.setCurrentSong(audioStore.songs[preIndex], preIndex)
    audioStore.previousHooks.emit()
  }),
  setNextSong: action(function() {
    if (!audioStore.songs) return

    const last = audioStore.songs.length - 1
    const currentIndex = audioStore.currentSongIndex
    const nextIndex = currentIndex === last ? 0 : currentIndex + 1
    audioStore.setCurrentSong(audioStore.songs[nextIndex], nextIndex)
    audioStore.nextHooks.emit()
  }),
  setCurrentSong: action(async function(song: Song, songIndex: number) {
    if (audioStore.currentSongInfo && audioStore.currentSongInfo.song.id === song.id) {
      return (audioStore.audio.seek(0), audioStore.audio.play())
    }

    audioStore.currentSongIndex = songIndex
    const { data: [urlInfo] } = await getSongUrl(song.id)
    console.log('%c🚀 ~ method: setCurrentSong ~', 'color: #F25F5C;font-weight: bold;', urlInfo)
    if (!urlInfo.url) {
      Toast.fail('播放地址失效')
      audioStore.audio.stop()
      audioStore.currentSongInfo = undefined
      return
    }

    audioStore.audio.src = urlInfo.url
    audioStore.currentSongInfo = { song, urlInfo }
    audioStore.setHistoryPlay(song)
  }),

  setHistoryPlay: action(function(song: Song) {
    audioStore.historyPlays.unshift(song)
  }),
  setCollectSong: action(function(song: Song | Song[]) {
    Array.isArray(song)
      ? audioStore.collectSongs.unshift(...song)
      : audioStore.collectSongs.unshift(song)
  }),
  deleteCollectSong: action(function(id: number) {
    const index = audioStore.collectSongs.findIndex(v => v.id === id)
    if (index !== -1) {
      audioStore.collectSongs.splice(index, 1)
      return true
    }

    return false
  }),
  setCollectPlaylist: action(function(playlist: Playlist | Playlist[]) {
    Array.isArray(playlist)
      ? audioStore.collectPlaylist.unshift(...playlist)
      : audioStore.collectPlaylist.unshift(playlist)
  }),
  deleteCollectPlaylist: action(function(id: number) {
    const index = audioStore.collectPlaylist.findIndex(v => v.id === id)
    if (index !== -1) {
      audioStore.collectPlaylist.splice(index, 1)
      return true
    }

    return false
  }),

  toggle() {
    if (!audioStore.currentSongInfo) return

    audioStore.isPlay ? audioStore.audio.pause() : audioStore.audio.play()
  }
})
