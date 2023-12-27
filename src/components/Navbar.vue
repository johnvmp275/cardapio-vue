<script>
import { RouterLink } from 'vue-router'
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
                <div class="indicador">
                    <div class="indicador-list"></div>
                </div>
            </div>
        </section>
    </nav>
</template>

<style scoped>
nav {
    width: 107px;
    height: 100vh;
    padding: 16px;
    /* justify-content: space-between; */
}

.navigation-section {
    top: 0;
    left: 0;
    display: flex;
    width: 107px;
    height: 100%;
    align-items: center;
    position: fixed;
    background: #1F1D2B;
    flex-direction: column;
    border-radius: 0 8px 8px 0;
}

.navigation-link {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 18px;
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
    top: 63px;
    background: #fff;
    border-radius: 8px 0 0 8px;
    border: 8px solid #fff;
    transition: .5s;
}

.indicador::before {
    content: '';
    position: absolute;
    top: -28px;
    right: -4.5px;
    width: 20px;
    height: 20px;
    border-bottom-right-radius: 10px;
    background: #1F1D2B;
    box-shadow: 0 10px 0 0 #fff;
}

.indicador::after {
    content: '';
    position: absolute;
    right: -4.5px;
    bottom: -28px;
    width: 20px;
    height: 20px;
    border-top-right-radius: 10px;
    background: #1F1D2B;
    box-shadow: 0 -10px 0 0 #fff;
}

a.router-link-active {
    animation: animationLink .9s;
}

.navigation-link a.router-link-active:nth-child(2).router-link-active~.indicador {
    transform: translateY(calc(93px * 1));
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

@media (max-width: 720px) {
    nav {
        display: none;
    }
}
</style>