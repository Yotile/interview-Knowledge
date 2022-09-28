## 仅有一个默认回调参数

>  $event  为默认回调参数
```js
:fetch="querySearch($event, item)" 
:fetch="querySearch($event, item, name)" // 可传多个
```
> 调用

```js
querySearch(e, item, name){ }
```


## 有多个默认回调参数

> this  为默认回调参数
```js
:fetch="querySearch.bind(this, item)"
```
> 调用
```js
querySearch(item, queryString, cb){ } // 自传的放前面
```

