<template>
  <v-layout 
  class="h-100 d-flex justify-center" 
  :class="{'align-center': loading,}">
    <v-progress-circular v-if="loading" indeterminate />
    <v-container v-else class="d-flex ga-2 flex-column">
      <v-snackbar v-model="alert" location="top end" color="error">
        {{ alert_message }}
      </v-snackbar>
      <v-app-bar elevation="0">
        <template #prepend>
          <v-app-bar-nav-icon>
            <a
              href="/boas-vindas">
              <v-icon 
              style="background-color: #D7F2FF;"
              class="pa-4 rounded-xl"
              color="blue-dark" 
              icon="mdi-chevron-left"/>
            </a>
          </v-app-bar-nav-icon>
          <v-app-bar-title
            class="font-weight-bold ml-2">Fazer login</v-app-bar-title>
        </template>
      </v-app-bar>
      <v-main class="d-flex flex-column ga-2">
        <p class="font-weight-bold text-h6 mb-3">Insira seus dados</p>
        <section>
          <v-text-field v-model="user.email" label="E-mail" />
          <v-text-field
            v-model="user.senha"
            label="Senha"
            :type="show ? 'text' : 'password'"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show = !show"
          />
        </section>
        <a href="/senha" class="font-weight-bold mb-4 text-blue-dark"
          >Esqueci minha senha</a
        >
        <v-btn @click="login()">Entrar</v-btn>
        <p class="text-center">ou</p>
        <v-btn color="black" width="250" class="align-self-center" variant="outlined">
          <Icon class="mr-4" name="icons:google-logo" size="30" />
          Entrar com o Google
        </v-btn>
        <div class="text-center mt-6">
          <p>Ainda não tem uma conta?</p>
          <a href="/registro" class="font-weight-bold mb-6 text-blue-dark">
            Cadastre-se aqui.
          </a>
        </div>
      </v-main>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { useAuthStore } from "~/store/auth";
import getResponseOAuth2 from "~/utils/google/getResponseOAuth2";
import createUser from "~/utils/api/register/createUser";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      user: {
        email: "",
        senha: "",
      },
      show: false,
      auth: useAuthStore(),
      authenticated: storeToRefs(useAuthStore()),
      alert: false,
      alert_message: "",
      loading: ref(false),
    };
  },
  methods: {
    loginWithGoogle() {
      getResponseOAuth2(async (token: string, email: string) => {
        const user = { email, senha: token };
        await this.login(user);

        if (!this.authenticated) {
          const userRegister = await createUser({
            nome: email.split("@")[0],
            email: email,
            senha: token,
            cadastro_confirmado: true,
          });
          await this.login(userRegister);
        }
      });
    },
    async login() {
      this.loading = true;
      const testEmail =
        /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!testEmail.test(this.user.email)) {
        this.alert = true;
        this.alert_message = "E-mail inválido";
        this.loading = false;
        return;
      }

      try {
        await this.auth.authenticateUser(this.user);

        if (this.authenticated) this.$router.push("/");
      } catch (error: any) {
        this.loading = false;
        this.alert = true;
        if (error.response.status == 401 || error.response.status == 400) {
          this.alert_message = "E-mail/senha não encontrado.";
          return;
        }
        this.alert_message = "Erro ao fazer login.";
      }
    },
  },
});
</script>