<template>
  <div>
    <ScheduleXCalendar :calendar-app="this.calendarApp" />
    <TheHeader/>
  </div>
</template>

<script lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import type CalendarExam from '~/interfaces/calendarExam'
import type Exam from '~/interfaces/exam'
import getUserExams from '~/utils/api/exams/getUserExams'

export default defineComponent({
  name: 'CalendarioPage',
  components: {
    ScheduleXCalendar,
  },
  async setup() {
    const calendarExams: CalendarExam[] = [];
    const exams: Exam[] = await getUserExams();

    const formatDate = (event_date: string, hours: number) => {
      const date = new Date(event_date)
      const formattedDate: string = date.toISOString().split("T")[0];

      date.setHours(date.getHours() + hours);
      const formattedTime: string = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `${formattedDate} ${formattedTime}`
    }

    exams.forEach(
      (exam) => calendarExams.push({
        id: exam.id_agendamento,
        title: exam.titulo,
        start: formatDate(exam.data, 0),
        end: formatDate(exam.data, 1)
      })
    );

    const calendarApp = createCalendar({
      selectedDate: '2024-10-25',
      locale: 'pt-BR',
      views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
      ],
      events: calendarExams,
    });

    return { calendarApp };
  }
});
</script>
