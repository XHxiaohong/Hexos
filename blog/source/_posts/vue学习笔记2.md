---
title: vue学习笔记二
date: 2018-07-13 17:37:11
tags:
---

## 前言

&emsp;&emsp;之前写了一篇关于vue项目的搭建，个人感觉其实并没有什么实质性的内容，都是一些简单的命令行操作。这一篇将会讲解一些的vue基础知识，算是初步入门了吧。

## 目录
1.声明式渲染

2.数据双向绑定
&nbsp;&emsp;2.1双向绑定的概念
&nbsp;&emsp;2.2双向绑定的实现原理
&nbsp;&emsp;2.3双向绑定的案列

3.vue开发常用指令介绍
&nbsp;&emsp; 3.1 v-if条件渲染
&nbsp;&emsp; 3.2 v-for循环
&nbsp;&emsp; 3.3 v-on 事件监听器
&nbsp;&emsp; 3.4 v-bind 属性绑定
&nbsp;&emsp; 3.5 v-model 表单输入绑定
&nbsp;&emsp; 3.6 v-show 显示隐藏

4.组件开发
&nbsp;&emsp; 4.1 组件基础
&nbsp;&emsp; 4.2 组件通讯
&nbsp;&emsp; 4.3 递归组件
    
<!--more-->
## 声明式渲染
&emsp;&emsp;Vue允许采用简洁的模板语法来**声明式**地将数据渲染进 DOM 的系统
&emsp;&emsp;因为vue采用的是数据双向绑定，所以改变message的值DOM也会发生改变，所以也称为**响应式元素**

	html 部分
	<div id="app">
    {{ message }} <!-- 字符串模板 -->
  </div>

    js 部分
    var app = new Vue({ // 创建vue实例
      el: '#app', // 绑定元素
      data: {
        message: 'Hello Vue!' // 声明式数据
      }
    })

## 数据双向绑定

