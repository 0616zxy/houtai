import Vue from 'vue'
import Router from 'vue-router'

const login = ()=>import('../pages/login/login')
const index = ()=>import('../pages/index/index')
const home = ()=>import('../pages/home/home')
const menu = ()=>import('../pages/menu/menu')
const manger = ()=>import('../pages/manger/manger')
const role = ()=>import('../pages/role/role')
const classify = ()=>import('../pages/classify/classify')
const spec = ()=>import('../pages/spec/spec')
const goods = ()=>import('../pages/goods/goods')
const banner = ()=>import('../pages/banner/banner')
const vip = ()=>import('../pages/vip/vip')
const seckill = ()=>import('../pages/seckill/seckill')

Vue.use(Router)

export const indexRouters = [
  {
    path:'menu',
    component:menu,
    name:'菜单管理'
  },
  {
    path:'manger',
    component:manger,
    name:'管理员管理',
  },
  {
    path:'role',
    component:role,
    name:'角色管理',
  },
  {
    path:'classify',
    component:classify,
    name:'商品分类',
  },
  {
    path:'spec',
    component:spec,
    name:'商品规格',
  },
  {
    path:'goods',
    component:goods,
    name:'商品管理',
  },
  {
    path:'banner',
    component:banner,
    name:'轮播图管理'
  },
  {
    path:'vip',
    component:vip,
    name:'会员管理',
  },
  {
    path:'seckill',
    component:seckill,
    name:'秒杀活动',
  }
]

const router= new Router({
  routes: [
    {
      path: '/login',
      component:login,
    },
    {
      path:'/index',
      component:index,
      children: [
        {
          path: 'home',
          component:home,
        },
        {
          path:'',
          redirect:'home'
        },
        ...indexRouters
      ]
    },
    {
      path:'/',
      component:login,
    },
    {
      path:'*',
      redirect:'login'
    }

  ]
})


// 全局守卫
router.beforeEach((to,from,next)=>{
  //  console.log(to)   //去的路径
  //  console.log(from)//来的路径
  //  console.log(next)//往下执行
  // 如果你去的是登录页面，直接往下走
 if(to.path=='/login'){
   next()
 }

// 如果去的不是登录页面  需要判断是否登录过，如果登录了直接next 否则不让走
var isLogin  = sessionStorage.getItem('isLogin')
if(isLogin){
  next()
}
})

export default router
