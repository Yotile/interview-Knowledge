通过该案例创建一个简单的 CRUD 接口服务，从而掌握 Express 的基本用法。​  
**需求：实现对任务清单的 CRUD 接口服务**

## 创建路由

* 查询任务列表 

  * GET/todos
* 根据 ID 查询单个任务 

  * GET/todos/：id
* 添加任务 

  * POST/todos

* 修改任务 

  * PATCH/todos/:id
* 删除任务 

  * DELETE/todos/：id

```js
// 0. 加载 Express
const express = require('express')

// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express() 

// 2. 设置请求对应的处理函数
//    当客户端以 GET 方法请求 / 的时候就会调用第二个参数：请求处理函数

app.get('/todos',(req, res) => {
  res.send('get /todos')
})

app.get('/todos/:id',(req, res) => {
  res.send(`get /todos/${req.params.id}`)
})

app.post('/todos',(req, res) => {
  res.send('post /todos')
})

app.patch('/todos/:id',(req, res) => {
  res.send('patch /todos')
})

app.delete('/todos/:id',(req, res) => {
  res.send('delete /todos/:id')
})

// 3. 监听端口号，启动 Web 服务
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`)
})
```

　　![image.png](image-20210816165754-z8sys6u.png)

## 

## 实现查询任务列表的接口

　　放数据的 db.json

```json
{
  "todos": [
    {
      "id": "01",
      "title": "JavaScript"
    },
    {
      "id": "02",
      "title": "TypeScript"
    },
    {
      "id": "03",
      "title": "Golong"
    },
    {
      "id": "04",
      "title": "CCCCCC++"
    }
  ],
  "users":[]
}
```

　　app.js

```js
// 0. 加载 Express
const express = require('express')
  // 文件系统模块
const fs = require('fs')

// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express()

// 2. 设置请求对应的处理函数
//    当客户端以 GET 方法请求 / 的时候就会调用第二个参数：请求处理函数

app.get('/todos',(req, res) => {
  // 获取文件路径，指定编码，
  fs.readFile('./db.json','UTF-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message // 返回错误信息
      })
    }
    // .json() 只返回json格式
    const db = JSON.parse(data)
    res.status(200).json(db.todos)
  })
})
```

### 请求响应结果

　　![image.png](image-20210817112721-dy0dlpy.png)

　　

## 实现根据 ID 查询单个任务的接口

```js
// 根据 id 查询单个任务
app.get('/todos/:id',(req, res) => {
  // 获取文件路径，指定编码，
  fs.readFile('./db.json','UTF-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message // 返回错误信息
      })
    }
    // .json() 只返回json格式
    const db = JSON.parse(data)
    // 注意数据类型得一致
    const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))

    if (!todo) {
      return res.status(404).end()
    }
    res.status(200).json(todo)
  })
})
```

### 请求响应结果

　　![image.png](image-20210817140936-90ilqpg.png)

　　

## 封装 db 模块

　　新建 db.js

```js
// 封装db模块
const fs = require('fs')
// 让 readFile 有 promise 支持的异步操作
const { promisify } = require('util')
const path = require('path')

const readFile = promisify(fs.readFile)
const dbPath = path.join(__dirname, './db.json')

exports.getDb = async () => {
  const data = await readFile(dbPath, 'utf8')
  return JSON.parse(data)
}
```

　　在 app.js 中调用，由于封装时候用来 async await ，调用时也需要

```js
const { getDb } = require('./db') // 导入封装好的db模块

// 查询任务列表
app.get('/todos',async (req, res) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (err) {
    res.status(500).json({
      error: err.message // 返回错误信息
    })
  }
})
```

## 添加任务

　　尝试获取客户端的请求头参数

　　![image.png](image-20210817154348-myt2kx5.png)![image.png](image-20210817154504-qae0wgi.png)

　　![image.png](image-20210817154547-5ylr1u0.png)

　　返回结果不理想

　　需要配置一下解析 json 数据

```js
// 0. 加载 Express
const express = require('express')
  // 文件系统模块
