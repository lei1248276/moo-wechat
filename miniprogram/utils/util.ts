/**
 * @Date 2022-06-14 14:24:39
 * @description 展开数组以指定索引位"添加/替换"（用于setData"添加/替换"数组新元素）
**/
export function spreadArray<T>(newArr: T[], oldArr: T[], oldArrName: string): Record<string, T> {
  const oldLen = oldArr.length
  return newArr.reduce((acc, cur, index) => {
    acc[`${oldArrName}[${oldLen + index}]`] = cur
    return acc
  }, {} as Record<string, T>)
}

export async function sleep(ms = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function debounce(fn: Function, delay: number, immediate = false) {
  let timer: null | number = null
  let isImmediate = immediate

  if (immediate) {
    return function(this: any, ...arg: any[]) {
      timer && clearTimeout(timer)
      if (isImmediate) { fn.apply(this, arg); isImmediate = false }
      timer = setTimeout(() => { isImmediate = true }, delay)
    }
  }

  return function(this:any, ...arg: any[]) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => { fn.apply(this, arg) }, delay)
  }
}

// * 生成范围随机数
export function rangeRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// * 数组洗牌
export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
