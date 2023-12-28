<script setup>
import MassageNot from './Notificacao.vue'
</script>

<template>
    <h1>teste</h1>
    <form method="" @submit="criarProduto">
        <div class="tabela-scroll">
            <MassageNot :msg="msg" v-show="msg" />
            <div id="tabela-pedido">
                <div>
                    <div class="tabela-topo">
                        <div>Titulo do pedido:</div>
                        <div>Categoria:</div>
                        <div>Criar:</div>
                    </div>
                </div>
                <div id="tabela-rows">
                    <div class="tabela-row">
                        <input type="text" placeholder="insira o titulo" v-model="tipo" required>
                        <select name="categoria" id="categoria" v-model="categoria" required>
                            <option value="null">Tipo de produto</option>
                            <option value="comidas">Cardápio</option>
                            <option value="acompanhamentos">Acompanhamento</option>
                            <option value="opcionais">Complemento</option>
                        </select>
                        <input class="btn-produto" type="submit" value="Criar">
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'ProdutoForm',
    data() {
        return {
            nome: null,
            tipo: null,
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

            console.log(data)
        },

        async criarProduto(e) {
            e.preventDefault();

            const data = {
                tipo: this.tipo,
                categoria: this.categoria
            }

            const dataJson = JSON.stringify(data)

            // const req = await fetch('http://localhost:3000/ingredientes', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: dataJson
            // })

            // const res = await req.json()

            //Limpar campos ao enviar
            this.categoria = 'null'
            this.tipo = ''

            console.log('produto criado com sucesso!')
            console.log(dataJson)
        }
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
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    border-bottom: 3px solid #1f1d2b;
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
    border-bottom: 3px solid #1f1d2b;
}

select {
    cursor: pointer;
    padding: 12px 6px;
}

.btn-produto {
    cursor: pointer;
    max-width: 40%;
    width: 100%;
    background: #ea7c69;
    color: #fff;
    padding: 12px 6px;
    border: none;
    font-weight: bold;
}

.notificacao-container {
    background: red;
}

input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 4px;
    border: none;
}

.tabela-row .btn-produto,
.tabela-row select {
    max-width: 200px;
}
</style>