<template>
  <v-container>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon>
          <NuxtLink
            href="/editar-perfil">
            <v-icon 
            style="background-color: #D7F2FF;"
            class="pa-4 rounded-xl"
            color="blue-dark"
            icon="mdi-chevron-left"/>
          </NuxtLink>
        </v-app-bar-nav-icon>
        <v-app-bar-title
          class="font-weight-bold ml-2">Alterar senha</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main>
      <v-text-field
        v-model="user.senhaAtual"
        label="Senha atual"
        />
      <p class="text-h7 mb-2">Esqueci minha senha</p>
      <v-text-field
        v-model="user.novaSenha" 
        label="E-mail"
        />
      <v-text-field
        v-model="user.confirmarNovaSenha" 
        label="Confirmar Senha"
        />
      <v-btn
        class="w-100"
        color="#F8F8F8"
        text="Alterar senha"
        prepend-icon="mdi-pencil-outline"
        to="/alterar-senha"
      />
    </v-main>
  </v-container>
</template>

<script lang="ts">
import type UserUpdate from "~/interfaces/userUpdate";
import updateUserInfo from "~/utils/api/user/updateUserInfo";
import { useAuthStore } from "~/store/auth";

export default defineComponent({
  name: "UpdateProfile",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      user: {
        senhaAtual: "",
        novaSenha: "",
        confirmarNovaSenha: "",
      },
      auth: storeToRefs(useAuthStore()),
      loading: ref(false),
      alert: false,
      alert_message: "",
    };
  },
  mounted() {
    this.user.nomeResponsavel = this.auth.user.nome;
    this.user.email = this.auth.user.email;
  },
  methods: {
    async update() {
      this.loading = true;

      const userUpdate: UserUpdate = {
        nome: this.user.nomeResponsavel,
        email: this.user.email,
        nome_completo_paciente: this.auth.patient.nome,
      };

      try {
        const response = await updateUserInfo(userUpdate);
        if(response.status == 200 || response.status == 201)
          this.$router.push("/perfil");
      } catch(error) {
        this.alert = true;
        this.alert_message = "Erro ao editar dados.";
        throw error;
      }
      
      this.loading = false;
    },
  }, 
});
</script>
