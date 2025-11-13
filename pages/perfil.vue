<template>
  <v-container>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-title
          class="font-weight-bold ml-2">
          Perfil
        </v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main class="text-center d-flex flex-column align-center ga-4">
      <div class="image-container">
        <v-icon icon="mdi-account-outline" size="60"/>
      </div>
      <h3 style="color: #4b4b4b">Responsável: {{ auth.user.nome }}</h3>
      <h3>{{ auth.patient.nome }}</h3>
      <v-btn
        class="w-100"
        color="#F8F8F8"
        text="Atualizar dados"
        prepend-icon="mdi-pencil-outline"
        @click="this.$router.push('/editar-perfil');"
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
    </v-main>
  </v-container>
</template>

<script lang="ts">
import { useAuthStore } from "~/store/auth";

export default defineComponent({
  name: "Profile",
  data() {
    return {
      auth: useAuthStore(),
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
