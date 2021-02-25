import axios from 'axios'
import { getCookie } from './cookie'
import router from '../router/index'
const baseURL = 'http://www.9nine.site/wechat/api/'
const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000 // 请求超时时间
})
// 添加request 拦截器
service.interceptors.request.use(config => {
  return config
}, err => {
  console.log('请求超时')
  return Promise.reject(err)
})

// 添加response拦截器
service.interceptors.response.use(
  res => {
    if (res.data.code === 403) {
      router.push({
        path: 'login'
      })
    }
    return res.data
  }, err => {
    console.log('response')
    return Promise.reject(err)
  }
)
function get (url, params = {}) {
  return service({
    url,
    method: 'get',
    headers: {
      'wec-access-token': getCookie('token')
    },
    params
  })
}
function post (url, data = {}) {
  const options = {
    url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'wec-access-token': getCookie('token')
    },
    data
  }
  return service(options)
}
export default {
  get,
  post,
  baseURL
}
