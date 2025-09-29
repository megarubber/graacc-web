<template>
  <v-layout class="h-100">
    <v-snackbar v-model="alert" location="top end" color="error">
      {{ alert_message }}
    </v-snackbar>
    <v-container class="d-flex flex-column justify-center align-center">
      <div class="image-container">
        <img src="/assets/images/sample.jpg">
      </div>
      <h1 class="text-center mb-4 font-weight-bold">Editar dados</h1>
      <section class="w-100">
        <v-file-input label="File input"></v-file-input>
        <v-text-field v-model="auth.user.nome" label="Nome completo do responsável" />
      </section>
      <v-btn class="w-100" @click="update">Editar</v-btn>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import type UserUpdate from "~/interfaces/userUpdate";
import type User from "~/interfaces/user";
import updateUserInfo from "~/utils/api/user/updateUserInfo";
import { useAuthStore } from "~/store/auth";

export default defineComponent({
  name: "UpdateProfile",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      auth: useAuthStore(),
      loading: ref(false),
      alert: false,
      alert_message: "",
    };
  },
  methods: {
    async update() {
      this.loading = true;
      const userUpdate: UserUpdate = {
        nome: this.auth.user.nome,
        email: this.auth.user.email,
        nomeCompletoPaciente: this.auth.patient.nome,
      };

      try {
        const response = await updateUserInfo(userUpdate);
        this.$router.push("/");
      } catch(error) {
        this.alert = true;
        this.alert_message = "Erro ao editar dados.";
      }
      
      this.loading = false;
    },
  }, 
});
</script>

<style scoped>
.image-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 50px;
}
</style>
