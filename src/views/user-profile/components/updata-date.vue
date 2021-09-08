<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('closeDate')"
      @confirm="onDateChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "../../../api/user";
import dayjs from 'dayjs'
export default {
    props:{
        birthday:{
            type:String,
            required:true
        }
    },
    data() {
    return {
      minDate: new Date(1900, 4, 20),
      maxDate: new Date(2021, 10, 1),
      currentDate: new Date(this.birthday),
    };
  },

  methods:{
      async onDateChange(){
          let birthday=dayjs(this.currentDate).format('YYYY-MM-DD')
         
          await updateUserProfile({
              birthday:birthday
              
              })

        this.$emit('input',birthday)
          this.$emit('closeDate')
      }
  }
};
</script>

<style>
</style>