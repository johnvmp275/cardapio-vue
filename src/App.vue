<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="router-link">
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
          <div class="indicador">
            <div class="indicador-list"></div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 17px;
  align-items: center;
  /* justify-content: space-between; */
  flex-direction: column;
  background: #1F1D2B;
  border-radius: 0 8px 8px 0;
}

.router-link {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}

a {
  position: relative;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  width: 75px;
  height: 75px;
  cursor: pointer;
  z-index: 10;
  transition-delay: 125ms;
}

a span {
  z-index: 10;
  transition: .5s;
  color: #EA7C69;
  font-size: 34px;
}

.indicador-list {
  width: 75px;
  height: 75px;
  position: relative;
  z-index: 300;
  background: #EA7C69;
  box-shadow: 0 0 20px 0px #EA7C69;
  border-radius: 10px;
}

a.router-link-active span {
  color: #fff;
}

.indicador {
  position: fixed;
  width: 100px;
  height: 90px;
  left: 10px;
  top: 50px;
  background: #fff;
  border-radius: 8px 0 0 8px;
  border: 8px solid white;
  transition: .5s;
}

.indicador::before {
  content: '';
  position: absolute;
  top: -28.2px;
  right: -7.4px;
  width: 20px;
  height: 20px;
  border-bottom-right-radius: 10px;
  background: #1F1D2B;
  box-shadow: 0 10px 0 0 white;
}

.indicador::after {
  content: '';
  position: absolute;
  right: -6.5px;
  bottom: -28px;
  width: 20px;
  height: 20px;
  border-top-right-radius: 10px;
  background: #1F1D2B;
  box-shadow: 0 -10px 0 0 white;
}

.router-link a.router-link-active:nth-child(2).router-link-active~.indicador {
  transform: translateY(calc(93px * 1));
}
</style>
