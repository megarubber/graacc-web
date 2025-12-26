<template>
  <v-container class="pa-0 h-100 position-fixed">
    <v-app-bar>
      <template #prepend>
        <v-app-bar-title
          class="font-weight-bold ml-2">
          Notificações
        </v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main class="d-flex flex-column ga-4 mx-3 mt-3">
      <p>Não lidas</p>
      <NotificationGenerator :notifications="readNotifications" color="blue-light" />
      <p>Lidas</p>
      <NotificationGenerator :notifications="notReadNotifications" color="#F8F8F8" />
    </v-main>
  </v-container>
</template>

<script lang="ts">
import type Notification from "~/interfaces/notification";
import getUserNotifications from "~/utils/api/notifications/getUserNotifications";

export default defineComponent({
  name: "Notifications",
  setup() {
    definePageMeta({ middleware: "auth", layout: "blank" });
  },
  data() {
    return {
      loading: ref(true),
      readNotifications: ref([] as Notification[]),
      notReadNotifications: ref([] as Notification[]),
    };
  },
  async mounted() {
    const notifications = await getUserNotifications() ?? [];
    this.readNotifications = notifications.filter(
      (notification) => notification.lida
    );
    this.notReadNotifications = notifications.filter(
      (notification) => !notification.lida
    );

    this.loading = false;
  },
});
</script>

<style scoped>
hr {
  height: 3px;
  background-color: #e8e9ed;
  border: none;
}
</style>
