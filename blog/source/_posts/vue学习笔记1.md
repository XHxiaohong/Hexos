---
title: vue学习笔记一
date: 2018-07-04 17:43:44
tags:
---
## 前言
&nbsp;&nbsp;&nbsp;&nbsp;其实一直都想写下一些关于自己学习过技术之类的博客，只是因为刚刚入行，许多知识并不全面，所以一直没有动手。今天因为看到hexo结合githup搭建个人博客的技术，练习之余,顺手整理了一下自己学习vue时的笔记与个人理解。大概会作为一个系列更新，若有错漏，还望指正。

## vue简介

&nbsp;&nbsp;&nbsp;&nbsp;如官网所言,Vue.js是一款轻量级的以数据驱动的渐进式JavaScript 框架。采用了MVVM架构模式，即所谓的数据双向绑定，数据驱动和组件化的前端开发，用过简单的api实现了响应式数据绑定和数据行为分离。简单、小巧、易于上手。


## vue 项目的搭建
&nbsp;&nbsp;&nbsp;&nbsp;1.安装 node.js    资源包下载[node官网](https://nodejs.org/en/)或[node中文网](http://nodejs.cn)
安装后检查node和npm的版本，打开cmd执行命令：

    node -V
    npn -V 
 
    
<!--more-->


&nbsp;&nbsp;&nbsp;&nbsp;2.安装vue脚手架工具

    npm install -g vue-cli 或 cnpm install -g vue-cli
    vue -V 

&nbsp;&nbsp;&nbsp;&nbsp;3.生成vue项目

	vue init webpack Vue-Project  （Vue-Project是自定义的项目名称）

&nbsp;&nbsp;&nbsp;&nbsp;4.安装项目依赖

	npm install 或cnpm install

&nbsp;&nbsp;&nbsp;&nbsp;5.运行vue项目

	npm run dev （如果需要额外添加依赖，根据控制台提示install）
 


**注1：**使用cnpm安装时，应先设置cnpm，命令：

	npm install -g cnpm --registry=https://registry.npm.taobao.org

**注2：**运行vue后，会在本地起一个服务，在cmd上生成一行代码Your application is running here：**http://localhost:8080**，在浏览器地址栏里输入**http://localhost:8080**  就可以打开你vue项目页面了
**注3：**当然除了使用vue-cil搭建vue项目外，vue还可以手动搭建vue项目，毕竟官方文档并不推荐新手用vue-cil


未完待续...