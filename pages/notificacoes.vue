<template>
  <v-layout>
    <v-container>
      <div class="d-flex flex-column ga-4">
        <v-card
            variant="flat"
            color="blue-light"
            rounded="lg"
            v-for="exam in exams"
        >
          <v-card-item>
            <v-card-title>
              Novo agendamento: {{ formatDate(exam.date) }}
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
export default defineComponent({
    name: 'NotificationsPage',
    data() {
        return {
            exams: [
                {
                    name: "Exame 1",
                    date: new Date(2024, 9, 2, 14),
                    room: "21",
                },
                {
                    name: "Exame 2",
                    date: new Date(2024, 10, 13, 15),
                    room: "14",
                }
            ]
        }
    },
    methods: {
        formatDate(date: Date) {
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
