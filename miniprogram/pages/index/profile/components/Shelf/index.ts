Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    list: {
      type: Array
    },
    description: {
      type: String
    },
    count: {
      type: Number
    },
    icon: {
      type: String,
      value: 'playlist'
    },
    url: {
      type: String
    }
  },
  data: {

  },
  methods: {
    toNavigate() {
      if (this.data.url) {
        wx.navigateTo({
          url: this.data.url,
          fail(err) { console.error(err) }
        })
      }
    }
  }
})
