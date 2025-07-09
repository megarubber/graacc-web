<template>
    <v-layout>
        <v-container>
            <div class="d-flex flex-column ga-2">
              <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              rounded="pill"
              bg-color="#ECEDF4"
              base-color="white"
              label="Buscar compromisso, médico ou data"/>
              <v-tabs v-model="tab">
                <v-tab 
                  class="w-50"
                  color="black" 
                  value="appointment">
                  <div class="tab-content d-flex align-center">
                    <Icon class="mr-2" name="fluent-emoji:bookmark-tabs" size="25"/>
                    <p class="font-weight-bold">Agendamentos</p>
                  </div>
                </v-tab>
                <v-tab 
                  class="w-50"
                  color="black" 
                  value="calendar">
                  <div class="tab-content d-flex align-center">
                    <Icon class="mr-2" name="fluent-emoji:calendar" size="25"/>
                    <p class="font-weight-bold">Calendário</p>
                  </div>
                </v-tab>
              </v-tabs>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="appointment">
                  <p class="mb-2">
                    {{ statusMessage.begin }}
                    <span class="font-weight-bold">{{ statusMessage.middle }}</span>
                    {{ statusMessage.end }} para esta semana.
                  </p>
                  <div 
										v-for="exam in weekExams" 
										:key="exam.idAgendamento"
										class="d-flex align-center">
                    <section class="text-center mr-4 text-h6 font-weight-bold">
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
                  <p class="mt-4 mb-4">Compromissos futuros</p>
                  <div 
										v-for="exam in futureExams" 
										:key="exam.idAgendamento"
										class="d-flex align-center">
                    <section class="text-center mr-4 text-h6 font-weight-bold">
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
                </v-tabs-window-item>
                <v-tabs-window-item value="calendar">
                  <Calendar />
                </v-tabs-window-item>
              </v-tabs-window>
            </div>
					<TheHeader />
        </v-container>
    </v-layout>
</template>

<script lang="ts">
import type Exam from '~/interfaces/exam';
import getUserExams from '~/utils/api/exams/getUserExams'
import moment from 'moment'

export default defineComponent({
    name: 'Exams',
    setup() {
        definePageMeta({ middleware: 'auth' })
    },
    data() {
        return {
            weekExams: ref([] as Exam[]),
            futureExams: ref([] as Exam[]),
            search: '',
            tab: ref(null),
            statusMessage: reactive({
              begin: 'Existem',
              middle: '0 compromissos',
              end: 'agendados'
            })
        }
    },
    async mounted() {
        const allExams: Exam[] = await getUserExams()

				this.weekExams = allExams.filter(
					exam => this.isDateInThisWeek(this.convertToISODate(exam.data))
				)
				this.futureExams = allExams.filter(
					exam => !this.isDateInThisWeek(this.convertToISODate(exam.data))
				)

        this.statusMessage.begin = this.weekExams.length == 1 ? "Existe" : "Existem"
        this.statusMessage.middle = this.weekExams.length == 1 ? "1 compromisso" : `${this.weekExams.length} compromissos`
        this.statusMessage.end = this.weekExams.length == 1 ? "agendado" : "agendados"
    },
    methods: {
				isDateInThisWeek(date: Date) {
						const now = moment()
						const currentDate = moment(date.toISOString())
						
						return now.isoWeek() === currentDate.isoWeek()
				},
				convertToISODate(eventDate: string) {
            const [datePart, timePart] = eventDate.split(' ')
            const [day, month, year] = datePart.split('/').map(Number)
            const [hours, minutes] = timePart.split(':').map(Number)

            return new Date(year, month - 1, day, hours, minutes)
				},
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
    },
})
</script>

<style>
div {
  font-family: Rubik, sans-serif;
}
</style>
