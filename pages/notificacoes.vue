<template>
  <v-layout>
    <v-container>
      <div class="d-flex flex-column ga-4">
        <v-card
            variant="flat"
            color="blue-light"
            rounded="lg"
            v-for="notification in notifications"
        >
          <v-card-item>
            <v-card-title>
              <p class="text-wrap">Novo agendamento: {{ formatDate(notification.data) }}</p>
            </v-card-title>
            <template v-slot:append>
              <v-icon icon="mdi-delete-forever" size="x-large"></v-icon>
            </template>
          </v-card-item>
          <v-card-actions>
            <v-btn variant="flat" rounded="xl" color="blue-dark">
              VER MAIS
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type Notification from '~/interfaces/notification';
import getUserNotifications from '~/utils/api/notifications/getUserNotifications';

export default defineComponent({
    name: 'NotificationsPage',
    data() {
        return {
            notifications: ref([] as Notification[])
        }
    },
    async mounted() {
        this.notifications = await getUserNotifications()
    },
    methods: {
        formatDate(event_date: Date) {
            const date = new Date(event_date)
            const formattedDate = date.toLocaleDateString('pt-BR')
            const formattedTime = date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            }).replace(':', 'h')
            return `${formattedDate} - ${formattedTime}`
        }
    }
})
</script>

<style>

</style>
