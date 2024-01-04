<script setup>
import MassageNot from './Notificacao.vue'
</script>

<template>
  <h1>Gerencie o Fluxo de Pedidos:</h1>
  <div class="tabela-scroll">
    <MassageNot :msg="msg" :icon="icon" v-show="msg" @click="Close()" />
    <div id="tabela-pedido">
      <div>
        <div class="tabela-topo">
          <div class="order-id">#:</div>
          <div>Cliente:</div>
          <div>Pedido:</div>
          <div>Acompanhamento:</div>
          <div>Complementos:</div>
          <div class="observacao-cliente">Observação:</div>
          <div>Status:</div>
        </div>
      </div>
      <div id="tabela-rows">
        <p class="aviso-sem-estoque" v-if="!pedidos.length">Ops! Ainda Não possui nenhum pedido </p>
        <div class="tabela-row" v-for="pedido in pedidos" :key="pedido.id">
          <div class="id-pedido">{{ pedido.id }}</div>
          <div>{{ pedido.nome }}</div>
          <div>{{ pedido.comida }}</div>
          <div>{{ pedido.acompanhamento }}</div>
          <div>
            <ul>
              <li v-for="(opcional, index) in pedido.opcionais" :key="index">
                <p>{{ opcional }}</p>
              </li>
            </ul>
          </div>
          <button class="btn-observacao" @click="popUp(pedido.observacoes)">
            <span class="material-symbols-outlined">
              visibility
            </span>
          </button>
          <div class="status-pedido">
            <select name="status" id="status" @change="updateStatus($event, pedido.id)">
              <option value="Aguardando...">Aguardando..</option>
              <option v-for=" s in status" :key="s.id" :value="s.tipo" :selected="pedido.status == s.tipo">
                {{ s.tipo }}
              </option>
            </select>
            <button class="delete-btn" @click="deletePedido(pedido.id)">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pedidos',
  data() {
    return {
      color: null,
      pedidos: [],
      pedidosId: null,
      status: [],
      msg: null
    }
  },
  methods: {
    async getPedidos() {
      try {
        const req = await fetch('https://cardapio-vue.vercel.app/pedidos');
        const data = await req.json();

        this.pedidos = data;
        // resgate de status do pedidos
        this.getStatus();
      }
      catch (error) {
        console.error("Houve um erro de busca", error);
      }
    },
    async getStatus() {
      try {
        const req = await fetch('https://cardapio-vue.vercel.app/status');
        const data = await req.json();

        this.status = data;
      }
      catch (error) {
        console.error("Houve um erro de busca", error);
      }
    },
    async deletePedido(id) {
      try {
        const req = await fetch(`https://cardapio-vue.vercel.app/pedidosz{id}`, {
          method: "DELETE"
        });
        const res = await req.json();

        //Mensagem do sistema ao enviar pedido
        this.msg = `O Pedido N° ${id} foi removido!`;
        this.color = 'red';
        this.icon = 'warning'

        //Limpar mensagem após enviar
        setTimeout(() => {
          this.msg = ''
        }, 3000)

        this.getPedidos()
      }
      catch (error) {
        console.error("Houve um erro de busca", error);
      }
    },
    async updateStatus(event, id) {
      try {
        const option = event.target.value;

        const dataJson = JSON.stringify({ status: option });

        const req = await fetch(`https://cardapio-vue.vercel.app/pedidos/${id}`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        });

        const res = await req.json();

        //Mensagem do sistema ao enviar pedido
        this.msg = `O Pedido N° ${res.id} foi atualizado para: ${res.status} !`;
        this.color = 'green';
        this.icon = 'check'
        // this.color = this.status[this.background];

        // console.log(this.color);

        //Limpar mensagem após enviar
        setTimeout(() => {
          this.msg = ''
        }, 3000)
      } catch (error) {
        console.error("Houve um erro de busca", error);
      }
    },
    popUp(observacoes) {
      // this.msg = `${observacoes}`
      // this.color = 'orange';
      // this.icon = 'visibility'
      // setTimeout(() => {
      //   this.msg = ''
      // }, 3000)
    },
    Close() {
      // this.msg = ''
    }
  },
  mounted() {
    this.getPedidos()
  }
}
</script>

<style scoped>
.tabela-scroll {
  width: 100%;
  padding: 10px 0;
  overflow-x: auto;
}

.tabela-scroll::-webkit-scrollbar {
  height: 10px;
}

.tabela-scroll::-webkit-scrollbar-thumb {
  background: #1f1d2b;
}

#tabela-pedido {
  min-width: 1330px;
}

#tabela-rows {
  display: flex;
  flex-direction: column;
}

.tabela-topo,
.tabela-row {
  display: grid;
  padding: 12px;
  grid-template-columns: 50px repeat(4, 1.8fr) 1.2fr 3fr;
  width: 100%;
  align-items: center;
  gap: 4px;
}

.tabela-topo {
  padding: 12px;
  border-bottom: 3px solid #1f1d2b;
}

.tabela-topo div {
  width: 100%;
  display: flex;
  font-weight: bold;
}

.tabela-topo div,
.tabela-row div {
  display: flex;
  width: 100%;
  min-width: 100%;
  overflow: hidden;
  padding: 0 6px;
  gap: 10px;
}

.tabela-row {
  width: 100%;
  padding: 12px;
  border-bottom: 3px solid #1f1d2b;
}


select {
  cursor: pointer;
  padding: 12px 6px;
}

.delete-btn {
  cursor: pointer;
  max-width: 40%;
  width: 100%;
  background: #1f1d2b;
  color: #fff;
  padding: 12px 6px;
  border: none;
  font-weight: bold;
}

.tabela-row ul li {
  display: flex;
  list-style: none;
  width: 100%;
  padding: 6px;
}

.tabela-row ul {
  width: 100%;
  max-height: 68px;
  overflow-y: auto;
}

.tabela-row ul::-webkit-scrollbar {
  width: 10px;
}

.tabela-row ul::-webkit-scrollbar-thumb {
  background: #1f1d2b;
}

.notificacao-container {
  background: v-bind(color);
}

.aviso-sem-estoque {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  height: 300px;
}

.aviso-sem-estoque::after {
  content: ':(';
  margin-left: 10px;
}

.btn-observacao {
  border: none;
  background: transparent;
  cursor: pointer;
  width: 50px;
  margin: 0 auto;
}
</style>
