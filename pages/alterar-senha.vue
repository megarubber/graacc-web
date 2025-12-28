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
        label="Nova Senha"
        />
      <v-text-field
        v-model="user.confirmarNovaSenha" 
        label="Confirmar Senha"
        />
      <v-btn 
        class="w-100"
        @click="updatePassword"
        >Alterar Senha</v-btn>
    </v-main>
  </v-container>
</template>

<script lang="ts">
import { useAuthStore } from "~/store/auth";
import { useLoaderStore } from "~/store/loader";

export default defineComponent({
  name: "UpdatePassword",
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
      loader: useLoaderStore(),
    };
  },
  methods: {
    async updatePassword() {
      this.loader.startLoading();
      this.loader.endLoading();
    },
  }, 
});
</script>
