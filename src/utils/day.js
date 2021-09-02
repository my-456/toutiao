//初始化dayjs相关配置
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'


//配置使用中文语言包
dayjs.locale('zh-cn')

//配置使用处理相对时间
dayjs.extend(relativeTime)

//例如日期格式化

//把处理时间的代码包装为全局过滤器 {{ xxx | relative}}
Vue.filter('relative',value=>{
    return dayjs(value).from(dayjs())
})