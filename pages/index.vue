<template>
  <v-layout
    :class="['h-100', 'd-flex', 'justify-center', { 'align-center': loading }]"
  >
    <v-progress-circular v-if="loading" indeterminate />
    <v-container v-else>
      <SearchBar label="Buscar compromisso, médico ou data" />
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
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="appointment">
            <p class="mb-2">
              {{ statusMessage.begin }}
              <span class="text-blue-dark font-weight-bold">{{
                statusMessage.middle
              }}</span>
              {{ statusMessage.end }} para esta semana.
            </p>
            <ExamCardGenerator :exams="weekExams" />
            <p class="mt-4 mb-4">Compromissos futuros</p>
            <ExamCardGenerator :exams="futureExams" />
          </v-tabs-window-item>
          <v-tabs-window-item value="calendar">
            <TheCalendar :exams="weekExams" />
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
      <TheHeader />
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type Exam from "~/interfaces/exam";
import getUserExams from "~/utils/api/exams/getUserExams";
import convertToISODate from "~/utils/convertToISODate";
import moment from "moment";

export default defineComponent({
  name: "Exams",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      weekExams: ref([] as Exam[]),
      futureExams: ref([] as Exam[]),
      tab: ref(null),
      statusMessage: reactive({
        begin: "Existem",
        middle: "0 compromissos",
        end: "agendados",
      }),
      loading: ref(true),
    };
  },
  async mounted() {
    const allExams: Exam[] = await getUserExams();

    this.weekExams = allExams.filter((exam) =>
      this.isDateInThisWeek(convertToISODate(exam.data)),
    );
    this.futureExams = allExams.filter(
      (exam) => !this.isDateInThisWeek(convertToISODate(exam.data)),
    );
    this.loading = false;

    this.statusMessage.begin =
      this.weekExams.length == 1 ? "Existe" : "Existem";
    this.statusMessage.middle =
      this.weekExams.length == 1
        ? "1 compromisso"
        : `${this.weekExams.length} compromissos`;
    this.statusMessage.end =
      this.weekExams.length == 1 ? "agendado" : "agendados";
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

<style>
div {
  font-family: Rubik, sans-serif;
}

.v-field--active {
	background-color: #E8E9ED;
	border-radius: 10px;
}

.v-field--variant-outlined.v-field--active .v-field__outline__start,
.v-field--variant-outlined.v-field--active .v-field__outline__notch::before,
.v-field--variant-outlined.v-field--active .v-field__outline__notch::after,
.v-field--variant-outlined.v-field--active .v-field__outline__end {
  border-color: #017BFD !important;
}

.glow-effect {
  position: absolute;
  height: 1px;
  width: 1px;
  opacity: 15%;
  z-index: -1;
  box-shadow:
    0 0 100px 5rem #80d9ff,
    0 0 140px 6rem #009ee0;
}

.glow-effect.r.t {
  top: 0px;
  box-shadow:
    0 0 100px 5rem #e32585,
    0 0 140px 6rem #e858a1;
}

.glow-effect.r {
  right: 5px;
}

.glow-effect.l {
  left: 5px;
}
</style>
