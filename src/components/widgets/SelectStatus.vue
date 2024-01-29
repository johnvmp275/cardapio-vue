<!-- StatusPedido.vue -->
<template>
    <section class="status-pedido">
        <div @click="toggleDropdown(pedido.id)" class="status_selecionado">
            <div class="circle_status" :style="{ background: getCircleColor(pedido.status) }"></div>
            <p>{{ getSelectedStatus(pedido.status) }}</p>
        </div>
        <div class="dropdown-container" v-show="showDropdown[pedido.id]">
            <ul class="dropdown">
                <li v-for="(s, index) in status" :key="s.id" @click="updateStatus(s.tipo, pedido.id, index)">
                    <div class="circle_status" :style="{ background: s.color }"></div>
                    {{ s.tipo }}
                </li>
            </ul>
        </div>
    </section>
</template>
  
<script>
export default {
    props: {
        pedido: Object,
        showDropdown: String,
        toggleDropdown: Function,
        getCircleColor: String,
        getSelectedStatus: String,
        status: Array,
        updateStatus: Function,
        pedidosId: String
    }
};
</script>
  
<style scoped>
.status-pedido {
    cursor: pointer;
    max-width: 200px;
    width: 100%;
    position: relative;
}

.status_selecionado {
    display: flex;
    align-items: center;
    border: 1px solid var(--background-cinza);
    border-radius: 5px;
    height: 51px;
    width: 100%;
    min-height: 100%;
    gap: 5px;
    padding: 5px 10px;
}

.status_selecionado p {
    max-width: 110px;
    width: 100%;
}

.dropdown-container {
    position: absolute;
    background: var(--background-branco);
    border: 1px solid var(--background-cinza);
    z-index: 100;
    width: 100%;
    margin-top: 10px;
    padding: 3px;
    border-radius: 5px;
}

.dropdown {
    height: 97px;
    overflow-y: auto;
}

.dropdown-container::before {
    content: '';
    position: absolute;
    z-index: 1000;
    display: flex;
    width: 10px;
    height: 10px;
    top: -6px;
    right: calc(50% - 5px);
    transform: rotate(45deg);
    background: var(--background-branco);
    border-left: 1px solid var(--background-cinza);
    border-top: 1px solid var(--background-cinza);
}

.dropdown li {
    display: flex;
    gap: 5px;
    align-items: center;
    list-style: none;
    width: 100%;
    padding: 8px;
}

.circle_status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

*::-webkit-scrollbar {
  height: 10px;
}

*::-webkit-scrollbar-thumb {
  background: var(--background-cinza);
}

ul::-webkit-scrollbar {
  width: 5px;
}
</style>
  