import { audioStore } from '@/store/index'
import { Song } from '@/api/interface/Song'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

const audioStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: audioStore,
    fields: ['isPlay', 'playlist', 'songs', 'currentSongIndex'],
    actions: ['toggle']
  }
})

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  behaviors: [audioStoreBehavior],
  data: {
    currentView: 1, // * 当前显示的view索引
    playView: [] as Song[], // * 播放view对应playlist中的指针
    isShowPlaylist: false
  },
  lifetimes: {
    attached() {
    // * 初始化view
      console.log('%c🚀 ~ method: updateView ~', 'color: #F25F5C;font-weight: bold;', '初始化view')
      this.updateView()

      // * 添加一个监听下一首的回调hook
      audioStore.nextHooks.on(() => {
        const oldView = this.data.currentView
        const currentView = oldView === 2 ? 0 : oldView + 1
        this.updateView(oldView, currentView, true)
        this.setData({ currentView })
      })
    },
    detached() {
      audioStore.nextHooks.clear()
    }
  },
  methods: {
    // * 仅仅为了开发时方便，模拟后退
    onBack() {
      this.triggerEvent('back')
    },
    onShowPlaylist() {
      this.setData({ isShowPlaylist: !this.data.isShowPlaylist })
    },
    onChangeView({ detail: { current: currentView, source }}: WechatMiniprogram.SwiperAnimationFinish) {
      const oldView = this.data.currentView
      if (!source || oldView === currentView) return

      this.updateView(oldView, currentView)
      this.setData({ currentView })
    },
    // ! 更新view：主要依赖2个数组：前进/后退播放页面"playView"和全局歌曲列表"songs"
    // ! passive: 主动滑动切歌/被动播放完毕自动下一曲
    updateView(from?: number, to?: number, passive = false) {
      if (!audioStore.songs) return
      const { songs } = audioStore
      const lastSongIndex = songs.length - 1

      if (from === undefined || to === undefined) {
      // * 初始化：切换"playlist"时创建所有"view"并归位"currentView：1"
        const { currentSongIndex: current } = audioStore
        const top = current === 0 ? lastSongIndex : current - 1
        const bottom = current === lastSongIndex ? 0 : current + 1
        const playView = [songs[top], songs[current], songs[bottom]]

        this.setData({ playView, currentView: 1 })
      } else if (from - to === -1 || from - to === 2) {
      // * 向上滑动进入下一个view（播放下一首），并修改"to"的下一个view
        !passive && audioStore.setNextSong()
        const { currentSongIndex: current } = audioStore
        const nextView = to === 2 ? 0 : to + 1
        const nextViewSong = current === lastSongIndex ? 0 : current + 1

        this.setData({ [`playView[${nextView}]`]: songs[nextViewSong] })
      } else {
      // * 向下滑动进入上一个view（播放上一首），并修改"to"的上一个view
        !passive && audioStore.setPreSong()
        const { currentSongIndex: current } = audioStore
        const preView = to === 0 ? 2 : to - 1
        const preViewSong = current === 0 ? lastSongIndex : current - 1

        this.setData({ [`playView[${preView}]`]: songs[preViewSong] })
      }
    }
  }
})
