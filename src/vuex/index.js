import Vue from 'vue'
import Vuex from 'vuex'
import persistedState  from 'vuex-persistedstate'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const store = new Vuex.Store({
    state,//属性值
    getters, //访问属性
    mutations, //更改属性
    actions, //Action 提交的是 mutation，而不是直接变更状态
    plugins: [persistedState({ storage: window.sessionStorage })]
})

export default store;