<template>
  <div class="box">
    <van-nav-bar title="小志同学" left-arrow @click-left="toBack" />

    <!-- 消息列表 -->
    <van-cell-group class="messageList" ref="message-list">
      <van-cell v-for="(item,index) in messages" :key="index" :title="item.msg"></van-cell>

    </van-cell-group>
    <div class="foot">
      <van-field class="input" v-model="message" placeholder="请输入内容" />
      <van-button @click="onSend">发送</van-button>
    </div>
  </div>
</template>

<script>
/**
 * 1.安装socket.io       npm i socket.io-client
 * 2.加载socket客户端     import io from 'socket.io-client'
 * 3.建立连接 const socket=io("http://localhost")
 */

import io from "socket.io-client";
import {setItem,getItem} from '../../utils/storage'
 const socket = io('http://ttapi.research.itcast.cn'); //接口地址
export default {
  data() {
    return {
        message:"",
        messages:getItem('chat-messages') || [],//数据列表
    };
  },
  watch:{
      messages(){
          setItem('chat-messages',this.messages)
          this.scrollToBottom()
      }

  },

  mounted() {
    //发送消息 socket.emit('消息类型'，消息内容)
    //socket.on('消息类型'，function(data) {data消息})
   

    socket.on("connect", function () {
      console.log("连接建立成功");
    });

    socket.on("disconnect", function () {
      console.log("建立连接失败");
    });

    //监听message事件，接收服务端消息

    socket.on('message',function(data){
        console.log(data)
        this.messages.push(data)
    })

    this.scrollToBottom()//滚动到最底部
  },


  methods:{
      onSend(){
          let data={
              msg:this.message,
              timestamp:Date.now()
          }
          //请求发送消息
          socket.emit('message',data)

          //把用户发出去的消息存储到数组中
          this.messages.push(data)
          this.message=""
      },

      scrollToBottom(){
          const list = this.$refs['message-list']
          list.scrollTop=list.scrollHeight

      },

      toBack(){
          this.$router.toBack()
      }
  }
};
</script>
 
<style lang="scss" scoped>
.box {
}
.foot {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  .input {
    flex: 1;
  }
}

.messageList {
  position: fixed;
  top: 46px;
  bottom: 44px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>