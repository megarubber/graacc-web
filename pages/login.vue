<template>
    <v-layout class="h-100">
        <v-container class="d-flex flex-column justify-center">
            <v-snackbar
                v-model="alert"
                location="top end"
                color="error"
            >
                {{ alert_message }}
            </v-snackbar>
            <div class="glow">
              <div class="glow-effect t-l"></div>
              <div class="glow-effect t-r"></div>
              <div class="glow-effect b-l"></div>
              <div class="glow-effect b-r"></div>
            </div>
            <img src="/assets/images/agendinha_logo.png" class="align-self-center mb-4"/>
            <h2 class="text-center font-weight-bold">Vamos começar?</h2>
            <h3 class="text-center mb-6">Faça seu login</h3>
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
                :type="show ? 'text' : 'password'"
                :append-inner-icon="show ?'mdi-eye': 'mdi-eye-off'"
                @click:append-inner="show = !show"
                variant="outlined"></v-text-field>
                <a href="/senha" class="font-weight-bold mb-4 text-blue-light">Esqueceu a senha?</a>
                <v-btn
                variant="flat"
                @click="login()">Entrar</v-btn>
                <p class="text-center">ou</p>
                <v-btn
                color="black"
                variant="outlined">
                  <Icon style="margin-right: 10px;" name="icons:google-logo" size="30"/>
					        Entrar com o Google
                </v-btn>
                <div class="text-center mt-6">
                  <p>Ainda não tem uma conta?</p>
                  <a href="/registro" class="font-weight-bold mb-6 text-blue-light">
                    Cadastre-se aqui.
                  </a>
                </div>
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
  color: #007AFF; 
  text-decoration: none;
} 

img {
  width: 200px;
}

.glow-effect {
  position: absolute;
  height: 1px;
  width: 1px;
  opacity: 15%;
  z-index: -1;
}

.glow-effect.t-l {
  top: 0px;
  left: 5px;
  box-shadow:
    0 0 100px 5rem #80D9FF,
    0 0 140px 6rem #009EE0;
}

.glow-effect.t-r {
  top: 0px;
  right: 5px;
  box-shadow:
    0 0 100px 5rem #E32585,
    0 0 140px 6rem #E858A1;
}

.glow-effect.b-r {
  bottom: 0px;
  right: 5px;
  box-shadow:
    0 0 100px 5rem #80D9FF,
    0 0 140px 6rem #009EE0;
}

.glow-effect.b-l {
  bottom: 0px;
  left: 5px;
  box-shadow:
    0 0 100px 5rem #80D9FF,
    0 0 140px 6rem #009EE0;
}
</style>
