<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
    <Navbar v-if="isLogged" />
    <RouterView />
</template>

<script>
const storedIsLogged = localStorage.getItem('isLogged');

export default {
  data(){
    return{
      isLogged : false
    }
  },
  watch(){
    if (storedIsLogged === 'true') {
    this.isLogged = true
  }
  }
}
</script>

<style scoped>

</style>
