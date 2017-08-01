---
title: 创建个人站点
---
## 选择vps
之前有用过[搬瓦工](http://banwagong.cn) $19.9/年 洛杉矶机房，主要用处还是科学上网。用了将近一年，日常使用还是没问题，但是毕竟机房在美国还有线路等问题想要流畅访问油管还是有点力不从心，so 想换一台比较好的，于是看了很多很多教程、评测终于还是选定[vultr](https://vultr.com) $5/月 还是有点小贵的。

## 购买域名
直接在[Godaddy](https://godaddy.com)家买的，具体教程网上有很多，然后配置dns域名解析等等。

## 初始化站点
安装git、nodejs、nginx等
启蒙教程[搭建服务器](https://i.jakeyu.top/2016/10/17/centos+nodejs+nginx+mysql%E6%90%AD%E5%BB%BA%E6%9C%8D%E5%8A%A1%E5%99%A8/)
配置ssl [Let's Encrypt](https://imququ.com/post/letsencrypt-certificate.html)
以上都比较顺利，但是当想升级http2的时候碰到了很多坑最后也没有解决，首先openssl版本要升级，nginx版本要1.9.0以上并且默认安装版本是没有http2的，所以需要手动make，生成替换原来的nginx，这里就是碰到坑了替换之后https就有问题无法访问，以为是证书问题，就重新按照教程重来，结果还是不行，后来以为是配置问题，看了好多http2的配置一个个替换，还是不行，就还原原来的nginx版本立马就好了，也就放弃深究具体原因了。
之前有看到[caddy](https://caddyserver.com/)一个类似nginx应用，附带ssl、默认http2，就是特别简单配置一下就好了，证书也是Let's Encrypt的而且不用定时任务去更新证书，完全傻瓜式的配置。



