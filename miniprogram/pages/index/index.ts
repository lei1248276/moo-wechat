Page({
  data: {
    currentPage: 0
  },
  onSwiper(page: WechatMiniprogram.SwiperChange) {
    this.setData({ currentPage: page.detail.current })
  }
})
