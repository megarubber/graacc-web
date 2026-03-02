<template>
    <v-container class="h-100">
        <v-main class="d-flex flex-column h-100 justify-center align-center">
            <p class="mb-4 text-center">Clique no botão para confirmar cadastro.</p>
            <v-btn @click="request" class="w-100">Confirmar cadastro</v-btn>
        </v-main>
    </v-container>
</template>

<script lang="ts" setup>
import { useLoaderStore } from "~/store/loader";
import confirmAccount from "~/utils/api/register/confirmAccount";
const route = useRoute();
const loader = useLoaderStore();
const toast: any = useNuxtApp().$toast;
const router = useRouter();

async function request() {
    loader.startLoading();
    const response = await confirmAccount(
        Number(route.params.id || '0')
    );

    if(response.status != 200) {
        toast.error("Erro ao confirmar e-mail.");
        loader.endLoading();
        return;
    }

    toast.success("E-mail confirmado com sucesso!");
    router.push("/login");
    loader.endLoading();
}
</script>