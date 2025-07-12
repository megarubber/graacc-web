<template>
  <v-layout class="h-100 d-flex justify-center align-center">
    <div class="glow">
      <div class="glow-effect l top-0" />
      <div class="glow-effect r t" />
      <div class="glow-effect l bottom-0" />
      <div class="glow-effect r bottom-0" />
    </div>
    <v-progress-circular v-if="loading" indeterminate />
    <v-container v-else class="d-flex ga-2 flex-column justify-center">
      <v-snackbar v-model="alert" location="top end" color="error">
        {{ alert_message }}
      </v-snackbar>

      <img
        src="/assets/images/agendinha_logo.png"
        class="align-self-center mb-4">
      <div class="titles text-center">
        <h2 class="font-weight-bold">Vamos começar?</h2>
        <h3 class="mb-6">Faça seu login</h3>
      </div>
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
        >Esqueceu a senha?</a
      >
      <v-btn @click="login()">Entrar</v-btn>
      <p class="text-center">ou</p>
      <v-btn color="black" variant="outlined">
        <Icon class="mr-4" name="icons:google-logo" size="30" />
        Entrar com o Google
      </v-btn>
      <div class="text-center mt-6">
        <p>Ainda não tem uma conta?</p>
        <a href="/registro" class="font-weight-bold mb-6 text-blue-dark">
          Cadastre-se aqui.
        </a>
      </div>
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
      } catch (error) {
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

<style scoped>
a {
  color: #007aff;
  text-decoration: none;
}

img { width: 200px; }

.glow-effect {
  position: absolute;
  height: 1px;
  width: 1px;
  opacity: 15%;
  z-index: -1;
  box-shadow:
    0 0 100px 5rem #80d9ff,
    0 0 140px 6rem #009ee0;
}

.glow-effect.r.t {
  top: 0px;
  box-shadow:
    0 0 100px 5rem #e32585,
    0 0 140px 6rem #e858a1;
}

.glow-effect.r {
  right: 5px;
}

.glow-effect.l {
  left: 5px;
}
</style>
