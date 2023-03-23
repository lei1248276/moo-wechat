import { observable, action } from 'mobx-miniprogram'
import { Song } from '@/api/interface/Song'
import { SongUrl } from '@/api/interface/SongUrl'

interface SongInfo {
  song: Song
  urlInfo: SongUrl
}

export interface AudioStore {
  audio: WechatMiniprogram.InnerAudioContext
  songInfo?: SongInfo
  isPlay: boolean

  setSongInfo(songInfo: SongInfo): void
  setIsPlay(isPlay: boolean): void
}

export const audioStore = observable<AudioStore>({
  audio: wx.createInnerAudioContext(),
  songInfo: undefined,
  isPlay: false,

  setSongInfo: action(function(this: AudioStore, songInfo: SongInfo) {
    this.songInfo = songInfo
  }),
  setIsPlay: action(function(this: AudioStore, isPlay: boolean) {
    this.isPlay = isPlay
  })
})
