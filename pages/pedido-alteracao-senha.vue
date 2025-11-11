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
          class="font-weight-bold ml-2">Esqueci minha senha</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main class="d-flex flex-column justify-center align-center">
      <p class="mb-4 text-center">Digite o e-mail associado à sua conta</p>
      <v-text-field 
        label="E-mail" 
        class="w-100"
      />
      <div class="d-flex flex-row">
        <p class="mb-4 mr-2">Lembrou sua senha?</p>
        <NuxtLink href="/login" class="font-weight-bold mb-6 text-blue-dark"
          >Faça login</NuxtLink
        >
      </div>
      <v-btn class="w-100">Enviar pedido de alteração</v-btn>
    </v-main>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  name: "EncontrarSenhaPage",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async sendResetPasswordRequest() {
      this.alert = true;
      this.alert_message = error.response._data.mensagem;
    },
  },
});
</script>
<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
