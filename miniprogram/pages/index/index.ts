Page({
  data: {
    currentPage: 1
  },
  onSwiper(page: WechatMiniprogram.SwiperChange) {
    this.setData({ currentPage: page.detail.current })
  }
})
