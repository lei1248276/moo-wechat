/**
 * @Date 2022-06-14 14:24:39
 * @description 展开数组以指定索引位"添加/替换"（用于setData"添加/替换"数组新元素）
 * @param { Array<Object> } newArr
 * @param { Array<Object> } oldArr
 * @param { String } oldArrName
 * @return Object
**/
export function spreadArray(newArr: any[], oldArr: any[], oldArrName: string) {
  if (oldArr.length === 0) return { [oldArrName]: newArr }

  const oldLen = oldArr.length
  return newArr.reduce((acc, cur, index) => {
    acc[`${oldArrName}[${oldLen + index}]`] = cur
    return acc
  }, {})
}
