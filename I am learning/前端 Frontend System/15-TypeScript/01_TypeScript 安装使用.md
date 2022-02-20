## TypeScript 的编译环境

　　在前面我们提到过，TypeScript 最终会被编译成 JavaScript 来运行，所以我们需要搭建对应的环境：

* 我们需要在电脑上安装 TypeScript，这样就可以通过 TypeScript 的 Compiler 将其编译成 JavaScript；
* ![image.png](assets/image-20211208141250-axzbmhh.png)

　　所以，我们需要先可以先进行全局的安装：

```shell
# 安装命令
npm install typescript -g
# 查看版本
tsc --version
```

　　

　　

　　

## TypeScript 的运行环境

　　如果我们每次为了查看 TypeScript 代码的运行效果，都通过经过两个步骤的话就太繁琐了：

* 第一步：通过 tsc 编译 TypeScript 到 JavaScript 代码；

* 第二步：在浏览器或者 Node 环境下运行 JavaScript 代码；

　　是否可以简化这样的步骤呢？

* 比如编写了 TypeScript 之后可以直接运行在浏览器上？

* 比如编写了 TypeScript 之后，直接通过 node 的命令来执行？

　　上面我提到的两种方式，可以通过两个解决方案来完成：

* 方式一：通过 webpack，配置本地的 TypeScript 编译环境和开启一个本地服务，可以直接运行在浏览器上；
* 方式二：通过 ts-node 库，为 TypeScript 的运行提供执行环境；

　　方式一：webpack 配置

* 方式一在之前的 TypeScript 文章中我已经有写过，如果需要可以自行查看对应的文章；

* https://mp.weixin.qq.com/s/wnL1l-ERjTDykWM76l4Ajw；

　　

　　方式二：安装 ts-node

* `npm install ts-node -g`


　　另外 ts-node 需要依赖 tslib 和 @types/node 两个包：

* `npm install tslib @types/node -g`

　　现在，我们可以直接通过 ts-node 来运行 TypeScript 的代码：

* `ts-node math.ts`

　　

　　

　　
