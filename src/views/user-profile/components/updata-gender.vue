<template>
  <div class="gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('closeGender')"
      @confirm="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "../../../api/user";
export default {
  props: {
    gender: {
      type: [Number,String],
      required: true,
    },
  },
  data() {
    return {
      value: "",
      showPicker: false,
      columns: ["男", "女"],
      defaultIndex: this.gender,
    };
  },
  methods: {
    onGenderChange(picker, value) {
        console.log(picker,value)
      this.defaultIndex = value;
      this.onConfirm()
    },

    async onConfirm() {
        this.$toast.loading({
            message: '保存',
            forbidClick:true //禁止背景点击
        })
        try{
        await updateUserProfile({ gender: this.defaultIndex });
        console.log(this.defaultIndex)
        this.$emit("input",this.defaultIndex);
        this.$emit("closeGender");
        }catch(err){
            console.log(err)

        }
        this.$toast.clear()
     
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar__content {
  .van-nav-bar__text {
    color: #fff;
  }
}
</style>