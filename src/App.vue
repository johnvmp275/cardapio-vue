<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="router-link">
          <RouterLink to="/">Menu</RouterLink>
          <RouterLink to="/pedidos">Pedidos</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
nav {
  padding: 16px;
  width: 100%;
}

.router-link {
  display: flex;
  gap: 18px;
}
</style>
