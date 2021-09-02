<template>
  <div class="search-container">
    <van-search
      v-model="searchText"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      show-action
      @cancel="onCancel"
      @search="onSearch(searchText)"
      @focus="isResult=false"
    />

    <SearchResult :searchText="searchText" v-if="isResult"/>
    <SearchSuggestion :searchText="searchText" v-else-if="searchText" @search="onSearch"/>
    <SearchHistory :searchHistory="searchHistories" v-else/>
    
  </div>
</template>

<script>
import  SearchSuggestion  from "./components/search-suggestion.vue";
import  SearchHistory  from "./components/search-history.vue";
import  SearchResult  from "./components/search-result.vue";
import { mapState } from 'vuex';
import {getItem,setItem} from '../../utils/storage'
import {getSearchHistories} from '../../api/search'
export default {
  components: {
      SearchSuggestion,
      SearchHistory,
      SearchResult
  },
  data() {
    return {
      isText:true ,
      searchText: "",
      isResult:false,
      searchHistories:[]
    };
  },
  computed:{
    ...mapState(['user'])
  },

   created(){
   this.loadSearchHistoryies()
  },

  methods: {
    onSearch(searchText) {
       //展示搜索结果
      this.isResult=true
      console.log("确定",searchText);
      //把输入框设置成想要的搜索文本
      this.searchText=searchText

      const index =this.searchHistories.indexOf(searchText)
      console.log(index)
      if(index !== -1){
        //把重复项删除
        this.searchHistories.splice(index,1)
      }

      //记录搜索历史记录
      this.searchHistories.unshift(searchText)

      /**
       * 如果用户已登录，把搜索历史记录存到线上
       *  如果没有登录，存到本地
       */
      setItem('search-histories',this.searchHistories)


     
    },
    onCancel() {
      this.$router.back();
    },

   async loadSearchHistoryies(){

     //如果用户已登录
     let searchHistories = getItem('search-histories') || []

     if(this.user){
       const { data }=await getSearchHistories()
       console.log(data)
      searchHistories = new Set([...searchHistories,...data.data.keywords]) 
     }
     this.searchHistories = searchHistories
    }

  },
};
</script>

<style>
</style>