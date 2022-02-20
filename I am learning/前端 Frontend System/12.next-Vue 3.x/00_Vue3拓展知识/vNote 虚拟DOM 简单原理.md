## 认识 VNode

　　![image.png](assets/image-20211112170209-u46sx32.png)

　　

## 虚拟 DOM

　　![image.png](assets/image-20211112170238-9sr6qze.png)

## 插入 F 的案例

　　![image.png](assets/image-20211129143604-yb85zud.png)![image.png](assets/image-20211112170412-cmk2icb.png)

　　

## Vue 源码对于 key 的判断

　　![image.png](assets/image-20211129143613-1v52c9z.png)

### 没有 key 的操作（源码）

　　![image.png](assets/image-20211129143620-yx2t0uu.png)

#### 没有 key 的过程如下

　　![image.png](assets/image-20211112170555-imfrzqj.png)

### 有 key 执行操作（源码）

　　![image.png](assets/image-20211129143637-lskq22m.png)

　　

#### 有 key 的 diff 算法如下（一）

　　![image.png](assets/image-20211112170702-4j6usc4.png)

#### 有 key 的 diff 算法如下（二）

　　![image.png](assets/image-20211112170730-5b9b8it.png)

#### 有 key 的 diff 算法如下（三）

　　![image.png](assets/image-20211112170749-9zhun0q.png)
