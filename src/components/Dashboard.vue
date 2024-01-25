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
            <button class="refresh" @click="refreshDados">
              <span class="material-symbols-outlined"> autorenew </span>
            </button>
          </div>
        </div>
        <div id="tabela-rows">
          <p class="aviso-sem-estoque" v-if="!pedidos.length">
            Ops! Ainda Não possui nenhum pedido
          </p>
          <div class="tabela-row" v-for="pedido in pedidos" :key="pedido.id">
            <div class="row_div">{{ pedido.id }}</div>
            <div class="row_div">{{ pedido.nome }}</div>
            <div class="row_div">{{ pedido.comida }}</div>
            <div class="row_div">{{ pedido.acompanhamento }}</div>
            <div>
              <ul class="list_pedidos">
                <li v-for="(opcional, index) in pedido.opcionais" :key="index">
                  <p>{{ opcional }}</p>
                </li>
              </ul>
            </div>
            <div class="row_div">
              <section class="status-pedido">
                <div @click="toggleDropdown(pedido.id)" class="status_selecionado">
                  <div class="circle_status" :style="{ background: getCircleColor(pedido.status) }"></div>
                  <p>{{ getSelectedStatus(pedido.status) }}</p>
                </div>
                <div class="dropdown-container" v-show="showDropdown[pedido.id]">
                  <ul class="dropdown">
                    <li v-for="(s, index) in status" :key="s.id" @click="updateStatus(s.tipo, pedido.id, index)">
                      <div class="circle_status" :style="{ background: s.color }"></div>
                      {{ s.tipo }}
                    </li>
                  </ul>
                </div>
              </section>
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
  'Em produção': 'purple',
  'Finalizado': 'green',
  'Aguardando...': 'orange'
}

