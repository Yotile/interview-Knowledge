# 1. webpack 插件的作用

　　通过安装和配置第三方的插件，可以**拓展 webpack 的能力**，从而让 webpack **用起来更方便**。最常用的 webpack 插件有如下两个：

1. **webpack-dev-server**

    * 类似于 node.js 阶段用到的 nodemon 工具
    * 每当修改了源代码，webpack 会自动进行项目的打包和构建
2. **html-webpack-plugin**

    * webpack 中的 HTML 插件（类似于一个模板引擎插件）
    * 可以通过此插件自定制 index.html 页面的内容

　　

# 2. webpack 插件的使用

## 2.1 安装 webpack-dev-server

```shell
# npm
npm install webpack-dev-server --save-dev 
# npm 指定版本
npm install webpack-dev-server@3.11.2 -D
# yarn
yarn add webpack-dev-server@3.11.2 --dev
```

## 2.2 配置 webpack-dev-server

1. 修改 **package.json** -> **scripts** 中的 **dev** 命令如下：

    ```json
    "scripts"：{
        "dev"："webpack serve"，//script 节点下的脚本，可以通过 npm run 执行
    }
    ```
2. 再次运行 **npm run dev** 命令，重新进行项目的打包
3. 在浏览器中访问 **http://localhost：8080** 地址，查看自动打包效果


    注意：webpack-dev-server 会启动一个**实时打包的 http 服务器**

　　

## 3.1 安装 html-webpack-plugin

　　运行如下的命令，即可在项目中安装此插件：  

```shell
# npm 
npm install html-webpack-plugin@5.3.2 -D
# yarn
yarn add html-webpack-plugin@5.3.2 --dev
```

## 3.2 配置 html-webpack-plugin

```js
// 1. 导入 HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')

// 2. 创建 HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', // 指定原文件的存放路径 
    filename: './index.html', // 指定生成的文件的存放路径
})
module.exports = {
    mode: 'development',
    plugins: [htmlPlugin],// 3. 通过 plugins 节点，使 htmlPlugin 插件生效 
}
```

## 4.devServer 节点

　　在 webpack.config.js 配置文件中，可以通过 **devServer** 节点对 webpack-dev-server 插件进行更多的配置，示例代码如下：  

```js
devServer: {
    open: true, // 初次打包完成后，自动打开浏览器
    host: '127.0.0.1', // 实时打包所使用的主机地址
    port: 80, // 实时打包所使用的端口号
 }
```

　　  
注意：凡是修改了 webpack.config.js 配置文件，或修改了 package.json 配置文件，**必须重启实时打包的服务器**，否则最新的配置文件无法生效！

　　
