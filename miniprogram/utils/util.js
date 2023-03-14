/* const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}*/

export function formatDate(date) {
  date = new Date(date)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

/**
 * @Date 2022-06-14 14:24:39
 * @description 展开数组以指定索引位"添加/替换"（用于setData"添加/替换"数组新元素）
 * @param { Array<Object> } newArr
 * @param { Array<Object> } oldArr
 * @param { String } oldArrName
 * @return Object
**/
export function spreadArray(newArr, oldArr, oldArrName) {
  if (oldArr.length === 0) return { [oldArrName]: newArr }

  const oldLen = oldArr.length
  return newArr.reduce((acc, cur, index) => {
    acc[`${oldArrName}[${oldLen + index}]`] = cur
    return acc
  }, {})
}

/**
 * @Date 2022-06-16 09:14:44
 * @description 替换目标对象所有属性（**保留引用**）
 * @param { Object } target
 * @param { Object } sources
 * @return Object
**/
export function replaceObj(target, sources) {
  if (sources === target) return sources

  Object.keys(target).forEach(key => { delete target[key] })
  return Object.assign(target, sources)
}
