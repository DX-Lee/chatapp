import axios from 'axios'
import { getCookie } from './cookie'
const baseURL = 'http://localhost:3000/api/'
const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000 // 请求超时时间
})

// 添加response拦截器

service.interceptors.response.use(
  response => {
    if (response.data.code === 100) {
      console.log('code100')
    }
    return response.data
  }
)
function get (url, params = {}) {
  return service({
    url,
    method: 'get',
    headers: {
      'wec-access-token': getCookie('token')
    },
    params: params
  })
}
function post (url, data = {}) {
  const sendObject = {
    url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'wec-access-token': getCookie('token')
    },
    data: data
  }
  return service(sendObject)
}
export default {
  get,
  post,
  baseURL
}
