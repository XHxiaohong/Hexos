---
title: vue学习笔记二
date: 2018-07-13 17:37:11
tags:
---

## 前言

&emsp;&emsp; 最近一直没有动手写博客，一个是没有时间，另一个是感觉到了个人的不足，今天动手写这篇微博，一个完成vue系列的学习笔记，另一个是温习一下vue。

## 目录
1. 深入组件
    1.1 插槽
    1.2 动态组件与异步组件
2. 复用
    2.1 自定义指令
    2.2 插件
    2.3 过滤器
3. 路由
    3.1 路由文件配置
    3.2 导航守卫


## 深入组件
    在上一篇中，我们已经接触到了组件，对于组件的应用有了初步的了解，而在一些复杂的场景，单单基础的组件很难满足需求，在这里将会对这类情况进行解决。

### 1.1 插槽
&emsp; **组件** 主要是将相同的功能提出来进行封装，在现实应用场景中，不同的页面上功能更多的是相似而不是完全相同，这种情况，单单用组件就无法满足需求了，如果用上插槽就可以完美的解决这类问题。

    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>

    引用组件

    <base-layout>
        <h1 slot="header">Here might be a page title</h1>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
        <p slot="footer">Here's some contact info</p>
    </base-layout>

    
<!--more-->
### 1.2 动态组件和异步组件
&emsp; **动态组件** 在实际开发中，我们经常会用到选项卡之类的功能，虽然我们利用数据双向绑定也能可以满足，却不够优雅，而且有时候我们需要它们第一次被创建的时候缓存下来。

    <!-- 失活的组件将会被缓存！-->
    <keep-alive>
    <component v-bind:is="currentTabComponent"></component>
    </keep-alive>

查看[完整代码](https://jsfiddle.net/chrisvfritz/Lp20op9o/)

&emsp; **异步组件** 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。（注明：个人没有使用过）

    Vue.component('async-example', function (resolve, reject) {
        setTimeout(function () {
            // 向 `resolve` 回调传递组件定义
            resolve({
            template: '<div>I am async!</div>'
            })
        }, 1000)
    })

## 复用
&emsp;在实际开发中，会有很多重复性的代码，为了减少不必要的工作和开发周期，提高代码的复用是必不可少的。例如：封装组件。

### 2.1 自定义指令
    除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。

    **案例**
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {// 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
            el.focus()// 聚焦元素
        }
    })

    **钩子函数**
        bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
        componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
        unbind：只调用一次，指令与元素解绑时调用。

    **指令钩子函数的参数**
        el：指令所绑定的元素，可以用来直接操作 DOM
        binding：{
            name：指令名，不包括 v- 前缀。
            value：指令的绑定值，例如：v-my-directive="1+1"中，绑定值为 2。
            oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
            expression：字符串形式的指令表达式。例如v-my-directive="1+1"中，表达式为 "1+1"。
            arg：传给指令的参数，可选。例如 v-my-directive:foo中，参数为"foo"
            modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar中，修饰符对象为{ foo: true, bar: true }
        }
        vnode：Vue 编译生成的虚拟节点。
        oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

### 2.2 插件
&emsp;插件通常会为 Vue 添加全局功能。

**添加插件的方法**
    1. 添加全局方法或者属性，如: vue-custom-element
    2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
    3. 通过全局 mixin 方法添加一些组件选项，如: vue-router
    4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
    5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router

**使用插件的方法**
    一般通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 创建vue实例之前完成。

### 过滤器
&emsp; Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示。
 
    <!-- 在双花括号中 -->
    {{ message | capitalize }}

    <!-- 在 `v-bind` 中 -->
    <div v-bind:id="rawId | formatId"></div>


## 路由
&emsp; vue 是单页开发，页面跳转不再是后台返回的 url 进行跳转，而是由前端js控制进行跳转的。参考[官方路由](https://router.vuejs.org/)

### 3.1路由文件配置：
    这里以 vue-cli 创建的项目为例：

    router.js
        
        import Vue from 'vue'
        import Router from 'vue-router'
        import Home form '@/components/(你的文件路径)'

        Vue.use(Router)

        export default new Router({
            path: '/',
            name: 'Home',
            component: Home,
        });

    main.js

        import router from './router'
        new Vue({
            el: '#app',
            router,
            store,
            components: { App },
            template: '<App/>'
        })

### 3.2 导航守卫
vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。对页面跳转进行判断，常见的用法：返回 404 页面、 进行用户权限判断等。
参考[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

    const router = new VueRouter({ ... })

    router.beforeEach((to, from, next) => {
        // ...
    })

    **参数：**
        1. to: Route: 即将要进入的目标 路由对象。
        2. from: Route: 当前导航正要离开的路由。
        3. next: Function: (必须) 当 next() 不传参时，直接跳转到下一个路由；next({ path: '/'（这里的路由如果与 to（当前导航） 里的路由不同，则中断当前导航，跳转 参数 指向的路由） })；next(error): 导航会被终止且该错误会被传递给 router.onError() 注册过的回调