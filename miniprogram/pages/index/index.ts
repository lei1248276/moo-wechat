Page({
  data: {
    currentPage: 'home'
  },
  onSwiper({ detail: { currentItemId }}: WechatMiniprogram.SwiperChange) {
    if (this.data.currentPage === currentItemId) return

    this.setData({ currentPage: currentItemId })
  }
})
