<template>
  <div>
    <div class="teste">
      <div class="notificacao-container" v-for="(notification, index) in notifications" :key="index">
        <span class="material-symbols-outlined" :style="{ background: notification.color }">
          {{ notification.icon }}
        </span>
        <p>
          {{ notification.msg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notifications: Array
  }
}
</script>

<style scoped>
.teste {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column-reverse;
  transition: .5s;
}

.notificacao-container {
  position: relative;
  margin-top: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  min-width: 400px;
  animation: showMessage 0.5s;
  border-radius: 8px;
  background: var(--background-branco);
  gap: 20px;
  box-shadow: 0 0 10px 0px;
}

.notificacao-container p {
  display: flex;
  color: var(--background-cinza);
  width: 100%;
  max-width: 270px;
  flex-wrap: wrap;
  overflow: hidden;
  overflow-y: auto;
  align-items: center;
  height: 100%;
  gap: 20px;
}

span {
  padding: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  color: var(--background-branco);
  border-radius: 8px 0 0 8px;
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
    margin-top: -50px;
  }

  to {}
}
</style>
