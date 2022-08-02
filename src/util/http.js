// 封装ajax

import axios from "axios"
import Vue from "vue"
import { Toast } from "vant"

Vue.use(Toast)
// 1 对于数据请求的封装,把所有axios请求放到一个文件中，导出调用
// function httpForNowplayingList() {
//   return axios({
//     url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=4381834',
//     headers: {
//       'X-Client-Info':
//         '{"a":"3000","ch":"1002","v":"5.2.0","e":"16478277145010066465882113"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }
// function httpForDetail(params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=681100`,
//     headers: {
//       'X-Client-Info':
//         ' {"a":"3000","ch":"1002","v":"5.2.0","e":"16478277145010066465882113","bc":"310100"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }
// export default { httpForDetail, httpForNowplayingList }
// 2 axios-github 创建新实例，把重复部分封装起来
const http = axios.create({
  baseURL: "https://m.maizuo.com",
  timeout: 10000,
  headers: {
    "X-Client-Info":
      ' {"a":"3000","ch":"1002","v":"5.2.0","e":"16478277145010066465882113","bc":"310100"}'
  }
})
// 发请求之前拦截：loading框
// 发请求之后拦截：loading框
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    })
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    Toast.clear()
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default http
