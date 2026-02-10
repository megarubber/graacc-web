<template>
  <v-card
    v-for="notification in notifications"
    :key="notification.id_notificacao"
    variant="flat"
    :color="color"
    rounded="xl"
  >
    <v-card-item>
      <v-card-title>
        <p class="text-wrap font-weight-bold">
          Consulta confirmada 
        </p>
      </v-card-title>
      <template #append>
        <p class="text-blue-dark">{{ formatDate(notification.data) }}</p>
      </template>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import type Notification from "~/interfaces/notification";

export default defineComponent({
  name: "NotificationGenerator",
  props: {
    notifications: {
      type: Array as PropType<Notification[]>,
      required: true,
    },
    color: {
      type: String,
      required: true,
    }
  },
  methods: {
    formatDate(eventDate: string) {
      return eventDate.substring(0, 5);
    }
  }
});
</script>
