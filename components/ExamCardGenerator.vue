<template>
  <div 
    v-for="exam in exams" 
    :key="exam.idAgendamento"
    class="d-flex align-center">
    <section class="text-center mr-4 text-h6 text-blue-dark font-weight-bold">
      <p>{{ formatDate(convertToISODate(exam.data)).day }}</p>
      <p>{{ formatDate(convertToISODate(exam.data)).month }}</p>
    </section>
    <v-card
      variant="flat"
      color="#E6F6FE"
      rounded="xl"
      class="w-100 mb-2"
      :subtitle="exam.titulo"
      :text="exam.local">
      <template #title>
        <span class="font-weight-bold">
          {{ formatDate(convertToISODate(exam.data)).weekday }}
        </span>
      </template>
    </v-card>
  </div>
</template>

<script lang="ts">
import type Exam from '~/interfaces/exam'
import convertToISODate from '~/utils/convertToISODate'

export default defineComponent({
    name: 'ExamCardGenerator',
    props: {
        exams: { 
          type: Array as PropType<Exam[]>, 
          required: true,
          default: () => [],
        },
    },
    methods: {
        formatDate(date: Date) {
            const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta", "Sábado"]
            const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]

            const formattedDate = date.toLocaleDateString('pt-BR')
            const formattedTime = date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            }).replace(':', 'h')

            return {
              weekday: `${weekdays[date.getDay()]} às ${formattedTime}`,
              day: formattedDate[0] + formattedDate[1],
              month: months[date.getMonth()]
            }
        },
    }
})
</script>
