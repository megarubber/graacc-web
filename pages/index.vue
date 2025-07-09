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
                  <ExamCardGenerator :exams="weekExams" />
                  <p class="mt-4 mb-4">Compromissos futuros</p>
                  <ExamCardGenerator :exams="futureExams" />
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
import type Exam from '~/interfaces/exam'
import getUserExams from '~/utils/api/exams/getUserExams'
import convertToISODate from '~/utils/convertToISODate'
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
					exam => this.isDateInThisWeek(convertToISODate(exam.data))
				)
				this.futureExams = allExams.filter(
					exam => !this.isDateInThisWeek(convertToISODate(exam.data))
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
    },
})
</script>

<style>
div {
  font-family: Rubik, sans-serif;
}
</style>
