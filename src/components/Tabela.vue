<template>
    <div id="tabela-rows">
        <div class="tabela-row" v-for="comida in itensCategoria" :key="comida.id">
            <div class="id-pedido">{{ comida.id }}</div>
            <p>{{ comida.tipo }}</p>
            <button @click="deleteProduto(comida.id)" class="btn-produto">Remover</button>
        </div>
        <p class="aviso-sem-estoque" v-if="!itensCategoria.length">Não há itens nesta categoria.</p>
    </div>
</template>

<script>
export default {
    props: {
        getDados: {
            type: Function,
            required: true,
        },
        deleteProduto: {
            type: Function,
            required: true,
        },
        categoria: {
            type: String,
            required: true,
        },
        comidas: {
            type: Array,
            required: true,
        },
        acompanhamentos: {
            type: Array,
            required: true,
        },
        opcionais: {
            type: Array,
            required: true,
        }
    },
    methods: {
        deleteItem(id) {
            // Emitir evento para o componente pai para manipulação dos dados
          this.deleteProduto(id)
        },
        async fetchData() {
            // Chama a função getDados recebida como prop
            await this.getDados();
        },
    },
    computed: {
        itensCategoria() {
            return this[this.categoria] || [];
        }
    },
    mounted() {
        this.fetchData(); // Chama a função para carregar os dados ao montar o componente
    },
};
</script>


<style scoped>

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