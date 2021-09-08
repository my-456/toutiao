import Vue  from "vue"
import VueRouter from 'vue-router'
//import { Dialog } from 'vant';
//import store from "../store/index"
Vue.use(VueRouter)

//路由表

const routes=[
    {
        path:'/login',
        name:'login',
        component: () =>import('../views/login'),
       // meta:{requiresAuth:false}
    },
    {
        path:'/',
        component: ()=>import('../views/layout'),
        children:[
            {
                path:"",
                component:()=>import('../views/home'),
         //       meta:{requiresAuth:true}
            },
            {
                path:"/my",
                component:()=>import('../views/my'),
         //       meta:{requiresAuth:false}
            },
            {
                path:"/qa",
                component:()=>import('../views/qa'),
            //    meta:{requiresAuth:false}
            },
            {
                path:"/video",
                component:()=>import('../views/video'),
              //  meta:{requiresAuth:false}

            },
            {
                path:"/search",
                component:()=>import('../views/search'),
              //  meta:{requiresAuth:false}
            },
            {
                path:"/user-profile",
                component:()=>import('../views/user-profile'),

            },
        ]
    },
    {
        path:"/detaile/:articleId",
        name:"Detail",
        component:()=>import('../views/detaile'),
        //将动态路由参数映射到组建
        props:true,

    },
    {
        path:"/user-chat",
        name:"userChat",
        component:()=>import('../views/user-chat'),
        //将动态路由参数映射到组建
        props:true,

    },
]


const router =new VueRouter({
    routes
})

//to:要访问的页面路由信息
//from:来自哪个页面的路由信息
//next:放行标记

// router.beforeEach((to,from,next)=>{
    
    
//     if(to.meta.requiresAuth){
//         if(store.state.user){
//             return next()
//          }

//         Dialog.confirm({
//             title: '访问提示',
//             message: '该功能需要登录才能访问',
//           })
//             .then(() => {
//               // 通过
//               next()
//             })
//             .catch(() => {
//               // 中断路由导航
//               next(false)
//             });
//     }

// })

export default router