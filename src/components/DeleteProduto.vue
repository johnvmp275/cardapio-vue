<script setup>
import MassageNot from './widgets/Notificacao.vue'
import Loader from './widgets/Loader.vue'
import Pagination from './widgets/Pagination.vue'
import Button from './widgets/Button.vue'
</script>

<template>
  <Loader :isLoader="isLoader" />
  <h2>Limpeza do Cardápio:</h2>
  <div>
    <div class="tabela-scroll">
      <div class="mensagem">
        <MassageNot :notifications="notificacoes" />
      </div>
      <div id="tabela-pedido">
        <div class="tabela-topo">
          <strong>#:</strong>
          <strong>Titulo do prato:</strong>
          <div>
            <strong>Categoria:</strong>
            <select name="categoria" id="categoria" v-model="categoria" @change="atualizarCategoria">
              <option value="comidas" selected>Principal</option>
              <option value="acompanhamentos">Acompanhamento</option>
              <option value="opcionais">Complemento</option>
            </select>
          </div>
          <div>
            <strong>Ordenação:</strong>
            <select class="itensPorPagina" name="itensPorPagina" id="itensPorPagina" v-model="itensPorPagina"
              @change="numerosPagina">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="6" selected>6</option>
            </select>
          </div>
          <strong>Editar:</strong>
        </div>
        <div id="tabela-rows">
          <div class="tabela-row" v-for="comida in itensCategoria" :key="comida.id">
            <p class="id-pedido">{{ comida.id }}</p>
            <strong>{{ comida.tipo }}</strong>
            <Button @click="deleteProduto(comida.id)" class="btn-produto">Remover</Button>
          </div>
          <p class="aviso-sem-estoque" v-if="!itensCategoria.length">
            Não há itens nesta categoria.
          </p>
        </div>
      </div>
      <Pagination
       :paginaAtual="paginaAtual" 
       :totalPages="totalPages" 
       :itensCategoria="itensCategoria"
       :getDados="getDados" 
       @paginaMudada="atualizarPagina" />
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
    },
    getDados: {
      type: Function,
      required: true
    },
    deleteProduto: {
      type: Function,
      required: true
    },
    comidas: {
      type: Array,
    },
    acompanhamentos: {
      type: Array,
    },
    opcionais: {
      type: Array,
    },
    dados: {
      type: Object,
    },
  },

  data() {
    return {
      notificacoes: [],
      categoria: 'comidas',
      itensPorPagina: 6,
      paginaAtual: 1,
      updateList: true,
      listKey: 0,
      isLoader: false,
    }
  },
  computed: {
    totalPages() {
      const allItems = this[this.categoria] || []
      return Math.ceil(allItems.length / this.itensPorPagina)
    },
    itensCategoria() {
      const startIndex = (this.paginaAtual - 1) * this.itensPorPagina
      const endIndex = startIndex + parseInt(this.itensPorPagina)
      const allItems = this[this.categoria] || []

      return allItems.slice(startIndex, endIndex)
    }
  },
  methods: {
    atualizarCategoria() {
      // Atualiza a lista de itens a serem exibidos na tabela quando a categoria é alterada
      this.itensCategoria = this[this.categoria]
      this.paginaAtual = 1
    },
    numerosPagina() {
      this.paginaAtual = 1
      localStorage.setItem('itensPorPagina', this.itensPorPagina.toString())
    },
    carregarConfiguracoes() {
      const itensPorPaginaSalvos = localStorage.getItem('itensPorPagina')
      if (itensPorPaginaSalvos) {
        this.itensPorPagina = parseInt(itensPorPaginaSalvos)
      }
    },
    atualizarPagina(novaPagina) {
      this.paginaAtual = novaPagina
    },
    async carregarDados() {
      await this.getDados();
      this.isLoader = true
    },
    async deleteProduto(id) {
      try {
        const dadosString = JSON.parse(JSON.stringify(this.dados)) // Criar uma cópia profunda dos dados
        const index = dadosString[this.categoria]

        const itemId = index.findIndex((item) => item.id === id)

        if (itemId !== -1) {
          // Remover localmente
          const removedItem = index.splice(itemId, 1)[0]

          // Enviar a requisição PUT para o servidor
          const req = await fetch('http://localhost:3000/ingredientes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosString)
          })

          if (req.ok) {
            this.notificacoes.push({
              msg: `O Produto N° ${id} foi removido!`,
              icon: 'warning',
              color: 'red'
            });

            setTimeout(() => {
              this.notificacoes.splice(0, 1);
            }, 4000);

            this.getDados()

          } else {
            // Se houver um erro, reverta a remoção local
            index.splice(itemId, 0, removedItem)
            throw new Error('Falha ao atualizar os dados no servidor')
          }
        } else {
          console.error('Item não encontrado')
        }
      } catch (error) {
        console.error('Houve um erro durante a exclusão do produto', error)

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
  },
  mounted() {
    this.carregarDados();
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
  display: flex;
  align-items: center;
  gap: 14px;
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

#tabela-rows {
  display: flex;
  flex-direction: column;
  height: 325px;
  overflow: hidden;
  overflow-y: auto;
}

#tabela-rows::-webkit-scrollbar {
  width: 10px;
}

#tabela-rows::-webkit-scrollbar-thumb {
  background: var(--background-cinza);
}

.tabela-row {
  display: grid;
  align-items: center;
  grid-template-columns: 50px 4fr 1fr;
  gap: 20px;
  width: 100%;
  padding: 12px;
  border-bottom: 3px solid var(--background-cinza);
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

.tabela-row div {
  display: grid;
  grid-template-columns: 50px 4fr 1fr;
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

.itensPorPagina {
  width: 140px;
}
</style>
