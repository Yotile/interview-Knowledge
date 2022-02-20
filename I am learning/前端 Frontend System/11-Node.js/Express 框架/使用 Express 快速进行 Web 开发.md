**学习目标**

　　<br />

* **掌握使用 Express 处理静态资源**
* **理解路由概念**
* **掌握 Express 路由的基本使用**
* **理解模板引擎概念**
* **掌握模板引擎的基本使用**
* **理解 Express 中间件执行模型**
* **案例：Express 重写留言本案例**
* **案例：基于文件的增删改查**
* **JSON 数据**

　　<br />

　　**原生的 http 模块在某些方面表现不足以应对我们的开发需求，所以我们就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码更统一。**<br />在 Node 中，有很多 Web 开发框架，我们这里以学习 `<span class="ne-text">Express</span>` 为主。

　　<br />

## Express 介绍

　　<br />

* **Express 是一个基于 Node.js 平台，快速、开放、极简的 web 开发框架。**

　　<br />

* **作者：**[tj](https://github.com/tj)
* [tj 个人博客](http://tjholowaychuk.com/)
* **知名的开源项目创建者和协作者**
* **Express、commander、ejs、co、Koa...**
* **已经离开 Node 社区，转 Go 了**
* [知乎 - 如何看待 TJ 宣布退出 Node.js 开发，转向 Go？](https://www.zhihu.com/question/24373004)
* **丰富的 API 支持，强大而灵活的中间件特性**
* **Express 不对 Node.js 已有的特性进行二次抽象，只是在它之上扩展了 Web 应用所需的基本功能**
* **有很多**[流行框架](http://expressjs.com/en/resources/frameworks.html)基于 Express

　　<br />

* [Express 官网](http://expressjs.com/)
* [Express 中文文档（非官方）](http://www.expressjs.com.cn/)
* [Express GitHub 仓库](https://github.com/expressjs/express)

　　<br />

## 起步

　　<br />

### 安装

　　<br />

　　**参考文档：**[http://expressjs.com/en/starter/installing.html](http://expressjs.com/en/starter/installing.html)

　　<br />

```shell
# 创建并切换到 myapp 目录
mkdir myapp 
cd myapp  
# 初始化 package.json 文件
npm init -y  
# 安装 express 到项目中
npm i express
```

　　<br />

### Hello World

　　<br />

　　**参考文档：**[http://expressjs.com/en/starter/hello-world.html](http://expressjs.com/en/starter/hello-world.html)

　　<br />

```js
// 0. 加载 Express
const express = require("express");

// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express();

// 2. 设置请求对应的处理函数
//    当客户端以 GET 方法请求 / 的时候就会调用第二个参数：请求处理函数
app.get("/", (req, res) => {
  res.send("hello world");
});

// 3. 监听端口号，启动 Web 服务
app.listen(3000, () => console.log("app listening on port 3000!"));
```

　　<br />

### 基本路由

　　<br />

　　**参考文档：**[http://expressjs.com/en/starter/basic-routing.html](http://expressjs.com/en/starter/basic-routing.html)

　　<br />

　　**路由（Routing）是由一个 URI（或者叫路径标识）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何处理响应客户端请求。**

　　<br />

　　**每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个/些函数将被执行。**

　　<br />

　　**路由的定义的结构如下：**

　　<br />

```js
app.METHOD(PATH, HANDLER);
```

　　<br />

　　**其中：**

　　<br />

* `app` 是 express 实例
* `METHOD` 是一个 [HTTP 请求方法](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
* `PATH` 是服务端路径（定位标识）
* `HANDLER` 是当路由匹配到时需要执行的处理函数

　　<br />

　　**下面是一些基本示例。**

　　<br />

　　Respond with **Hello World!** on the homepage:

　　<br />

```js
// 当你以 GET 方法请求 / 的时候，执行对应的处理函数
app.get("/", function(req, res) {
  res.send("Hello World!");
});
```

　　<br />

　　**Respond to POST request on the root route (/**), the application’s home page:

　　<br />

```js
// 当你以 POST 方法请求 / 的时候，指定对应的处理函数
app.post("/", function(req, res) {
  res.send("Got a POST request");
});
```

　　<br />

　　Respond to a PUT request to the `/user` route:

　　<br />

```js
app.put("/user", function(req, res) {
  res.send("Got a PUT request at /user");
});
```

　　<br />

　　Respond to a DELETE request to the `/user` route:

　　<br />

```js
app.delete("/user", function(req, res) {
  res.send("Got a DELETE request at /user");
});
```

　　<br />

　　**For more details about routing, see the **[routing guide](http://expressjs.com/en/guide/routing.html).

　　<br />

## 处理静态资源

　　<br />

　　**参考文档：**[http://expressjs.com/en/starter/static-files.html](http://expressjs.com/en/starter/static-files.html)

　　<br />

```js
// 开放 public 目录中的资源
// 不需要访问前缀
app.use(express.static("public"));

// 开放 files 目录资源，同上
app.use(express.static("files"));

// 开放 public 目录，限制访问前缀
app.use("/public", express.static("public"));

// 开放 public 目录资源，限制访问前缀
app.use("/static", express.static("public"));

// 开放 publi 目录，限制访问前缀
// path.join(__dirname, 'public') 会得到一个动态的绝对路径
app.use("/static", express.static(path.join(__dirname, "public")));
```

　　<br />

## 使用模板引擎

　　<br />

　　**参考文档：**

* [Using template engines with Express](http://expressjs.com/en/guide/using-template-engines.html)

　　<br />

　　**我们可以使用模板引擎处理服务端渲染，但是 Express 为了保持其极简灵活的特性并没有提供类似的功能。**

　　<br />

　　**同样的，Express 也是开放的，它支持开发人员根据自己的需求将模板引擎和 Express 结合实现服务端渲染的能力。**

　　<br />

### 配置使用 art-template 模板引擎

　　<br />

　　**参考文档：**

* [art-template 官方文档](https://aui.github.io/art-template/)

　　<br />

　　**这里我们以 **[art-template](https://github.com/aui/art-template) 模板引擎为例演示如何和 Express 结合使用。

　　<br />

　　**安装：**

　　<br />

```
npm install art-template express-art-template
```

　　<br />

　　**配置：**

　　<br />

```
// 第一个参数用来配置视图的后缀名，这里是 art ，则你存储在 views 目录中的模板文件必须是 xxx.art // app.engine('art', require('express-art-template'))  // 这里我把 art 改为 html app.engine("html", require("express-art-template"));
```

　　<br />

　　**使用示例：**

　　<br />

```
app.get("/", function(req, res) {   // render 方法默认会去项目的 views 目录中查找 index.html 文件   // render 方法的本质就是将读取文件和模板引擎渲染这件事儿给封装起来了   res.render("index.html", {     title: "hello world"   }); });
```

　　<br />

　　**如果希望修改默认的 **`<span class="ne-text">views</span>` 视图渲染存储目录，可以：

　　<br />

```
// 第一个参数 views 是一个特定标识，不能乱写 // 第二个参数给定一个目录路径作为默认的视图查找目录 app.set("views", 目录路径);
```

　　<br />

### 其它常见模板引擎

　　<br />

　　**JavaScript 模板引擎有很多，并且他们的功能都大抵相同，但是不同的模板引擎也各有自己的特色。**

　　<br />

　　**大部分 JavaScript 模板引擎都可以在 Node 中使用，下面是一些常见的模板引擎。**

　　<br />

* **ejs**
* **handlebars**
* **jade**
* **后改名为 pug**
* **nunjucks**

　　<br />

## 解析表单 post 请求体

　　<br />

　　**参考文档：**

* [GitHub - body-parser](https://github.com/expressjs/body-parser)

　　<br />

　　**在 Express 中没有内置获取表单 POST 请求体的 API，这里我们需要使用一个第三方包：**`<span class="ne-text">body-parser</span>`。

　　<br />

　　**安装：**

　　<br />

```
npm install --save body-parser
```

　　<br />

　　**配置：**

　　<br />

```
var express = require("express"); // 0. 引包 var bodyParser = require("body-parser");  var app = express();  // 配置 body-parser // 只要加入这个配置，则在 req 请求对象上会多出来一个属性：body // 也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了 // parse application/x-www-form-urlencoded app.use(bodyParser.urlencoded({ extended: false })); // parse application/json app.use(bodyParser.json());
```

　　<br />

　　**使用：**

　　<br />

```
app.use(function(req, res) {   res.setHeader("Content-Type", "text/plain");   res.write("you posted:\n");   // 可以通过 req.body 来获取表单 POST 请求体数据   res.end(JSON.stringify(req.body, null, 2)); });
```

　　<br />

## 使用 Session

　　<br />

　　**参考文档：**[https://github.com/expressjs/session](https://github.com/expressjs/session)

　　<br />

　　**安装：**

　　<br />

```
npm install express-session
```

　　<br />

　　**配置：**

　　<br />

```
// 该插件会为 req 请求对象添加一个成员：req.session 默认是一个对象 // 这是最简单的配置方式，暂且先不用关心里面参数的含义 app.use(   session({     // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密     // 目的是为了增加安全性，防止客户端恶意伪造     secret: "itcast",     resave: false,     saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙   }) );
```

　　<br />

　　**使用：**

　　<br />

```
// 添加 Session 数据 req.session.foo = "bar";  // 获取 Session 数据 req.session.foo;
```

　　<br />

　　**提示：默认 Session 数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把 Session 进行持久化存储。**

---

## 路由

　　<br />

　　**参考文档：**

* [Routing](http://expressjs.com/en/guide/routing.html)

　　<br />

　　**一个非常基础的路由：**

　　<br />

```js
var express = require("express");
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function(req, res) {
  res.send("hello world");
});
```

　　<br />

### 路由方法

　　<br />

```js
// GET method route
app.get("/", function(req, res) {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", function(req, res) {
  res.send("POST request to the homepage");
});
```

　　<br />

### 路由路径

　　<br />

　　**This route path will match requests to the root route, /.**

　　<br />

```js
app.get("/", function(req, res) {
  res.send("root");
});
```

　　<br />

　　**This route path will match requests to /about.**

　　<br />

```js
app.get("/about", function(req, res) {
  res.send("about");
});
```

　　<br />

　　**This route path will match requests to /random.text.**

　　<br />

```js
app.get("/random.text", function(req, res) {
  res.send("random.text");
});
```

　　<br />

　　**Here are some examples of route paths based on string patterns.**

　　<br />

　　**This route path will match acd and abcd.**

　　<br />

```js
app.get("/ab?cd", function(req, res) {
  res.send("ab?cd");
});
```

　　<br />

　　**This route path will match abcd, abbcd, abbbcd, and so on.**

　　<br />

```js
app.get("/ab+cd", function(req, res) {
  res.send("ab+cd");
});
```

　　<br />

　　**This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.**

　　<br />

```js
app.get("/ab*cd", function(req, res) {
  res.send("ab*cd");
});
```

　　<br />

　　**This route path will match /abe and /abcde.**

　　<br />

```js
app.get("/ab(cd)?e", function(req, res) {
  res.send("ab(cd)?e");
});
```

　　<br />

　　**Examples of route paths based on regular expressions:**

　　<br />

　　**This route path will match anything with an “a” in the route name.**

　　<br />

```js
app.get(/a/, function(req, res) {
  res.send("/a/");
});
```

　　<br />

　　**This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.**

　　<br />

```js
app.get(/.*fly$/, function(req, res) {
  res.send("/.*fly$/");
});
```

　　<br />

#### 动态路径

　　<br />

```
Route path: /users/:userId/books/:bookId Request URL: http://localhost:3000/users/34/books/8989 req.params: { "userId": "34", "bookId": "8989" }
```

　　<br />

　　**定义动态的路由路径：**

　　<br />

```
app.get("/users/:userId/books/:bookId", function(req, res) {   res.send(req.params); });
```

　　<br />

### 路由处理方法

　　<br />

### app.route()

　　<br />

### express.Router

　　<br />

　　**Create a router file named router.js in the app directory, with the following content:**

　　<br />

```
const express = require("express");  const router = express.Router();  router.get("/", function(req, res) {   res.send("home page"); });  router.get("/about", function(req, res) {   res.send("About page"); });  module.exports = router;
```

　　<br />

　　**Then, load the router module in the app:**

　　<br />

```
const router = require("./router");  // ...  app.use(router);
```

---

## 在 Express 中获取客户端请求参数的三种方式

　　<br />

　　**例如，有一个地址：**`<span class="ne-text">/a/b/c?foo=bar&id=123</span>`

　　<br />

### 查询字符串参数

　　<br />

　　**获取 **`<span class="ne-text">?foo=bar&id=123</span>`

　　<br />

```
console.log(req.query);
```

　　<br />

　　**结果如下：**

　　<br />

```
{   foo: 'bar',   id: '123' }
```

　　<br />

### 请求体参数

　　<br />

　　`<span class="ne-text">POST</span>` 请求才有请求体，我们需要单独配置 `<span class="ne-text">body-parser</span>` 中间件才可以获取。<br />只要程序中配置了 `<span class="ne-text">body-parser</span>` 中间件，我们就可以通过 `<span class="ne-text">req.body</span>` 来获取表单 `<span class="ne-text">POST</span>` 请求体数据。

　　<br />

```
req.body // => 得到一个请求体对象
```

　　<br />

### 动态的路径参数

　　<br />

　　**在 Express 中，支持把一个路由设计为动态的。例如：**

　　<br />

```
// /users/:id 要求必须以 /users/ 开头，:id 表示动态的，1、2、3、abc、dnsaj 任意都行 // 注意：:冒号很重要，如果你不加，则就变成了必须 === /users/id // 为啥叫 id ，因为是动态的路径，服务器需要单独获取它，所以得给它起一个名字 // 那么我们就可以通过 req.params 来获取路径参数 app.get("/users/:id", (req, res, next) => {   console.log(req.params.id); });  // /users/*/abc // req.params.id app.get("/users/:id/abc", (req, res, next) => {   console.log(req.params.id); });  // /users/*/* // req.params.id // req.params.abc app.get("/users/:id/:abc", (req, res, next) => {   console.log(req.params.id); });  // /*/*/* // req.params.users app.get("/:users/:id/:abc", (req, res, next) => {   console.log(req.params.id); });  // /*/id/* app.get("/:users/id/:abc", (req, res, next) => {   console.log(req.params.id); });
```

---

## 中间件

　　<br />

　　**参考文档：**

* [Writing middleware for use in Express apps](http://expressjs.com/en/guide/writing-middleware.html)
* [Using middleware](http://expressjs.com/en/guide/using-middleware.html)

　　<br />

　　**Express 的最大特色，也是最重要的一个设计，就是中间件。一个 Express 应用，就是由许许多多的中间件来完成的。**

　　<br />

　　**为了理解中间件，我们先来看一下我们现实生活中的自来水厂的净水流程。**

　　![](https://cdn.nlark.com/yuque/0/2020/jpeg/152778/1593791623604-eb0bc9ca-b96a-4d13-968c-39515aa7cc8c.jpeg)

　　<br />

　　**在上图中，自来水厂从获取水源到净化处理交给用户，中间经历了一系列的处理环节，我们称其中的每一个处理环节就是一个中间件。这样做的目的既提高了生产效率也保证了可维护性。**

　　<br />

### 一个简单的中间件例子：打印日志

　　<br />

```
app.get("/", (req, res) => {   console.log(`${req.method} ${req.url} ${Date.now()}`);   res.send("index"); });  app.get("/about", (req, res) => {   console.log(`${req.method} ${req.url} ${Date.now()}`);   res.send("about"); });  app.get("/login", (req, res) => {   console.log(`${req.method} ${req.url} ${Date.now()}`);   res.send("login"); });
```

　　<br />

　　**在上面的示例中，每一个请求处理函数都做了一件同样的事情：请求日志功能（在控制台打印当前请求方法、请求路径以及请求时间）。**

　　<br />

　　**针对于这样的代码我们自然想到了封装来解决：**

　　<br />

```
app.get("/", (req, res) => {   // console.log(`${req.method} ${req.url} ${Date.now()}`)   logger(req);   res.send("index"); });  app.get("/about", (req, res) => {   // console.log(`${req.method} ${req.url} ${Date.now()}`)   logger(req);   res.send("about"); });  app.get("/login", (req, res) => {   // console.log(`${req.method} ${req.url} ${Date.now()}`)   logger(req);   res.send("login"); });  function logger(req) {   console.log(`${req.method} ${req.url} ${Date.now()}`); }
```

　　<br />

　　**这样的做法自然没有问题，但是大家想一想，我现在只有三个路由，如果说有 10 个、100 个、1000 个呢？那我在每个请求路由函数中都手动调用一次也太麻烦了。**

　　<br />

　　**好了，我们不卖关子了，来看一下我们如何使用中间件来解决这个简单的小功能。**

　　<br />

```
app.use((req, res, next) => {   console.log(`${req.method} ${req.url} ${Date.now()}`);   next(); });  app.get("/", (req, res) => {   res.send("index"); });  app.get("/about", (req, res) => {   res.send("about"); });  app.get("/login", (req, res) => {   res.send("login"); });  function logger(req) {   console.log(`${req.method} ${req.url} ${Date.now()}`); }
```

　　<br />

　　**上面代码执行之后我们发现任何请求进来都会先在服务端打印请求日志，然后才会执行具体的业务处理函数。那这个到底是怎么回事？**

　　<br />

### 中间件的组成

　　![](https://cdn.nlark.com/yuque/0/2020/png/152778/1593791646960-774281f4-c17e-4011-a8d9-6d8e2386570c.png)

　　**中间件函数可以执行以下任何任务：**

　　<br />

* **执行任何代码**
* **修改 request 或者 response 响应对象**
* **结束请求响应周期**
* **调用下一个中间件**

　　<br />

### 中间件分类

　　<br />

* **应用程序级别中间件**
* **路由级别中间件**
* **错误处理中间件**
* **内置中间件**
* **第三方中间件**

　　<br />

#### 应用程序级别中间件

　　<br />

　　**不关心请求路径：**

　　<br />

```
var app = express();  app.use(function(req, res, next) {   console.log("Time:", Date.now());   next(); });
```

　　<br />

　　**限定请求路径：**

　　<br />

```
app.use("/user/:id", function(req, res, next) {   console.log("Request Type:", req.method);   next(); });
```

　　<br />

　　**限定请求方法：**

　　<br />

```
app.get("/user/:id", function(req, res, next) {   res.send("USER"); });
```

　　<br />

　　**多个处理函数：**

　　<br />

```
app.use(   "/user/:id",   function(req, res, next) {     console.log("Request URL:", req.originalUrl);     next();   },   function(req, res, next) {     console.log("Request Type:", req.method);     next();   } );
```

　　<br />

　　**多个路由处理函数：**

　　<br />

```
app.get(   "/user/:id",   function(req, res, next) {     console.log("ID:", req.params.id);     next();   },   function(req, res, next) {     res.send("User Info");   } );  // handler for the /user/:id path, which prints the user ID app.get("/user/:id", function(req, res, next) {   res.end(req.params.id); });
```

　　<br />

　　**最后一个例子：**

　　<br />

```
app.get(   "/user/:id",   function(req, res, next) {     // if the user ID is 0, skip to the next route     if (req.params.id === "0") next("route");     // otherwise pass the control to the next middleware function in this stack     else next();   },   function(req, res, next) {     // render a regular page     res.render("regular");   } );  // handler for the /user/:id path, which renders a special page app.get("/user/:id", function(req, res, next) {   res.render("special"); });
```

　　<br />

#### 路由级别中间件

　　<br />

　　**创建路由实例：**

　　<br />

```
var router = express.Router();
```

　　<br />

　　**示例：**

　　<br />

```
var app = express(); var router = express.Router();  // a middleware function with no mount path. This code is executed for every request to the router router.use(function(req, res, next) {   console.log("Time:", Date.now());   next(); });  // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path router.use(   "/user/:id",   function(req, res, next) {     console.log("Request URL:", req.originalUrl);     next();   },   function(req, res, next) {     console.log("Request Type:", req.method);     next();   } );  // a middleware sub-stack that handles GET requests to the /user/:id path router.get(   "/user/:id",   function(req, res, next) {     // if the user ID is 0, skip to the next router     if (req.params.id === "0") next("route");     // otherwise pass control to the next middleware function in this stack     else next();   },   function(req, res, next) {     // render a regular page     res.render("regular");   } );  // handler for the /user/:id path, which renders a special page router.get("/user/:id", function(req, res, next) {   console.log(req.params.id);   res.render("special"); });  // mount the router on the app app.use("/", router);
```

　　<br />

　　**另一个示例：**

　　<br />

```
var app = express(); var router = express.Router();  // predicate the router with a check and bail out when needed router.use(function(req, res, next) {   if (!req.headers["x-auth"]) return next("router");   next(); });  router.get("/", function(req, res) {   res.send("hello, user!"); });  // use the router and 401 anything falling through app.use("/admin", router, function(req, res) {   res.sendStatus(401); });
```

　　<br />

#### 错误处理中间件

　　<br />

```
app.use(function(err, req, res, next) {   console.error(err.stack);   res.status(500).send("Something broke!"); });
```

　　<br />

#### 内置中间件

　　<br />

* [express.static](http://expressjs.com/en/4x/api.html#express.static) serves static assets such as HTML files, images, and so on.
* [express.json](http://expressjs.com/en/4x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
* [express.urlencoded](http://expressjs.com/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads. **NOTE: Available with Express 4.16.0+**

　　<br />

　　**官方支持的中间件列表：**

　　<br />

* [https://github.com/senchalabs/connect#middleware](https://github.com/senchalabs/connect#middleware)

　　<br />

#### 第三方中间件

　　<br />

　　**官方中间件资源：**[http://expressjs.com/en/resources/middleware.html](http://expressjs.com/en/resources/middleware.html)

　　<br />

　　**早期的 Express 内置了很多中间件。后来 Express 在 4.x 之后移除了这些内置中间件，官方把这些功能性中间件以包的形式单独提供出来。这样做的目的是为了保持 Express 本身极简灵活的特性，开发人员可以根据自己的需求去灵活的定制。下面是官方提供的一些常用的中间件解决方案。**

| **Middleware module**                                                          | **Description**                                                                                                                                                                          | **Replaces built-in function (Express 3)** |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html)         | **Parse HTTP request body. See also:**[body](https://github.com/raynos/body),[co-body](https://github.com/visionmedia/co-body), and[raw-body](https://github.com/stream-utils/raw-body). | **express.bodyParser**                     |
| [compression](http://expressjs.com/en/resources/middleware/compression.html)         | **Compress HTTP responses.**                                                                                                                                                             | **express.compress**                       |
| [connect-rid](http://expressjs.com/en/resources/middleware/connect-rid.html)         | **Generate unique request ID.**                                                                                                                                                          | **NA**                                     |
| [cookie-parser](http://expressjs.com/en/resources/middleware/cookie-parser.html)     | **Parse cookie header and populate** `<span class="ne-text">req.cookies</span>`. See also[cookies](https://github.com/jed/cookies)and[keygrip](https://github.com/jed/keygrip).        | **express.cookieParser**                   |
| [cookie-session](http://expressjs.com/en/resources/middleware/cookie-session.html)   | **Establish cookie-based sessions.**                                                                                                                                                     | **express.cookieSession**                  |
| [cors](http://expressjs.com/en/resources/middleware/cors.html)                       | **Enable cross-origin resource sharing (CORS) with various options.**                                                                                                                    | **NA**                                     |
| [csurf](http://expressjs.com/en/resources/middleware/csurf.html)                     | **Protect from CSRF exploits.**                                                                                                                                                          | **express.csrf**                           |
| [errorhandler](http://expressjs.com/en/resources/middleware/errorhandler.html)       | **Development error-handling/debugging.**                                                                                                                                                | **express.errorHandler**                   |
| [method-override](http://expressjs.com/en/resources/middleware/method-override.html) | **Override HTTP methods using header.**                                                                                                                                                  | **express.methodOverride**                 |
| [morgan](http://expressjs.com/en/resources/middleware/morgan.html)                   | **HTTP request logger.**                                                                                                                                                                 | **express.logger**                         |
| [multer](http://expressjs.com/en/resources/middleware/multer.html)                   | **Handle multi-part form data.**                                                                                                                                                         | **express.bodyParser**                     |
| [response-time](http://expressjs.com/en/resources/middleware/response-time.html)     | **Record HTTP response time.**                                                                                                                                                           | **express.responseTime**                   |
| [serve-favicon](http://expressjs.com/en/resources/middleware/serve-favicon.html)     | **Serve a favicon.**                                                                                                                                                                     | **express.favicon**                        |
| [serve-index](http://expressjs.com/en/resources/middleware/serve-index.html)         | **Serve directory listing for a given path.**                                                                                                                                            | **express.directory**                      |
| [serve-static](http://expressjs.com/en/resources/middleware/serve-static.html)       | **Serve static files.**                                                                                                                                                                  | **express.static**                         |
| [session](http://expressjs.com/en/resources/middleware/session.html)                 | **Establish server-based sessions (development only).**                                                                                                                                  | **express.session**                        |
| [timeout](http://expressjs.com/en/resources/middleware/timeout.html)                 | **Set a timeout period for HTTP request processing.**                                                                                                                                    | **express.timeout**                        |
| [vhost](http://expressjs.com/en/resources/middleware/vhost.html)                     | **Create virtual domains.**                                                                                                                                                              | **express.vhost**                          |

　　<br />

### 中间件应用

　　<br />

#### 输出请求日志中间件

　　<br />

　　**功能：实现为任何请求打印请求日志的功能。**

　　<br />

　　`<span class="ne-text">logger.js</span>` 定义并导出一个中间件处理函数：

　　<br />

```
module.exports = (req, res, next) => {   console.log(`${req.method} -- ${req.path}`);   next(); };
```

　　<br />

　　`<span class="ne-text">app.js</span>` 加载使用中间件处理函数：

　　<br />

```
app.use(logger);
```

　　<br />

#### 统一处理静态资源中间件

　　<br />

　　**功能：实现 express.static() 静态资源处理功能**

　　<br />

　　`<span class="ne-text">static.js</span>` 定义并导出一个中间件处理函数：

　　<br />

```
const fs = require("fs"); const path = require("path");  module.exports = function static(pathPrefix) {   return function(req, res, next) {     const filePath = path.join(pathPrefix, req.path);     fs.readFile(filePath, (err, data) => {       if (err) {         // 继续往后匹配查找能处理该请求的中间件         // 如果找不到，则 express 会默认发送 can not get xxx         return next();       }       res.end(data);     });   }; };
```

　　<br />

　　`<span class="ne-text">app.js</span>` 加载并使用 static 中间件处理函数：

　　<br />

```
// 不限定请求路径前缀 app.use(static("./public")); app.use(static("./node_modules"));  // 限定请求路径前缀 app.use("/public", static("./public")); app.use("/node_modules", static("./node_modules"));
```

　　<br />

## 错误处理

　　<br />

　　**参考文档：**

* [Error handling](http://expressjs.com/en/guide/error-handling.html)

　　<br />

## 常用 API

　　<br />

　　**参考文档：**

* [4.x API](http://expressjs.com/en/4x/api.html)

　　<br />

### express

　　<br />

* **express.json**
* **express.static**
* **express.Router**
* **express.urlencoded()**

　　<br />

### Application

　　<br />

* **app.set**
* **app.get**
* **app.locals**

　　<br />

### Request

　　<br />

* **req.app**
* **req.query**
* **req.body**
* **req.cookies**
* **req.ip**
* **req.hostname**
* **Req.method**
* **req.params**
* **req.path**
* **req.get()**

　　<br />

### Response

　　<br />

* **res.locals**
* **res.append()**
* **res.cookie()**
* **res.clearCookie()**
* **res.download()**
* **res.end()**
* **res.json()**
* **res.jsonp()**
* **res.redirect()**
* **res.render()**
* **res.send()**
* **res.sendStatus()**
* **res.set()**
* **res.status()**

　　<br />

### Router

　　<br />

* **router.all()**
* **router.METHOD()**
* **router.use()**

　　<br />

## 小案例

　　<br />

　　**案例 Github 仓库地址：**[https://github.com/lipengzhou/express-guestbook-case](https://github.com/lipengzhou/express-guestbook-case)

　　<br />

### 零、准备

　　<br />

　　**完整目录结构如下：**

　　<br />

```
. ├── node_modules npm安装的第三方包目录，使用 npm 装包会自动创建 ├── public 页面需要使用的静态资源 │   ├── css │   ├── js │   ├── img │   └── ... ├── views 所有视图页面（只存储 html 文件） │   ├── publish.html │   └── index.html ├── app.js 服务端程序入口文件，执行该文件会启动我们的 Web 服务器 ├── db.json 这里充当我们的数据库 ├── README.md 项目说明文档 ├── package.json 项目包说明文件，存储第三方包依赖等信息 └── package-lock.json npm的包锁定文件，用来锁定第三方包的版本和提高npm下载速度
```

　　<br />

```
# 创建项目目录 mkdir guestbook  # 进入项目目录 cd guestbook  # 初始化 package.json 文件 npm init -y  # 将 Express 安装到项目中 npm install express
```

　　<br />

### 一、Hello World

　　<br />

```
// 0. 加载 Express const express = require("express");  // 1. 调用 express() 得到一个 app //    类似于 http.createServer() const app = express();  // 2. 设置请求对应的处理函数 //    当客户端以 GET 方法请求 / 的时候就会调用第二个参数：请求处理函数 app.get("/", (req, res) => {   res.send("hello world"); });  // 3. 监听端口号，启动 Web 服务 app.listen(3000, () => console.log("app listening on port 3000!"));
```

　　<br />

### 二、配置模板引擎

　　<br />

　　**参见：Express - 使用模板引擎**

　　<br />

### 三、路由设计

| **请求方法** | **请求路径** | **作用**              |
| -------------------- | -------------------- | ----------------------------- |
| **GET**      | **/**        | **渲染 index.html**   |
| **GET**      | **/publish** | **渲染 publish.html** |
| **POST**     | **/publish** | **处理发表留言**      |

　　<br />

```
app.get("/", function(req, res) {   // ... });  app.get("/publish", function(req, res) {   // ... });  app.post("/publish", function(req, res) {   // ... });
```

　　<br />

### 四、走通页面渲染跳转

　　<br />

```
app.get("/", function(req, res) {   res.render("index.html"); });  app.get("/publish", function(req, res) {   res.render("publish.html"); });
```

　　<br />

### 五、安装处理 Bootstrap 样式文件

　　<br />

　　**安装 **`<span class="ne-text">bootstrap</span>` 到项目中：

　　<br />

```
npm install bootstrap
```

　　<br />

　　**将 **`<span class="ne-text">node_modules</span>` 目录开放出来：

　　<br />

```
app.use("/node_modules/", express.static("./node_modules/"));
```

　　<br />

### 六、将数据库中的 post 渲染到首页

　　<br />

　　**JavaScript 后台处理：**

　　<br />

```
app.get("/", function(req, res) {   fs.readFile("./db.json", function(err, data) {     if (err) {       return res.render("500.html", {         errMessage: err.message       });     }     try {       data = JSON.parse(data.toString());       res.render("index.html", {         posts: data.posts       });     } catch (err) {       return res.render("500.html", {         errMessage: err.message       });     }   }); });
```

　　<br />

　　**index.html 页面模板字符串：**

　　<br />

```
<ul class="list-group">   {{ each posts }}   <li class="list-group-item">     <span class="badge">{{ $value.time }}</span>     <span>{{ $value.name }}</span>说：<span>{{ $value.content }}</span>   </li>   {{ /each }} </ul>
```

　　<br />

### 七、配置解析表单 post 请求体

　　<br />

　　**参见：Express - 解析表单 post 请求体**

　　<br />

### 八、处理 publish 表单提交

　　<br />

```
app.post("/publish", function(req, res) {   var body = req.body;    fs.readFile("./db.json", function(err, data) {     if (err) {       return res.render("500.html", {         errMessage: err.message       });     }     try {       data = JSON.parse(data.toString());       var posts = data.posts;       var last = posts[posts.length - 1];        // 生成数据添加到 post 数组中       posts.unshift({         id: last ? last.id + 1 : 1,         name: body.name,         content: body.content,         time: moment().format("YYYY-MM-DD HH:mm:ss") // moment 是一个专门用来处理时间的 JavaScript 库       });        // 把对象转成字符串存储到文件中       // try-catch 无法捕获异步代码的异常       fs.writeFile("./db.json", JSON.stringify(data), function(err) {         if (err) {           return res.render("500.html", {             errMessage: err.message           });         }         // 代码执行到这里，说明写入文件成功了         // 在 Express 中，我们可以使用 res.redirect() 实现服务端重定向的功能         res.redirect("/");       });     } catch (err) {       return res.render("500.html", {         errMessage: err.message       });     }   }); });
```

　　<br />

### 九、案例优化：提取数据操作模块

　　<br />

```
const { readFile, writeFile } = require("fs");  const dbPath = "./db.json";  exports.getDb = getDb;  // 封装带来的好处： //    1. 可维护性 //    2. 其次才是重用 exports.addPost = (post, callback) => {   getDb((err, dbData) => {     if (err) {       return callback(err);     }      // 获取数组中最后一个元素     const last = dbData.posts[dbData.posts.length - 1];      // 添加数据的 id 自动增长     post.id = last ? last.id + 1 : 1;      // 创建时间     post.createdAt = "2018-2-2 11:57:06";      // 将数据添加到数组中（这里还并没有持久化存储）     dbData.posts.push(post);      // 将 dbData 对象转成字符串持久化存储到文件中     const dbDataStr = JSON.stringify(dbData);      writeFile(dbPath, dbDataStr, err => {       if (err) {         return callback(err);       }        // Express 为 res 响应对象提供了一个工具方法：redirect 可以便捷的重定向       // res.redirect('/')       callback(null);     });   }); };  function getDb(callback) {   readFile(dbPath, "utf8", (err, data) => {     if (err) {       return callback(err);     }     callback(null, JSON.parse(data));   }); }
```

　　<br />

### 十、案例总结
