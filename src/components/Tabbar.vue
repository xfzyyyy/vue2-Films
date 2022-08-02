<template>
  <!-- 声明式导航 -->
  <ul class="footer" v-show="$store.state.isShowTabbar">
    <router-link to="/films" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" role="link" :class="isActive ? 'fqlactive' : ''">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iov-film-s"></use>
        </svg>
        <span>电影</span>
      </li>
    </router-link>
    <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" role="link" :class="isActive ? 'fqlactive' : ''">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-cinema"></use>
        </svg>
        <span>影院</span>
      </li>
    </router-link>
    <router-link to="/center" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" role="link" :class="isActive ? 'fqlactive' : ''">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfonticon5"></use>
        </svg>
        <span>我的</span>
      </li>
    </router-link>
  </ul>
</template>
<script>
import "../assets/font_3513497_9b4doqcpat/iconfont"
export default {}
</script>
<style lang="scss" scoped>
.fqlactive {
  color: orange;
  // background-color: pink;
}

ul {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 999;
  background-color: #fff;
  li {
    flex: 1 1 33.3%;
    height: 2.7778rem;
    line-height: 1.3889rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      flex: 1;
      font-size: 1.1111rem;
    }
    span {
      flex: 1;
      font-size: 0.8889rem;
    }
  }
}
</style>
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
