<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="toBack" />
    <!-- 输入框 -->
    <van-form @submit="onLogin" validate-first ref="login-form">
    <van-cell-group>
      <van-field v-model="user.mobile" placeholder="请输入手机号" :rules="formRules.mobile" name="mobile"/>
      <van-field v-model="user.code" clearable placeholder="请输入验证码" :rules="formRules.code" name="code">
        <template #button >
          <van-count-down v-if="isCountDownShow" @finish="isCountDownShow=false" auto-start :time="time" format="ss s"  />
          <van-button v-else size="small" round @click.prevent="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 按钮 -->
    <div class="loginbtn">
      <van-button class="btn" type="info" block>登录注册</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { Login,sendSms} from "../../api/user";
import {Toast} from "vant"
export default {
  data() {
    return {
      time:1000*60,
      isCountDownShow:false,
      user: {
        mobile: "",//13922222222
        code: "",//246810
      },
      formRules:{
        mobile:[
          { required: true, message: '请填写手机号' },
          { pattern:/^1[3|5|7|8|9]\d{9}$/ ,message:"手机号格式错误"}
        ],
        mode:[
          { required: true, message: '请填写验证码' },
           { pattern:/^\d{6}$/ ,message:"验证码格式错误"}
          ]
      }
    };
  },
  methods: {
    async onLogin() {
      Toast.loading({
        message:'登录中...', //提示文本
        forbidClick:true , //禁止背景点击
        duration:0 //
      })
      try {
        const res = await Login(this.user);
        console.log('LOGIN',res);
        Toast.success("登录成功")
        //将后端返回的数据存入vuex
        this.$store.commit('setUser',res.data.data)

        //清除layout的缓存，让他重新渲染
        this.$store.commit('removeCachePage','LayoutIndex')
        this.$router.push('/')
      } catch (err) {
        console.log(err);
        Toast.fail('登录失败')
      }
    },


    //发送验证码
   async onSendSms(){
     try {
        await this.$refs['login-form'].validate('mobile')
        this.isCountDownShow=true
        const res=await sendSms(this.user.mobile)
        console.log(res)
     } catch (err) {
       this.$toast({
         message:err.message,
         position:'top'
       })
       console.log(err)
       
     }

    // this.isCountDownShow=false
    
    },


    toBack(){
      this.$router.back()
    }
  },
};
</script>

<style lang="scss" scoped>
.loginbtn {
  padding: 26px 16px;
  .btn {
    background: #6db4fb;
    border: none;
  }
}

.van-field__body {
  .van-field__button {
    .van-button {
      width: 100px;
      height: 30px;
      color: rgb(83, 82, 82);
      background: #e8e8e8;
    }
  }
}
</style>