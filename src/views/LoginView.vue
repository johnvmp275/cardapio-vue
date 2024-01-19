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
      localStorage.setItem('isLogged', 'true')
      
      // Emite o evento para notificar outros componentes sobre a atualização
      emitLoginStatus()
      
      // Após autenticação, o usuário é redirecionado para home
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.btn-login {
  width: 100%;
  max-width: 250px;
}
</style>
