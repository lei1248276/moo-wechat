import SimpleAxios from 'simple-axios-wechat'
import toast from './toast'

const simpleAxios = SimpleAxios.create({
  baseURL: 'https://netease-music-api.fe-mm.com'
})

simpleAxios.interceptors.request.use(
  (config) => {
    console.log('%c🚀 ~ method: request ~', 'color: #F25F5C;font-weight: bold;', config)
    toast.start()
    return config
  }, (err) => {
    toast.fail()
    return Promise.reject(err)
  })

simpleAxios.interceptors.response.use(
  (response) => {
    const { data, statusCode, errMsg } = response
    console.log('%c🚀 ~ method: response ~', 'color: #F25F5C;font-weight: bold;', response)
    if (statusCode !== 200 || (data as Record<string, any>)?.code !== 200) {
      toast.fail()
      return Promise.reject(new Error(errMsg))
    }

    toast.close()
    return data
  }, (err) => {
    toast.fail()
    return Promise.reject(err)
  })

export default simpleAxios
