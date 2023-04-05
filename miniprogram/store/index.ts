import { configure } from 'mobx-miniprogram'
export { audioStore } from './audio'
export { cacheStore } from './cache'

configure({ enforceActions: 'observed' })
