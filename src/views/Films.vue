<template>
  <div>
    <film-swiper :key="dataList.length" class="swiperimg">
      <swiper-item v-for="data in dataList" :key="data.id">
        <img :src="data.imgurl" :alt="data.title" />
      </swiper-item>
    </film-swiper>
    <film-header class="film-header"></film-header>
    <router-view></router-view>
  </div>
</template>
<script>
import filmSwiper from '@/components/FilmSwiper.vue'
import swiperItem from '@/components/SwiperItem.vue'
import filmHeader from '@/components/FilmHeader.vue'
import 'swiper/css/bundle'
import axios from 'axios'
export default {
  components: { filmSwiper, swiperItem, filmHeader },
  data () {
    return { dataList: [] }
  },
  mounted () {
    // setTimeout(() => {
    //   this.dataList = [111, 222, 333, 444]
    // }, 1000)
    axios.get('http://localhost:8080/banner.json').then((res) => {
      // console.log(res)
      this.dataList = res.data.banner
    })
  }
}
</script>
<style scoped>
.film-header {
  position: sticky;
  top: 0px;
  background: white;
  z-index: 99;
}
</style>
