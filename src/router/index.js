import Vue  from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由表

const routes=[
    {
        path:'/login',
        name:'login',
        component: () =>import('../views/login')
    },
    {
        path:'/',
        component: ()=>import('../views/layout'),
        children:[
            {
                path:"",
                component:()=>import('../views/home')
            },
            {
                path:"/my",
                component:()=>import('../views/my')
            },
            {
                path:"/qa",
                component:()=>import('../views/qa')
            },
            {
                path:"/video",
                component:()=>import('../views/video')
            },
            {
                path:"/search",
                component:()=>import('../views/search')
            },
            {
                path:"/user-profile",
                component:()=>import('../views/user-profile')
            },
        ]
    },
    {
        path:"/detaile/:articleId",
        name:"Detail",
        component:()=>import('../views/detaile'),
        //将动态路由参数映射到组建
        props:true
    },
]


const router =new VueRouter({
    routes
})

export default router