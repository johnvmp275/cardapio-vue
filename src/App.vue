<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Login from './views/LoginView.vue'
</script>

<template>
<!-- teste -->
  <Navbar 
  v-if="!isLogged" 
  :isLogged="isLogged" 
  @Deslogado="isLogged = $event" />

  <RouterView 
  v-if="!isLogged" />

  <Login 
  v-else :isLogged="isLogged"
  @userLogado="isLogged = $event" />

</template>

<script>
const storedIsLogged = localStorage.getItem('isLogged');
const storedUserNivel = localStorage.getItem('userNivel');

export default {
  data() {
    return {
      isLogged: true,
      userNivel: storedUserNivel,
    };
  },
  created() {
    if (storedIsLogged === 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
      this.isLogged = false
    } else {
      var senhaCorreta = 'K3vG7pL9';

      while (true) {
        var password = prompt('Digite sua senha:');

        if (password === senhaCorreta) {
          alert('Login bem-sucedido!');

          this.$router.push('/login')
          break; // Sair do loop se a senha estiver correta
        } else {
          alert('Senha incorreta. Tente novamente.');
        }
      }
    }
  },
}
</script>


<style scoped></style>
