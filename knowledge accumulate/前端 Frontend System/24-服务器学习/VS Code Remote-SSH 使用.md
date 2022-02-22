## 使用步骤

1. 安装 remote-SSH 插件

　　![image.png](image-20220104103848-1ozqh9c.png)

　　

　　新建连接

　　![image.png](image-20220104104236-gcy5zl2.png)

　　

　　输入用户名和 ip

　　`ssh root@119.91.251.182`

　　

　　配置文件

　　![image.png](image-20220104104442-n2piw7o.png)

　　![image.png](image-20220104104458-flogbh4.png)

　　

```shell
Host devtint # 显示的名称
  HostName 119.91.251.182 # 服务器ip
  User root # 用户名
  IdentityFile C:\\Users\\admin\\.ssh\\remote_dev_ssh # 使用的ssh公钥路径
```

　　

## 如何使用 ssh 公钥免密登录服务器

　　以腾讯云轻量应用服务器为例

　　创建密钥

　　![image.png](image-20220104105223-8erm729.png)

　　

　　绑定密钥

　　创建成功会自动下载

　　![image.png](image-20220104105320-27tyqof.png)

　　![image.png](image-20220104105416-h1syfv4.png)![image.png](image-20220104105433-7v0zfao.png)

　　

　　绑定好后，再将服务器开机

　　

## 本地关联密钥操作

　　将下载的密钥放在本地

　　![image.png](image-20220104105649-i3ykzds.png)

　　

　　再在 vscode 里的 remote-shh配置文件里绑定路径

```shell
Host devtint
  HostName 119.91.251.182
  User root
  IdentityFile C:\\Users\\admin\\.ssh\\remote_dev_ssh
```

　　

　　

## 免密登录

```shell
# 将公钥内容(本地 id_rsa.pub)写入文件中

.ssh/authorized_keys


# 权限

chmod 600 authorized_keys

```

　　
