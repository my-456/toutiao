<template>
  <div class="user-profile">
      <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

      <van-cell title="头像" is-link center>
          <van-image
            width="30"
            height="30"
            round
            fit="cover"
            :src="user.photo"
            />
      </van-cell>
      <van-cell title="昵称" @click="isEditNameShow=true" is-link :value="user.name"></van-cell>
      <van-cell title="性别" is-link :value="user.gender==0?'男':'女'"></van-cell>
      <van-cell title="生日" is-link :value="user.birthday"></van-cell>

      <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{height: '100%'}"
      >
      <updataName  @close="isEditNameShow=false"/>
      </van-popup>
  </div>
</template>

<script>

import { getUserProfile } from '../../api/user.js';
import updataName from './components/updata-name.vue'
export default {
    components:{
        updataName
    },
    data(){
        return{
            user:{},
            isEditNameShow:false
        }
    },
    created(){
        this.loadUserProfile()
    },
    methods:{
        async loadUserProfile(){
            const {data} =await getUserProfile()
            this.user=data.data
            console.log(data)
        }
    }
}
</script>

<style>

</style>