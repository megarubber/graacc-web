<template>
    <v-layout>
        <v-container>
            <v-tabs>
                <v-tab to="/exames">Exames
                    <v-icon></v-icon>
                </v-tab>
                <v-tab to="/calendario">Calendário</v-tab>
                <v-tab to="/contatos">Contatos</v-tab>
                <v-tab to="/notificacoes">Notificações</v-tab>
            </v-tabs>
            <h1 class="mb-4">Próximos Exames</h1>
            <div class="d-flex flex-column ga-4">
                <v-card
                    variant="flat"
                    color="blue-light"
                    rounded="lg"
                    v-for="exam in exams"
                >
                    <v-card-item>
                        <v-card-title>
                            {{ formatDate(exam.date) }}
                        </v-card-title>
                        <template v-slot:append>
                            <v-chip variant="flat" color="green">Sala {{ exam.room }}</v-chip>
                        </template>
                    </v-card-item>
                    <v-card-subtitle>
                        {{ exam.name }}
                    </v-card-subtitle>
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
    name: 'ExamsPage',
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