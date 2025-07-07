<template>
    <v-layout class="h-100">
        <v-container class="d-flex ga-4 flex-column justify-center">
            <v-snackbar
                v-model="alert"
                location="top end"
                color="error"
            >
                {{ alert_message }}
            </v-snackbar>
            <h2 class="text-center font-weight-bold">Cadastro</h2>
            <h3 class="text-center mb-6">Crie sua conta para começar</h3>
            <section>
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
                @click:append-inner="show = !show"/>
                <v-text-field 
                v-model="confirme_senha"
                label="Confirme a sua senha"
                placeholder="Confirme a sua senha"
                type="password"/>
            </section>
            <v-btn @click="register()">Enviar</v-btn>
            <v-btn to="/login">Voltar</v-btn>
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
      confirme_senha: '',
      show: false,
      alert: false,
      alert_message: '',
    }
  },
  methods: {
    async register() {
      const testEmail = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
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

      if(this.user.senha != this.confirme_senha) {
        this.alert = true
        this.alert_message = 'Senhas estão diferentes'
        return
      }

      try { 
        await createUser(this.user)
        this.$router.push('/login')
      }
      catch (error) {
        this.alert = true
        console.error(error.response)
        if(error.response._data == "Não existe nenhum paciente com esse nome") {
          this.alert_message = "Erro: paciente não existe."
          return
        }
        this.alert_message = "Erro ao realizar cadastro."
      }
    }
  }
});
</script>
