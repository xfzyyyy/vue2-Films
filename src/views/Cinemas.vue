<template>
  <div>
    <van-nav-bar
      class="cinemasTop"
      title="影院"
      left-text="返回"
      left-arrow
      @click-left="handleCity"
      @click-right="handleSearch"
    >
      <template #left>
        <div>{{ $store.state.cityName }}</div>
        <van-icon name="arrow-down" size="16" color="black" />
        <!-- <van-icon name="arrow-up" size="16" color="black" /> -->
      </template>
      <template #right>
        <van-icon name="search" size="24" color="black" />
      </template>
    </van-nav-bar>
    <cinema-list :dataList="$store.state.cinemaList"></cinema-list>
  </div>
</template>
<script>
import "vant/lib/index.css"
import Vue from "vue"
import { NavBar, Icon } from "vant"
// import 'vant/lib/style'
import cinemaList from "@/components/CinemaList.vue"
import mixinObj from "@/util/mixinObj"

Vue.use(NavBar)
Vue.use(Icon)
export default {
  mixin: [mixinObj],

  components: { cinemaList },
  methods: {
    handleCity () {
      this.$router.push("/city")
    },
    handleSearch () {
      this.$router.push("/cinemas/search")
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
