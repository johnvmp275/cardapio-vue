<template>
  <div class="notificacao_collumn">
    <div class="notificacao-container" v-for="(notification, index) in notifications" :key="index">
      <span class="material-symbols-outlined" :style="{ background: notification.color }">
        {{ notification.icon }}
      </span>
      <p>
        {{ notification.msg }}
      </p>
      <!-- <button @click="closeNotification(index)">
        <span class="material-symbols-outlined"> cancel </span>
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notifications: Array
  },
  // methods: {
  //   closeNotification(index) {
  //     // Clear the timeout associated with the notification being closed
  //     const timeoutId = this.notifications[index].timeoutId;
  //     clearTimeout(timeoutId);

  //     // Remove the notification from the array
  //     this.notifications.splice(index, 1);
  //   },
  // }
}
</script>

<style scoped>
.notificacao_collumn {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column-reverse;
  transition: 0.5s;
  z-index: 99999999999999;
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
