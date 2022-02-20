虽然 `git` 可以工作在 `ssh` 与 `https` 两种协议上，但为了安全性及便利性，更多时候会选择 `ssh`。

> 如果采用 https，则每次 git push 都需要验证身份
>

　　

## Permission denied (publickey).

　　如果没有在 github 设置 public key 而直接执行 `git clone` 命令的话，会有权限问题。

　　使用 `ssh -T` 测试连通性如下，会有一个 `Permission denied` 的异常。

```shell
$ git clone git@github.com:vim/vim.git
Cloning into 'vim'...
Warning: Permanently added the RSA host key for IP address '13.229.188.59' to the list of known hosts.
Permission denied (publickey).
fatal: Could not read from remote repository.
 
Please make sure you have the correct access rights
and the repository exists.
 
# 不过有一个更直接的命令去查看是否有权限
$ ssh -T git@github.com
Permission denied (publickey).
```

　　

### 生成新的 ssh key

　　使用命令 `ssh-keygen` 可以生成配对的 `id_rsa` 与 `id_rsa.pub` 文件，生成之后只需把 `id_rsa.pub` 扔到 github 即可。

```shell
# 生成一个 ssh-key
# -t: 可选择 dsa | ecdsa | ed25519 | rsa | rsa1，代表加密方式
# -C: 注释，一般写自己的邮箱
$ ssh-keygen -t rsa -C "devtint@gmail.com"
 
# 生成 id_rsa/id_rsa.pub: 配对的私钥与公钥
$ ls ~/.ssh
authorized_keys  config  id_rsa  id_rsa.pub  known_hosts
```

　　

### 在 github 设置里新添一个 ssh key

　　在云服务器中复制 `~/.ssh/id_rsa.pub` 中文件内容，并粘贴到 github 的配置中。

```shell
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1o8IYI52fUtrp3CciAN08vE8/MHHShN20ovOu6JXD37oDvnsTaFbp8Vdn9jgaHxQlV71I45SAjRdf/DAyG+MNSE2pkO79cr3qnVcClCpXqQH/YoCNcXUou0W8gdf2x5S5E8NntyJbPHpTbF5gmgjoq3n49mXPltBY9VBc75xp2oGiYfI6XR0xQ2YrEegVAEyTBRZIMjyTSmuwNIVFIehUkHiM/mSEGeONN1SzZ4SUpaPunktTI2fu4eQVy6n8VLRI3aH628kGuT1fnWD6DDT8T45rxCC5NrptkrG7b3uBN4osD6U4wqFzJDkWJk7mAjBYzKTzgttMt2EH1H9xAHb9 devtint@gmail.com
```

　　在 github 的 ssh keys 设置中：[https://github.com/settings/keys](https://github.com/settings/keys) 点击 `New SSH key` 添加刚才生成的 public key。

　　更多图文指引可以参照官方文档：[https://help.github.com/cn/articles/adding-a-new-ssh-key-to-your-github-account](https://help.github.com/cn/articles/adding-a-new-ssh-key-to-your-github-account)

　　

### 设置成功

　　使用 `ssh -T` 测试成功

```shell
$ ssh -T git@github.com
Hi shfshanyue! You've successfully authenticated, but GitHub does not provide shell access.
$ git clone git@github.com:shfshanyue/vim-config.git
Cloning into 'vim-config'...
remote: Enumerating objects: 183, done.
remote: Total 183 (delta 0), reused 0 (delta 0), pack-reused 183
Receiving objects: 100% (183/183), 411.13 KiB | 55.00 KiB/s, done.
Resolving deltas: 100% (100/100), done.
```
