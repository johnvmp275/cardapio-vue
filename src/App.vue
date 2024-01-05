<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { RouterLink } from 'vue-router'
import Footer from './components/Footer.vue'
</script>

<template>
   <nav>
    <section class="navigation-section">
      <div class="navigation-link">
        <RouterLink to="/">
          <span class="material-symbols-outlined">
            store
          </span>
        </RouterLink>
        <RouterLink to="/pedidos">
          <span class="material-symbols-outlined">
            shopping_cart
          </span>
        </RouterLink>
        <RouterLink to="/config" class="animation-rotate">
          <span class="material-symbols-outlined">
            settings
          </span>
        </RouterLink>
        <div class="indicador">
          <div class="indicador-list"></div>
        </div>
      </div>
    </section>
  </nav>
  <RouterView />
  <Footer />
</template>

<style scoped>

</style>
