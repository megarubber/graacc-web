<template>
    <v-layout>
        <v-container>
            <h1 class="font-weight-bold mb-4">Cadastro</h1>
            <p class="mb-4">Crie sua conta para começar</p>
            <div class="d-flex flex-column ga-4">
                <v-text-field 
                rounded="lg" 
                label="Nome"
                v-model="user.nome"
                placeholder="José Maria da Silva"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="E-mail"
                rounded="lg"
                placeholder="exemplo@gmail.com"
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
                :append-icon="show ?'mdi-eye': 'mdi-eye-off'"
                @click:append="show = !show"
                variant="outlined"></v-text-field>
                <v-text-field 
                label="Confirme a sua senha"
                rounded="lg"
                placeholder="Confirme a sua senha"
                v-model="user.confirme_senha"
                color="blue-dark"
                :type="show_confirm ? 'text' : 'password'"
                :append-icon="show_confirm ?'mdi-eye':'mdi-eye-off'"
                @click:append="show_confirm = !show_confirm"
                variant="outlined"></v-text-field>
                <v-btn
                variant="flat"
                color="blue-dark"
                @click="register()"
                rounded="lg">Enviar</v-btn>
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
      if(this.user.senha != this.user.confirme_senha) {
        this.alert = true
        this.alert_message = 'Senhas estão diferentes'
        return
      }

      try { 
        const userRegister = await createUser(this.user)
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

