<template>
  <h2 class="mb-4 mt-8 text-center">Notificações</h2>
  <hr class="mb-2" />
  <div class="d-flex flex-column ga-4">
    <p>Não lidas</p>
    <NotificationGenerator :notifications="readNotifications" color="blue-light" />
    <p>Lidas</p>
    <NotificationGenerator :notifications="notReadNotifications" color="#F8F8F8" />
  </div>
</template>

<script lang="ts">
import type Notification from "~/interfaces/notification";

export default defineComponent({
  name: "Notifications",
  props: {
    readNotifications: { 
      type: Array as PropType<Notification[]>, required: true, default: [],
    },
    notReadNotifications: {
      type: Array as PropType<Notification[]>, required: true, default: [],
    }
  }
});
</script>
