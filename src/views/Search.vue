<template>
  <div>
    <form action="/" class="cinemasTop">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
    </form>
    <cinema-list v-if="value" :dataList="computedList"></cinema-list>
  </div>
</template>
<script>
import Vue from "vue"
import { Search } from "vant"
import cinemaList from "@/components/CinemaList.vue"
Vue.use(Search)
export default {
  data () {
    return {
      value: ""
    }
  },
  components: { cinemaList },
  computed: {
    computedList () {
      return this.$store.state.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      )
    }
  },
  methods: {
    // onSearch(val) {
    //   Toast(val);
    // },
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    // 已经在cinemaList组件中做了
    // if (this.$store.state.cinemaList.length === 0) {
    //   this.$store.dispatch("getcinemaData");
    // } else {
    //   console.log("huancun");
    // }
  }
}
</script>
