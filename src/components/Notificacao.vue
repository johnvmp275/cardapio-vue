<template>
  <div class="notificacao-container">
    <span class="material-symbols-outlined"> {{ icon }} </span>
    <p>
      {{ msg }}
    </p>
    <!-- <button><span class="material-symbols-outlined">
        cancel
      </span></button> -->
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    icon: String
  }
}
</script>

<style scoped>
.notificacao-container {
  position: fixed;
  margin-top: 20px;
  display: flex;
  align-items: center;
  color: var(--background-branco);
  padding: 16px;
  width: 100%;
  max-width: 400px;
  background: green;
  top: 10px;
  right: 10px;
  animation: showMessage 0.5s;
  border-radius: 8px;
  gap: 20px;
}

.notificacao-container p {
  display: flex;
  width: 100%;
  height: 60px;
  overflow: hidden;
  overflow-y: auto;
  align-items: center;
  /* max-width: 400px; */
  gap: 20px;
}

p::-webkit-scrollbar {
  width: 10px;
}

p::-webkit-scrollbar-thumb {
  background: var(--background-branco);
}

button {
  cursor: pointer;
  background: transparent;
  border: none;
  color: var(--background-branco);
}

button span {
  font-size: 28px;
}

@keyframes showMessage {
  from {
    margin-top: -100px;
  }

  to {}
}
</style>
