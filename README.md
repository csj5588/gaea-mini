# 前端随手记小程序

前端随手记小程序源码，记录前端平常成长开发历程，优秀代码片段等。

# 版本说明

master 分支为目前稳定版本，可使用非主线分支：

[https://github.com/csj5588/gaea-mini](https://github.com/csj5588/gaea-mini)


## 扫码体验

<img src="https://s1.ax1x.com/2020/10/16/0H99E9.jpg" width="200px">

## 详细配置/使用教程

```shell
yarn
```

**遇到使用问题？**

## 本项目使用了下面的组件，在此鸣谢

- [Taro](https://taro.aotu.io/)

- [Taro UI](https://taro-ui.jd.com/#/)

- [imgchr](https://imgchr.com/)

- [小程序富文本插件（html 渲染）](https://github.com/jin-yufeng/Parser)

- [小程序海报组件-生成朋友圈分享海报并生成图片](https://github.com/jasondu/wxa-plugin-canvas)

## 编译说明

本项目使用基于 ES7 的语法，所以请在开发工具中开启 “增强编译”， 否则会提示以下错误：

```
thirdScriptError 
 sdk uncaught third Error 
 regeneratorRuntime is not defined 
 ReferenceError: regeneratorRuntime is not defined
```

<img src="https://dcdn.it120.cc/2019/08/28/c5169c15-abda-4e5f-91d5-6dfcfe382fb2.png">

**如果你的开发工具没用看到“增强编译”的选项，请升级开发工具到最新版**

## 常见问题

- “无法登录” / Token 无效 ？

  1. 开发工具上点击 “清除缓存” —> “编译”

## 版本更新

### v1.1.1

- 分类模块，切分分割模板
- 修复columns-description 字段溢出问题
- 脑力游戏添加倒计时和遮挡规则。

### v1.1.0

- 新增脑力游戏入口

### v1.0.0

- 新增首页模块
- 新增分类模块
- 新增文章展示
- 新增轮播


