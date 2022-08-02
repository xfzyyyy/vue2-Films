<template>
  <div>
    <div class="wrapper" :style="{ height: height }">
      <ul class="content">
        <li v-for="data in dataList" :key="data.cinemaId">
          <div class="left">
            <div class="cinema_name">{{ data.name }}</div>
            <div class="cinema_text">{{ data.address }}</div>
          </div>
          <div class="right cinema_name">
            <div style="color: red">￥{{ data.lowPrice / 100 }}起</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"
export default {
  props: {
    dataList () {
      return {
        type: Array,
        default: []
      }
    }
  },
  data () {
    return { height: "0px" }
  },
  mounted () {
    // 分发
    // 判断下长度是否为0，以便减少发请求次数
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch("getcinemaData").then(() => {
        console.log("wanshi")
        this.$nextTick(() => {
          BScroll.use(ScrollBar)
          new BScroll(".wrapper", {
            scrollY: true,
            scrollbar: true
          })
        })
      })
    } else {
      console.log("缓存")
      this.$nextTick(() => {
        BScroll.use(ScrollBar)
        new BScroll(".wrapper", {
          scrollY: true,
          scrollbar: true
        })
      })
    }
    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=4828317`,
    //   headers: { "X-Host": "mall.film-ticket.cinema.list" },
    // }).then((res) => {
    //   // console.log(res.data.data.cinemas);
    //   this.cinemaList = res.data.data.cinemas;
    // 动态计算高度
    this.height =
      document.documentElement.clientHeight -
      document.querySelector(".footer").offsetHeight -
      document.querySelector(".cinemasTop").offsetHeight +
      "px"
    // this.$nextTick(() => {
    //   BScroll.use(ScrollBar);
    //   new BScroll(".wrapper", {
    //     scrollY: true,
    //     scrollbar: true,
    //   });
    // });
    // });
  }
}
</script>
<style lang="scss" scoped >
li {
  padding: 0.8333rem;
  display: flex;
  justify-content: space-between;
  .left {
    width: 11.777778rem;
  }
  .cinema_name {
    font-size: 15px;
  }
  .cinema_text {
    color: #797d82;
    font-size: 12px;
    margin-top: 5px;
  }
}
.wrapper {
  overflow: hidden;
  position: relative;
}
</style>
