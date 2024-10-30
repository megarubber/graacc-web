 <template>
  <div>
    <ScheduleXCalendar :calendar-app="this.calendarApp" />
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

export default defineComponent({
  name: 'CalendarioPage',
  components: {
    ScheduleXCalendar,
  },
  setup() {
    const calendarApp = createCalendar({
      selectedDate: '2023-12-19',
      locale: 'pt-BR',
      views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
      ],
      events: [
        {
          id: 1,
          title: 'Event 1',
          start: '2023-12-19',
          end: '2023-12-19',
        },
        {
          id: 2,
          title: 'Event 2',
          start: '2023-12-20 12:00',
          end: '2023-12-20 13:00',
        },
      ],
    });

    return { calendarApp };
  }
});
</script>
