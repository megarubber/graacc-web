<template>
  <v-layout
    :class="['h-100', 'd-flex', 'justify-center', { 'align-center': loading }]"
  >
    <v-progress-circular v-if="loading" indeterminate />
    <v-container v-else class="pa-0">
      <h2 class="mb-4 mt-8 text-center">Notificações</h2>
      <hr class="mb-2" />
      <div class="d-flex flex-column ga-4 mx-3">
        <p>Não lidas</p>
        <NotificationGenerator :notifications="readNotifications" color="blue-light" />
        <p>Lidas</p>
        <NotificationGenerator :notifications="notReadNotifications" color="#F8F8F8" />
      </div>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type Notification from "~/interfaces/notification";
import getUserNotifications from "~/utils/api/notifications/getUserNotifications";

export default defineComponent({
  name: "Notifications",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      loading: ref(true),
      readNotifications: ref([] as Notification[]),
      notReadNotifications: ref([] as Notification[]),
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

<style scoped>
hr {
  height: 3px;
  background-color: #e8e9ed;
  border: none;
}
</style>