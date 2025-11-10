<template>
  <v-layout>
    <v-container
      class="fix-header pa-0 position-fixed bottom-0 bg-white d-flex justify-center"
    >
      <v-tabs v-model="currentTab" @click="changePage">
        <v-tab value="/">
          <div class="custom-tab">
            <v-icon size="24" icon="mdi-home" />
            <p>Início</p>
          </div>
        </v-tab>
        <v-tab value="/contatos">
          <div class="custom-tab">
            <v-icon icon="mdi-phone" size="24" />
            <p>Contatos</p>
          </div>
        </v-tab>
        <v-tab value="/notificacoes">
          <div class="custom-tab">
            <v-icon
              :icon="totalNotifications > 0 ? 'mdi-bell-ring' : 'mdi-bell'"
              size="24"
            />
            <span 
              v-if="totalNotifications > 9"
              class="number-indicator"
              >+9</span
            >
            <span
              v-if="totalNotifications > 0 && totalNotifications < 9"
              class="number-indicator"
            >
              {{ totalNotifications }}
            </span>
            <p>Notificações</p>
          </div>
        </v-tab>
        <v-tab value="/perfil">
          <div class="custom-tab">
            <v-icon icon="mdi-account" size="24" />
            <p>Perfil</p>
          </div>
        </v-tab>
      </v-tabs>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type Notification from "~/interfaces/notification";
import getUserNotifications from "~/utils/api/notifications/getUserNotifications";

export default defineComponent({
  name: "TheHeader",
  data() {
    return {
      totalNotifications: ref(0),
      currentTab: ref('/'),
    };
  },
  async mounted() {
    const notifications = await getUserNotifications();
    const notReadNotifications: Notification[] = notifications.filter(
      (notification) => !notification.lida,
    );
    this.totalNotifications = notReadNotifications.length;
  },
  methods: {
    changePage() {
      this.$router.push(this.currentTab ?? '/');
    },
  },
});
</script>

<style scoped>
.custom-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: none;
  width: 10px;
}

.number-indicator {
  position: absolute;
  right: 11px;
  top: 6px;
  background-color: #a30052;
  padding: 2px 5px;
  border-radius: 20px;
  color: #fff;
  z-index: 2;
}

@media (max-width: 450px) {
  .custom-tab p {
    font-size: 12px;
  }

  .fix-header {
    left: 0;
  }
}
</style>
