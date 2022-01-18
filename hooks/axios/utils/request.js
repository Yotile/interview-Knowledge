// 基于axios封装的请求模块

import axios from 'axios'
import JSONBig from 'json-bigint'

import { BASE_URL_API } from '@/global/config'

// 创建一个 axios 实例 , 说白了就是复制一个 axios
// 我们通过这个实例去发请求,把需要的配置 配置给这个实例来处理
const request = axios.create({
  baseURL: BASE_URL_API, // 请求的基础路径
  withCredentials: true, // 跨域请求时是否需要使用凭证
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据(未经处理的 JSON格式字符串)
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data

      // 后端返回的数据可能不是 JSON格式字符串
      // 如果不是的话,那么 JSONBig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常,处理异常的发生
      try {
        // 如果转换成功,则直接把结果返回
        return JSONBig.parse(data) // 需要使用就 toString()
      } catch (error) {
        // 如果转换失败了,则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }

      // axios 默认在内部使用 JSON.parse来转换处理原始数据
      // return JSON.parse(data)
    },
  ],
})

// const requestHello = axios.create({
//   baseURL: 'http://120.78.198.167:8080' // 请求的基础路径
// })
// 请求拦截器
request.interceptors.request.use(
  // 所以请求都会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    // console.log('来了个请求', config)

    // 然后我们就可以在允许请求出去之前定制统一业务功能处理
    // 例如：统一的设置 token

    // 取到本地存储中的用户信息 getItem
    // 再还原成 JSON格式，就可用点方法调用
    // const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录用户信息（不为空），则统一设置 token

    // 属性名和值一般看接口的要求
    // 如以下
    // 属性名： Authorization
    // 属性值：'Bearer空格token数据'  （这里为测试，暂时写死）
    // `Bearer ${user.token}`  反引号里面${}  ES6里面的字符串拼接

    // if (user) {
    //   config.headers.Authorization = `Bearer ${user.token}`
    // }
    // 当这里 return config 之后，请求才会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器

// 导出请求方法
export default request

// 谁要用,谁就加载 request 模块
// import request from 'request.js'
// request.xx
// request({
//   methods:'',
//   url: ''
// })
