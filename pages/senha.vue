<template>
    <v-layout>
        <v-container>
            <v-icon icon="mdi-lock" size="x-large"></v-icon>
            <h1 class="text-left mb-4 font-weight-bold">Esqueceu sua senha?</h1>
            <p class="mb-4">Digite o e-mail associado à sua conta</p>
            <div class="d-flex flex-column ga-4">
                <v-text-field 
                rounded="lg" 
                label="E-mail"
                variant="outlined"></v-text-field>
                <div class="d-flex flex-row">
                    <p class="mb-4 mr-2">Lembrou sua senha?</p>
                    <a href="/login" class="font-weight-bold">Faça login</a>
                </div>
                <v-btn
                variant="flat"
                color="blue-dark"
                rounded="lg">Enviar pedido de alteração</v-btn>
            </div>
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
<style>
a { 
    color: inherit; 
    text-decoration: none;
    color:#007AFF;
} 
</style>
