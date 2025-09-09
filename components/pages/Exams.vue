<template>
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
        <exam-card-generator :exams="weekExams" />
        <p class="mt-4 mb-4">Compromissos futuros</p>
        <exam-card-generator :exams="futureExams" />
      </v-tabs-window-item>
      <v-tabs-window-item value="calendar">
        <TheCalendar :exams="weekExams" />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script lang="ts">
import type Exam from "~/interfaces/exam";

export default defineComponent({
  name: "Exams",
  props: {
    weekExams: { 
      type: Array as PropType<Exam[]>, required: true, default: [],
    },
    futureExams: { 
      type: Array as PropType<Exam[]>, required: true, default: [],
    },
    statusMessage: { 
      type: Object,
      required: true,
      default: () => ({
        begin: "Existem",
        middle: "0 compromissos",
        end: "agendados",
      })
    },
  },
  data() {
    return {
      tab: ref(null)
    };
  },
});
</script>