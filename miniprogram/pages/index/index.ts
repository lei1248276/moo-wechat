Page({
  data: {
    currentPage: 'profile'
  },
  onSwiper({ detail: { currentItemId }}: WechatMiniprogram.SwiperChange) {
    this.setData({ currentPage: currentItemId })
  }
})
