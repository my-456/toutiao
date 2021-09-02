<template>
  <div class="home-container">
    <van-nav-bar>
      <van-button
        slot="title"
        icon="search"
        round
        class="search-btn"
        size="small"
        type="info"
        to="/search"
      ></van-button>
    </van-nav-bar>
    <van-tabs class="channel" v-model="active">
      <van-tab class="tab-item" v-for="(item,index) in listInfo" :title="item.name" :key="index">
        <ArticalList :channel="item"/>
      </van-tab>
      <div slot="nav-right" class="mianbaio" @click="isChannelEditShow=true">
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <ChannelEdit :active="active" :listInfo="listInfo" @close="isChannelEditShow=false" @update-active="onUpdateActive"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user';
import ArticalList from './components/article-list.vue';
import ChannelEdit from './components/channel-edit.vue';
import {mapState} from 'vuex';
import { getItem } from '../../utils/storage';
export default {
  components:{
    ArticalList,
    ChannelEdit
  },
  data(){
    return{
      isChannelEditShow:false,
      active:"",
      listInfo:[]
    }
  },
  computed:{
    ...mapState(['user'])
  },
  created(){
    console.log(22)
    this.getList()
  },
  methods:{
    async getList(){
      let channels=[]
      if(this.user){
        const res=await getUserChannels()
        channels=res.data.data.channels
      }else{
        
        const localChannels=getItem('user-channels')
        if(localChannels){
         channels=localChannels
        }else{
           const res=await getUserChannels()
        channels=res.data.data.channels
        }
      }
      this.listInfo=channels
    },

    onUpdateActive(index){
      console.log(index)
      this.active=index
    }

  }
};
</script>

<style lang="scss" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
      color: #fff;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}

.channel{

 /deep/ .tab-item{
    border-bottom: 1px solid #EDEFF3;
    border-right:1px solid #ccc;
  }
  /deep/ .van-tabs__line{
    width: 15px;
    height: 3px;
  }
}


.mianbaio{
  width: 50px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  background: #fff;
  opacity: .9;
}
</style>