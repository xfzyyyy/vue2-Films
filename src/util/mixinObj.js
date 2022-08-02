const obj = {
  mounted () {
    console.log("objmounted")

    this.$store.commit("changeIsShowTabbar")
  },
  destroyed () {
    this.$store.commit("changeIsShowTabbar")
  }
}
export default obj
