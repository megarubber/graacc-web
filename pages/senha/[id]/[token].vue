<template>
  <v-container>
    <v-app-bar>
      <template #prepend>
        <v-app-bar-title
          class="font-weight-bold ml-2">Alterar senha</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main>
      <v-text-field
        v-model="user.novaSenha.value" 
        label="Nova Senha"
        :type="user.novaSenha.show ? 'text' : 'password'"
        :append-inner-icon="user.novaSenha.show ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="user.novaSenha.show = !user.novaSenha.show"
        />
      <v-text-field
        v-model="user.confirmarNovaSenha.value" 
        label="Confirmar Senha"
        :type="user.confirmarNovaSenha.show ? 'text' : 'password'"
        :append-inner-icon="user.confirmarNovaSenha.show ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="user.confirmarNovaSenha.show = !user.confirmarNovaSenha.show"
        />
      <v-btn 
        class="w-100"
        @click="updatePassword"
        >Alterar Senha</v-btn>
    </v-main>
  </v-container>
</template>

<script lang="ts" setup>
import setNewPasswordWithoutLogin from '~/utils/api/register/setNewPasswordWithoutLogin';
import type UserNewPasswordWithoutLogin from '~/interfaces/userNewPasswordWithoutLogin';
import { useLoaderStore } from '~/store/loader';
const route = useRoute();
const toast: any = useNuxtApp().$toast;
const loader = useLoaderStore();
const router = useRouter();

const user = {
    novaSenha: {
        value: '',
        show: false
    },
    confirmarNovaSenha: {
        value: '',
        show: false
    },
}

async function updatePassword() {
    loader.startLoading();

    if(user.novaSenha.value != user.confirmarNovaSenha.value) {
        toast.error("Senhas não são iguais.");
        loader.endLoading();
        return;
    }

    const data: UserNewPasswordWithoutLogin = {
        id: Number(route.params.id || '0'),
        senha_nova: user.novaSenha.value
    }

    const response = await setNewPasswordWithoutLogin(data);

    if(response.status == 401) {
        toast.error("Usuário não existe.");
        loader.endLoading();
        return;
    }

    if(response.status != 200) {
        toast.error("Erro ao alterar senha.");
        loader.endLoading();
        return;
    }

    toast.success("E-mail confirmado com sucesso!");
    router.push("/login");
    loader.endLoading();
}
</script>
