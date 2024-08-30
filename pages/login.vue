<template>
    <v-layout>
        <v-container>
            <h1 class="mb-4">Bem-vindo!</h1>
            <div class="d-flex flex-column ga-4">
                <v-text-field label="Endereço de e-mail"></v-text-field>
                <v-text-field label="Senha"></v-text-field>
                <p>Esqueceu a senha?</p>
                <v-btn>Login</v-btn>
                <v-btn>Cadastre-se</v-btn>
                <v-btn>Entrar com o Google</v-btn>
            </div>
        </v-container>
    </v-layout>
</template>

<script lang="ts">
export default defineComponent({
    name: 'LoginPage',
})
</script>

<style>

</style>