import Vue from 'vue'
import Router from 'vue-router'
import { log } from 'util';
const Login = () => import('@/pages/Login'); 
const Home = () => import('@/pages/Home');
const ShopList = () => import('@/pages/ShopList');
const AddShop = () => import('@/pages/AddShop');
Vue.use(Router)

const router =  new Router({
    mode : 'history',
    routes:[
        {
            path:'/',
            component: Login,
            name: 'login',
            meta:{
              title: 'login',
              description:'登录'
            }
        },
        {
            path:'/login',
            component: Login,
            name: 'login',
            meta:{
              title: 'login',
              description:'登录'
            }
        },
        {
            path: '/home',
            component: Home,
            meta:{
              requireAuth: true
            }
        },
        {
            path: '/shopList',
            component: ShopList,
            meta:{
              title: '列表',
              description:'商品列表',
              requireAuth: true
            }
            
        },
        {
            path: '/home/addShop/:id',
            component: AddShop,
            meta:{
              requireAuth: true
            }
        },
        {
            path: '/home/addShop',
            component: AddShop,
            meta:{
              requireAuth: true
            }
        },
    ]
})
  router.beforeEach((to,form,next)=>{
    let token = localStorage.getItem('token');
    
    
      if (to.matched.some(record => record.meta.requireAuth)) {

        if (token) {

              next()
        }else {
          alert('未登录')
          next({
            path: '/login',
            query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
          })
        }
      } else {
        next()
      }
  })


export default router;