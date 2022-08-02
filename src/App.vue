//  必须要写template
<template>
  <div id="app">
    <tabbar></tabbar>
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>
<script>
import tabbar from './components/Tabbar.vue'
export default {
  components: { tabbar },
  data () {
    return {}
  }
}
</script>
//css
<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>
