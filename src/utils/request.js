import axios from "axios";
import store from "../store";
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/'
})


request.interceptors.request.use((config) => {

    const { user } = store.state
    if(user){
        config.headers.authorization = `Bearer ${user.token}`
    }
    return config
  })












export default request