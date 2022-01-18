// 《首页请求模块》
// 加载 request 模块
import { request } from '@/utils'

// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }
// 静默登录
export const silenceLogin = () => {
  return request({
    method: 'GET',
    url: '/currencyLogin/login?REALUSERNAME=广州睿颢软件技术有限公司',
    // data 用来设置 POST 请求体
    // data, // data: data
  })
}
// 获取常见问题
export const getComProblem = () => {
  // !!! 在 request.js 里面统一设置了 token 。这里不用单独设置
  // 取到本地存储中的用户信息 getItem
  // 再还原成 JSON格式，就可用点方法调用
  // const user = JSON.parse(window.localStorage.getItem('user'))

  return request({
    method: 'GET',
    url: '/search/queryCarRentalComProblem',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值一般看接口的要求
    //   // 如以下
    //   // 属性名： Authorization
    //   // 属性值：'Bearer空格token数据'  （这里为测试，暂时写死）
    //   // `Bearer ${user.token}`  反引号里面${}  ES6里面的字符串拼接
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

// 获取轮播图广告图片
export const getAdImages = () => {
  return request({
    method: 'GET',
    url: '/search/queryCarRentalADImg',
  })
}

// 获取联系我们的信息
export const getContactUs = () => {
  return request({
    method: 'GET',
    url: '/search/queryCarRentalContactUs',
  })
}
// export const updateUser = () => {

// }
