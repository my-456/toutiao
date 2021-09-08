<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <input
     type="file" 
     hidden 
     ref="file" 
     accept="image/*"
     @change="onFileChange"
     />
    <van-cell title="头像" center @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isEditNameShow = true"
      is-link
      :value="user.name"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender == 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell title="生日"  @click="isEditDateShow = true"  is-link :value="user.birthday"></van-cell>

    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 编辑姓名 -->
      <updataName
        v-if="isEditNameShow"
        :name="user.name"
        v-model="user.name"
        @close="isEditNameShow = false"
      />
    </van-popup>

    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
    >
      <!-- 编辑性别 -->
      <updataGender
        v-if="isEditGenderShow"
        :gender="user.gender"
        v-model="user.gender"
        @closeGender="isEditGenderShow=false"
      />
    </van-popup>



     <van-popup
      v-model="isEditDateShow"
      position="bottom"
    >
      <!-- 编辑生日 -->
      <updatadate
        v-if="isEditDateShow"
        :birthday="user.birthday"
        v-model="user.birthday"
        @closeDate="isEditDateShow=false"
      />
    </van-popup>


    
     <van-popup
      v-model="isEditAvatarShow"
      position="bottom"
    >
      <!-- 编辑头像-->
      <updataPhoto
        v-if="isEditAvatarShow"
        :photo="previewImage"
        @close="isEditAvatarShow=false"
        @updata-photo="user.photo=$event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "../../api/user.js";
import updataName from "./components/updata-name.vue";
import updataGender from "./components/updata-gender.vue";
import updatadate from "./components/updata-date.vue";
import updataPhoto from "./components/updata-photo.vue";
export default {
  components: {
    updataName,
    updataGender,
    updatadate,
    updataPhoto
  },
  data() {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditDateShow:false,
      isEditAvatarShow:false,
      previewImage:null
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile();
      this.user = data.data;
      console.log(data);
    },
    GenderShow(event){
        console.log("event",event)
        this.user.gender=event
        this.isEditGenderShow=false
    },

    onFileChange(value){
        this.isEditAvatarShow=true
        //在弹出层里面预览图片
        const blob=this.$refs.file.files[0]
      //  const blob=window.URL.createObjectURL(this.$refs.file.files[0])
        this.previewImage=blob
        console.log(blob)


        console.log(value)
        //为了解决相同文件不触发 change事件，所以在这里手动清空file的value
        this.$refs.file.value = ''
       
    }


 
  },
};
</script>

<style>
</style>