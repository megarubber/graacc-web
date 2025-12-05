<template>
  <v-container>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon>
          <NuxtLink
            href="/login">
            <v-icon 
            style="background-color: #D7F2FF;"
            class="pa-4 rounded-xl"
            color="blue-dark" 
            icon="mdi-chevron-left"/>
          </NuxtLink>
        </v-app-bar-nav-icon>
        <v-app-bar-title
          class="font-weight-bold ml-2">Alterar dados</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main>
      <p class="text-h6 mb-2">Dados pessoais</p>
      <v-text-field 
        v-model="user.nomeResponsavel" 
        prepend-inner-icon="mdi-account-outline"
        label="Nome do(a) responsável" 
        />
      <p class="text-h6 mb-2">Dados de acesso</p>
      <v-text-field 
        v-model="user.email" 
        prepend-inner-icon="mdi-email-outline"
        label="E-mail"
        />
      <v-btn
        class="w-100"
        color="#F8F8F8"
        text="Alterar senha"
        prepend-icon="mdi-pencil-outline"
        @click="$router.push('/alterar-senha');"
      />
    </v-main>
  </v-container>
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
      user: {
        nomeResponsavel: "",
        email: "",
      },
      auth: storeToRefs(useAuthStore()),
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
        nome_completo_paciente: this.auth.patient.nome,
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
