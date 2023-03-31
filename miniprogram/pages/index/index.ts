Page({
  data: {
    currentPage: 'home'
  },
  onSwiper({ detail: { currentItemId }}: WechatMiniprogram.SwiperAnimationFinish) {
    if (this.data.currentPage === currentItemId) return

    this.setData({ currentPage: currentItemId })
  }
})
