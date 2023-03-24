Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    image: {
      type: String
    },
    description: {
      type: String
    }
  },
  data: {
    isCollect: false
  },
  methods: {
    onCollect() {
      this.setData({ isCollect: !this.data.isCollect })
    }
  }
})
