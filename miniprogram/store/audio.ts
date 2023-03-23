import { observable, action } from 'mobx-miniprogram'
import { Song } from '@/api/interface/Song'
import { SongUrl } from '@/api/interface/SongUrl'

interface SongInfo {
  song: Song
  urlInfo: SongUrl
}

export interface AudioStore {
  audio: WechatMiniprogram.InnerAudioContext
  isPlay: boolean
  songInfo?: SongInfo
  duration: number

  setIsPlay(isPlay: boolean): void
  setSongInfo(songInfo: SongInfo): void
  setDuration(time: number): void
}

export const audioStore = observable<AudioStore>({
  audio: wx.createInnerAudioContext(),
  isPlay: false,
  songInfo: undefined,
  duration: 0,

  setIsPlay: action(function(this: AudioStore, isPlay: boolean) {
    this.isPlay = isPlay
  }),
  setSongInfo: action(function(this: AudioStore, songInfo: SongInfo) {
    this.songInfo = songInfo
  }),
  setDuration: action(function(this: AudioStore, time: number) {
    this.duration = time
  })
})
