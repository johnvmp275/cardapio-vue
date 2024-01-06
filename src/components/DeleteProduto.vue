<script setup>
import MassageNot from './Notificacao.vue'
</script>

<template>
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
          <div>Editar:</div>
        </div>
        <div id="tabela-rows">
          <div class="tabela-row" v-for="comida in itensCategoria" :key="comida.id">
            <div class="id-pedido">{{ comida.id }}</div>
            <p>{{ comida.tipo }}</p>
            <button @click="deleteProduto(comida.id)" class="btn-produto">Remover</button>
          </div>
          <p class="aviso-sem-estoque" v-if="!itensCategoria.length">Não há itens nesta categoria.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Delete',
  props: {
    boolProp: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      categoria: 'comidas',
      msg: null,
      comidas: [],
      acompanhamentos: [],
      opcionais: []
    }
  },
  computed: {
    itensCategoria() {
      return this[this.categoria] || [];
    }
  },
  methods: {
    async getDados() {
      try {
        const req = await fetch('http://localhost:3000/ingredientes')
        const data = await req.json()

        this.dados = data

        this.comidas = data.comidas || [];
        this.acompanhamentos = data.acompanhamentos || [];
        this.opcionais = data.opcionais || [];
      }
      catch (error) {
        console.error("Houve um erro de busca", error);
      }
    },
    async deleteProduto(id) {
      try {
        const dadosString = this.dados;
        const index = dadosString[this.categoria];

        const itemId = index.findIndex(item => item.id === id);

        if (itemId !== -1) {
          console.log(itemId);
          index.splice(itemId, 1);

          const req = await fetch('http://localhost:3000/ingredientes', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosString)
          });

          if (req.ok) {

            this.msg = `O Produto N° ${id} foi removido!`;

            setTimeout(() => {
              this.msg = '';
            }, 3000);

          } else {
            throw new Error('Falha ao atualizar os dados no servidor');
          }
        } else {
          console.error('Item não encontrado');
        }
      } catch (error) {
        console.error("Houve um erro durante a exclusão do produto", error);
      }

    },

    atualizarCategoria() {
      // Atualiza a lista de itens a serem exibidos na tabela quando a categoria é alterada
      this.itensCategoria = this[this.categoria];
    }
  },
  mounted() {
    this.getDados();
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

.tabela-topo,
.tabela-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.tabela-topo {
  display: grid;
  padding: 12px;
  grid-template-columns: 50px 2fr 2fr 1.07fr;
  gap: 20px;
  height: 70px;
  border-bottom: 3px solid var(--background-cinza);
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

.tabela-topo div {
  font-weight: bold;
}

.tabela-row {
  display: grid;
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

h2 {
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
