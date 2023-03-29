Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    tags: {
      type: Array,
      value: []
    },
    name: {
      type: String,
      value: ''
    },
    singers: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    onCollect() {
      this.triggerEvent('collect')
      console.log('collect')
    },
    onMenu() {
      this.triggerEvent('menu')
      console.log('menu')
    }
  }
})
