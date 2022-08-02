<template>
  <div v-if="detailObj">
    <svg class="icon left" aria-hidden="true" @click="handleBack">
      <use xlink:href="#icon-arrow-left"></use>
    </svg>
    <detail-header v-scroll="50">
      {{ detailObj.name }}
    </detail-header>
    <div
      :style="{ backgroundImage: 'url(' + detailObj.poster + ')' }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ detailObj.name }}</div>
      <div>
        <div class="content-text">{{ detailObj.category }}</div>
        <div class="content-text">
          {{ detailObj.premiereAt | dateFilter }}
        </div>
        <div class="content-text">
          {{ detailObj.nation }}|{{ detailObj.runtime }}分钟
        </div>
        <div class="content-text synopsis" :class="isHidden ? 'hidden' : ''">
          {{ detailObj.synopsis }}
        </div>
        <svg class="icon" aria-hidden="true" @click="handleIsHidden">
          <use xlink:href="#icon-arrow-down" v-show="isHidden"></use>
          <use xlink:href="#icon-arrow-up" v-show="!isHidden"></use>
        </svg>
      </div>
      <div>
        <div>演职人员</div>
        <detail-swiper class="detai-swiper" :perView="3.5" name="actors">
          <swiper-item
            class="swiper-item"
            v-for="actor in detailObj.actors"
            :key="actor.name"
          >
            <div
              :style="{ backgroundImage: 'url(' + actor.avatarAddress + ')' }"
              class="avatar"
            ></div>
            <div class="actname">
              {{ actor.name }}
            </div>
            <div class="actrole">
              {{ actor.role }}
            </div>
          </swiper-item>
        </detail-swiper>
      </div>
      <div>
        <div>剧照</div>
        <detail-swiper class="detai-swiper" :perView="2.5" name="photos">
          <swiper-item
            class="swiper-item"
            v-for="(photo, index) in detailObj.photos"
            :key="index"
          >
            <div
              :style="{ backgroundImage: 'url(' + photo + ')' }"
              class="avatar"
              @click="handlePreview(detailObj.photos, index)"
            ></div>
          </swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/util/http"
import Vue from "vue"
import { ImagePreview } from "vant"
import moment from "moment"
import detailSwiper from "@/components/DetailSwiper.vue"
import swiperItem from "@/components/SwiperItem.vue"
import detailHeader from "@/components/DetailHeader.vue"
import mixinObj from "@/util/mixinObj"
Vue.filter("dateFilter", (date) => {
  return moment(date * 1000).format("YYYY-MM-DD")
})
Vue.directive("scroll", {
  inserted (el, binding) {
    // console.log(el)
    el.style.display = "none"
    window.onscroll = () => {
      // 初始化时不显示
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        binding.value
      ) {
        el.style.display = "block"
      } else {
        el.style.display = "none"
      }
    }
  },
  unbind () {
    // 指令周期。销毁时解除绑定
    window.onscroll = null
  }
})
export default {
  mixins: [mixinObj],
  data () {
    return { detailObj: null, isHidden: true } // detailList是一个对象
  },
  components: { detailSwiper, swiperItem, detailHeader },
  created () {
    http({
      url: `/gateway?filmId=${this.$route.params.filmId}&k=681100`,
      headers: {
        "X-Host": "mall.film-ticket.film.info"
      }
    }).then((res) => {
      console.log(res.data.data.film)
      this.detailObj = res.data.data.film
    })
  },

  methods: {
    handleIsHidden () {
      this.isHidden = !this.isHidden
    },
    handleBack () {
      console.log(this.$router)
      this.$router.back()
    },
    handlePreview (photos, index) {
      ImagePreview({
        images: photos,
        startPosition: index,
        closeable: true
        // overlaystyle: { 'z-index': 99999 }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.left {
  // float: left;
  font-size: 30px;
  color: #9b9c9e;
  position: fixed;
  left: 0.5556rem;
  line-height: 2.4444rem;
  height: 2.4444rem;
  z-index: 999;
}
.poster {
  width: 100%;
  height: 11.6667rem;
  // margin-top: 2.4444rem;
  background-position: center;
  background-size: cover;
}
.content {
  padding: 0.8333rem;
  div {
    .icon {
      width: 100%;
      color: #9b9c9e;
      text-align: center;
    }
  }
  .content-text {
    color: #797d82;
    font-size: 13px;
    margin-top: 0.2222rem;
  }
}

.synopsis {
  line-height: 0.8333rem;
}
.hidden {
  height: 1.6667rem;
  overflow: hidden;
}
.detai-swiper {
  height: 7.2778rem;
  .swiper-item {
    width: 4.7222rem;
    .avatar {
      width: 100%;
      height: 4.7222rem;
      background-position: center;
      background-size: cover;
    }
    div {
      width: 100%;
      text-align: center;
      font-size: 12px;
    }
    .actrole {
      color: rgb(124, 117, 117);
    }
  }
}
</style>
