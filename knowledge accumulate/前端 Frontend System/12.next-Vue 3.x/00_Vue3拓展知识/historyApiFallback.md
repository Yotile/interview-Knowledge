historyApiFallback 是开发中一个非常常见的属性，它主要的作用是解决 SPA 页面在路由跳转之后，进行页面刷新时，返回 404 的错误。

　　boolean 值：默认是 false

* 如果设置为 true，那么在刷新时，返回 404 错误时，会自动返回 index.html 的内容；

　　object 类型的值，可以配置 rewrites 属性：

* 可以配置 from 来匹配路径，决定要跳转到哪一个页面；

　　事实上 devServer 中实现 historyApiFallback 功能是通过 connect-history-api-fallback 库的：

* 可以查看 [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) 文档

　　![image.png](image-20211208112939-u57wciq.png)
