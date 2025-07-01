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
            <h2 class="text-center font-weight-bold">Cadastro</h2>
            <h3 class="text-center mb-6">Crie sua conta para começar</h3>
            <div class="d-flex flex-column ga-4">
                <v-text-field 
                v-model="user.nome"
                label="Nome Completo do Responsável"
                placeholder="José da Silva"/>
                <v-text-field 
                v-model="user.nomeCompletoPaciente"
                label="Nome Completo do Paciente"
                placeholder="Pedro da Silva"/>
                <v-text-field 
                v-model="user.email"
                label="E-mail"
                placeholder="exemplo@email.com"/>
                <v-text-field 
                v-model="user.senha"
                label="Senha"
                placeholder="Crie a sua senha"
                :type="show ? 'text' : 'password'"
                :append-inner-icon="show ?'mdi-eye': 'mdi-eye-off'"
                @click:append="show = !show"/>
                <v-text-field 
                v-model="user.confirme_senha"
                label="Confirme a sua senha"
                placeholder="Confirme a sua senha"
                :type="show_confirm ? 'text' : 'password'"
                :append-inner-icon="show_confirm ?'mdi-eye':'mdi-eye-off'"
                @click:append="show_confirm = !show_confirm"/>
                <v-btn @click="register()">Enviar</v-btn>
                <v-btn to="/login">Voltar</v-btn>
            </div>
        </v-container>
    </v-layout>
</template>

<script lang="ts">
import createUser from '~/utils/api/register/createUser'

export default defineComponent({
  name: 'Registro',
	data() {
    return {
      user: {
          nome: '',
          email: '',
          senha: '',
          nomeCompletoPaciente: '',
      },
      show: false,
      show_confirm: false,
      alert: false,
      alert_message: '',
    }
  },
  methods: {
    async register() {
      const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if(!testEmail.test(this.user.email)) {
        this.alert = true
        this.alert_message = 'E-mail inválido'
        return
      }

      if(this.user.senha.length <= 0) {
        this.alert = true
        this.alert_message = 'Senha vazia'
        return
      }

      if(this.user.senha != this.user.confirme_senha) {
        this.alert = true
        this.alert_message = 'Senhas estão diferentes'
        return
      }

      try { 
        const userRegister = await createUser(this.user)
        if (userRegister) this.$router.push('/login')
      }
      catch (error) {
        this.alert = true
        this.alert_message = error.response._data.mensagem
      }
    }
  }
});
</script>
