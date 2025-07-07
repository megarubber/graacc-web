<template>
    <v-layout>
        <v-container>
            <div class="d-flex flex-column ga-4">
                <v-card
                    v-for="exam in exams"
                    :key="exam"
                    variant="flat"
                    color="blue-light"
                    rounded="lg"
                >
                    <v-card-item>
                        <v-card-title>
                            {{ formatDate(exam.data).weekday }}
                        </v-card-title>
                        <template #append>
                            <v-chip variant="flat" color="green">{{ exam.local }}</v-chip>
                        </template>
                    </v-card-item>
                    <v-card-subtitle>
                        {{ exam.titulo }}
                    </v-card-subtitle>
                </v-card>
            </div>
					<TheHeader />
        </v-container>
    </v-layout>
</template>

<script lang="ts">
import type Exam from '~/interfaces/exam';
import getUserExams from '~/utils/api/exams/getUserExams'

export default defineComponent({
    name: 'ExamsPage',
    setup() {
        definePageMeta({
            middleware: 'auth',
        })
    },
    data() {
        return {
            exams: ref([] as Exam[])
        }
    },
    async mounted() {
        this.exams = await getUserExams()
    },
    methods: {
        formatDate(event_date: string) {
            const date = new Date(event_date)
            const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta", "Sábado"]
            const formattedDate = date.toLocaleDateString('pt-BR')
            const formattedTime = date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            }).replace(':', 'h')

            const month = date.getMonth().toLocaleString('default', { month: 'long' } )
            return {
              weekday: `${weekdays[date.getDay()]} às ${formattedTime}`,
              day: formattedDate[0] + formattedDate[1],
              month
            }
        }
    },
})
</script>
