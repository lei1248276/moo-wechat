import { Song } from '@/api/interface'

interface Data {
  run: boolean
}
interface Props {
  song: Song
}

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    song: {
      type: Object,
      value: {}
    }
  },
  data: {
    run: false
  } as Data & Props,
  methods: {
    onSong() {
      this.setData({ run: !this.data.run })
    }
  }
})
