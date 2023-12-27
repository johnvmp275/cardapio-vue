<script setup>
import MassageNot from './Notificacao.vue'
</script>

<template>
  <div>
    <section class="pedidosForm">
      <form id="pedido-formulario" method="" @submit="criarPedido">
        <!-- Cadastrar o nome do Cliente -->
        <div class="cliente-container">
          <label for="nome">Nome do Cliente:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            v-model="nome"
            placeholder="Nome do Cliente"
            required
          />
        </div>
        <!-- Cadastrar qual item escolhido do cardápio -->
        <div class="cardapio-container">
          <label for="comida">Cardápio:</label>
          <select name="comida" id="comida" v-model="comida">
            <option value="null" selected>Selecione o Pedido</option>
            <option v-for="comida in comidas" :key="comida.id" :value="comida.tipo">
              {{ comida.tipo }}
            </option>
          </select>
        </div>
        <div class="opcoes-container">
          <label for="acompanhamento">Acompanhamentos:</label>
          <select name="select-menu" id="acompanhamento" v-model="acompanhamento">
            <option value="null" selected>Selecione o Pedido</option>
            <option
              v-for="acompanhamento in acompanhamentos"
              :key="acompanhamento.id"
              :value="acompanhamento.tipo"
            >
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
        <!-- Cadastrar as observações -->
        <div class="cliente-container">
          <label for="observacoes">Observações sobre o Cliente:</label>
          <input
            type="text"
            name="observacoes"
            id="observacoes"
            v-model="observacoes"
            placeholder="Registre as suas observações"
          />
        </div>
        <!-- input para postar o peidido para aba de pedidos -->
        <div class="button-submit">
          <input class="btn-submit" type="submit" value="Postar" />
        </div>
      </form>
    </section>
    <MassageNot :msg="msg" v-show="msg" />
  </div>
</template>

<script>
export default {
  name: 'CardapioForm',
  data() {
    return {
      comidas: null,
      acompanhamentos: null,
      opcionaisData: null,
      nome: null,
      observacoes: null,
      comida: null,
      acompanhamento: null,
      opcionais: [],
      msg: null
    }
  },
  methods: {
    async getDados() {
      const req = await fetch('http://localhost:3000/ingredientes')
      const data = await req.json()

      this.comidas = data.comidas
      this.acompanhamentos = data.acompanhamentos
      this.opcionaisData = data.opcionais
    },

    async criarPedido(e) {
      e.preventDefault()

      console.log('pedido foi enviado')

      const data = {
        nome: this.nome,
        observacoes: this.observacoes,
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

      console.log(res)

      //Mensagem do sistema ao enviar pedido
      this.msg = `O Pedido N° ${res.id} foi enviado com sucesso!`

      //Limpar mensagem após enviar
      setTimeout(() => {
        this.msg = ''
      }, 3000)

      //Limpar campos ao enviar
      this.nome = ''
      this.observacoes = ''
      this.comida = 'null'
      this.acompanhamento = 'null'
      this.opcionais = ''
    }
  },
  mounted() {
    this.getDados()
  }
}
</script>

<style scoped>
form {
  background: #1f1d2b;
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
  color: #fff;
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

.opcoes-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.opcoes-container input {
  width: auto;
  cursor: pointer;
}

.opcoes-complementos {
  display: flex;
  gap: 20px;
  color: #fff;
  align-items: center;
  width: 50%;
  margin-bottom: 20px;
}

.btn-submit {
  cursor: pointer;
  margin-top: 20px;
  color: #fff;
  background: #ea7c69;
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
