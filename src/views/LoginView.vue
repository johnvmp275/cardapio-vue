<script setup>
import Button from '@/components/widgets/Button.vue'
import MassageNot from '@/components/widgets/Notificacao.vue'
</script>
<template>

  <MassageNot 
  :notifications="notificacoes" 
  />

  <div>

    <label for="username">
      Usuário:
    </label>

    <input 
    type="text" 
    id="username" 
    v-model="userEmail" 
    required 
    :class="{ 'invalid': Nomeinvalido }"
    />

    <label for="password">
      Senha:
    </label>

    <input 
    type="password" 
    id="password" 
    v-model="password" 
    required 
    :class="{ 'invalid': Senhainvalido }"
    />

    <Button 
    class="btn-login" 
    @click="logged">
    Login
    </Button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      localIsLogged: false,
      userEmail: '',
      password: '',
      notificacoes: [],
      emails: [],
      senhas: [],
      dados: {},
      Nomeinvalido: false,
      Senhainvalido: false
    };
  },
  watch: {
    userEmail: 'validarCampos',
    password: 'validarCampos'
  },
  methods: {
    validarCampos() {
      if (this.userEmail !== '') {
        this.Nomeinvalido = false;
      }
      if (this.password !== '') {
        this.Senhainvalido = false;
      }
    },
    async getUser() {
      const req = await fetch('http://localhost:3000/users')
      const data = await req.json()

      this.dados = data

      this.emails = data.map(user => user.email);
      this.senhas = data.map(user => user.senha);
    },
    logged() {
      const userEmail = this.emails.findIndex(email => email === this.userEmail);
      const userSenha = this.senhas[userEmail] === this.password;

      if (userEmail !== -1 && userSenha) {
        localStorage.setItem('isLogged', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

        this.localIsLogged = false;
        this.$emit('UserLogado', this.localIsLogged);

        this.$router.push('/')
      } else {

        if (this.userEmail === '') {
          this.Nomeinvalido = true;
        }
        if (this.password === '') {
          this.Senhainvalido = true;
        }
        this.notificacoes.push({
          msg: `Por favor preencha os dados`,
          icon: 'warning',
          color: 'red'
        });

        setTimeout(() => {
          this.notificacoes.splice(0, 1);
        }, 4000);
      }
    },
  }, mounted() {
    this.getUser()
  }
};
</script>



<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn-login {
  width: 100%;
  max-width: 250px;
  border: 2px solid;
}

.teste {
  display: flex;
  margin-top: 20px;
}

#username.invalid,
#password.invalid {
  border: 2px solid red;
}
</style>
