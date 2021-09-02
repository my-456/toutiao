<template>
  <div class="search-suggestion">
       <van-cell 
       v-for="(item,index) in suggestions" 
       :key="index" 
       icon="search"  
       @click="$emit('search',item)"
       >
       <!-- highlight 字体高亮 -->
        <div slot="title" v-html="highlight(item)"></div>
       </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '../../../api/search';
import {debounce} from 'lodash'  //防抖函数第三方包 npm i lodash

export default {
    props:{
        searchText:{
            type:String,
            required:true
           
        }
    },
    data(){
        return{
           suggestions:[]
        }
    },
    created(){
       
    },
    watch:{
        searchText:{
            //当数据发生变化的时候则会执行handle 处理函数
            handler:debounce(async function(){
               console.log('hello')
               if(this.searchText){
               const {data}=await getSearchSuggestions(this.searchText)
               this.suggestions=data.data.options
               }
              
           },1000),
           //该回调将会在侦听开始之后被立即调用
           immediate:true
        }
    },

    methods:{
        highlight(str){
            console.log("str",str,new RegExp(this.searchText,'gi'))
            //RegExp是正则表达式的构造函数
            //参数1：字符串
            //参数2：匹配模式
            //返回值：正则对象
           return str.replace(
               new RegExp(this.searchText,'gi'),
               `<span style="color:red">${this.searchText}</span>`)
            
        }
    }

}
</script>

<style>

</style>