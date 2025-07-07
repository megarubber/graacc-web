<template>
    <v-layout class="h-100">
        <v-container class="d-flex flex-column justify-center align-center">
          <v-icon icon="mdi-lock" size="x-large"/>
          <h1 class="text-center mb-4 font-weight-bold">Esqueceu sua senha?</h1>
          <section class="w-100">
            <p class="mb-4 text-center">Digite o e-mail associado à sua conta</p>
            <v-text-field label="E-mail"/>
          </section>
          <div class="d-flex flex-row">
              <p class="mb-4 mr-2">Lembrou sua senha?</p>
              <a href="/login" class="font-weight-bold mb-6 text-blue-light">Faça login</a>
          </div>
          <v-btn class="w-100">Enviar pedido de alteração</v-btn>
        </v-container>
    </v-layout>
</template>

<script lang="ts">
export default defineComponent({
    name: 'EncontrarSenhaPage',
    data() {
      return {
        email: '',
      }
    },
    methods: {
        async sendResetPasswordRequest() {
              this.alert = true
              this.alert_message = error.response._data.mensagem
        }
    },
})
</script>
<style scoped>
a { 
    color: inherit; 
    text-decoration: none;
} 
</style>