export default {
  name: 'Pedidos',
  data() {
    return {
      color: 'green',
      pedidos: [],
      pedidosId: null,
      status: [],
      isLoader: false,
      notificacoes: [],
      showDropdown: {},
      selectedStatus: {}
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
    async getPedidosNovos() {
      try {
        const req = await fetch('http://localhost:3000/pedidos')
        const data = await req.json()

        this.pedidos = data
        // resgate de status do pedidos
        this.getStatus()
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
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
        })

        //Limpar mensagem após enviar
        setTimeout(() => {
          this.notificacoes.splice(0, 1)
        }, 4000)

        this.getPedidos()
      } catch (error) {
        console.error('Houve um erro de busca', error)

        this.notificacoes.push({
          msg: `Houve um erro ao deletar o Produto :(`,
          icon: 'warning',
          color: 'red'
        })

        setTimeout(() => {
          this.notificacoes.splice(0, 1)
        }, 4000)
      }
    },
    async updateStatus(selectedStatus, id, index) {
      try {
        //Fecha o dropdown após ser selecionado

        this.showDropdown[id] = false

        const dataJson = JSON.stringify({ status: selectedStatus })

        const req = await fetch(`http://localhost:3000/pedidos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })

        const res = await req.json()

        //Troca cor dos status de acordo com seu valor
        switch (selectedStatus) {
          case 'Em produção':
            this.color = statusColors['Em produção']
            break
          case 'Finalizado':
            this.color = statusColors['Finalizado']
            break
          case 'Aguardando...':
            this.color = statusColors['Aguardando...']
            break

          default:
            this.color = 'green'
        }

        // Atualizar o status selecionado apenas para o item específico
        this.getPedidos()

        // Mensagem do sistema ao enviar pedido
        this.notificacoes.push({
          msg: `O Pedido N° ${res.id} foi atualizado para: ${res.status}!`,
          icon: 'check',
          color: `${this.color}`
        })

        // Limpar mensagem após enviar
        setTimeout(() => {
          this.notificacoes.splice(0, 1)
        }, 4000)
      } catch (error) {
        console.error('Houve um erro de busca', error)

        this.notificacoes.push({
          msg: `Houve um erro ao atualizar os Status :(`,
          icon: 'warning',
          color: 'red'
        })

        setTimeout(() => {
          this.notificacoes.splice(0, 1)
        }, 4000)
      }
    },
    getCircleColor(status) {
      const findColor = this.status.find(s => s.tipo === status);

      if (findColor) {
        return findColor.color;
      } else {
        return 'green';
      }
    },
    refreshDados() {
      this.getPedidos()

       // Mensagem do sistema ao enviar pedido
       this.notificacoes.push({
          msg: `A sua Lista foi atualizada com sucesso!`,
          icon: 'check',
          color: `green`
        })

        // Limpar mensagem após enviar
        setTimeout(() => {
          this.notificacoes.splice(0, 1)
        }, 4000)
    },
    getSelectedStatus(pedidosId) {
      return (this.selectedStatus = pedidosId)
    },
    toggleDropdown(pedidosId) {
      
      // Verifica se os dropdowns estão abertos
      const dropdownOpen = this.showDropdown[pedidosId];

      // Fecha todos os dropdowns
      this.showDropdown = false;

      // Toggle ao clicar no dropdown
      this.showDropdown = { ...this.showDropdown, [pedidosId]: !dropdownOpen };

    }


  },
  mounted() {
    this.getPedidos()
    this.getStatus()

    setInterval(() => {
    this.getPedidosNovos();
    }, 1000);
  }
}
</script>

<style scoped>
.tabela-scroll {
  width: 100%;
  padding: 10px 0;
  /* overflow-y: auto; */
}

*::-webkit-scrollbar {
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
  width: 100%;
  align-items: center;
  gap: 4px;
}

.tabela-topo {
  grid-template-columns: 50px repeat(4, 2fr) 3fr 0.1fr;
  padding: 12px;
  border-bottom: 3px solid var(--background-cinza);
}

.tabela-topo strong {
  width: 100%;
  display: flex;
}

.tabela-row .row_div {
  display: flex;
  width: 100%;
  min-width: 100%;
  align-items: center;
  padding: 0 6px;
  gap: 10px;
}

.tabela-row {
  width: 100%;
  grid-template-columns: 50px repeat(4, 1.8fr) 3fr;
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

.tabela-row .list_pedidos li {
  display: flex;
  list-style: none;
  width: 100%;
  padding: 6px;
}

.tabela-row .list_pedidos {
  width: 100%;
  max-height: 68px;
  overflow-y: auto;
}

.tabela-row ul::-webkit-scrollbar {
  width: 5px;
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

.refresh {
  background: transparent;
  border: none;
  cursor: pointer;
}

.refresh:hover span {
  animation: refreshRotation 1.5s infinite linear;
}

.status-pedido {
  cursor: pointer;
  width: 170px;
  position: relative;
}

.status_selecionado {
  display: flex;
  align-items: center;
  border: 1px solid  var(--background-cinza);
  border-radius: 5px;
  height: 51px;
  width: 100%;
  min-height: 100%;
  gap: 5px;
  padding: 5px 10px;
}

.status_selecionado p {
  max-width: 110px;
  width: 100%;
}

.dropdown-container {
  position: absolute;
  background: var(--background-branco);
  border: 1px solid var(--background-cinza);
  z-index: 100;
  width: 100%;
  margin-top: 10px;
  padding: 3px;
  border-radius: 5px;
}

.dropdown {
  height: 97px;
  overflow-y: auto;
}

.dropdown-container::before {
  content: '';
  position: absolute;
  z-index: 1000;
  display: flex;
  width: 10px;
  height: 10px;
  top: -6px;
  right: calc(50% - 5px);
  transform: rotate(45deg);
  background: var(--background-branco);
  border-left: 1px solid  var(--background-cinza);
  border-top: 1px solid  var(--background-cinza);
}

.dropdown li {
  display: flex;
  gap: 5px;
  align-items: center;
  list-style: none;
  width: 100%;
  padding: 12px 6px;
}

.circle_status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

@keyframes refreshRotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
