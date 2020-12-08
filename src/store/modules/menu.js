// store中的state数据和actions中的方法，在组件中需要使用时，需解构引入mapGetters和mapActions ,并在computed中定义state数据，在method中定义ctions方法 1.当页面刚加载时就要发送axios请求进行渲染时，写在mounted中  2.触发事件时要发送请求渲染数据时就写在方法中，直接调用就行


import {reqMenuList} from '../../util/request'

const state={
    list: []
}

const mutations={
    changeMenuList(state,arr) {
        state.list =arr
    }
}

const actions={
    requestMenuList(context) {
        reqMenuList({istree:true}).then(res =>{
            context.commit('changeMenuList',res.data.list)
        })
    }
}

const getters={
    list(state){
        return state.list
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}