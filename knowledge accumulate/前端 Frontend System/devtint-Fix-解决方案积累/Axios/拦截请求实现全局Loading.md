> [(20条消息) Vue - 封装Axios实现全局的loading自动显示效果（结合Element UI）_劰的劰的博客-CSDN博客_axios防抖封装](https://blog.csdn.net/trista_1999/article/details/115911128?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-1-115911128-blog-117920483.t5_layer_targeting_s&spm=1001.2101.3001.4242.2&utm_relevant_index=4)

### 原理
-   基本原理是通过 axios 提供的请求拦截和响应拦截的接口，控制 loading 的显示或者隐藏。同时在请求失败时还会自动弹出消息提示框显示错误信息。
- loding 效果这里采用的是 Element UI 中提供的 Loading 组件来实现。而错误消息提示框则用的是 Element UI 中的 Message 组件来实现
- 内部有个计数器，确保同一时刻如果有多个请求的话，不会同时出现多个 loading，而是只有 1 个。并且在所有请求结束后才会隐藏 loading
- 使用了 lodash 的 debounce 防抖。因为有时会碰到在一次请求完毕后又立刻又发起一个新的请求的情况（比如删除一个表格条目后立刻进行刷新）。这种情况会造成连续 loading 两次，并且中间有一次极短的闪烁。通过防抖可以让 300ms 间隔内的 loading 便合并为一次，避免闪烁的情况。
- 默认所有请求都会自动有 loading 效果。如果某个请求不需要 loading 效果，可以在请求 header 中 showLoading 设置为 false。
- 默认的 loading 效果时全屏的（覆盖在 body 上）。如果某个请求是需要在某个指定元素上显示 loading 效果，可以将请求 header 中 loadingTarget 设置为该元素的选择符。



### 具体实现
```js
/**
* @description: axios封装 - 请求拦截、相应拦截、错误统一处理
* @param {*}
* @return {*}
*/
import axios from 'axios';
import QS from 'qs';
import { Loading, Message } from 'element-ui';
import _ from 'lodash';

// loading对象
let loadingInstance;

// 请求合并只出现一次loading
// 当前正在请求的数量
let loadingRequestCount = 0;

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 请求拦截器
axios.interceptors.request.use(
  config => {
    let loadingTarget = '.app_content';
    if(config.headers.loadingTarget){
      loadingTarget = config.headers.loadingTarget
    }
    if (config.headers.showLoading) {
      let target = document.querySelector(loadingTarget)
      if (target) {
        // 请求拦截进来调用显示loading效果
        showLoading(loadingTarget)
      }
    }
    return config;
  },
  error => Promise.error(error)
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    setTimeout(() => {
      hideLoading()
    }, 200);
    return Promise.resolve(response.data);
  },
  error => {
    Message.error(`请求错误: ${error}`)
    setTimeout(() => {
      hideLoading()
    }, 200);
    if(error.response.status) {
      return Promise.reject(error.response);
    }
  }
);


// 显示loading的函数 并且记录请求次数 ++
const showLoading = (target) => {
  if(loadingRequestCount === 0) {
    loadingInstance = Loading.service({
      lock: true,
      text: '加载中...',
      target: target
    });
  }
  loadingRequestCount++;
}

// 隐藏loading的函数，并且记录请求次数
const hideLoading = () => {
  if(loadingRequestCount <= 0) return;
  loadingRequestCount--;
  if(loadingRequestCount === 0) {
    toHideLoading();
  }
}

// 防抖：将 300ms 间隔内的关闭 loading 便合并为一次. 防止连续请求时, loading闪烁的问题。
var toHideLoading = _.debounce(() => {
  loadingInstance.close();
  loadingInstance = null;
}, 300);

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
export default axios

```

**如果在请求 header 中传递个 loadingTarget:’’ 参数，则该请求会在指定标签上显示 loading 效果**
```js
// 通用
export function requestMain(data, loadFlag) {
  return request({
    url: '/main',
    headers: {
      showLoading: loadFlag === 'unshow' ? false : true,
      loadingTarget: loadFlag !== 'unshow' ? loadFlag : '.app-main'
    },
    method: 'post',
    data
  })
}
```