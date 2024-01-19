<template>
  <div>
    <div class="teste">
      <div
        class="notificacao-container"
        v-for="(notification, index) in notifications"
        :key="index"
      >
        <span class="material-symbols-outlined" :style="{ background: notification.color }">
          {{ notification.icon }}
        </span>
        <p>
          {{ notification.msg }}
        </p>
        <!-- <button @click="closeNotification">
          <span class="material-symbols-outlined"> cancel </span>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notifications: Array
  },
  // methods: {
  //   closeNotification() {
  //     this.notifications = []
  //   }
  // }
}
</script>

<style scoped>
.teste {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column-reverse;
  transition: 0.5s;
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
  color: black;
  font-size: 25px;
}

@keyframes showMessage {
  from {
    opacity: 0;
    margin-top: -100px;
  }

  to {
    opacity: 1;
  }
}
</style>
