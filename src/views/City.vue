<template>
  <div>
    <van-index-bar :index-list="computedList" @select="handleChange">
      <div v-for="cities in citiesList" :key="cities.type">
        <van-index-anchor :index="cities.type" />
        <van-cell
          v-for="city in cities.list"
          :title="city.name"
          :key="city.cityId"
          @click="handleCity(city)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import Vue from "vue"
import { IndexBar, IndexAnchor, Cell, Toast } from "vant"
import http from "@/util/http"
import mixinObj from "@/util/mixinObj"

Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
Vue.use(Toast)
export default {
  mixins: [mixinObj],
  data () {
    return { citiesList: [] }
  },
  computed: {
    computedList () {
      return this.citiesList.map((item) => {
        return item.type
      })
    }
  },
  mounted () {
    console.log("citymounted")
    http({
      url: "https://m.maizuo.com/gateway?k=489171",
      headers: { "X-Host": "mall.film-ticket.city.list" }
    }).then((res) => {
      // console.log(res.data.data.cities);
      this.citiesList = this.renderCity(res.data.data.cities)
    })
  },
  methods: {
    handleChange (data) {
      Toast(data)
    },
    handleCity (city) {
      console.log(city)
      // 不能这样直接改，无人监管，会造成破坏，追踪不到
      // this.$store.state.cityName = city.name;
      // this.$store.state.cityId = city.cityId;
      // 这样改:commit提交
      // 把cinemaList清空，以便触发重新请求新城市数据
      this.$store.commit("changeCinemaList", [])

      this.$store.commit("changeCityName", city.name)
      this.$store.commit("changeCityId", city.cityId)
      console.log(this.$store.state)
      this.$router.push("/films/nowplaying")
    },
    // 过滤城市
    renderCity (list) {
      const letterList = []
      const cityList = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      letterList.forEach((letter) => {
        const newList = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        // console.log(newList);
        // 判断数组是否为空;
        newList.length > 0 && cityList.push({ type: letter, list: newList })
      })
      return cityList
    }
  }
}
</script>
<style>
.van-toast--html,
.van-toast--text {
  width: 30px;
}
</style>
