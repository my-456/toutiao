<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isclear = !isclear"
      >
        {{ isclear ? "完成" : "编辑" }}
      </van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        :class="active == index ? 'grid-item-s' : 'grid-item'"
        :icon="isclear && index !== 0 ? 'clear' : ''"
        v-for="(value, index) in listInfo"
        :key="value.id"
        :text="value.name"
        @click="onUserChannelClick(index,value.id)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="title">频道推荐</div>
      <van-button type="danger" plain round size="mini"> 编辑 </van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        @click="onAdd(value)"
        class="grid-item"
        v-for="value in recommendChanels"
        :key="value.id"
        :text="value.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels,addUserChannel,deleteUserChannel} from "../../../api/channel";
import { mapState } from 'vuex';
import { setItem } from '../../../utils/storage';
export default {
  name: "Channe",
  props: {
    listInfo: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      isclear: false,
      channelsList: [],
    };
  },

  computed: {
    ...mapState(['user']),
    recommendChanels() {
      //查找满足条件的所有元素
      return this.channelsList.filter((channel) => {
        //判断channel 是否属于用户频道
        //find方法查找满足条件的单个元素
        return !this.listInfo.find((userChannel) => {
          //找到满足该条件的元素
          return userChannel.id === channel.id;
        });
      });
    },
  },
  created() {
    console.log("标签列表", this.listInfo);
    this.getAllChannels();
  },
  methods: {
    async getAllChannels() {
      const res = await getAllChannels();
      this.channelsList = res.data.data.channels;
      console.log("数据", res);
    },

    async onAdd(channel) {
      this.listInfo.push(channel);

      //数据持久化
      if(this.user){
        //登陆了
        await addUserChannel({
          channels:[
            {
              id:channel.id,
              seq:this.userChannels.length
            }
          ]
        })
      }else{
        //没登录
         

      }
    },

    onUserChannelClick(index,channel) {
      if (this.isclear && index !== 0) {
        //编辑状态，删除
        this.deleteChannel(index,channel);
      } else {
        //费编辑状态
        this.switchChannel(index);
      }
    },

    async deleteChannel(index,channel) {
      
      if(index<=this.active){
        //更新激活频道的索引
        this.$emit('update-active',this.active - 1)
      }

      this.listInfo.splice(index, 1);

      //数据持久化
      if(this.user){
        console.log("删除持久化接口")
        //登陆了，持久化到线上
        await deleteUserChannel({channelId:channel})

      }else{
        //没有登陆，持久化到本地
        setItem('user-channels',this.userChannels)

      }
    },
    switchChannel(index) {
      console.log(index);
      this.$emit("close");
      this.$emit("update-active", index);
    },
  },
};
</script>

<style scoped lang="scss">
.channel-edit {
  padding-top: 54px;
}

.title {
  font-size: 16px;
  color: #333333;
}

/deep/ .van-grid-item__content {
  position: relative;

  .van-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 20rpx;
    z-index: 99;
    color: #ccc;
  }
}

/deep/ .grid-item {
  .van-grid-item__content {
    background: #e8e8e8;
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
      margin-top: 0;
    }
  }
}
 /deep/ .grid-item-s{
   .van-grid-item__content {
    background: #e8e8e8;
    .van-grid-item__text {
      font-size: 14px;
      color: red;
      margin-top: 0;
    }
 }
}
</style>