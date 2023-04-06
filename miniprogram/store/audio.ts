import { observable, action, runInAction } from 'mobx-miniprogram'
import { Playlist } from '@/api/interface/Playlist'
import { Song } from '@/api/interface/Song'
import { SongUrl } from '@/api/interface/SongUrl'
import { getSongUrl } from '@/api/play'
import Toast from '@/utils/toast'
import Hooks from '@/utils/hooks'
import { cacheStore } from '@/store/index'

interface SongInfo {
  song: Song
  urlInfo: SongUrl
}

export const audioStore = observable({
  previousHooks: new Hooks(), // * 监听播放上一首的事件回调
  nextHooks: new Hooks(), // * 监听播放下一首的事件回调
  audio: wx.getBackgroundAudioManager(),
  isPlay: false,
  duration: 0, // * 当前歌曲时长
  currentTime: 0, // * 当前歌曲播放时间

  playlist: null as null | Playlist,
  songs: null as null | Song[],
  currentSongInfo: null as null | SongInfo,
  currentSongIndex: -1,

  setIsPlay: action(function(isPlay: boolean) { audioStore.isPlay = isPlay }),
  setDuration: action(function(time: number) { audioStore.duration = time }),
  setCurrentTime: action(function(time: number) { audioStore.currentTime = time }),

  setPlaylist: action(function(playlist: Playlist) { audioStore.playlist = playlist }),
  setSongs: action(function(songs: Song[]) { audioStore.songs = songs }),

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
      audioStore.currentSongInfo = null
      return
    }

    const songInfo = { song, urlInfo }
    audioStore.setAudioInfo(songInfo)
    runInAction(() => { audioStore.currentSongInfo = songInfo })
    cacheStore.setHistoryPlay(song)
  }),

  setAudioInfo({ song, urlInfo: { url }}: SongInfo) {
    const audio = audioStore.audio
    audio.title = song.name
    audio.epname = song.al.name
    audio.singer = song.ar.reduce((acc, { name }) => (acc += name + '. '), '')
    audio.coverImgUrl = song.al.picUrl
    audio.src = url
  },
  toggle() {
    if (!audioStore.currentSongInfo) return

    audioStore.isPlay ? audioStore.audio.pause() : audioStore.audio.play()
  }
}, undefined, { deep: false })
