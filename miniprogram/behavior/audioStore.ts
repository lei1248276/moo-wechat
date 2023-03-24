import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { audioStore } from '@/store/audio'

export const audioStoreBehavior = BehaviorWithStore({
  storeBindings: [{
    namespace: 'audioStore',
    store: audioStore,
    fields: ['currentSongInfo', 'isPlay', 'duration'],
    actions: []
  }]
})
