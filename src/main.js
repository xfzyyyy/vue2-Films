import Vue from "vue"
import App from "./App.vue" // 导入根组件
import router from "./router"
import store from "./store"

Vue.config.productionTip = false

new Vue({
  router, // 这样就可以通过this.$router访问到router
  store, // 这样就可以通过this.$store访问到store
  render: (h) => h(App) // vue新写法
}).$mount("#app")

// const obj = {
//   name: "fql",
//   age: 100
// }
// console.log(obj)
