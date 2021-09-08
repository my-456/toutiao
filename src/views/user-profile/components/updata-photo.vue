<template>
  <div>
    <img class="image" :src="image" ref="image" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
//图片裁切 github搜索cropperjs   1.npm install cropperjs
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserProfile } from "@/api/user";
export default {
  props: {
    photo: {
      type:Object
    },
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.photo),
      cropper:null
    };
  },

  mounted() {
    const image = this.$refs.image; //获取图片dom
    this.cropper = new Cropper(image, {
      aspectRatio: 9 / 9,
      viewMode:1,
      dragMode: 'move',
      autoCropArea:1,
      cropBoxMovable:false,
      cropBoxResizable:false,
      background:false,
      movable:true,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      },
    });
    console.log(this.cropper)
  },

  methods: {

      getCroppedCanvas(){
          return new Promise(resolve=> {
              this.cropper.getCroppedCanvas().toBlob((blob) =>{
                  resolve(blob)  //返回裁剪后的图片
              })
          })
      },


    async onConfirm() {
      //如果要求 Content-Type 是 multipart/form-data,则一定要提交Form数据对象
      //专门用于文件上传的，不能提交{}
      const file=await this.getCroppedCanvas()
    //   const fd = new FormData();
    //   fd.append("photo", this.photo);
      await updateUserProfile(file);
      this.$toast.success("保存成功");
      let url=window.URL.createObjectURL(file)
      this.$emit("updata-photo", url);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar__content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

/deep/.van-nav-bar__content {
  .van-nav-bar__text {
    color: #fff;
  }
}


.image{
     display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%; 
}
</style>