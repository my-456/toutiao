<template>
  <div class="detail">
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 导航栏 -->
    <div class="detail-box">
    <h4 class="title">牛逼程序员都用的开元工具，你用了几个</h4>

    <van-cell center class="user-info">
      <div slot="title" class="name">天涯小型客</div>
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="label" class="pubdate">14小时前</div>
      <van-button class="follow-btn" type="info" icon="plus" round size="small"
        @click="onFollow"
        >关注</van-button
      >
    </van-cell>
    <div 
    class="content marckdown-body"
    v-html="article.content"
    ref="article-content"
    >
      <p>15641688416</p>
    </div>
    </div>

    <!-- 文章评论列表 -->
    <comment-list />
  </div>
</template>

<script>
import './github-markdown.css';//引入markdown css
import {getArticleById} from '../../api/article';
import { ImagePreview } from 'vant';
import { addFollow,deleteFollow} from '../../api/user';
import commentList from  './component/commentList.vue'
export default {
  components:{
    commentList

  },
  props: {
    articleId: {
      type: [Number,String,Object],
      required: true,
    },
  },
  data(){
    return{

      article:""
    }


  },

  created() {
    console.log("articleId", this.articleId);
    this.getDetail()
  },
  methods:{







    async getDetail(){
      const res=await getArticleById(this.articleId)
      this.article=res.data.data
      console.log('qe',res)

      this.handlePerviewImage()
     
    },

   async onFollow(){
      if(this.article.is_followed){
        //已关注，取消关注
        await deleteFollow(this.article.aut_id)
      }else{
        //没有关注，添加关注
         await addFollow(this.article.aut_id)
        
      }


      //没有关注，添加关注

    },

    handlePerviewImage(){
       //获取文章内容DOM容器
      const articleContent = this.$refs['article-content']
      
      //数据改变影响视图更新（Dom数据）不是立即的
      //所以如果需要在修改数据之后马上操作被该数据影响的视图DOM
      //需要把这个代码放到$nextTick中
      //得到所有的img 标签
      //this.$nextTick是 Vue提供的一个方法 
      const imgs=articleContent.querySelectorAll('img')
      console.log(imgs)
      //循环img 列表，给img注册点击事件
      //在事件处理函数中调用 ImagePreview() 预览
      const imgPaths=[]
      imgs.forEach((img,index)=>{
        imgPaths.push(img.src)
        img.onclick=function(){
          ImagePreview({
            images:imgPaths,
            startPosition:index
          })
        }
      })

    }
  }
};
</script>

<style lang="scss" scoped>

  .detail-box{
    padding:0 10px;
  }
 
  .user-info{
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }

    .name{
      font-size: 12px;
      color: #333333;
    }
    .pubdate{
      font-size: 11px;
      color: #b4b4b4;
    }
    .follow-btn{
      width: 85px;
      height: 29px;
    }
  }


  .content{
    padding: 14px;
    background: #fff;
  }
</style>