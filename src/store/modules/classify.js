import {reqClassifyList} from '../../util/request'

const state ={
    list:[],
}

const mutations={
    changeClassifyList(state,arr) {
        state.list = arr
    }
}

const actions={
    requestClassifyList(context) {
        reqClassifyList({
            istree:true
        }).then(res=>{
            context.commit('changeClassifyList',res.data.list)
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