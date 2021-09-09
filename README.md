**偷个懒把说明文档复制过来hhh**

附：程序使用说明

1. 程序环境部署及安装方式

本说明使用的系统环境为Ubuntu 20.04 LTS，Ruby版本为ruby 2.7.0p0

使用命令 `$bash install.sh` 运行解压缩后的程序内的安装脚本即可一键安装。

2. 程序的基本功能介绍
实验室管理系统中有四大模块，分别为登录模块、用户信息、耗材维护、日志管理

登录模块：输入工号、密码即可登录系统（初始工号为：1，密码：admin）

用户信息：用户可以在个人信息页面看到自己的操作日志。

耗材维护：该模块中有四个功能，分别为：耗材入库，耗材出库，耗材库存，仓库管理。

日志管理：用户可以在该模块看到所有用户的操作日志。

3. UI截图 (gitee图床)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121647.png)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121640.png)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121641.png)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121642.png)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121643.png)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121644.png)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121645.png)

![](https://gitee.com/im0o/photobed/raw/master/img/20210909121646.png)

4. 后端地址

@fantasyzhjk
https://github.com/fantasyzhjk/simple-lab-manager-system

5. Run Project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
