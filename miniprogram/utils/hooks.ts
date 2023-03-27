// * 回调hook收集器（**因为官方的InnerAudioContext().off 等回调方法都有BUG**）
export default class Hooks<T extends Function> {
  set: Set<T>

  constructor() {
    this.set = new Set<T>()
  }

  get length() {
    return this.set.size
  }

  on(callback: T) {
    this.set.add(callback)
  }

  emit() {
    this.length && this.set.forEach((callback: T) => {
      try {
        callback()
      } catch (err) {
        console.error(err)
        this.off(callback)
      }
    })
  }

  off(callback: T) {
    return this.set.delete(callback)
  }

  has(callback: T) {
    return this.set.has(callback)
  }

  clear() {
    this.set.clear()
  }
}
