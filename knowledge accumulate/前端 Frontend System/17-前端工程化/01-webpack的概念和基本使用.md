概念：webpack 是**前端项目工程化的具体解决方案**。  
主要功能：它提供了友好的**前端模块化开发**支持，以及**代码压缩混淆**、**处理浏览器端 JavaScript 的兼容性**、**性能优化**等强大的功能。

# 一、安装

```shell
npm install webpack@5.42.1 webpack-cli@4.7.2 -D
-S 是--save 的简写
-D 是--save-dev 的简写
# yarn
yarn add webpack@5.42.1 webpack-cli@4.7.2 --dev
```

# 二、基本使用

## 1. 在项目中配置 webpack

1. 在项目根目录中，创建名为 **webpack.config.js** 的 webpack 配置文件，并初始化如下的基本配置：

    ```js
    module.exports = {
        mode: 'development'  // mode 用来指定构建模式。可选值有 development 和 production
    }
    ```
2. 在 package.json 的 scripts 节点下，新增 **dev 脚本**如下：

    ```json
    "scripts": {
        "dev": "webpack"  // scripts 节点下的脚本，可以通过 npm run 执行，例如 npm run dev
    }
    ```

## 2. webpack 中的默认约定

　　在 webpack 4.x 和 5.x 的版本中，有如下的默认约定：  
① 默认的打包入口文件为 `src -> index.js`

　　② 默认的输出文件路径为 `dist -> main.js`

　　注意：可以在 webpack.config.js 中修改打包的默认约定

　　

## 3. 自定义打包的入口与出口

　　  
在 webpack.config.js 配置文件中，通过 ==entry 节点==指定**打包的入口**。通过 ==output 节点==指定**打包的出口**。  
示例代码如下：

```js
const path = require('path') // 导入node.js 中专门操作路径的模块

module.exports = {
    entry: path.join(__dirname, './src/index.js'), // 打包入口文件的路径
    output: {
    path: path.join(__dirname, './dist'), // 输出文件的存放路径
    filename: 'bundle.js' // 输出文件的名称 
   }
```

　　
