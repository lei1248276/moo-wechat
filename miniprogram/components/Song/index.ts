import { audioStoreBehavior } from '@/behavior/audioStore'

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
  },
  behaviors: [audioStoreBehavior]
})
