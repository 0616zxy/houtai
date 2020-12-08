import {reqUserCount,reqUserList} from '../../util/request'

const state={
    total:0,
    list:[],
    page:1,//当前第几页
    size:2//每页展示的条数
}

const mutations = {
    changeUserCount(state,num) {
        state.total = num
    },
    changeUserList(state,arr) {
        state.list=arr
    },
    changePage(state,page) {
        state.page = page
    }
}

const actions = {
    // 管理员总数（用于计算分页）
    requestUserCount(context) {
        reqUserCount().then(res => {
            context.commit('changeUserCount',res.data.list[0].total)
        })
    },
    // 管理员列表（分页）
    requestUserList(context) {
        reqUserList({
            size:context.state.size,
            page:context.state.page,
        }).then(res =>{
            context.commit('changeUserList',res.data.list)
        })
    },
     // 修改当前的页码数
     changeCurrentPage(context, page){
         context.commit('changePage',page)
        context.dispatch('requestUserList')
     }
}

const getters = {
    total(state){
        return state.total
    },
    list(state){
        return state.list
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}