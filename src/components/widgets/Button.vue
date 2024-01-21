<template>
    <button>
        <slot v-if="!btnLoader" />
        <span v-else class="material-symbols-outlined">
            progress_activity
        </span>
    </button>
</template>

<script>

export default {
    props:{
        btnLoader: {
          type: String,
          required: false
        }
    }
}

</script>

<style scoped>

span {
    animation: loader .9s linear infinite;
    color: var(--background-branco);
}

button {
    outline: none;
    height: 51px;
    border: none;
    cursor: pointer;
}

@keyframes loader {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>