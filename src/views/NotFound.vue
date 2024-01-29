<template>
    <main>
        <section>
            <div>
                <h2>404</h2>
                <p>Página não encontrada</p>
            </div>
            <router-link :to="paginaInicial">
                Voltar para a sua página
            </router-link>
        </section>
    </main>
</template>

<script>
const userNivel = localStorage.getItem('userNivel');

export default {
    data() {
        return {
            paginaInicial: '/'
        }
    },
    mounted() {
        if (userNivel === 'gerenciador') {
            this.paginaInicial = '/pedidos';
        } else if (userNivel === 'normal') {
            this.paginaInicial = '/';
        } else {
            this.paginaInicial = '/';
        }
    }
}
</script>

<style scoped>
section {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

a {
    text-decoration: underline;
    color: #000;
}

h2 {
    font-size: 5rem;
    font-weight: bold;
}
</style>