<template>
  <v-container class="h-100 position-fixed">
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon>
          <NuxtLink
            href="/perfil">
            <v-icon 
            style="background-color: #D7F2FF;"
            class="pa-4 rounded-xl"
            color="blue-dark"
            icon="mdi-chevron-left"/>
          </NuxtLink>
        </v-app-bar-nav-icon>
        <v-app-bar-title
          class="font-weight-bold ml-2">Notificações</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main>
      <v-row class="d-flex pa-4 justify-space-between">
        <p class="mt-4">Receber Notificações</p>
        <v-switch v-model="notifications" inset />
      </v-row>
      <v-card v-if="notifications" flat>
        <v-card-text class="notification-card">
          <v-row class="d-flex pa-4 justify-space-between">
            <p class="mt-4">Notificações sobre consultas</p>
            <v-switch v-model="appointments" inset />
          </v-row>
          <v-row class="d-flex pa-4 justify-space-between">
            <p class="mt-4">Notificações sobre exames</p>
            <v-switch v-model="examinations" inset />
          </v-row>
          <v-row class="d-flex pa-4 justify-space-between">
            <p class="mt-4">Informações sobre o GRAACC</p>
            <v-switch v-model="graacc" inset />
          </v-row>
        </v-card-text>
      </v-card>
    </v-main>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  name: "SettingsNotifications",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      notifications: ref(false),
      appointments: ref(false),
      examinations: ref(false),
      graacc: ref(false),
    };
  },
});
</script>

<style scoped>
.notification-card {
  background-color: #ECEDF4;
  display: flex;
  flex-direction: column;
}
</style>
