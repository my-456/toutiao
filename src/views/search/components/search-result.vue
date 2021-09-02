<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '../../../api/search'
export default {
  props:{
    searchText:{
      type:String,
      required:true
    }

  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      perPage:10
    };
  },
  methods: {
     async  onLoad () {
       this.loading=true
      //1.请求获取数据mmmmmm
      //2.将数据放到数据列表中
      //3.关闭本次的loading
      //4.判断是否有数据
      // 如果有，则更新获取下一页数据的页码
      // 如果没有，则把finished 设置为true，关闭加载更多
      if(this.searchText){
      const {data} = await getSearchResult({
        page:this.page,
        per_page:this.perPage,
        q:this.searchText
      }) 
      this.loading=false
      
      if(data.data.results.length>1){
        this.page++
        this.list.push(...data.data.results)
      }else{
        this.finished=true
      }
      console.log("data",data)

      
      }
     
    },
  }
};
</script>

<style lang="scss" scoped>

.search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 50px;
    overflow-y: auto;
}
</style>