<template>
  <v-layout 
  class="h-100 d-flex justify-center"
  :class="{'align-center': loading}">
    <v-progress-circular v-if="loading" indeterminate />
    <v-container v-else class="d-flex ga-2 flex-column">
      <v-snackbar v-model="alert" location="top end" color="error">
        {{ alert_message }}
      </v-snackbar>
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
            v-model="user.nomeResponsavel" 
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
  </v-layout>
</template>

<script lang="ts">
import createUser from "~/utils/api/register/createUser";

export default defineComponent({
  name: "Registro",
  data() {
    return {
      user: {
        nomeResponsavel: "",
        idPaciente: 0,
        email: "",
        senha: "",
      },
      show: false,
      alert: false,
      alert_message: "",
      loading: ref(false),
    };
  },
  methods: {
    async register() {
      const testEmail =
        /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!testEmail.test(this.user.email)) {
        this.alert = true;
        this.alert_message = "E-mail inválido";
        return;
      }

      if (this.user.senha.length <= 0) {
        this.alert = true;
        this.alert_message = "Senha vazia";
        return;
      }

      try {
        const userRequest = {
          nome: this.user.nomeResponsavel,
          email: this.user.email,
          senha: this.user.senha,
          nomeCompletoPaciente: `${this.user.idPaciente}`,
        };
        await createUser(userRequest);
        this.$router.push("/login");
      } catch (error: any) {
        this.alert = true;
        if (
          error.response._data == "Não existe nenhum paciente com esse nome"
        ) {
          this.alert_message = "Erro: paciente não existe.";
          return;
        }
        this.alert_message = "Erro ao realizar cadastro.";
      }
    },
  },
});
</script>