<template>
  <v-calendar />
</template>

<script lang="ts">
import type Exam from '~/interfaces/exam'

export default defineComponent({
  name: 'TheCalendar',
  props: {
    exams: { 
      type: Array as PropType<Exam[]>, 
      required: true,
    },
  },
});
</script>
