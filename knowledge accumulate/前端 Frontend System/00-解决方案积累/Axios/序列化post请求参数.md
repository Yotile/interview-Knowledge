## 1. 安装
```shell
npm i qs --save
```

## 2. 在axios请求拦截器中使用
```js
import qs from 'qs' //引入qs模块，用于序列化post请求参数

// request interceptor 请求拦截器
service.interceptors.request.use(
	(config)=>{
		// 设置请求头 发送的数据是x-www-form-urlencoded 格式
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // qs.stringify(object, [options]) 字符串化时，默认情况下，qs 对输出进行 URI 编码，以避免某些特殊字符对某些接口的调用造成请求失败。
        //encode: false 禁用encode编码
        config.data = qs.stringify(config.data, { encode: false })

		return config
	}
)

```