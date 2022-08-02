<template>
  <div class="swiper" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'
export default {
  props: {
    perView: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'mySwiper'
    }
  },
  mounted () {
    //    可搭配v-if或者:key="newList.length来使用"（diff算法）
    new Swiper('.' + this.name, {
      // loop: true
      slidesPerView: this.perView,
      spaceBetween: 20,
      freeMode: true
    })
  }
}
</script>
<style>
</style>
