<template>
    <v-layout>
        <v-container>
            <h1 class="font-weight-bold mb-4">Sign up</h1>
            <p class="mb-4">Crie sua conta para começar</p>
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
								:type="show ? 'text' : 'password'"
								:append-icon="show ?'mdi-eye': 'mdi-eye-off'"
								@click:append="show = !show"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="Confirme a sua senha"
                rounded="lg"
                placeholder="Confirme a sua senha"
                color="blue-dark"
								:type="show_confirm ? 'text' : 'password'"
								:append-icon="show_confirm ?'mdi-eye':'mdi-eye-off'"
								@click:append="show_confirm = !show_confirm"
                variant="outlined"></v-text-field>
                <v-btn
                variant="flat"
                color="blue-dark"
                rounded="lg">Enviar</v-btn>
            </div>
        </v-container>
    </v-layout>
</template>

<script lang="ts">
export default defineComponent({
    name: 'Registro',
	  data() {
			return {
				show: false,
				show_confirm: false
			}
		}
});
</script>

<style>

</style>
