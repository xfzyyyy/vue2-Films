import Vue from "vue"
import Vuex from "vuex"
import http from "../util/http"
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer: (state) => {
        return {
          cityId: state.cityId,
          cityName: state.cityName
        }
      }
    })
  ],
  // state公共状态，所有组件都可以访问的
  state () {
    return {
      cityId: "310100",
      cityName: "上海",
      cinemaList: [],
      isShowTabbar: true
    }
  },
  getters: {},
  // 统一管理，被devtools记录状态的修改
  // 传state+载荷
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaList (state, cinemaList) {
      state.cinemaList = cinemaList
    },
    changeIsShowTabbar (state) {
      state.isShowTabbar = !state.isShowTabbar
    }
  },
  // 支持异步和同步
  actions: {
    // 传store+载荷
    getcinemaData (store) {
      console.log("getdata")
      // return一个promise，等待他落定之后，就可以在后面去new BetterScroll
      return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=4828317`,
        headers: { "X-Host": "mall.film-ticket.cinema.list" }
      }).then((res) => {
        store.commit("changeCinemaList", res.data.data.cinemas)
        console.log(res.data.data.cinemas)
        console.log(store)
      })
    }
  },
  modules: {}
})
