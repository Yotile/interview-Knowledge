# $refs

　　某些情况下，我们在组件中想要**直接获取到元素对象或者子组件实例**：

* 在 Vue 开发中我们是**不推荐进行 DOM 操作**的；
* 这个时候，我们可以**给元素或者组件绑定一个 ref 的 attribute 属性**；

　　**组件实例有一个 $refs 属性：**

* 它一个对象 Object，持有**注册过 ref attribute 的所有 DOM 元素和组件实例**。

　　![image.png](image-20211129135152-ii299l8.png)![image.png](image-20211119154114-35mr7dj.png)

　　

# $ parent 和 root

　　我们可以**通过 $parent 来访问父元素**。

　　HelloWorld.vue 的实现：

* 这里我们也可以**通过 $root** 来实现，因为 App 是我们的根组件；
* ![image.png](image-20211129135207-jka3tew.png)

　　注意：在 Vue3 中已经**移除了 $children 的属性**，所以不可以使用了。

　　
