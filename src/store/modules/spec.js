import {reqSpecsCount,reqSpecsList} from '../../util/request'

const state = {
    total:0,
    size:2,
    page:1,
    list:[]
}

const mutations = {
    changeSpecsCount(state,num) {
        state.total = num
    },
    changeSpecsList(state,arr) {
        state.list = arr
    },
    //修改当前页码数
    changePage(state,page) {
        state.page=page
    }
}

const actions = {
    // 商品规格总数（用于计算分页）
    requestSpecsCount(context) {
        reqSpecsCount().then(res=>{
            context.commit('changeSpecsCount',res.data.list[0].total)
        })
    },
    //商品规格列表（分页）
    requestSpecsList(context) {
        reqSpecsList({
            page:context.state.page,
            size:context.state.size
        }).then((res) => {
             // attrs:'['27','28]'
            // console.log(arr)  ->包含所有属性
            var arr = res.data.list
            arr.forEach(item => {
                item.attrs=JSON.parse(item.attrs);
                // console.log(item.attrs)  //=>['27,28,29']
            })
            context.commit('changeSpecsList',arr)
        })
    },
    //修改当前页码数
    changeCurrentPage(context,page) {
        context.commit('changePage',page)
        context.dispatch('requestSpecsList')
    }
}

const getters = {
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    },
    list(state){
        return state.list
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}