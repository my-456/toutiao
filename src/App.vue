<template>
  <div id="app">
    <keep-alive :include="['Layout']">
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'App',
  computed:{
    ...mapState(['cachePages'])
  }
}
</script>

<style>
#app {
 
}
</style>
