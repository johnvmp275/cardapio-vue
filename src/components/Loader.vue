<template>
    <div class="loader" v-if="!isLoader">
        <div class="loader-container">
            <div class="esferas esfera01"></div>
            <div class="esferas esfera02"></div>
            <div class="esferas esfera03"></div>
            <div class="esferas esfera04"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            isLoader: false,
        }
    },
    mounted() {
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                this.isLoader = true;
            }
        }
    }
}
</script>

<style scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    background: var(--background-cinza);
    width: 100vw;
    height: 100vh;
    z-index: 9999;
}

.loader-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.esferas {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.esfera01 {
    background: var(--background-laranja);
    animation: esfera-animation .7s  infinite;
}

.esfera02 {
    background: var(--background-laranja);
    animation: esfera-animation .7s  infinite;
    animation-delay: 200ms;
}

.esfera03 {
    background: var(--background-laranja);
    animation: esfera-animation .7s  infinite;
    animation-delay: 400ms;
}

.esfera04 {
    background: var(--background-laranja);
    animation: esfera-animation .7s  infinite;
    animation-delay: 600ms;
}

@keyframes esfera-animation {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-50px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>