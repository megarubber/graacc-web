<template>
    <v-layout>
        <v-container>
            <h1 class="text-center mb-4 font-weight-bold">Bem-vindo!</h1>
            <div class="d-flex flex-column ga-4">
                <v-text-field 
                rounded="lg" 
                label="E-mail"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="Senha"
                rounded="lg"
								type="password"
                color="blue-dark"
                variant="outlined"></v-text-field>
                <p class="font-bold color-blue">Esqueceu a senha?</p>
                <v-btn
                variant="flat"
                color="blue-dark"
                rounded="lg">Login</v-btn>
                <v-btn
                variant="flat"
                color="blue-dark"
                rounded="lg">Cadastre-se</v-btn>
                <v-btn
                color="grey"
                variant="flat">
                    <v-icon
                    icon="mdi-google"
                    color="pink"
                    start></v-icon>
										<p>Entrar com o Google</p>
                </v-btn>
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
