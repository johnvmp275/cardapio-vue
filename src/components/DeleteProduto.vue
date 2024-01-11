<script setup>
import MassageNot from './Notificacao.vue'
import Tabela from './TabelaRow.vue'
import Loader from './Loader.vue'
</script>

<template>
  <Loader/>
  <h2>Limpeza do Cardápio:</h2>
  <div>
    <div class="tabela-scroll">
      <div class="mensagem">
        <MassageNot :msg="msg" v-show="msg" />
      </div>
      <div id="tabela-pedido">
        <div class="tabela-topo">
          <div>#:</div>
          <div>Titulo do prato:</div>
          <select name="categoria" id="categoria" v-model="categoria" @change="atualizarCategoria">
            <option value="comidas" selected>Principal</option>
            <option value="acompanhamentos">Acompanhamento</option>
            <option value="opcionais">Complemento</option>
          </select>
          <select name="itensPorPagina" id="itensPorPagina" v-model="itensPorPagina" @change="numerosPagina">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="6" selected>6</option>
          </select>
          <div>Editar:</div>
        </div>
        <Tabela :getDados="getDados" :categoria="categoria" :comidas="comidas" :acompanhamentos="acompanhamentos"
          :opcionais="opcionais" :deleteProduto="deleteProduto" :updateList="updateList" :key="listKey"
          :itensPorPagina="itensPorPagina" :paginaAtual="paginaAtual" />
      </div>
      <section class="pagination-section">
        <div class="pagination">
          <button @click="paginaAnterior" :disabled="paginaAtual === 1">
            <span class="material-symbols-outlined"> arrow_back_ios </span>
          </button>
          <span>Página {{ paginaAtual }} de {{ totalPages }}</span>
          <button @click="proximaPagina" :disabled="paginaAtual === totalPages">
            <span class="material-symbols-outlined"> arrow_forward_ios </span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Delete',
  props: {
    boolProp: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      categoria: 'comidas',
      msg: null,
      comidas: [],
      acompanhamentos: [],
      opcionais: [],
      updateList: true,
      listKey: 0,
      itensPorPagina: 6,
      paginaAtual: 1,
    }
  },
  computed: {
    totalPages() {
      const allItems = this[this.categoria] || []
      return Math.ceil(allItems.length / this.itensPorPagina)
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
    async deleteProduto(id) {
      try {
        const dadosString = JSON.parse(JSON.stringify(this.dados)); // Criar uma cópia profunda dos dados
        const index = dadosString[this.categoria];

        const itemId = index.findIndex((item) => item.id === id);

        if (itemId !== -1) {
          // Remover localmente
          const removedItem = index.splice(itemId, 1)[0];


          // Enviar a requisição PUT para o servidor
          const req = await fetch('http://localhost:3000/ingredientes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosString),
          });

          if (req.ok) {
            this.msg = `O Produto N° ${id} foi removido!`;

            setTimeout(() => {
              this.msg = '';
            }, 3000);

            this.getDados();
            this.updateList = !this.updateList;
            this.listKey += 1;

          } else {
            // Se houver um erro, reverta a remoção local
            index.splice(itemId, 0, removedItem);
            throw new Error('Falha ao atualizar os dados no servidor');
          }
        } else {
          console.error('Item não encontrado');
        }
      } catch (error) {
        console.error('Houve um erro durante a exclusão do produto', error);
      }
    },

    atualizarCategoria() {
      // Atualiza a lista de itens a serem exibidos na tabela quando a categoria é alterada
      this.itensCategoria = this[this.categoria]
      this.paginaAtual = 1;
    },
    numerosPagina() {
      this.paginaAtual = 1
      localStorage.setItem('itensPorPagina', this.itensPorPagina.toString());  
    },
    carregarConfiguracoes() {
      const itensPorPaginaSalvos = localStorage.getItem('itensPorPagina')
      if (itensPorPaginaSalvos) {
        this.itensPorPagina = parseInt(itensPorPaginaSalvos)
      }
    },
    irParaPagina(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.paginaAtual = pageNumber
      }
    },
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--
      }
    },
    proximaPagina() {
      if (this.paginaAtual < this.totalPages) {
        this.paginaAtual++
      }
    },
  },
  mounted() {
    this.getDados()
    this.carregarConfiguracoes()
  }
}
</script>

<style scoped>
.tabela-scroll {
  width: 100%;
  padding: 10px 0;
  overflow-x: auto;
  margin-bottom: 2rem;
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

.tabela-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.tabela-topo {
  display: grid;
  padding: 12px;
  grid-template-columns: 50px 2fr 2fr 2fr 1.58fr;
  gap: 20px;
  height: 70px;
  border-bottom: 3px solid var(--background-cinza);
}

.tabela-topo div {
  font-weight: bold;
}


.btn-produto {
  cursor: pointer;
  width: 100%;
  max-width: 170px;
  background: var(--background-cinza);
  color: var(--background-branco);
  padding: 12px 6px;
  border: none;
  font-weight: bold;
}

.notificacao-container {
  background: red;
}

select {
  cursor: pointer;
  max-width: 200px;
  padding: 12px;
  width: 100%;
  height: 100%;
}

option {
  cursor: pointer;
}

h2 {
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
}

.pagination-section {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination button {
  cursor: pointer;
  width: 36px;
  background: var(--background-laranja);
  border: none;
  display: flex;
  padding: 6px;
  text-align: center;
  color: var(--background-branco);
}
</style>