<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>
<script>
import { getComments } from '@/api/comment'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset:null,
      limit:10 //每页数量
    };
  },
  methods: {
   async onLoad() {
       /**
        * 1.请求获取数据
        * 2.把数据放到列表中
        * 3.将本次的laoding关闭
        * 4.判断是否还有数据
        * 如果有更新下一页数据页码
        * 没有 将finished设置为true
        */
        const {data}=await getComments({
            type:'a',
            source:this.source,
            offset:this.offset,
            limit:this.limit //每页大小
        })
        //把数据放到列表中
        const {results} = data.data
        this.list.push(...results)

        //3.将本次的loading 关闭
        this.loading=false

        //4.判断是否还有数据
        if(results.length){
            this.offset=data.data.last_id
        }else{
            this.finished=true
        }      
    },
  },
};
</script>

<style>
</style>