---
title: 使用 Travis-CI 自动部署 blog
date: 2018-03-08 16:45:09
tags:
---
# 开始使用 Travis-CI 自动部署 blog

## 参考文章

> [Travis-CI 自动化测试并部署至自己的 CentOS 服务器](https://juejin.im/post/5a9e1a5751882555712bd8e1)
>
> [Travis CI 自动化部署博客](https://blog.stephencode.com/p/travis-ci)

主要参考以上两个文章，其他碰到问题 google。

## 碰到问题

* 安装 ruby 报错

```cmd
# rvm install ruby
```

报了个这样的错[GPG signature verification failed for...](https://stackoverflow.com/questions/44555760/cannt-install-ruby-rvm-on-ubuntu-16-04-due-to-gpg-bug)
解决方案也在 stackoverflow 这个问题下

* 配置.travis.yml 之后运行到 before_install 报错

```yml
before_install:
- openssl aes-256-cbc -K $encrypted_****_key -iv $encrypted_****_iv
  -in id_rsa.enc -out ~\/.ssh/id_rsa -d
```

以上是自动生成的，最后找到原因是自动生成时 **~\/.ssh/id_rsa** 多了个 **\\**

以上。

## 后续优化

travis login 使用github-token登录
