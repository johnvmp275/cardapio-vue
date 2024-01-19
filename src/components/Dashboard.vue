<script setup>
import MassageNot from './widgets/Notificacao.vue'
import Loader from './widgets/Loader.vue'
import Button from './widgets/Button.vue'
</script>

<template>
  <Loader :isLoader="isLoader" />
  <MassageNot :notifications="notificacoes" />
  <div>
    <h1>Gerencie o Fluxo de Pedidos:</h1>
    <div class="tabela-scroll">
      <div id="tabela-pedido">
        <div>
          <div class="tabela-topo">
            <strong class="order-id">#:</strong>
            <strong>Cliente:</strong>
            <strong>Pedido:</strong>
            <strong>Acompanhamento:</strong>
            <strong>Complementos:</strong>
            <strong>Status:</strong>
          </div>
        </div>
        <div id="tabela-rows">
          <p class="aviso-sem-estoque" v-if="!pedidos.length">
            Ops! Ainda Não possui nenhum pedido
          </p>
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
            <div class="status-pedido">
              <select name="status" id="status" @change="updateStatus($event, pedido.id)">
                <option value="Aguardando...">Aguardando..</option>
                <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="pedido.status == s.tipo">
                  {{ s.tipo }}
                </option>
              </select>
              <Button class="delete-btn" @click="deletePedido(pedido.id)">Cancelar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Objeto que mapeia tipos de status para cores
const statusColors = {
  'Solicitado': 'blue',
  'Em produção': 'purple',
  'Finalizado': 'green',
  'Aguardando...' : 'orange'
};

export default {
  name: 'Pedidos',
  data() {
    return {
      color: null,
      pedidos: [],
      pedidosId: null,
      status: [],
      isLoader: false,
      notificacoes: [],
    }
  },
  methods: {
    async getPedidos() {
      try {
        const req = await fetch('http://localhost:3000/pedidos')
        const data = await req.json()

        this.pedidos = data
        // resgate de status do pedidos
        this.getStatus()
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
      this.isLoader = true
    },
    async getStatus() {
      try {
        const req = await fetch('http://localhost:3000/status')
        const data = await req.json()

        this.status = data
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
    },
    async deletePedido(id) {
      try {
        const req = await fetch(`http://localhost:3000/pedidos/${id}`, {
          method: 'DELETE'
        })
        const res = await req.json()

        //Mensagem do sistema ao enviar pedido
        this.notificacoes.push({
          msg: `O Pedido N° ${id} foi removido!`,
          icon: 'warning',
          color: 'red'
        });

        //Limpar mensagem após enviar
        setTimeout(() => {
          this.notificacoes.splice(0, 1);
        }, 4000);

        this.getPedidos()
      } catch (error) {
        console.error('Houve um erro de busca', error)

        this.notificacoes.push({
          msg: `Houve um erro ao deletar o Produto :(`,
          icon: 'warning',
          color: 'red'
        });

        setTimeout(() => {
          this.notificacoes.splice(0, 1);
        }, 4000);
      }
    },
    async updateStatus(event, id) {
      try {
        const option = event.target.value

        const dataJson = JSON.stringify({ status: option })

        const req = await fetch(`http://localhost:3000/pedidos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })

        const res = await req.json()

        const selectedStatus = event.target.value;

        //Troca cor dos status de acordo com seu valor
        switch (selectedStatus) {
          case 'Solicitado':
            this.color = statusColors['Solicitado'];
            break;
          case 'Em produção':
            this.color = statusColors['Em produção'];
            break;
          case 'Finalizado':
            this.color = statusColors['Finalizado'];
            break;
          case 'Aguardando...':
            this.color = statusColors['Aguardando...'];
            break;

          default:
            this.color = 'green';
        }

        //Mensagem do sistema ao enviar pedido
        this.notificacoes.push({
          msg: `O Pedido N° ${res.id} foi atualizado para: ${res.status} !`,
          icon: 'check',
          color: `${this.color}`
        });

        //Limpar mensagem após enviar
        setTimeout(() => {
          this.notificacoes.splice(0, 1);
        }, 4000);

      } catch (error) {
        console.error('Houve um erro de busca', error)

        this.notificacoes.push({
          msg: `Houve um erro ao atualizar os Status :(`,
          icon: 'warning',
          color: 'red'
        });

        setTimeout(() => {
          this.notificacoes.splice(0, 1);
        }, 4000);
      }
    },
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
  background: var(--background-cinza);
}

#tabela-pedido {
  min-width: 1298px;
}

#tabela-rows {
  display: flex;
  flex-direction: column;
}

.tabela-topo,
.tabela-row {
  display: grid;
  padding: 12px;
  grid-template-columns: 50px repeat(4, 1.8fr) 3fr;
  width: 100%;
  align-items: center;
  gap: 4px;
}

.tabela-topo {
  padding: 12px;
  border-bottom: 3px solid var(--background-cinza);
}

.tabela-topo strong {
  width: 100%;
  display: flex;
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
  border-bottom: 3px solid var(--background-cinza);
}

select {
  cursor: pointer;
  padding: 12px 6px;
}

.delete-btn {
  cursor: pointer;
  max-width: 40%;
  width: 100%;
  background: var(--background-cinza);
  color: var(--background-branco);
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
  background: var(--background-cinza);
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
