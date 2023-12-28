<script setup></script>

<template>
  <div class="tabela-scroll">
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
          <div class="observacao-cliente">teste</div>
          <div class="status-pedido">
            <select name="status" id="status" @change="updateStatus($event, pedido.id)"> 
              <option value="null">Selecione</option>
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
      pedidos: null,
      pedidosId: null,
      status: []
    }
  },
  methods: {
    async getPedidos() {
      const req = await fetch('http://localhost:3000/pedidos');
      const data = await req.json();

      this.pedidos = data;

      // resgate de status do pedidos
      this.getStatus();
    },
    async getStatus() {
      const req = await fetch('http://localhost:3000/status');
      const data = await req.json();

      this.status = data;
    },
    async deletePedido(id) {
      const req = await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: "DELETE"
      });
      const res = await req.json();

      this.getPedidos()
    },
    async updateStatus(event, id) {
      const option = event.target.value;

      const dataJson = JSON.stringify({ status: option});

      const req = await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      });

      const res = await req.json();

      console.log(res)
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
  overflow-x: scroll;
}

.tabela-scroll::-webkit-scrollbar {
  height: 5px;
}

.tabela-scroll::-webkit-scrollbar-thumb {
  background: #1f1d2b;
}

#tabela-pedido {
  min-width: 1298px;
}

.tabela-topo,
#tabela-rows,
.tabela-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.tabela-topo {
  padding: 12px;
  border-bottom: 3px solid #1f1d2b;
}

.tabela-topo div {
  font-weight: bold;
}

.tabela-topo div,
.tabela-row div {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-width: 3%;
  max-width: 16.16%;
  overflow: hidden;
  padding: 0 6px;
  gap: 10px;
}

.tabela-row {
  width: 100%;
  padding: 12px;
  border-bottom: 3px solid #1f1d2b;
}

.tabela-topo .order-id,
.tabela-row .id-pedido {
  max-width: 3%;
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

.tabela-topo .observacao-cliente,
.tabela-row .observacao-cliente {
  max-width: 11%;
}

.tabela-topo .status-pedido,
.tabela-row .status-pedido {
  max-width: 19%;
}
</style>
