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
