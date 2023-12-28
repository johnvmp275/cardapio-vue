<template>
  <h1>teste</h1>
  <div>
    <div class="tabela-scroll">
      <MassageNot :msg="msg" v-show="msg" />
      <div id="tabela-pedido">
        <div>
          <div class="tabela-topo">
            <div>#:</div>
            <div>Titulo do prato:</div>
            <div>Editar:</div>
          </div>
        </div>
        <div id="tabela-rows" v-for="comida in comidas" :key="comida.id">
          <div class="tabela-row">
            <div class="id-pedido">{{ comida.id }}</div>
            <p>{{ comida.tipo }}</p>
            <button @click="deleteProduto(comida.id)" class="btn-produto">Remover</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comidas: null,
      acompanhamentos: null,
      opcionaisData: [],
      ingredientes: null,
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
      this.ingredientes = data

      console.log(data)
    },
    async deleteProduto(id) {
      const req = await fetch(`http://localhost:3000/ingredientes/${id}`, {
        method: "DELETE"
      });
      const res = await req.json();

      //Mensagem do sistema ao enviar pedido
      this.msg = `O Produto N° ${id} foi removido!`

      //Limpar mensagem após enviar
      setTimeout(() => {
        this.msg = ''
      }, 3000)
    },
  },
  mounted() {
    this.getDados()
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
  height: 10px;
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.tabela-topo {
  display: grid;
  padding: 12px;
  grid-template-columns: 50px 4fr 1fr;
  gap: 20px;
  border-bottom: 3px solid #1f1d2b;
}

.tabela-topo div {
  font-weight: bold;
}

.tabela-row {
  display: grid;
  grid-template-columns: 50px 4fr 1fr;
  gap: 20px;
  width: 100%;
  padding: 12px;
  border-bottom: 3px solid #1f1d2b;
}

.btn-produto {
  cursor: pointer;
  width: 100%;
  background: #1f1d2b;
  color: #fff;
  padding: 12px 6px;
  border: none;
  font-weight: bold;
}

.notificacao-container {
  background: red;
}

.tabela-row div {
  display: grid;
  grid-template-columns: 50px 4fr 1fr;
}

.tabela-row p {
  font-weight: bold;
}
</style>
