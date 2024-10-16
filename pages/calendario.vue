<template>
  <v-layout>
      <v-container>
        <v-calendar />
      </v-container>
  </v-layout>
</template>

<script lang="ts">
import { VCalendar } from 'vuetify/labs/VCalendar'

export default defineComponent({
  name: 'Calendário',
  components: {
    VCalendar,
  },
})
</script>

<style>

</style>
