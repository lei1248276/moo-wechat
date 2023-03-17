Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    playlist: {
      type: Array,
      value: []
    }
  },
  data: {
    run: false
  },
  methods: {
    onSong() {
      this.setData({ run: !this.data.run })
    }
  }
})
