<script setup>
import MassageNot from './Notificacao.vue'
import DeleteProduto from './DeleteProduto.vue'
</script>

<template>
  <h1>Menu Personalizado: Sua Cozinha, Suas Regras!</h1>
  <div>
    <div class="tabela-scroll">
      <MassageNot :msg="msg" v-show="msg" />
      <div id="tabela-pedido">
        <div>
          <div class="tabela-topo">
            <div>Titulo do prato:</div>
            <div>Categoria:</div>
            <div>Criar:</div>
          </div>
        </div>
        <div id="tabela-rows">
          <div class="tabela-row">
            <input type="text" placeholder="insira o titulo" v-model="tipo" required />
            <select name="categoria" id="categoria" v-model="categoria" required>
              <option value="null">Tipo de prato</option>
              <option value="comidas">Principal</option>
              <option value="acompanhamentos">Acompanhamento</option>
              <option value="opcionais">Complemento</option>
            </select>
            <button @click="criarProduto" class="btn-produto">Criar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteProduto :update="update" 
                :key="updateKey"
                 />
</template>

<script>
export default {
  name: 'ProdutoForm',
  data() {
    return {
      nome: null,
      tipo: null,
      dados: {},
      categoria: null,
      update: true,
      updateKey: 0,
      msg: null
    }
  },
  methods: {
    async getDados() {
      try {
        const req = await fetch('http://localhost:3000/ingredientes')
        const data = await req.json()

        this.totalItens = data.total || 0

        this.dados = data

        this.comidas = data.comidas || []
        this.acompanhamentos = data.acompanhamentos || []
        this.opcionais = data.opcionais || []

        this.itensCategoria = this[this.categoria]
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
    },
    async criarProduto() {
      try {
        const dadosString = JSON.stringify(this.dados)
        const dataObj = JSON.parse(dadosString)

        const index = dataObj[this.categoria].length + 1
        dataObj[this.categoria].push({
          id: index,
          tipo: this.tipo
        })

        const dataJson = JSON.stringify(dataObj)

        const req = await fetch('http://localhost:3000/ingredientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })

        const res = await req.json()

        // Atualize os dados localmente após criar um novo produto
        this.dados = res;

        // Mensagem do sistema ao enviar pedido
        this.update = !this.update;
        this.updateKey += 1;

        this.getDados()
        this.msg = `O Produto: ${this.tipo} acabou de ser criado!`;

        // Limpar mensagem após enviar
        setTimeout(() => {
          this.msg = ''
        }, 3000)

        // Limpar campos ao enviar
        this.categoria = 'null'
        this.tipo = ''
      } catch (error) {
        console.error("Houve um erro ao criar o produto", error);
      }
    },
  },
  mounted() {
    this.getDados()
    // document.onreadystatechange = () => {
    //   if (document.readyState == "complete") {
    //     this.isLoader = true;
    //   }
    // }
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
  background: var(--background-cinza);
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  border-bottom: 3px solid var(--background-cinza);
}

.tabela-topo div {
  font-weight: bold;
}

.tabela-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  padding: 12px;
  border-bottom: 3px solid var(--background-cinza);
}

select {
  cursor: pointer;
  padding: 12px 6px;
}

.btn-produto {
  cursor: pointer;
  width: 100%;
  max-width: 170px;
  background: var(--background-laranja);
  color: var(--background-branco);
  padding: 12px 6px;
  border: none;
  font-weight: bold;
}

/* .notificacao-container {} */

input {
  width: 100%;
  border: 2px solid #1f1d2b36;
  padding: 12px 16px;
}

.tabela-row input {
  max-width: 300px;
}

.tabela-row select {
  max-width: 200px;
}
</style>
