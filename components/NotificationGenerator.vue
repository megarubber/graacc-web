<template>
  <v-card
    variant="flat"
    :color="color"
    rounded="xl"
    v-for="notification in notifications"
  >
    <v-card-item>
      <v-card-title>
        <p class="text-wrap font-weight-bold">
          Consulta confirmada 
        </p>
      </v-card-title>
      <template v-slot:append>
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
    formatDate(eventDate) {
      return eventDate.substring(0, 5);
    }
  }
});
</script>
