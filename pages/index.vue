<template>
  <v-layout
    class="h-100 d-flex justify-center"
  >
    <v-container class="pa-0">
      <search-bar class="mt-6 mx-3" label="Buscar compromisso, médico ou data" />
      <div class="d-flex flex-column ga-2">
        <v-tabs v-model="tab">
          <v-tab class="w-50" color="black" value="appointment">
            <div class="tab-content d-flex align-center">
              <Icon class="mr-2" name="fluent-emoji:bookmark-tabs" size="25" />
              <p class="font-weight-bold">Agendamentos</p>
            </div>
          </v-tab>
          <v-tab class="w-50" color="black" value="calendar">
            <div class="tab-content d-flex align-center">
              <Icon class="mr-2" name="fluent-emoji:calendar" size="25" />
              <p class="font-weight-bold">Calendário</p>
            </div>
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab" class="mx-3">
          <v-tabs-window-item value="appointment">
            <p class="mb-2">
              {{ statusMessage.begin }}
              <span class="text-blue-dark font-weight-bold">{{
                statusMessage.middle
              }}</span>
              {{ statusMessage.end }} para esta semana.
            </p>
            <exam-card-generator :exams="weekExams" />
            <p class="mt-4 mb-4">Compromissos futuros</p>
            <exam-card-generator :exams="futureExams" />
          </v-tabs-window-item>
          <v-tabs-window-item value="calendar">
            <TheCalendar :exams="weekExams" />
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type Exam from "~/interfaces/exam";
import getUserExams from "~/utils/api/exams/getUserExams";
import convertToISODate from "~/utils/convertToISODate";
import moment from "moment";
import { useLoaderStore } from "~/store/loading";

export default defineComponent({
  name: "Home",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      loader: useLoaderStore(),
      weekExams: ref([] as Exam[]),
      futureExams: ref([] as Exam[]),
      statusMessage: reactive({ 
        begin: "Existem",
        middle: "0 compromissos",
        end: "agendados",
      }),
      tab: ref(null),
    }
  },
  async mounted() {
    this.loader.startLoading();
    const allExams: Exam[] = await getUserExams();

    if(allExams.length > 1) {
      this.weekExams = allExams.filter((exam) =>
        this.isDateInThisWeek(convertToISODate(exam.data)),
      );
      this.futureExams = allExams.filter(
        (exam) => !this.isDateInThisWeek(convertToISODate(exam.data)),
      );
    }

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
  },
});
</script>