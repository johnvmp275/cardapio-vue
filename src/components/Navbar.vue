<script>
import { RouterLink } from 'vue-router'
</script>

<template>

  <!-- desktop version -->
  <nav class="navigation-desktop">
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

  <!-- mobile version -->
  <!-- <nav class="navigation-mobile">
    <section class="navigation-section-mobile">
      <div class="navigation-link-mobile">
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
        <div class="indicador-mobile">
          <div class="indicador-list-mobile"></div>
        </div>
      </div>
    </section>
  </nav> -->
</template>

<style scoped>
.navigation-desktop {
  width: 107px;
  height: 100vh;
  padding: 16px;
  /* justify-content: space-between; */
}

.navigation-mobile {
  display: none;
}

.navigation-section {
  top: 0;
  left: 0;
  display: flex;
  width: 107px;
  height: 100%;
  align-items: center;
  position: fixed;
  background: var(--background-cinza);
  flex-direction: column;
  border-radius: 0 8px 8px 0;
}

.navigation-section-mobile {
  position: fixed;
  width: 100%;
  height: 100px;
  border-radius: 8px;
  justify-content: center;
  bottom: 0;
  display: flex;
  background: var(--background-cinza);
}

.navigation-link {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}

.navigation-link-mobile {
  display: flex;
  align-items: center;
  gap: 20px;
}

a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  cursor: pointer;
  z-index: 10;
  transition-delay: 125ms;
}

a span {
  /* animation: animationLink .9s; */
  z-index: 10;
  transition: 0.5s;
  color: var(--background-laranja);
  font-size: 34px;
}

.navigation-link-mobile a{
  top: 0px;
}

.indicador-list {
  width: 75px;
  height: 75px;
  position: relative;
  z-index: 300;
  background: var(--background-laranja);
  box-shadow: 0 0 20px 0px var(--background-laranja);
  border-radius: 10px;
}

.indicador-list-mobile {
  width: 75px;
  height: 75px;
  position: relative;
  z-index: 300;
  background: var(--background-laranja);
  box-shadow: 0 0 20px 0px var(--background-laranja);
  border-radius: 50%;
}

a.router-link-active span {
  color: var(--background-branco);
}

.indicador {
  position: fixed;
  width: 100px;
  height: 90px;
  left: 10px;
  top: 63px;
  background: var(--background-branco);
  border-radius: 8px 0 0 8px;
  border: 8px solid var(--background-branco);
  transition: 0.5s;
}

.indicador-mobile {
  position: fixed;
  left: 75px;
  bottom: 30px;
  border: 8px solid var(--background-branco);
  border-radius: 50%;
  background: var(--background-branco);
  transition: 0.5s;
}

.indicador::before {
  content: '';
  position: absolute;
  top: -28px;
  right: -4.5px;
  width: 20px;
  height: 20px;
  border-bottom-right-radius: 10px;
  background: var(--background-cinza);
  box-shadow: 0 10px 0 0 var(--background-branco);
}

.indicador-mobile::before {
  content: '';
  position: absolute;
  top: 13px;
  left: -28px;
  width: 20px;
  height: 20px;
  border-top-right-radius: 20px;
  background: var(--background-cinza);
  box-shadow: 1px -10px 0 0 var(--background-branco);
}

.indicador::after {
  content: '';
  position: absolute;
  right: -4.5px;
  bottom: -28px;
  width: 20px;
  height: 20px;
  border-top-right-radius: 10px;
  background: var(--background-cinza);
  box-shadow: 0 -10px 0 0 var(--background-branco);
}

.indicador-mobile::after {
  content: '';
  position: absolute;
  top: 13px;
  right: -28px;
  width: 20px;
  height: 20px;
  border-top-left-radius: 20px;
  background: var(--background-cinza);
  box-shadow: 1px -10px 0 0 var(--background-branco);
}

a.router-link-active {
  animation: animationLink 0.9s;
}

.animation-rotate.router-link-active {
  animation: rotation 5s linear infinite;
}

.navigation-link a.router-link-active:nth-child(2).router-link-active~.indicador {
  transform: translateY(calc(93px * 1));
}

.navigation-link a.router-link-active:nth-child(3).router-link-active~.indicador {
  transform: translateY(calc(93px * 2));
}

.navigation-link-mobile a.router-link-active:nth-child(2).router-link-active~.indicador-mobile {
  transform: translateX(calc(93px * 1));
}
.navigation-link-mobile a.router-link-active:nth-child(3).router-link-active~.indicador-mobile {
  transform: translateX(calc(94px * 2));
}

.navigation-link-mobile a.router-link-active{
  top: -25px;
}

@keyframes animationLink {
  10% {
    transform: translateY(-20px);
  }

  25% {
    transform: rotate(-35deg);
  }

  50% {
    transform: translateY(-20px);
  }

  75% {
    transform: rotate(35deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 720px) {
  .navigation-desktop {
    display: none;
  }

  .navigation-mobile {
    display: block;
  }
}
</style>
