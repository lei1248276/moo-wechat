import { audioStore } from '@/store/audio'
import { sleep } from '@/utils/util'
import Toast from '@/utils/toast'

App({
  onLaunch() {
    const { audio } = audioStore
    audio.autoplay = true

    audio.onCanplay(async() => {
      // ! BUG：audio.duration需要多次获取，默认定时获取"3次duration"
      // ! https://developers.weixin.qq.com/community/develop/doc/0000cee069c3883778aa183a051400?highLine=InnerAudioContext%2520duration
      console.log('%c🚀 ~ method: onCanplay ~', 'color: #F25F5C;font-weight: bold;', audio.duration)
      await sleep(333)
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

    /* audio.onTimeUpdate(() => {

    })*/

    audio.onError((err) => {
      Toast.fail('链接无效')
      console.error(err)
    })
  }
})
