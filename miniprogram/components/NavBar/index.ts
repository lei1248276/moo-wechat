Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    title: {
      type: String,
      value: 'MOO'
    },
    leftArrow: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    toBack() {
      wx.navigateBack()
    }
  }
})
