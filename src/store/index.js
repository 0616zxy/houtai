import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import classify from './modules/classify'
import spec from './modules/spec'

export default new Vuex.Store({
    modules:{
        menu,
        role,
        manger,
        classify,
        spec,
    }
})