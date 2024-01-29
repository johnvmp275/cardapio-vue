<script setup>
import Button from '@/components/widgets/Button.vue'
import MassageNot from '@/components/widgets/Notificacao.vue'
</script>
<template>
  <MassageNot :notifications="notificacoes" />
  <div>
    <section>
      <h1>Faça seu Login</h1>

      <div>
        <label class="label_username" for="username" :class="{ 'invalid': Nomeinvalido }">

          <span class="material-symbols-outlined">
          mail
          </span>
      
          <input type="text" id="username" v-model="userEmail" required placeholder="insira seu email"/>

        </label>

        <label class="label_password"  for="password" :class="{ 'invalid': Senhainvalido }" >

          <span class="material-symbols-outlined">
          lock
          </span>

          <input :type="showSenha" id="password" v-model="password" required placeholder="insira sua senha"/>

          <button class="mostrar_senha" @click="mostrarSenha">

            <span v-if="showSenha === 'password'" class="material-symbols-outlined">
            visibility_off
            </span>
            
            <span v-else class="material-symbols-outlined">
            visibility
            </span>
          </button>

        </label>

        <Button class="btn-login" @click="logged">
          Login
        </Button>

      </div>

    </section>
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
      Senhainvalido: false,
      showSenha: 'password'
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
      this.niveis = data.map(user => user.nivel);
    },
    logged() {
      const userEmail = this.emails.findIndex(email => email === this.userEmail);
      const userSenha = this.senhas[userEmail] === this.password;

      if (userEmail !== -1 && userSenha) {
        localStorage.setItem('isLogged', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

        localStorage.setItem('userNivel', this.niveis[userEmail]);

        this.localIsLogged = false;
        this.$emit('UserLogado', this.localIsLogged);

        const userNivel = localStorage.getItem('userNivel');
        
        if (userNivel === 'gerenciador') {
          this.$router.push('/pedidos');
        } else if (userNivel === 'normal') {
          this.$router.push('/');
        } else {
          this.$router.push('/');
        }
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
    mostrarSenha() {
      this.showSenha = (this.showSenha === 'password') ? 'text' : 'password';
    }
  }, mounted() {
    this.getUser()
  }
};
</script>



<style scoped>
body {
  background: var(--background-cinza);
}

div {
  background: var(--background-cinza);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-column: 2;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--background-branco);
  box-shadow: 0 0 15px 0 var(--background-laranja);
  padding: 16px;
  width: 100%;
  max-width: 400px;
  height: 450px;
  border-radius: 8px;
  position: relative;
  /* border-left: 8px solid var(--background-laranja); */
}

section div {
  background: var(--background-branco);
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.btn-login {
  width: 100%;
  max-width: 250px;
  background: var(--background-laranja);
  color: var(--background-branco);
}

label {
  display: flex;
  border: 2px solid #1f1d2b36;
  border-radius: 5px;
  align-items: center;
  width: 100%;
  max-width: 250px;
  gap: 5px;
  padding: 0 8px;
}

label span {
  color: var(--background-cinza);
}

input {
  border: none;
  height: 40px;
  padding: 16px 0;
}

input,
button {
  border-radius: 5px;
  margin: 0 auto;
  width: 100%;
}

.mostrar_senha{
  display: flex;
  align-items: center;
  border: none;
  width: 24px;
  cursor: pointer;
}

.label_username.invalid,
.label_password.invalid {
  border: 2px solid red;
}

</style>
