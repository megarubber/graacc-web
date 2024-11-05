<template>
    <v-layout>
        <v-container>
            <h1 class="text-center mb-4 font-weight-bold">Bem-vindo!</h1>
            <div class="d-flex flex-column ga-4">
                <v-text-field
                v-model="user.email"
                rounded="lg"
                label="E-mail"
                variant="outlined"></v-text-field>
                <v-text-field
                v-model="user.senha"
                label="Senha"
                rounded="lg"
                color="blue-dark"
                :type="show ? 'text' : 'password'"
				:append-icon="show ?'mdi-eye': 'mdi-eye-off'"
				@click:append="show = !show"
                variant="outlined"></v-text-field>
                <p class="font-weight-bold text-primary">Esqueceu a senha?</p>
                <v-btn
                variant="flat"
                color="blue-dark"
                rounded="lg"
                @click="login()">Login</v-btn>
                <v-btn
                variant="flat"
                color="blue-dark"
                rounded="lg"
                to="/registro">Cadastre-se</v-btn>
                <v-btn
                color="grey"
                variant="flat">
                    <v-icon
                    icon="mdi-google"
                    color="pink"
                    start></v-icon>
					Entrar com o Google
                </v-btn>
            </div>
        </v-container>
    </v-layout>
</template>

<script lang="ts">
import { useAuthStore } from '~/store/auth'

export default defineComponent({
    name: 'LoginPage',
    data() {
        return {
            user: {
                email: '',
                senha: ''
            },
            show: false,
            auth: useAuthStore(),
            authenticated: storeToRefs(useAuthStore()),
        }
	},
    methods: {
        async login() {
            await this.auth.authenticateUser(this.user)

            if (this.authenticated) {
                this.$router.push('/')
            }
        }
    },
})
</script>

<style>

</style>
