<template>
    <section>
        <div>
            <h2>404</h2>
            <p>Página não encontrada</p>
        </div>
        <router-link to="/">
            Voltar para Home
        </router-link>
    </section>
</template>

<script>
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