const fs = require('fs')
const { getDb } = require('./db') // 封装好的db模块


// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express()

// 配置解析表单请求体 ： application/json
app.use(express.json())
```

　　![image.png](image-20210817155020-s2u0dwv.png)

　　还有一种常用的提交数据格式

　　![image.png](image-20210817155329-c3lwnb4.png)

　　同样需要配置解析

```js
// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express()

// 配置解析表单请求体 ： application/json
app.use(express.json())
// 配置解析表单请求体 ： application/x-www-form-urlencoded
app.use(express.urlencoded())
```

　　![image.png](image-20210817155605-ozwfckw.png)

### 开始实现-> 添加任务

　　app.js

```js

// 添加任务
app.post('/todos',async (req, res) => {
  // 1. 获取客户端请求体参数
  const todo = req.body
  // 2. 数据验证
  if (!todo.title) {
    return res.status(422).json({
      error: 'The field title is require.'
    })
  }
  // 3. 数据验证通过，把数据存储到 db 中
  const db = await getDb()
  const lastTodo = db.todos[db.todos.length - 1]
  db.todos.push({
    id: lastTodo ? lastTodo.id + 1 : 1,
    title: todo.title
  })
  await saveDb(db)
})
```

　　db.js

```js
const readFile = promisify(fs.readFile) // 读取文件
const writeFile = promisify(fs.writeFile) // 写入文件

exports.saveDb = async db => {
  const data = await JSON.stringify(db) // 先转成json格式字符串
  await writeFile(dbPath, data)
}
```

　　然后记得将 saveDb 模块也在 app.js 里面导入

```js
const { getDb, saveDb } = require('./db') // 封装好的db模块
```

　　发送响应

```js
// 添加任务
app.post('/todos',async (req, res) => {
  // 1. 获取客户端请求体参数
  const todo = req.body
  // 2. 数据验证
  if (!todo.title) {
    return res.status(422).json({
      error: 'The field title is require.'
    })
  }
  // 3. 数据验证通过，把数据存储到 db 中
  const db = await getDb()
  const lastTodo = db.todos[db.todos.length - 1]
  todo.id = lastTodo ? lastTodo.id + 1 : 1
  db.todos.push({
    id: todo.id,
    title: todo.title
  })
  await saveDb(db)
  // 4. 发送响应
  res.status(200).json(todo)
})
```

　　成功

　　![image.png](image-20210817171159-0p7ywns.png)

　　![image.png](image-20210817171223-oho72nt.png)

　　额如果想要 db.json 这里格式美观点（加入缩进空格） db.js

```js
exports.saveDb = async db => {
  // const data = await JSON.stringify(db) // 先转成json格式字符串
  const data = await JSON.stringify(db, null, '  ') // 先转成json格式字符串  [null换行  ‘  ’使用两个空格进行缩进]
  await writeFile(dbPath, data)
}
```

　　![image.png](image-20210817171712-s2o6vin.png)

　　最后别忘了加入 try catch 中处理异常

```js
// 添加任务
app.post('/todos',async (req, res) => {
  try {
      // 1. 获取客户端请求体参数
    const todo = req.body
    // 2. 数据验证
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field title is require.'
      })
    }
    // 3. 数据验证通过，把数据存储到 db 中
    const db = await getDb()
    const lastTodo = db.todos[db.todos.length - 1]
    todo.id = lastTodo ? lastTodo.id + 1 : 1
    db.todos.push({
      id: todo.id,
      title: todo.title
    })
    // db.todos.push(todo) // 也可写成这样
    await saveDb(db)
    // 4. 发送请求
    res.status(200).json(todo)
  } catch (err) {
    res.status(500).json({
      error: err.message // 返回错误信息
    })
  }
})
```

　　
