<template>
  <v-container class="pa-0 h-100 position-fixed">
    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      rounded="pill"
      bg-color="#ECEDF4"
      base-color="white"
      class="mt-6 mx-3"
      label="Buscar compromisso"
    />
    <div class="d-flex flex-column ga-2">
      <v-tabs v-model="tab">
        <v-tab class="w-50" color="black" value="appointment">
          <div class="tab-content d-flex align-center">
            <Icon 
              class="mr-2" 
              :style="tab === 'appointment' ? 'transform: rotate(-10deg); transition: transform 0.3s ease;' 
              : 'transform: none; transition: transform 0.3s ease;'"
              name="icons:bookmark-icons" 
              size="25" />
            <p class="font-weight-bold">Agendamentos</p>
          </div>
        </v-tab>
        <v-tab class="w-50" color="black" value="calendar">
          <div class="tab-content d-flex align-center">
            <Icon 
              class="mr-2"
              :style="tab === 'calendar' ? 'transform: rotate(-10deg); transition: transform 0.3s ease;' 
              : 'transform: none; transition: transform 0.3s ease;'"
              name="icons:calendar" size="25" />
            <p class="font-weight-bold">Calendário</p>
          </div>
        </v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab" class="px-3">
        <v-tabs-window-item value="appointment">
          <section v-if="noExams">
            <p>Sem compromissos nas próximas semanas.</p>
          </section>
          <section v-else>
            <section v-if="weekExams.length > 0">
              <p class="mb-2">
                {{ statusMessage.begin }}
                <span class="text-blue-dark font-weight-bold">{{
                  statusMessage.middle
                }}</span>
                {{ statusMessage.end }} para esta semana.
              </p>
              <exam-card-generator :exams="weekExams" />
            </section>
            <section v-if="futureExams.length > 0">
              <p class="mt-4 mb-4">Compromissos futuros</p>
              <exam-card-generator :exams="futureExams" />
            </section>
          </section>
        </v-tabs-window-item>
        <v-tabs-window-item value="calendar">
          <NewCalendar 
            locale="pt-BR" 
            expanded
            :attributes='attributes'
            @dayclick="onDayClick"
          />
          <section v-if="dayExams.length > 0">
            <p class="mt-4 mb-4">Compromissos futuros</p>
            <exam-card-generator :exams="dayExams" />
          </section>
          <section v-else class="text-center mt-8">
            Nenhum compromisso neste dia
          </section>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-container>
</template>

<script lang="ts">
import type Exam from "~/interfaces/exam";
import getUserExams from "~/utils/api/exams/getUserExams";
import convertToISODate from "~/utils/others/convertToISODate";
import moment from "moment";
import { useLoaderStore } from "~/store/loader";
import type CalendarAttributes from "~/interfaces/calendarAttributes";
import type CalendarDay from "~/interfaces/calendarDay";

export default defineComponent({
  name: "Home",
  setup() {
    definePageMeta({ middleware: "auth", showHeader: true });
  },
  data() {
    return {
      loader: useLoaderStore(),
      weekExams: ref([] as Exam[]),
      futureExams: ref([] as Exam[]),
      dayExams: [] as Exam[],
      allExams: ref([] as Exam[]),
      statusMessage: reactive({ 
        begin: "Existem",
        middle: "0 compromissos",
        end: "agendados",
      }),
      tab: ref(null),
      noExams: ref(false),
      attributes: ref<CalendarAttributes[]>([{
        key: "today",
        highlight: {
          color: 'blue',
          fillMode: 'light',
        },
        dates: new Date(),
      }]),
      search: ref('')
    }
  },
  async mounted() {
    this.loader.startLoading();
    this.allExams = await getUserExams() ?? [];

    if(this.allExams.length <= 0) {
      this.loader.endLoading();
      this.noExams = true;
      return;
    }

    this.allExams.forEach((exam) => 
      this.attributes.push({
        key: exam.titulo,
        bar: {
          style: {
            backgroundColor: '#E32585'
          }
        },
        dates: convertToISODate(exam.data),
      })
    );

    this.weekExams = this.allExams.filter((exam) => 
      this.isDateInThisWeek(convertToISODate(exam.data))
    );

    this.futureExams = this.allExams.filter(
      (exam) => !this.isDateInThisWeek(convertToISODate(exam.data)),
    );

    this.statusMessage.begin =
      this.weekExams.length == 1 ? "Existe" : "Existem";
    this.statusMessage.middle =
      this.weekExams.length == 1
        ? "1 compromisso"
        : `${this.weekExams.length} compromissos`;
    this.statusMessage.end =
      this.weekExams.length == 1 ? "agendado" : "agendados";
    this.loader.endLoading();
  },
  methods: {
    isDateInThisWeek(date: Date) {
      const now = moment();
      const currentDate = moment(date.toISOString());

      return now.isoWeek() === currentDate.isoWeek();
    },
    compareDate(firstDate: Date, secondDate: Date): boolean {
      return (firstDate.getDate() == secondDate.getDate())
      && (firstDate.getMonth() == secondDate.getMonth()) &&
      (firstDate.getFullYear() == secondDate.getFullYear());
    },
    onDayClick(selectedDay: CalendarDay) {
      this.dayExams = this.allExams.filter(
        (exam) => this.compareDate(
          convertToISODate(exam.data), selectedDay.date
        )
      );
    }
  },
});
</script>
