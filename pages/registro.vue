<template>
  <v-container class="d-flex ga-2 flex-column">
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
          class="font-weight-bold ml-2">Criar conta</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main>
      <p class="font-weight-bold text-h6 mb-3">Insira seus dados</p>
      <section>
        <v-text-field 
          v-model="user.nomeResponsavel" 
          prepend-inner-icon="mdi-account-outline"
          label="Nome do(a) responsável" 
          />
        <v-text-field 
          v-model="user.idPaciente" 
          prepend-inner-icon="mdi-card-account-details-outline"
          label="ID do(a) paciente" 
          />
        <v-text-field 
          v-model="user.email" 
          prepend-inner-icon="mdi-email-outline"
          label="E-mail"
          />
        <v-text-field
          v-model="user.senha"
          prepend-inner-icon="mdi-form-textbox-password"
          label="Senha"
          :type="show ? 'text' : 'password'"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="show = !show"
        />
      </section>
      <v-btn class="w-100" @click="register()">Criar conta</v-btn>
      <div class="text-center mt-6">
        <p>Já tem uma conta?</p>
        <NuxtLink 
        href="/login" class="font-weight-bold mb-6 text-blue-dark">
          Faça login aqui.
        </NuxtLink>
      </div>
    </v-main>
  </v-container>
</template>

<script lang="ts">
import { useLoaderStore } from "~/store/loading";
import createUser from "~/utils/api/register/createUser";
import type UserRegister from "~/interfaces/userRegister";

export default defineComponent({
  name: "Registro",
  data() {
    return {
      user: {
        nomeResponsavel: "",
        idPaciente: null,
        email: "",
        senha: "",
      },
      show: false,
      loader: useLoaderStore(),
      toast: useNuxtApp().$toast as any,
    };
  },
  methods: {
    async register() {
      this.loader.startLoading();

      const testEmail =
        /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!testEmail.test(this.user.email)) {
        this.toast.error("E-mail inválido.");
        this.loader.endLoading();
        return;
      }

      const testId = /^\d$/;
      if (!testId.test(`${this.user.idPaciente}`)) {
        this.toast.error("ID inválido.");
        this.loader.endLoading();
        return;
      }

      if (this.user.senha.length <= 0) {
        this.toast.error("Senha inválida.");
        this.loader.endLoading();
        return;
      }

      const userRequest: UserRegister = {
        nome: this.user.nomeResponsavel,
        email: this.user.email,
        senha: this.user.senha,
        idPaciente: Number(this.user.idPaciente),
      };

      const response = await createUser(userRequest);
      if(response.status == 200) this.$router.push("/login");
      else this.toast.error("Erro ao fazer o cadastro.");

      this.loader.endLoading();
    },
  },
});
</script>