####  1. 双向绑定的概念
> 引用**[一像素《Vue.js 和 MVVM 小细节》](https://www.cnblogs.com/onepixel/p/6034307.html)**
&nbsp;&nbsp;&nbsp;&nbsp;MVVM 是Model-View-ViewModel 的缩写，它是一种基于前端开发的**架构模式**，其核心是提供对View 和 ViewModel的**双向数据绑定**，这使得ViewModel的状态改变可以自动传递给 View，即所谓的数据双向绑定。
&nbsp;&nbsp;&nbsp;&nbsp;MVVM 由 Model,View,ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。

&emsp;&emsp;对于双向绑定，我更喜欢说的通俗一点：双向绑定，即是表现层（UI界面）和数据层（应用的数据）行为（数据变动）一致。

####  2. 双向绑定的实现原理
&emsp;&emsp;既然要分析双向绑定的实现原理，那就要先弄清楚它的工作模式。这是vue官方文档的案例：

	html 部分
	<div id="app-6">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>

    js 部分
    var app = new Vue({
      el: '#app-6',
      data: {
        message: 'Hello Vue!'
      }
    })

&emsp;&emsp;我把vue的双向绑定分为三个步骤：
&emsp;&emsp;&emsp;&emsp;第一步：页面数据和数据层数据保持一致。即界面上p标签和input标签里展示的数据和js代码里的message属性的数据一致。这一步很好完成，使
&emsp;&emsp;用js代码将数据渲染到页面就可以了;
&emsp;&emsp;&emsp;&emsp;第二步：页面数据发生改变时数据层数据和界面数据要保持一致。即在input输入框里输入新数据时，js里的message属性和界面p标签里的数据也
&emsp;&emsp;要发生改变，且变化要与input输入框里的数据保持一致。这一步也比较简单，使用js代码监听input事件，获取到input表签里的数据，再通过js把获取
&emsp;&emsp;到的数据赋值给message属性，并渲染到界面的p标签中;
&emsp;&emsp;&emsp;&emsp;第三步：数据层数据发生改变时，界面数据要和数据层数据要保持一致。即js里的message属性发生改变时，界面p标签和input标签里的数据也要
&emsp;&emsp;发生相同的改变。在这里vue 采用了订阅者模式监听message属性，当message属性发生改变时，js代码将改变后的数据渲染带页面。

#### 3. 双向绑定的案列
	<input type="txt" id="a">
	<p id="b"></p>

	<script type="text/javascript">
	  let obj = {}
	  function value() {
	  	obj.message = document.gitElementById('a').value
	  	console。log('obj.message=', obj.message)
	  }
	  Object.defineProperty(obj, 'message', {
	  	set: function (newVal) {
	  		document.getElementById('a').value
	  		document.getElementById('b').innerHTML
	  	}
	  })
	</script>
&emsp;&emsp; 这是我写的一个简单版本的数据双向绑定案例，实现了在input里输入数据，p标签会显示相同的内容，同时控制台也会打印出修改后obj.message。这样就实现了 model => view 以及 view => model 的双向绑定。

## vue开发常用指令介绍
&emsp; 指令用来扩展HTML功能，将js代码添加到html上，从而大大的减少了代码量。vue内置了很多指令，详情见[vue官方文档](https://cn.vuejs.org/v2/guide/conditional.html)。


#### 1. v-if条件渲染
&emsp;当判断条件成立时，显示h1标签里的内容，不成立时，则h1标签隐藏

	html 部分
	<h1 v-if="ok">Yes</h1>

	js 部分
	var app = new Vue({
      data: {
        ok: false
      }
    })
***
&emsp;也可以用 v-else 添加一个“else 块”,当判断条件成立时显示第一个h1标签里的类容，不成立时显示第二个h1标签里的内容：

    html 部分
    <h1 v-if="ok">Yes</h1>
    <h1 v-else>No</h1>

    js 部分
    var app = new Vue({
      data: {
        ok: false
      }
    })
***
&emsp;v-else-if模块是vue2.1.0版本新增的指令,顾名思义，充当 v-if 的“else-if 块”，可以连续使用：

    html 部分
    <div v-if="type === 'A'">A</div>
    <div v-else-if="type === 'B'">B</div>
    <div v-else-if="type === 'C'">C</div>
    <div v-else>Not A/B/C</div>

    js 部分
    var app = new Vue({
      data: {
        ok: false
      }
    })

#### 2. v-for循环
&emsp;v-for 用于**遍历**数组、对象等，会根据数据结构来渲染DOM树，减少了代码，操作也更加方便快捷。

	html 部分
	<ul id="example-1">
  	<li v-for="item in items">
      {{ item.message }}
  	</li>
	</ul>

	js 部分
	var app = new Vue({
      el: '#example-1',
      data: {
        items: [
          { message: 'Foo' },
          { message: 'Bar' }
        ]
      }
    })

#### 3. v-on 事件监听器
&emsp; v-on指令用于监听事件，用法1: v-on:事件名="函数" 可简写为：@事件名="函数"；用法2: v-on:事件名="赋值语句" 可简写为：@事件名="赋值语句"

    示例1：
    html 部分
    <div id="main">
      {{msg}}<br>
      <button type="button" v-on:click="showHello()">点击显示</button>
    </div>

    js 部分
    var app = new Vue({
      el: '#main',
      data: {
        msg: ''
      },
      methods: {
        showHello () {
          this.msg = 'Hello Vue.js'
        }
      }
    })   
***
    示例2：
    <div id="main">
      {{msg}}<br>
      <button type="button" v-on:click="msg=123">点击显示</button>
    </div>
***
##### v-on指令的一些扩展
&emsp; 在前端里，在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。vue为了更好的解决这类问题，提供了**事件修饰符**。
&emsp;&emsp;.stop       // 阻止冒泡
&emsp;&emsp;.prevent    // 阻止默认事件
&emsp;&emsp;.capture    // 捕获模式下触发事件 
&emsp;&emsp;.self       // 只作用在发生事件的元素上
&emsp;&emsp;.once       // 只作用一次
&emsp;&emsp;.passive    // 触发默认事件（即无法阻止默认事件）
    
#### 4. v-bind 属性绑定
&emsp;操作元素的属性(例如：class )值在前端是一个常见的需求，在vue里使用v-bind来处理它们：只需要通过表达式计算出字符串结果即可。
&emsp;用法: v-on:属性名="计算结果" 可简写为：:属性名="计算结果"；

	  html 部分
  	<div id="box" class="box" :class="[ber?'red':'green']"></div>
  	<button @click="ber=!ber">背景</button>

	  js 部分
  	var app = new Vue({
        el: '#main',
        data: {
          ber: true
        }
      })

      css 部分
      .box {
        width: 300px;
        height: 300px;
      }
      .red {background-color: red}
      .green {background-color: green}
&emsp;实现效果，点击按钮，变换div背景颜色

#### 5.v-model 表单输入绑定
&emsp; v-model指令用于表单元素数据绑定，负责监听数据变动，及时更新数据，实现数据**双向绑定**。

    html部分
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>

    js部分
    var app = new Vue({
      el: '#main',
      data: {
        message: '124355555'
      }
    })

#### 6.v-show 显示隐藏
&emsp; v-show指令和v-if指令类似，不同的是v-show没有v-else，且v-show 的元素始终会被渲染并保留在 DOM 中，只是被隐藏，而v-if是判断该元素存不存在，虽然在某些时候在界面上的展示行为相同，却有本质的区别。

    html部分
    <h1 v-show="ok">Hello!</h1>

    js部分
    var app = new Vue({
      data: {
        ok: false //为false时隐藏，为true时显示
      }
    })

## 组件开发
&emsp; 组件是一个带有名字的vue实例，我们可以在一个通过new Vue创建的vue根实例里报组件当成自定义元素来使用。
#### 1.组件基础
##### 1.1 组件注册
&emsp;组件注册分为两种，一种是**全局注册**，一种是**局部注册**。

    全局注册（全局注册的组件可以在各自的内部使用）
    Vue.component('组件名', {
      data: function () {
        return {
          i: o
        }
      },
      template: '<button @cllck="i++">{{i}}</button>'
      })
***

    局部注册（局部注册的组件在其子组件中不可用）
    通过一个普通的 JavaScript 对象来定义组件，然后在 components 选项中定义你想要使用的组件
    var ComponentA = { /* ... */ }
    new Vue({
      el: '#app'
      components: {
        'component-a': ComponentA
      }
    })

##### 1.2 组件的复用

&emsp; 从组件的注册可以看出，组件是一个**实例对象**，当我们创建实例对象时，就会生成新的组件，且不会相互影响。

#### 2. 组件间的通讯
&emsp; 在实际开发过程中，前端的数据大多是从后端请求过来的，并不是一成不变的，而数据改变时，我们的界面也要发生相应的变动。这时候我们就要向组件发送信息，告诉它数据发生了改变，你应该怎么变化。这就要用**组件之间的通讯**来完成这一步骤了。

##### 2.1 父组件向子组件传递数据
&emsp; 在开发过程中，从父组件向子组件传递数据是比较常见的需求，vue给我们提供prop来实现这一需求。Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就**变成了那个组件实例的一个属性**。通过调用组件实例的属性，我们就可以拿到父组件给的数据了。

    注册组件
    Vue.component('blog-post', {
      props: ['title'], // 定义poops里'title'为接收数据的属性
      template: '<h3>{{ title }}</h3>'
    })
    调用组件
    <blog-post title="My journey with Vue"></blog-post> // 给'title'属性赋值
**注**：一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。

#### 2.2 子组件向父组件传递信息
&emsp;在开发组件的过程中，它的一些功能可能要求我们和父级组件沟通来实现。vue给我们提供了一个**自定义事件系统:'$emit'**。
&emsp;跟组件和prop不同，事件名不存在任何自动化的大小写转换。触发的事件名需要与监听的事件名称完全保持一致。

    父组件html部分
    <button @Name="childName">子组件-name</button>
    <button @Age="childAge">子组件-age</button>
    <child :child-name="name" :child-age="age"></child>

    父组件js部分
    import child from './child-component' // 导入子组件
    var app = new Vue({
      el: '#app',
      data: {
        name: '小米',
        age: 24
      }
      component: {
        child: {
          template: '#child',
          props: ['child-name', 'child-age'],
          watch: {
            name: function(val) {
              // 参数一：事件名；参数二：传递的参数
              this.$emit('Name', val + '123')
            },
            age: function(val) {
              this.$emit('Age', val + '456')
            }
          }
        }
      },
      methods: {
        childName (val) {
          console.log('这是子组件里的name', val)
        },
        childAge (val) {
          console.log('这是子组件里的age', val)
        }
      }
    })

#### 3. 递归组件
&emsp;前面我们提到过vue组件是可以重复引用的，那么在组件里引用组件本身就可以形成一个递归组件了。和递归函数相似，递归组件是在vue实例里创建vue实例，新的实例成为上一个实例的属性，且每一个实例里的属性相同（这样描述并不准确，例如：组件里使用了v-for指令渲染节点，因为数据的差异导致了节点不同，从而实例的属性也不相同。所以这里的相同只是实例结构上的相同）并互不影响，所以递归组件里的样式和事件处理函数也相同，因此在写样式或处理函数的时候应该注意这一点。

    html部分
    <li v-for=(ley of arr) :key="key.id">
      <recursion :data='key'></recursion>
    </li>

    js部分
    var app = new Vue({
      el: '#app',
      data: {
        arr: [
          {
            id: 1,
            name: '小米',
            show: true,
            childData: {
              [
                {
                  id: 1-1,
                  name: '小露',
                  show: false,
                },
                {
                  id: 1-2,
                  name: '小蓝',
                  show: false,
                }
              ]
            }
          },
          {
            id: 2,
            name: '小明',
            show: false
          }
        ]
      },
      component: {
        recursion: {
          template: '#recursion',
          props: {data},
          template: '<div id='recursion'>
                      <li v-for>{{data.name}}</li>
                      <ul v-if(data.show)>
                        <li v-for(key of data.childData)>
                          <recursion :data='key'></recursion>
                        </li>
                      </ul>
                    </div>'
        }
      }
    })

未完待续...
