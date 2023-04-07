Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    currentPage: {
      type: String,
      value: 'home'
    }
  },
  data: {
    refreshTrigger: false
  },
  methods: {
    async onRefresh() {
      this.setData({ refreshTrigger: true })

      const carousel = this.selectComponent('#carousel')
      const recommend = this.selectComponent('#recommend')
      const newSonglist = this.selectComponent('#new-songlist')
      await Promise.all([carousel.fetchBanner(), recommend.fetchRecommend(), newSonglist.fetchNewSonglist()])

      this.setData({ refreshTrigger: false })
    }
  }
})
