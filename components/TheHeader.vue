<template>
    <v-layout>
        <v-container class="fix-header pa-0 position-fixed bottom-0 bg-white d-flex justify-center">
            <v-tabs>
                <v-tab to="/">
                    <div class="custom-tab">
                        <v-icon size="24" icon="mdi-home"/>
                        <p>Início</p>
                    </div>
                </v-tab>
                <v-tab to="/contatos">
                    <div class="custom-tab">
                        <v-icon icon="mdi-phone" size="24"/>
                        <p>Contatos</p>
                    </div>
                </v-tab>
                <v-tab to="/notificacoes">
                    <div class="custom-tab">
                        <v-icon :icon="hasNotifications ? 'mdi-bell-ring' : 'mdi-bell'" size="24" />
                        <p>Notificações</p>
                    </div>
                </v-tab>
                <v-tab to="/perfil">
                    <div class="custom-tab">
                        <v-icon icon="mdi-account" size="24"/>
                        <p>Perfil</p>
                    </div>
                </v-tab>
            </v-tabs>
        </v-container>
    </v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader',
  data() {
    return {
      hasNotifications: false,
    }
  }
});

</script>

<style scoped>
.custom-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: none;
    width: 10px;
}

@media (max-width: 400px) {
  .custom-tab p {
    font-size: 10px;
  }
  
  .fix-header {
    left: 0;
  }
}
</style>
