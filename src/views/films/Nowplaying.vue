<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in filmList"
        :key="data.filmId"
        @click="hanlleDetail(data.filmId)"
      >
        <li>
          <img :src="data.poster" :alt="data.name" />
          <div>
            <div class="film-title">{{ data.name }}</div>
            <div :class="data.grade ? '' : 'hidden'">
              观众评分：<i>{{ data.grade }}</i>
            </div>
            <div class="actor">
              主演:
              <span v-if="data.actors">
                <i v-for="actor in data.actors" :key="actor.name">{{
                  actor.name + " "
                }}</i>
              </span>
              <span v-else>暂无演员</span>
            </div>
            <div>
              <span>{{ data.nation }} | </span>
              <span class="runtime">{{ data.runtime }}分钟</span>
            </div>
          </div>
        </li>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import http from "@/util/http"
import Vue from "vue"
import { List, Cell } from "vant"

Vue.use(List)
Vue.use(Cell)
export default {
  data () {
    return {
      filmList: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  methods: {
    onLoad () {
      console.log("到底了")

      // 总长度匹配。禁用
      if (this.filmList.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=4633440`,
        headers: {
          "X-Host": "mall.film-ticket.film.list"
        }
      }).then((res) => {
        console.log(res.data.data.films)
        this.filmList = [...this.filmList, ...res.data.data.films]
        this.loading = false
      })
    },
    hanlleDetail (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=4633440`,
      headers: {
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then((res) => {
      // console.log(res.data.data.films)
      this.filmList = res.data.data.films
      //   记录总条数
      this.total = res.data.data.total
    })
  }
}
</script>

<style scoped lang="scss">
.van-list {
  // overflow: hidden;
  margin-bottom: 2.7778rem;
  .van-cell {
    padding: 0 15px;
  }
  li {
    padding: 0.8333rem 0;
    height: 5.2222rem;
    //   margin: 0 0.8333rem;
    // height: 6.6667rem;
    overflow: hidden;
    border-bottom: 1px solid rgb(161, 156, 156);
    img {
      float: left;
      width: 3.6111rem;
      margin-right: 0.5556rem;
      max-height: 5.2222rem;
      overflow: hidden;
    }
    div {
      float: left;
      width: 70%;
      .film-title {
        font-size: 16px;
        color: rgb(0, 0, 0);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      div {
        color: rgb(82, 80, 80);
        width: 100%;
        i {
          font-style: normal;
          color: orange;
        }
        font-size: 14px;
        span {
          i {
            color: rgb(82, 80, 80);
          }
        }
      }
      .actor {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .runtime {
        display: inline;
      }
    }
  }
}
.hidden {
  visibility: hidden;
}
</style>
