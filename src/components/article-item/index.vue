<template>
  <div class="article-item">
      <van-cell class="article-item">
          <div slot="title">{{article.title}}</div>
          <div slot="label">
              <span>{{article.name}}</span>
              <span>{{article.comm_count}}</span>
              <span>{{article.pubdate}}</span>
          </div>

          <!-- 默认插槽名字叫default，可以省略 -->
          <van-image
            width="116"
            height="73"
            fit="cover"
            src="/src/assets/71c59a58f9a9df5e66a749eff385a802.jpeg"
          ></van-image>
      </van-cell>
  </div>
</template>

<script>
export default {
     name:"ArticleItem",
    props:{
        article:{
            type:Object,
            required:true
        }
    }
}
</script>

<style lang="scss" scoped>
    .article-item{
        .title{
            font-size: 16px;
            color: #3a3a3a;
        }

        /deep/.van-cell__value{
            flex:unset;
            width: 116px;
            height: 73px;
            margin-left: 12px;
        }

        .right-cover{
            width: 116px;
            height: 73px;
        }
    }
</style>