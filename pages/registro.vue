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
        <h3 class="mb-6">Crie a sua conta</h3>
      </div>
      <section>
        <div class="d-flex">
          <v-text-field v-model="user.nome" label="Nome" class="mr-2"/>
          <v-text-field v-model="user.sobrenome" label="Sobrenome" class="ml-2"/>
        </div>
        <v-text-field v-model="user.email" label="E-mail" />
        <v-text-field
          v-model="user.senha"
          label="Senha"
          :type="show ? 'text' : 'password'"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="show = !show"
        />
      </section>
      <v-btn @click="register()">Criar conta</v-btn>
      <div class="text-center mt-6">
        <p>Já tem uma conta?</p>
        <a href="/login" class="font-weight-bold mb-6 text-blue-dark">
          Faça login aqui.
        </a>
      </div>
    </v-container>
  </v-layout>
</template>

<style scoped>
img { width: 200px; }

a {
  color: #007aff;
  text-decoration: none;
}
</style>

<script lang="ts">
import createUser from "~/utils/api/register/createUser";

export default defineComponent({
  name: "Registro",
  data() {
    return {
      user: {
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      },
      show: false,
      alert: false,
      alert_message: "",
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

      if (this.user.senha != this.confirme_senha) {
        this.alert = true;
        this.alert_message = "Senhas estão diferentes";
        return;
      }

      try {
        const userRequest = {
          nome: this.user.nome,
          email: this.user.email,
          senha: this.user.senha,
          nomeCompletoPaciente: `${this.user.nome} ${this.user.sobrenome}`,
        };
        await createUser(this.userRequest);
        this.$router.push("/login");
      } catch (error) {
        this.alert = true;
        console.error(error.response);
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
