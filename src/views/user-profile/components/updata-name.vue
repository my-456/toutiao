<template>
  <div>
      <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
      >
      </van-nav-bar>

        <div class="namebox">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="昵称"
        type="textarea"
        maxlength="50"
        placeholder="请输入留昵称"
        show-word-limit
      >

      </van-field>
      </div>
  </div>
</template>

<script>
export default {

    data(){
        return{


        }
    },
    methods:{
        onConfirm(){

        }
    }


};
</script>

<style lang="scss" scoped>
/deep/ .van-overlay{

.van-popup{
background-color: #e8e8e8;
}

}


/deep/.van-nav-bar__content{
      .van-nav-bar__text{
        color: #fff;
    }
}

.namebox{
    box-sizing: border-box;
    padding: 10px;
}
  
</style>