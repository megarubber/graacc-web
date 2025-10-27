<template>
  <v-layout
    :class="['h-100', 'd-flex', 'justify-center', { 'align-center': loading }]"
  >
    <v-progress-circular v-if="loading" indeterminate />
    <v-container v-else class="pa-0">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="exams">
          <exams 
              :week-exams="weekExams" 
              :future-exams="futureExams" 
              :status-message="statusMessage"/>
        </v-tabs-window-item>
        <v-tabs-window-item value="contacts">
          <contacts />
        </v-tabs-window-item>
        <v-tabs-window-item value="notifications">
          <notifications 
            :read-notifications="readNotifications" 
            :not-read-notifications="notReadNotifications"
            />
        </v-tabs-window-item>
        <v-tabs-window-item value="profile">
          <profile />
        </v-tabs-window-item>
      </v-tabs-window>
      <the-header :tab="tab" @changed-tab="(newTab) => tab = newTab"/>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type Exam from "~/interfaces/exam";
import type Notification from "~/interfaces/notification";
import getUserExams from "~/utils/api/exams/getUserExams";
import convertToISODate from "~/utils/convertToISODate";
import moment from "moment";
import getUserNotifications from "~/utils/api/notifications/getUserNotifications";

export default defineComponent({
  name: "Home",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      loading: ref(true),
      weekExams: ref([] as Exam[]),
      futureExams: ref([] as Exam[]),
      tab: ref("exams"),
      statusMessage: reactive({
        begin: "Existem",
        middle: "0 compromissos",
        end: "agendados",
      }),
      readNotifications: ref([] as Notification[]),
      notReadNotifications: ref([] as Notification[]),
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

    const notifications = await getUserNotifications();
    this.readNotifications = notifications.filter(
      (notification) => notification.lida
    );
    this.notReadNotifications = notifications.filter(
      (notification) => !notification.lida
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