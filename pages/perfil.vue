<template>
  <v-container class="h-100">
    <v-app-bar>
      <template #prepend>
        <v-app-bar-title
          class="font-weight-bold ml-2">
          Perfil
        </v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main class="text-center d-flex h-100 justify-space-between flex-column">
      <section class="d-flex flex-column ga-4">
        <profile-image :size="100" />
        <h3 style="color: #4b4b4b">{{ auth.user.nome }}</h3>
        <h3 class="mb-4">{{ auth.patient.nome }}</h3>
        <v-btn
          class="w-100"
          color="#F8F8F8"
          text="Atualizar dados"
          prepend-icon="mdi-pencil-outline"
          @click="$router.push('/editar-perfil');"
        />
        <v-btn
          class="w-100"
          color="#F8F8F8"
          text="Preferências de notificações"
          prepend-icon="mdi-bell-outline"
        />
        <v-btn
          class="w-100"
          color="#F8F8F8"
          text="Desconectar"
          prepend-icon="mdi-exit-to-app"
          to="/login"
          @click="logUserOut()"
        />
      </section>
      <p class="text-primary mb-14">Excluir Conta</p>
    </v-main>
  </v-container>
</template>

<script lang="ts">
import { useAuthStore } from "~/store/auth";

export default defineComponent({
  name: "Profile",
  data() {
    return {
      auth: storeToRefs(useAuthStore()),
    };
  },
  methods: {
    logUserOut() {
      try {
        this.auth.logUserOut();
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>

<style scoped>
.v-btn {
  justify-content: flex-start;
  text-align: left;
}

.image-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
