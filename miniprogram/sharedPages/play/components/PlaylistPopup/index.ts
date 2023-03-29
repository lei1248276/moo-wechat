Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    song: {
      type: Object,
      value: {}
    },
    songs: {
      type: Array,
      value: []
    },
    playlist: {
      type: Object,
      value: {}
    }
  },
  data: {
    isShowed: false
  },
  methods: {
    onPlaylist() {
      this.triggerEvent('change')
    },
    onClose() {
      this.triggerEvent('close')
    },
    onShowed() {
      this.setData({ isShowed: true })
    },
    onHidden() {
      this.setData({ isShowed: false })
    }
  }
})
