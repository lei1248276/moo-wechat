Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'shared'
  },
  properties: {
    title: {
      type: String
    },
    titleSlot: {
      type: Boolean,
      value: false
    },
    icon: {
      type: String,
      value: 'icon-arrow'
    },
    iconSlot: {
      type: Boolean,
      value: false
    },
    url: {
      type: String
    }
  },
  data: {

  },
  methods: {
    onSubtitle() {
      this.triggerEvent('click')
      this.data.url && wx.navigateTo({ url: this.data.url })
    }
  }
})
