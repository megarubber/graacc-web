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
            <h2 class="text-center font-weight-bold">Cadastro</h2>
            <h3 class="text-center mb-6">Crie sua conta para começar</h3>
            <div class="d-flex flex-column ga-4">
                <v-text-field 
                rounded="lg" 
                label="Nome Completo do Responsável"
                v-model="user.nome"
                placeholder="José da Silva"
                variant="outlined"></v-text-field>
                <v-text-field 
                rounded="lg" 
                label="Nome Completo do Paciente"
                v-model="user.nome_completo_paciente"
                placeholder="Pedro da Silva"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="E-mail"
                rounded="lg"
                placeholder="exemplo@email.com"
                v-model="user.email"
                color="blue-dark"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="Senha"
                rounded="lg"
                placeholder="Crie a sua senha"
                v-model="user.senha"
                color="blue-dark"
                :type="show ? 'text' : 'password'"
                :append-inner-icon="show ?'mdi-eye': 'mdi-eye-off'"
                @click:append="show = !show"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="Confirme a sua senha"
                rounded="lg"
                placeholder="Confirme a sua senha"
                v-model="user.confirme_senha"
                color="blue-dark"
                :type="show_confirm ? 'text' : 'password'"
                :append-inner-icon="show_confirm ?'mdi-eye':'mdi-eye-off'"
                @click:append="show_confirm = !show_confirm"
                variant="outlined"></v-text-field>
                <v-btn
                variant="flat"
                @click="register()">Enviar</v-btn>
                <v-btn
                variant="flat"
                @click="register()"
                to="/login">Voltar</v-btn>
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
          confirme_senha: ''
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
        const userRegister = await createUser({
          nome: this.user.nome,
          email: this.user.email,
          senha: this.user.senha,
          nomeCompletoPaciente: this.user.nome
        })
        if (userRegister) this.$router.push('/login')
      }
      catch (error: any) {
        this.alert = true
        this.alert_message = error.response._data.mensagem
      }
    }
  }
});
</script>
