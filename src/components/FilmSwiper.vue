<template>
  <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-wrapper"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'
export default {
  mounted () {
    //    可搭配v-if或者:key="newList.length来使用"（diff算法）
    new Swiper('.mySwiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
        // type: "fraction",
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
      // scrollbar: {
      //     el: '.swiper-scrollbar',
      // },
    })
  }
}
</script>
<style>
.swiper-button-next,
.swiper-button-prev {
  color: rgb(79, 76, 76);
}
</style>
