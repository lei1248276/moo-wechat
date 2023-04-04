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
  previousHooks: new Hooks(), // * 监听播放上一首的事件回调
  nextHooks: new Hooks(), // * 监听播放下一首的事件回调
  audio: wx.createInnerAudioContext(),
  isPlay: false,
  duration: 0,
  currentTime: 0,

  playlist: undefined as undefined | Playlist,
  songs: undefined as undefined | Song[],
  currentSongIndex: -1,
  currentSongInfo: undefined as undefined | SongInfo,

  historyPlays: observable.array([] as Song[], { deep: false }),
  collectSongs: observable.array([] as Song[], { deep: false }),
  collectPlaylist: observable.array([] as Playlist[], { deep: false }),

  setIsPlay: action(function(isPlay: boolean) {
    audioStore.isPlay = isPlay
  }),
  setDuration: action(function(time: number) {
    // * 因为音源问题duration可能相同，值相同会导致倒计时不会刷新
    audioStore.duration = time === audioStore.duration ? time + Math.random() : time
  }),
  setCurrentTime: action(function(time: number) {
    audioStore.currentTime = time
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
  setCollectSong: action(function(song: Song) {
    audioStore.collectSongs.unshift(song)
  }),
  deleteCollectSong: action(function(song: Song) {
    audioStore.collectSongs.remove(song)
  }),
  setCollectPlaylist: action(function(playlist: Playlist) {
    audioStore.collectPlaylist.unshift(playlist)
  }),
  deleteCollectPlaylist: action(function(playlist: Playlist) {
    audioStore.collectPlaylist.remove(playlist)
  }),

  toggle() {
    if (!audioStore.currentSongInfo) return

    audioStore.isPlay ? audioStore.audio.pause() : audioStore.audio.play()
  }
}, undefined, { deep: false })
