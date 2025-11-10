<template>
  <v-layout 
  class="h-100 d-flex justify-center">
    <v-container class="d-flex ga-2 flex-column">
      <v-app-bar>
        <template #prepend>
          <v-app-bar-nav-icon>
            <NuxtLink
              href="/boas-vindas">
              <v-icon 
              style="background-color: #D7F2FF;"
              class="pa-4 rounded-xl"
              color="blue-dark" 
              icon="mdi-chevron-left"/>
            </NuxtLink>
          </v-app-bar-nav-icon>
          <v-app-bar-title
            class="font-weight-bold ml-2">Fazer login</v-app-bar-title>
        </template>
      </v-app-bar>
      <v-main class="d-flex flex-column ga-2">
        <p class="font-weight-bold text-h6 mb-3">Insira seus dados</p>
        <section>
          <v-text-field 
            v-model="user.email" 
            prepend-inner-icon="mdi-email-outline"
            label="E-mail" />
          <v-text-field
            v-model="user.senha"
            prepend-inner-icon="mdi-form-textbox-password"
            label="Senha"
            :type="show ? 'text' : 'password'"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show = !show"
          />
        </section>
        <NuxtLink href="/senha" class="font-weight-bold mb-4 text-blue-dark"
          >Esqueci minha senha</NuxtLink
        >
        <v-btn @click="login()">Entrar</v-btn>
        <p class="text-center">ou</p>
        <v-btn color="black" width="250" class="align-self-center" variant="outlined">
          <Icon class="mr-4" name="icons:google-logo" size="30" />
          Entrar com o Google
        </v-btn>
        <div class="text-center mt-6">
          <p>Ainda não tem uma conta?</p>
          <NuxtLink href="/registro" class="font-weight-bold mb-6 text-blue-dark">
            Cadastre-se aqui.
          </NuxtLink>
        </div>
      </v-main>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { useAuthStore } from "~/store/auth";
import { useLoaderStore } from "~/store/loading";
import getResponseOAuth2 from "~/utils/google/getResponseOAuth2";

export default defineComponent({
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        senha: "",
      },
      show: false,
      auth: useAuthStore(),
      authenticated: storeToRefs(useAuthStore()),
      loader: useLoaderStore(),
      toast: useNuxtApp().$toast as any,
    };
  },
  methods: {
    loginWithGoogle() {
      getResponseOAuth2(async (token: string, email: string) => {
        console.log(token, email);
        if (!this.authenticated) return;
      });
    },
    async login() {
      this.loader.startLoading();

      const testEmail =
        /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!testEmail.test(this.user.email)) {
        this.toast.error("E-mail inválido.");
        this.loader.endLoading();
        return;
      }

      try {
        await this.auth.authenticateUser(this.user);

        if (this.authenticated) this.$router.push("/");
      } catch (error: any) {
        if (error.response && 
        (error.response.status == 401 || error.response.status == 400)) {
          this.toast.error("E-mail/senha não encontrado.");
          return;
        }
        this.toast.error("Erro ao fazer login.");
        this.loader.endLoading();
      }
    },
  },
});
</script>