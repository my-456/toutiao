<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDleteShow">
        <span>全部删除</span>
          &nbsp;&nbsp;
        <span @click="isDleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDleteShow=true"/>
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in searchHistory" :key="index" @click="onDelete(index,item)">
      <van-icon v-show="isDleteShow" name="close"  />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDleteShow: false, //删除的显示状态
    };
  },
  methods:{
    onDelete(index,item){
      console.log(index,item)
      if(this.isDleteShow){
        return this.searchHistory.splice(index,1)
      }
         this.$emit('search',item)
      }

      //非删除状态展示搜索结果
  }
};
</script>

<style>
</style>