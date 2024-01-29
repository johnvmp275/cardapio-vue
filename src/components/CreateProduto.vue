<script setup>
import MassageNot from './widgets/Notificacao.vue'
import Button from './widgets/Button.vue'
import DeleteProduto from './DeleteProduto.vue'
import CheckSelect from './widgets/CheckSelect.vue'
import Loader from './widgets/Loader.vue'
</script>

<template>
  <Loader :isLoader="isLoader" />
  <MassageNot :notifications="notificacoes" />
  <h1>Menu Personalizado</h1>
  <div>
    <div class="tabela-scroll">
      <div id="tabela-pedido">
        <div>
          <div class="tabela-topo">
            <strong>Titulo do prato:</strong>
            <strong>Categoria:</strong>
            <strong>Criar:</strong>
          </div>
        </div>
        <div id="tabela-rows">
          <div class="tabela-row">
            <input 
            type="text" 
            id="tipo" 
            placeholder="insira o titulo" 
            v-model="tipo"
            :class="{ 'invalid': Tipoinvalido }" 
            />
            <CheckSelect 
            :items="categoriaItems" 
            :selectedItem="categorias"
            @item-selected="categoriaSelect"
            :Categoriainvalida="Categoriainvalida" 
            />
            <Button @click="criarProduto" class="btn-produto" :btnLoader="btnLoader">
              Criar
            </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
          <DeleteProduto 
          :getDados="getDados" 
          :categoria="categoria" 
          :comidas="comidas" 
          :acompanhamentos="acompanhamentos"
          :opcionais="opcionais"
          :deleteProduto="deleteProduto" 
          :dados="dados" 
          />
</template>

<script>
export default {
  name: 'ProdutoForm',
  data() {
    return {
      nome: null,
      tipo: '',
      dados: {},
      categorias: 'Tipo de prato',
      update: true,
      updateKey: 0,
      notificacoes: [],
      comidas: [],
      acompanhamentos: [],
      opcionais: [],
      btnLoader: false,
      Tipoinvalido: false,
      Categoriainvalida: false,
      isLoader: false
    }
  },
  watch: {
    tipo: 'validarCampos',
    categorias: 'validarCampos'
  },
  computed: {
    categoriaItems() {
      return [
        { value: 'comidas', label: 'Principal' },
        { value: 'acompanhamentos', label: 'Acompanhamento' },
        { value: 'opcionais', label: 'Complemento' },
      ];
    },
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

        this.isLoader = true
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
    },
    async criarProduto() {
      try {
        if (this.tipo !== '' && this.categorias !== 'Tipo de prato') {

          this.btnLoader = true

          const dadosString = JSON.stringify(this.dados)
          const dataObj = JSON.parse(dadosString)

          const index = dataObj[this.categorias].length + 1
          dataObj[this.categorias].push({
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

          this.notificacoes.push({
            msg: `O Produto: ${this.tipo} acabou de ser criado!`,
            icon: 'check',
            color: 'green'
          });

          //Limpar mensagem após enviar
          setTimeout(() => {
            this.notificacoes.splice(0, 1);
          }, 4000);

          // Limpar campos ao enviar
          this.categorias = 'Tipo de prato'
          this.tipo = ''
          this.btnLoader = false

          this.getDados()
        } else {

          if (this.tipo === '') {
            this.Tipoinvalido = true;
          }
          if (this.categorias === 'Tipo de prato') {
            this.Categoriainvalida = true;
          }
          this.notificacoes.push({
            msg: `Por favor preencha os dados`,
            icon: 'warning',
            color: 'red'
          });

          setTimeout(() => {
            this.notificacoes.splice(0, 1);
          }, 4000);
        }

      } catch (error) {
        console.error("Houve um erro ao criar o produto", error);

        this.notificacoes.push({
          msg: `Houve um erro ao criar o Produto :(`,
          icon: 'warning',
          color: 'red'
        });

        setTimeout(() => {
          this.notificacoes.splice(0, 1);
        }, 4000);
      }
    },
    validarCampos() {
      if (this.tipo !== '') {
        this.Tipoinvalido = false;
      }
      if (this.categorias !== 'Tipo de prato') {
        this.Categoriainvalida = false;
      }
    },
    categoriaSelect(value) {
      this.categorias = value;
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
  /* overflow-x: scroll; */
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

input {
  width: 100%;
  border: 1px solid var(--background-cinza);
  padding: 12px 16px;
}

.tabela-row input {
  max-width: 300px;
}

#tipo.invalid {
  border: 2px solid red;
}
</style>
