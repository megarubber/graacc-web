<template>
  <v-layout 
    :class="['h-100', 'd-flex', 'justify-center', { 'align-center': loading }]"
  >
    <v-progress-circular v-if="loading" indeterminate />
    <v-container v-else>
      <h2 class="mb-4 mt-8 text-center">Notificações</h2>
      <hr class="mb-2" />
      <div class="d-flex flex-column ga-4">
        <p>Não lidas</p>
        <NotificationGenerator :notifications="readNotifications" color="blue-light" />
        <p>Lidas</p>
        <NotificationGenerator :notifications="notReadNotifications" color="#F8F8F8" />
      </div>
      <TheHeader />
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type Notification from "~/interfaces/notification";
import getUserNotifications from "~/utils/api/notifications/getUserNotifications";

export default defineComponent({
  name: "NotificationsPage",
  data() {
    return {
      readNotifications: ref([] as Notification[]),
      notReadNotifications: ref([] as Notification[]),
      loading: ref(true),
    };
  },
  async mounted() {
    const notifications = await getUserNotifications();
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
