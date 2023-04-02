Page({
  data: {
    currentPage: 'home'
  },
  onSwiper({ detail: { currentItemId }}: WechatMiniprogram.SwiperChange) {
    this.setData({ currentPage: currentItemId })
  }
})
