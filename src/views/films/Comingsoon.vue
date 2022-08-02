<template>
  <div>
    comingsoon
    <ul>
      <li v-for="data in filmList" :key="data" @click="handleDetail(data)">
        {{ data }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return { filmList: [111, 222, 333] }
  },
  methods: {
    handleDetail (data) {
      // this.$router.push(`/detail/${data}`)
      this.$router.push({ name: 'fqlDeatil', params: { filmId: data } })
    }
  }
}
</script>
