<template>
    <v-layout>
        <v-container>
            <h1 class="mb-4">Sign up</h1>
            <p>Crie sua conta para começar</p>
            <div class="d-flex flex-column ga-4">
                <v-text-field 
                rounded="lg" 
                label="Nome"
                placeholder="José Maria da Silva"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="E-mail"
                rounded="lg"
                placeholder="exemplo@gmail.com"
                color="blue-dark"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="Senha"
                rounded="lg"
                placeholder="Crie a sua senha"
                color="blue-dark"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="Confirme a sua senha"
                rounded="lg"
                placeholder="Confirme a sua senha"
                color="blue-dark"
                variant="outlined"></v-text-field>
                <v-btn
                variant="flat"
                color="blue-dark"
                rounded="lg">Registrar</v-btn>
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