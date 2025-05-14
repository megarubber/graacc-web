<template>
    <v-layout>
        <v-container>
            <v-snackbar
                v-model="alert"
                location="top end"
                color="error"
            >
                {{ alert_message }}
            </v-snackbar>
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
                <a href="/senha" class="font-weight-bold text-primary">Esqueceu a senha?</a>
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
                variant="flat"
                @click="loginWithGoogle()">
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
import getResponseOAuth2 from '~/utils/google/getResponseOAuth2'

export default defineComponent({
    name: 'LoginPage',
    data() {
        return {
            user: {
                email: '',
                senha: '',
            },
            show: false,
            auth: useAuthStore(),
            authenticated: storeToRefs(useAuthStore()),
            alert: false,
            alert_message: '',
        }
	  },
    methods: {
        loginWithGoogle() {
          getResponseOAuth2((response) => console.log(response));
        },
        async login() {
            try {
                await this.auth.authenticateUser(this.user)

                if (this.authenticated) {
                    this.$router.push('/')
                }
            }
            catch (error: any) {
                this.alert = true
                this.alert_message = error.response._data.mensagem
            }
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
