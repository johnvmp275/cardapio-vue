<script setup>
import Button from '@/components/widgets/Button.vue'
</script>
<template>
  <div>
    <Button class="btn-login" @click="login">Login</Button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      //Autentica o usuário e define o isLogged como true no localStorage
      this.authenticateUser()

      // Após autenticação, você pode redirecionar o usuário para a página desejada
      this.$router.push('/')
    },
    authenticateUser() {
      localStorage.setItem('isLogged', 'true')
    }
  }
}
</script>

<style scoped>

div{
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-login{
    width: 100%;
    max-width: 250px
}
</style>