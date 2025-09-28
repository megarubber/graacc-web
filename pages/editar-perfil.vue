<template>
  <v-layout class="h-100">
    <v-container class="d-flex flex-column justify-center align-center">
      <h1 class="text-center mb-4 font-weight-bold">Editar dados</h1>
      <section class="w-100">
        <v-text-field v-model="auth.user.nome" label="Nome completo do responsável" />
        <v-text-field v-model="auth.patient.nome" label="Nome completo do paciente" />
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
    };
  },
  methods: {
    async update() {
      this.loading = true;
      /*
      try {
        const response = await updateUserInfo(this.user);
        console.log(response);
        if(response) this.$router.push("/");

      } catch(error) {
        this.alert = true;
        this.alert_message = "Erro ao fazer login.";
      }
      */
      this.$router.push("/");
      
      this.loading = false;
    },
  }, 
});
</script>
