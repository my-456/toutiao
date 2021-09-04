import axios from "axios";
import store from "../store";
import JSONbig from 'json-bigint'
const request = axios.create({
     baseURL :`/api`,
   // baseURL:'http://ttapi.research.itcast.cn/',//基础路径

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


request.interceptors.request.use((config) => {

    const { user } = store.state
    if(user){
        config.headers.authorization = `Bearer ${user.token}`
    }
    return config
  })












export default request