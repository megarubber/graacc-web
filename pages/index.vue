<template>
    <v-layout>
        <v-container>
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
                            {{ formatDate(exam.data) }}
                        </v-card-title>
                        <template v-slot:append>
                            <v-chip variant="flat" color="green">Sala {{ exam.local }}</v-chip>
                        </template>
                    </v-card-item>
                    <v-card-subtitle>
                        {{ exam.titulo }}
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
import type Exam from '~/interfaces/exam';
import getUserExams from '~/utils/api/exams/getUserExams'

export default defineComponent({
    name: 'ExamsPage',
    data() {
        return {
            exams: ref([] as Exam[])
        }
    },
    setup() {
        definePageMeta({
            middleware: 'auth',
        })
    },
    async mounted() {
        this.exams = await getUserExams()
    },
    methods: {
        formatDate(event_date: string) {
            const date = new Date(event_date)
            const formattedDate = date.toLocaleDateString('pt-BR')
            const formattedTime = date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            }).replace(':', 'h')
            return `${formattedDate} - ${formattedTime}`
        }
    },
})
</script>

<style>

</style>