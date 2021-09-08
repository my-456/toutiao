<template>
  <div class="article">
    <van-pull-refresh 
    v-model="refreshing" 
    @refresh="onRefresh"
    :success-text="refreshSuccessText"
    :success-duration="1500"
    >
      <van-list
        ref="article-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
          <Article  v-for="(item,index) in list"
            :key="index"
            :article="item"
          />
   
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '../../../api/article';
import Article from '../../../components/article-item/index.vue';
import {debounce} from 'lodash'
export default {
  name:"ArticleList",
  components:{
    Article
  },
  props: {
    channel: {
      typeof: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      list1:[
        {
          title:"1",
          name:'a',
          comm_count:"12",
          pubdate:"2013-12-20"
        },
        {
          title:"2",
          name:'a',
          comm_count:"12",
          pubdate:"2013-12-20"
        },
        {
          title:"3",
          name:'a',
          comm_count:"12",
          pubdate:"2013-12-20"
        },
        {
          title:"4",
          name:'a',
          comm_count:"12",
          pubdate:"2013-12-20"
        },
        {
          title:"5",
          name:'a',
          comm_count:"12",
          pubdate:"2013-12-20"
        },
        {
          title:"6",
          name:'a',
          comm_count:"12",
          pubdate:"2013-12-20"
        },
        {
           title:"7",
           name:'a',
          comm_count:"12",
          pubdate:"2013-12-20"
        }
      ],
      loading: false, //控制加载中的loading状态
      finished: false, //控制加载结束的状态，当加载结束，不再处罚加载更多
      refreshing: false,
      timestamp:null,  //获取下一页数据的时间戳
      refreshSuccessText:"",
      scrollTop:0
    };
  },
  mounted(){
    const articleList=this.$refs['article-list']
    articleList.onscroll=debounce(()=>{
      console.log(articleList.scrollTop)
      this.scrollTop=articleList.scrollTop
    },50)
  },

  /**
   * 从缓存中被激活
   */
  activated(){
    //把记录的位置设置回去
    this.$refs['article-list'].scrollTop=this.scrollTop
  },

  /**
   * 组件失去活动了
   */

  deactivated(){

  },


  methods: {
   async onLoad() {
    //1. 请求获取数据
    //2. 把数据放到list数组中
    //3. 设置本次加载状态结束，他才可以判断是否需要再一次加载，否则就会永远停在这里
    //4. 数据全部加载完成
        let data={
            channel_id:this.channel.id,
            timestamp:this.timestamp || Date.now(),
            with_top:'1'
            }
        const res = await getArticles(data)
        this.list.push(...res.data.data.results)
        console.log(res)
        this.loading=false
        if(res.data.data.results.length){
            //更新下一页数据页码
        this.timestamp=res.data.data.pre_timestamp
        console.log("有下一页")
        }else{
          console.log("没有数据了")
            //没有数据了，把加载状态设置结束
            this.finished=true
            
        }
    },
  async  onRefresh() {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
     // this.loading = true;
       let data={
            channel_id:this.channel.id,
            timestamp:1629341494424,
            with_top:1
            }
        const res = await getArticles(data)
        this.list.unshift(...res.data.data.results)
        //关闭下拉状态
        this.refreshing=false
        this.refreshSuccessText=`更新了${res.data.data.results.length}`
    },
  },
};
</script>

<style>

.article{
    position:fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
}

</style>