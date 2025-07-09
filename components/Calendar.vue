<template>
  <v-calendar />
</template>

<script lang="ts">
import type CalendarExam from '~/interfaces/calendarExam'
import type Exam from '~/interfaces/exam'
import convertToISODate from '~/utils/convertToISODate'

export default defineComponent({
  name: 'Calendar',
  props: {
    exams: { 
      type: Array as PropType<Exam[]>, 
      required: true,
      default: () => [],
    },
  },
});
</script>
