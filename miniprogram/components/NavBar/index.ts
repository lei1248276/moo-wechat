Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    customStyle: {
      type: String
    },
    iconStyle: {
      type: String
    },
    title: {
      type: String,
      value: 'MOO'
    },
    leftArrow: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: Boolean,
      value: true
    }
  },
  data: {

  },
  methods: {
    toBack() {
      wx.navigateBack()
      this.triggerEvent('back')
    }
  }
})
