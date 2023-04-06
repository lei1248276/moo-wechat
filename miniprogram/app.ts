import { audioStore, cacheStore } from '@/store/index'
import { sleep } from '@/utils/util'
import Toast from '@/utils/toast'

App({
  onLaunch() {
    wx.getStorage({
      key: 'collectSongs',
      success({ data }) { cacheStore.setCollectSong(data) },
      fail(err) { console.error(err) }
    })
    wx.getStorage({
      key: 'collectPlaylist',
      success({ data }) { cacheStore.setCollectPlaylist(data) },
      fail(err) { console.error(err) }
    })

    const audio = audioStore.audio
    audio.onCanplay(async() => {
      // ! BUG：audio.duration需要多次获取，默认定时获取"2次duration"
      // ! https://developers.weixin.qq.com/community/develop/doc/0000cee069c3883778aa183a051400?highLine=InnerAudioContext%2520duration
      console.log('%c🚀 ~ method: onCanplay ~', 'color: #F25F5C;font-weight: bold;', audio.duration)
      await sleep(333)
      console.log('%c🚀 ~ method: onCanplay ~', 'color: #F25F5C;font-weight: bold;', audio.duration)
      await sleep(333)
      audioStore.setDuration(audio.duration)
    })

    audio.onPlay(() => {
      console.log('onPlay: ')
      audioStore.setIsPlay(true)
    })

    audio.onPause(() => {
      console.log('onPause: ')
      audioStore.setIsPlay(false)
    })

    audio.onEnded(() => {
      console.log('onEnded: ')
      audioStore.setNextSong()
    })

    audio.onTimeUpdate(() => {
      audioStore.setCurrentTime(audio.currentTime)
    })

    audio.onNext(() => {
      console.log('onNext: ')
      audioStore.setNextSong()
    })

    audio.onPrev(() => {
      console.log('onPrev: ')
      audioStore.setPreSong()
    })

    audio.onError((err) => {
      Toast.fail('链接无效')
      console.error(err)
    })
  },
  onShow() {
    const audio = audioStore.audio
    // * 因为切后台回调会自动销毁，重新监听（只会存在一个监听）
    audio.onTimeUpdate(() => {
      audioStore.setCurrentTime(audio.currentTime)
    })
  },
  onHide() {
    cacheStore.collectSongs.length && wx.setStorage({
      key: 'collectSongs',
      data: cacheStore.collectSongs.slice(),
      fail(err) { console.error(err) }
    })

    cacheStore.collectPlaylist.length && wx.setStorage({
      key: 'collectPlaylist',
      data: cacheStore.collectPlaylist.slice(),
      fail(err) { console.error(err) }
    })
  }
})
