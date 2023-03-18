export interface Banners {
  bannerBizType: string
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
}

export interface Recommend {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}

export interface Song {
  id: number
  al: {
    name: string
    picUrl: string
  }
  ar: { name: string }[]
}

export interface Playlist {
  coverImgUrl: string
  createTime: number
  updateTime: number
  creator: {
    avatarDetail: { identityIconUrl: string }
    avatarUrl: string
    backgroundUrl: string
    description: string
    detailDescription: string
    expertTags: string[]
    experts: Record<number, string>
    nickname: string
    signature: string
  }
  description: string
  id: number
  name: string
  playCount: number
  subscribedCount: number
  tags: string[]
  trackCount: number
  trackIds: { id: number }[]
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: Song[]
}

export interface Album {
  albumId: number
  albumName: string
  albumType: number
  artistName: string
  coverUrl: string
  price: number
  productId: number
  pubTime: number
}
