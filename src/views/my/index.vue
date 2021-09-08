<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell center :border="false" v-if="userInfo">
        <van-image
          class="avatar"
          slot="icon"
          width="66"
          height="66"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div class="name" slot="title">{{userInfo.name}}</div>
        <van-button class="update-btn" size="small" to="/user-profile" round>编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count" coun>{{userInfo.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login">
      <div @click="$router.push('/login')" class="login-box">
        <img src="./banner.jpeg" alt="" />
        登录/注册
      </div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item shoucang" icon="star-o" text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon="browsing-history-o lishi"
        text="历史"
      />
    </van-grid>

    <van-cell
      is-link
      title="单元格"
      link-type="navigateTo"
      url="/pages/dashboard/index"
    />
    <van-cell
      is-link
      title="小智同学"
      link-type="navigateTo"
      to="/user-chat"
      class="mb-4"
    />
    <van-cell v-if="user" title="退出登录" class="logout" @click="onLogout"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrentUser } from '../../api/user.js';
export default {
  data() {
    return {
      userInfo:{}
    };
  },
  computed: {
    ...mapState(["user"]),
    
  },
  created(){
    this.getUser() 
  },
  mounted(){
     this.getUser() 

  },
  methods:{

    //获取当前用户数据
    async getUser(){
      const user=await getCurrentUser()
      this.userInfo=user.data.data
      console.log("userInfo",user.data.data)
    },
    //退出登录
    onLogout(){
      this.$dialog.confirm({
        title:'退出提示',
        message: '确认退出吗？'
      }).then(()=>{//确认执行
        //清除登录状态
        this.$store.commit('setUser',null)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.my-info {
  background: url("./banner.jpeg") no-repeat;
  background-size: cover;
  .avatar {
    box-sizing: border-box;
    border: 1px solid #fff;
    margin-right: 11px;
  }
  .name {
    color: #fff;
    font-size: 15px;
  }

  .update-btn {
    height: 16px;
    font-size: 10px;
    color: #666666;
  }
}

.not-login {
  width: 100%;
  height: 180px;
  background: url("./banner.jpeg") no-repeat;
  background-size: cover;

  .login-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    color: #fff;
    background: chartreuse;
    align-items: center;
    font-size: 16px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
  }
}

.data-info {
  .data-info-item {
    height: 65rpx;
    color: #fff;
    .text-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .count {
        font-size: 18px;
      }
      .text {
        font-size: 11px;
      }
    }
  }
}
/**
  deep 深度作用操作符
  ==
  >>>
  ==
  ::v-deep
 */
/deep/ .nav-grid {
  background: #fff;
  .nav-grid-item {
    height: 70px;
    .van-icon {
      font-size: 22px;
    }
  }
  .shoucang {
    color: #eb5253;
  }
  .lishi {
    color: #ff9d1d;
  }
}

.my-container {
  .van-cell-group {
    .van-cell--center {
      box-sizing: border-box;
      background: none;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
    }
  }
}

.logout {
  text-align: center;
  color: #eb5253;
}

.mb-4 {
  border-bottom: 10px solid #e8e8e8;
}

/deep/ .van-grid-item__content {
  background: none;
}
</style>