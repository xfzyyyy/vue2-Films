<template>
  <ul>
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" role="link">
        <span :class="isActive ? 'filmsactive' : ''">正在热映</span>
      </li>
    </router-link>
    <router-link to="/films/comingsoon" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" role="link">
        <span :class="isActive ? 'filmsactive' : ''">即将上映</span>
      </li>
    </router-link>
  </ul>
</template>
<style lang="scss" scoped>
.filmsactive {
  color: orange;
  border-bottom: 2px solid orange;
}
ul {
  width: 100%;
  display: flex;
  li {
    text-align: center;
    height: 2.7222rem;
    flex: 1 1 50%;
    span {
      display: inline-block;
      height: 100%;
      line-height: 2.7222rem;
    }
  }
}
.swiperimg img {
  width: 100%;
}
</style>
