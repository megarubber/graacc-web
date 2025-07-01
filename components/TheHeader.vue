<template>
    <v-layout>
        <v-container class="pa-0 position-fixed bottom-0 
          bg-white left-0 d-flex justify-center">
            <v-tabs>
                <v-tab to="/">
                    <div class="custom-tab">
                        <v-icon size="24">mdi-home</v-icon>
                        <p>Exames</p>
                    </div>
                </v-tab>
                <v-tab to="/calendario">
                    <div class="custom-tab">
                        <v-icon size="24">mdi-calendar</v-icon>
                        <p>Calendário</p>
                    </div>
                </v-tab>
                <v-tab to="/contatos">
                    <div class="custom-tab">
                        <v-icon size="24">mdi-contacts</v-icon>
                        <p>Contatos</p>
                    </div>
                </v-tab>
                <v-tab to="/notificacoes">
                    <div class="custom-tab">
                        <v-icon size="24">{{hasNotifications ? 'mdi-bell-ring' : 'mdi-bell'}}</v-icon>
                        <p>Notificações</p>
                    </div>
                </v-tab>
                <v-tab to="/login" @click="logUserOut()">
                    Logout
                </v-tab>
            </v-tabs>
        </v-container>
    </v-layout>
</template>

<script lang="ts">
import { useAuthStore } from '~/store/auth'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader',
  auth: useAuthStore(),
  data() {
    return {
      auth: useAuthStore(),
    }
  },
  methods: {
    logUserOut() {
      this.auth.logUserOut()
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
}

@media (max-width: 400px) {
  .custom-tab p {
    font-size: 10px;
  }
}
</style>
