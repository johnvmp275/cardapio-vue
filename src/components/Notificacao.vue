<template>
  <div class="notificacao-container">
    <p>
      <span class="material-symbols-outlined"> check </span>
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style scoped>
.notificacao-container {
  position: fixed;
  margin-top: 20px;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  background: green;
  top: 10px;
  right: 10px;
  animation: showMessage 0.5s;
  border-radius: 8px;
}

.notificacao-container p {
  display: flex;
  align-items: center;
  gap: 20px;
}

@keyframes showMessage {
  from {
    margin-top: -100px;
  }
  to {
  }
}
</style>
