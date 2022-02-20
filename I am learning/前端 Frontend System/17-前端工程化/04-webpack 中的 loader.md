# 1. loader 概述

　　在实际开发过程中，webpack 默认只能打包处理以.js 后缀名结尾的模块。其他**非 .js 后缀名结尾**的模块，webpack 默认处理不了，**需要调用 loader 加载器才可以正常打包**，否则会报错！

　　  
loader 加载器的作用：**协助 webpack 打包处理特定的文件模块**。比如：

* css-loader 可以打包处理.css 相关的文件
* less-loader 可以打包处理.less 相关的文件
* babel-loader 可以打包处理 webpack 无法处理的高级 JS 语法
