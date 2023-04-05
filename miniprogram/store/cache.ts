import { action, observable } from 'mobx-miniprogram'
import { Song } from '@/api/interface/Song'
import { Playlist } from '@/api/interface/Playlist'

export const cacheStore = observable({
  historyPlays: observable.array([] as Song[], { deep: false }),
  collectSongs: observable.array([] as Song[], { deep: false }),
  collectPlaylist: observable.array([] as Playlist[], { deep: false }),

  setHistoryPlay: action(function(song: Song) {
    cacheStore.historyPlays.unshift(song)
  }),
  setCollectSong: action(function(song: Song | Song[]) {
    Array.isArray(song)
      ? cacheStore.collectSongs.replace(song)
      : cacheStore.collectSongs.unshift(song)
  }),
  setCollectPlaylist: action(function(playlist: Playlist | Playlist[]) {
    Array.isArray(playlist)
      ? cacheStore.collectPlaylist.replace(playlist)
      : cacheStore.collectPlaylist.unshift(playlist)
  }),

  deleteCollectSong: action(function(song: Song) {
    cacheStore.collectSongs.remove(song)
  }),
  deleteCollectPlaylist: action(function(playlist: Playlist) {
    cacheStore.collectPlaylist.remove(playlist)
  })
}, undefined, { deep: false })
