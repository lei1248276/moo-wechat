import SimpleAxios from 'simple-axios-wechat'
import toast from './toast'

const simpleAxios = SimpleAxios.create({
  baseURL: 'https://netease-music-api.fe-mm.com'
})

simpleAxios.interceptors.request.use(
  (config) => {
    // console.log('%c🚀 ~ method: request ~', 'color: #F25F5C;font-weight: bold;', config)
    toast.start()
    return config
  }, (err) => {
    toast.fail()
    return Promise.reject(err)
  })

simpleAxios.interceptors.response.use(
  (response) => {
    // console.log('%c🚀 ~ method: response ~', 'color: #F25F5C;font-weight: bold;', response)
    const { data, statusCode } = response
    if (typeof data === 'string' || data instanceof ArrayBuffer) return (toast.fail(), data)

    if (data.code !== 200 || statusCode !== 200) {
      return (toast.fail(), Promise.reject(new Error(data.message || '请求失败')))
    }

    return (toast.close(), data)
  }, (err) => {
    console.error(err)
    toast.fail()
    return Promise.reject(err)
  })

export default simpleAxios
