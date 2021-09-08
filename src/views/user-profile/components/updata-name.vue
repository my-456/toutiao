<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
    <div class="namebox">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        label="昵称"
        type="textarea"
        placeholder=""
        maxlength="7"
        show-word-limit
      >
      </van-field>
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "../../../api/user";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.name,
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidclick: true, //禁止背景点击
      });
      let data = {
        name: this.localName,
      };
      try {
        await updateUserProfile(data);
        this.$emit("input", this.localName);
        this.$emit("close");
      } catch (err) {
        if (err.response.status === 409) {
          this.$toast.fail("昵称已存在");
        }
      }
      this.$toast.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
.van-popup {
  background-color: #e8e8e8;
}

/deep/.van-nav-bar__content {
  .van-nav-bar__text {
    color: #fff;
  }
}

.namebox {
  box-sizing: border-box;
  padding: 10px;
}
</style>