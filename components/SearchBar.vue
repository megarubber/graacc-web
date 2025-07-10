<template>
  <v-text-field
  v-model="search"
  prepend-inner-icon="mdi-magnify"
  rounded="pill"
  bg-color="#ECEDF4"
  base-color="white"
  :label="label"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SearchBar',
  props: {
    label: {
      type: String, 
      required: true
    }
  }
})
</script>
