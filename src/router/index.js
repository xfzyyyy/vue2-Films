import Vue from "vue"
import VueRouter from "vue-router"
import Films from "../views/Films.vue"
import Cinemas from "../views/Cinemas.vue"
import Center from "../views/Center.vue"
import Search from "../views/Search.vue"
import Comingsoon from "../views/films/Comingsoon.vue"
import Nowplaying from "../views/films/Nowplaying.vue"
import Detail from "../views/Detail.vue"
import City from "../views/City.vue"
Vue.use(VueRouter) // 注册路由插件,两个全局router-view router-link

// 配置表
const routes = [
  {
    path: "/films",
    component: Films,
    children: [
      {
        path: "comingsoon",
        component: Comingsoon
      },
      {
        path: "nowplaying",
        component: Nowplaying
      },
      {
        path: "/films",
        redirect: "/films/nowplaying"
      }
    ]
  },
  {
    path: "/center",
    component: Center
  },

  {
    path: "/city",
    component: City
  },
  {
    path: "/cinemas",
    component: Cinemas
  },
  {
    path: "/cinemas/search",
    component: Search
  },
  // 动态路由/命名路由
  {
    name: "Deatil",
    path: "/detail/:filmId",
    component: Detail
  },
  // 重定向
  {
    path: "/",
    redirect: "/films"
  },
  // 通配符，优先级最低，跟写的先后无关,文档中说写在后面？
  {
    path: "*",
    redirect: "/films"
  }
]

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes
})

// 全局路由拦截
router.beforeEach((to, from, next) => {
  // console.log(to)
  next()
})
export default router
