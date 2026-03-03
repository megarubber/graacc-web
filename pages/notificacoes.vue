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
      <section v-if="readNotifications.length > 0 || notReadNotifications.length > 0">
        <section v-if="readNotifications.length > 0">
          <p>Não lidas</p>
          <NotificationGenerator :notifications="readNotifications" color="blue-light" />
        </section>
        <section v-if="notReadNotifications.length > 0">
          <p>Lidas</p>
          <NotificationGenerator :notifications="notReadNotifications" color="#F8F8F8" />
        </section>
      </section>
      <section v-else>
        <p class="text-center">Sem notificações encontradas</p>
      </section>
    </v-main>
  </v-container>
</template>

<script lang="ts">
import type Notification from "~/interfaces/notification";
import getPatientNotifications from "~/utils/api/notifications/getPatientNotifications";
import { useLoaderStore } from "~/store/loader";
import { useAuthStore } from "~/store/auth";

export default defineComponent({
  name: "Notifications",
  setup() {
    definePageMeta({ middleware: "auth", showHeader: true });
  },
  data() {
    return {
      readNotifications: ref([] as Notification[]),
      notReadNotifications: ref([] as Notification[]),
      loader: useLoaderStore(),
      auth: storeToRefs(useAuthStore())
    };
  },
  async mounted() {
    this.loader.startLoading();

    const notifications = await getPatientNotifications(this.auth.patient.id_paciente) ?? [];
    this.readNotifications = notifications.filter(
      (notification) => notification.lida
    );
    this.notReadNotifications = notifications.filter(
      (notification) => !notification.lida
    );

    this.loader.endLoading();
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
