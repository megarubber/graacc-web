<template>
    <v-layout>
        <v-container>
            <v-tabs>
                <v-tab to="/">
                    Exames
                </v-tab>
                <v-tab to="/calendario">
                    Calendário
                </v-tab>
                <v-tab to="/contatos">
                    Contatos
                </v-tab>
                <v-tab to="/notificacoes">
                    Notificações
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
