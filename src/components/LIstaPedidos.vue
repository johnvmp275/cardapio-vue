<script setup>
import MassageNot from './widgets/Notificacao.vue'
import Loader from './widgets/Loader.vue'
import Button from './widgets/Button.vue';
</script>

<template>
  <MassageNot :notifications="notificacoes" />
  <Loader :isLoader="isLoader" />
  <div>
    <h1>Comandas e Pedidos:</h1>
    <section class="pedidosForm">
      <div class="pedidos-container">
        <!-- Cadastrar o nome do Cliente -->
        <div class="cliente-container">
          <label for="nome">Nome do Cliente:</label>
          <input type="text" name="nome" id="nome" v-model="nome" placeholder="Nome do Cliente" required />
        </div>
        <!-- Cadastrar qual item escolhido do cardápio -->
        <div class="cardapio-container">
          <label for="comida">Cardápio:</label>
          <select name="comida" id="comida" v-model="comida" required>
            <option value="null" selected style="display: none">Selecione o Pedido</option>
            <option v-for="comida in comidas" :key="comida.id" :value="comida.tipo">
              {{ comida.tipo }}
            </option>
          </select>
        </div>
        <div class="cardapio-container">
          <label for="acompanhamento">Acompanhamentos:</label>
          <select name="select-menu" id="acompanhamento" v-model="acompanhamento">
            <option value="null" selected style="display: none">Selecione o Pedido</option>
            <option v-for="acompanhamento in acompanhamentos" :key="acompanhamento.id" :value="acompanhamento.tipo">
              {{ acompanhamento.tipo }}
            </option>
          </select>
        </div>
        <!-- Cadastrar alterações ou implementações ao pedido -->
        <div class="complementos-container">
          <label for="">Complementos:</label>
          <section class="opcoes-container">
            <div class="opcoes-complementos" v-for="opcional in opcionaisData" :key="opcional.id">
              <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo" />
              <span>{{ opcional.tipo }}</span>
            </div>
          </section>
        </div>
        <!-- input para postar o peidido para aba de pedidos -->
        <div class="button-submit">
          <Button class="btn-submit" @click="criarPedido" :btnLoader="btnLoader">Postar</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CardapioForm',
  data() {
    return {
      comidas: null,
      isLoader: false,
      acompanhamentos: null,
      opcionaisData: null,
      nome: null,
      comida: null,
      acompanhamento: null,
      opcionais: [],
      notificacoes: [],
      icon: null,
      btnLoader: false
    }
  },
  methods: {
    async getDados() {
      try {
        const req = await fetch('http://localhost:3000/ingredientes')
        const data = await req.json()

        this.comidas = data.comidas
        this.acompanhamentos = data.acompanhamentos
        this.opcionaisData = data.opcionais
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
      this.isLoader = true
    },

    async criarPedido() {
      try {
        if (this.nome !== null && this.comida !== null) {
          
          this.btnLoader = true

          const data = {
            nome: this.nome,
            comida: this.comida,
            acompanhamento: this.acompanhamento,
            opcionais: Array.from(this.opcionais),
            status: 'Solicitado'
          }
          const dataJson = JSON.stringify(data)

          const req = await fetch('http://localhost:3000/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataJson
          })

          const res = await req.json()

          //Mensagem do sistema ao enviar pedido
          this.notificacoes.push({
            msg: `O Pedido N° ${res.id} foi enviado com sucesso!`,
            icon: 'check',
            color: 'green'
          });

          
          //Limpar mensagem após enviar
          setTimeout(() => {
            this.notificacoes.splice(0, 1);
          }, 4000);
          
          //Limpar campos ao enviar
          this.nome = null
          this.comida = null
          this.acompanhamento = null
          // this.opcionais = ''

          this.btnLoader = false
        } else {
          this.notificacoes.push({
            msg: `Por favor preencha os dados`,
            icon: 'warning',
            color: 'red'
          });

          setTimeout(() => {
            this.notificacoes.splice(0, 1);
          }, 4000);
        }
      } catch (error) {
        console.error('Houve um erro de busca', error)

        this.notificacoes.push({
          msg: `Houve um erro ao criar o Pedido :(`,
          icon: 'warning',
          color: 'red'
        });

        //Limpar mensagem após enviar
        setTimeout(() => {
          this.notificacoes.splice(0, 1);
        }, 4000);
      }
    },
  },
  mounted() {
    this.getDados()
  }
}
</script>

<style scoped>
.pedidosForm {
  display: flex;
  justify-content: center;
}

.pedidos-container {
  background: var(--background-cinza);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
}

label {
  width: 100%;
  color: var(--background-branco);
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
}

.cliente-container,
.opcoes-container,
.cardapio-container,
.complementos-container {
  width: 100%;
}

select,
option,
input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 4px;
  border: none;
}

select {
  cursor: pointer;
}

.opcoes-container::-webkit-scrollbar {
  width: 10px;
}

.opcoes-container::-webkit-scrollbar-thumb {
  background: var(--background-branco);
}

.opcoes-container {
  display: flex;
  overflow: hidden;
  overflow-y: auto;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100px;
  gap: 8px;
}

.opcoes-container input {
  width: auto;
  cursor: pointer;
}

.opcoes-complementos {
  display: flex;
  background: var(--background-branco);
  gap: 20px;
  color: var(--background-cinza);
  align-items: center;
  padding: 6px;
  width: 48%;
  margin-bottom: 5px;
  border-radius: 4px;
}

.btn-submit {
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  color: var(--background-branco);
  background: var(--background-laranja);
  padding: 16px;
  font-weight: bold;
  font-size: 16px;
}

input::placeholder,
option,
select {
  font-family: Montserrat;
}
</style>
