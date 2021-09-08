import axios from "axios";
import store from "../store";
import JSONbig from 'json-bigint'
import {Toast} from 'vant'
//import router from "../router";

const refreshTokenReg = axios.create({
    baseURL:'/api'
})


const request = axios.create({
     baseURL :`/api`,
    //baseURL:'http://ttapi.research.itcast.cn/',//基础路径

    transformResponse:[function(data){
        //后端返回数据可能不是 JSON 格式字符串
        //如果不是的话，那么JSONbig.parse 调用就会报错
        //所以我们使用try-catch 来捕获异常，处理异常的发生
        try{
            //如果转换成功,则直接把结果返回
            return JSONbig.parse(data)
        }catch(err){
            console.log('转换失败',err)
            //如果转换失败了则进入这里
            //我们在这里把数据原封不动直接返回
            return data
        }


    }]
})



//请求拦截器
request.interceptors.request.use((config) => {

    const { user } = store.state
    if(user){
        config.headers.authorization = `Bearer ${user.token}`
    }
    return config
  })


//响应拦截器

request.interceptors.response.use((response) => {

   
    return response
  },async(error)=>{
    //请求响应失败进入这里
    //超过2xx的状态码都会进入这里
    const status=error.response.status
    if(status === 400){
        //客户端错误
        Toast.fail("客户端请求参数异常")
    }
    else if(status === 401){
        //token无效
        /**
         * 如果没有user.token,直接重新登陆
         * 如果有refresh_token,则请求新的token
         * 拿到新的token之后把他更新到容器中
         * 把失败的请求重新发出去
         */
        const {user}=store.state
        if(!user || !user.token){
           // return redirectLogin()
        }
        //使用refresh_token请求新的token
        try {
            const {data}=await refreshTokenReg({
                method:'PUT',
                url:"/app/v1_0/authorizations",
                headers:{
                    authorization:`Bearer ${user.refresh_token}`
                }
            })
            //token刷新成功

            user.token =data.data.token
            store.commit('setUser',user)

            //把失败的请求重新发出去
            //error.config是本次请求的相关配置对象
            //这里使用的request 发请求，它会走自己的拦截器
            //他的请求拦截器中通过store容器访问token数据
            
        } catch (error) {
            //直接跳转登录页
            //redirectLogin()
        }



    }else if(status===403){
        //没有权限的操作
        Toast.fail("没有权限操作")
    }else if(status >= 500){
        //服务端异常
        Toast.fail("服务端异常，请稍后再试")
    }


    return Promise.reject(error)
  })

//   function redirectLogin(){//没有登录信息 跳转到登录页
//       router.replace({
//           path:"/login",
//           query:{
//               //数据名是自己起的
//               //router.currentRoute 和我们在组件中获取的this。$route 是一个东西
//               redirect:router.currentRoute.fullPath
//           }
//       })
//   }


export default request