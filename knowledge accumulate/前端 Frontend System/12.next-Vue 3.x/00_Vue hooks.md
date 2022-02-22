## useState 封装

　　在 setup 中使用 vuex 的 mapState 去展示数据

　　useState.js

```js
import { computed } from 'vue'
import { mapState, useStore } from 'vuex'

export function useState(mapper) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapState(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState
}

```

　　App.vue(使用)

```html
<template>
  <div>
    <h2>Home:{{ $store.state.counter }}</h2>
    <hr>
    <h2>{{counter}}</h2>
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
    <h2>{{height}}</h2>
    <h2>{{sCounter}}</h2>
    <h2>{{sName}}</h2>
    <hr>
  </div>
</template>

<script>
  import { useState } from '../hooks/useState'

  export default {
    setup() {
	// 可传入数组或对象格式
      const storeState = useState(["counter", "name", "age", "height"])
      const storeState2 = useState({
        sCounter: state => state.counter,
        sName: state => state.name
      })

      return {
        ...storeState,
        ...storeState2
      }
    }
  }
</script>
```

　　

　　

　　

　　

## useGetters 封装

　　在 setup 中使用 mapGetters 的辅助函数

　　useGetters.js

```js
import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'

export function useGetters(mapper) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapGetters(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
```
