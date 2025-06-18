<template>
    <v-layout>
        <v-container class="d-flex justify-md-center">
            <v-tabs>
                <v-tab to="/exames">
                    <div class="custom-tab">
                        <v-icon size="24">mdi-home</v-icon>
                            <div>Exames</div>
                    </div>
                </v-tab>
                <v-tab to="/calendario">
                    <div class="custom-tab">
                        <v-icon size="24">mdi-calendar</v-icon>
                        <div>Calendário</div>
                    </div>
                </v-tab>
                <v-tab to="/contatos">
                    <div class="custom-tab">
                        <v-icon size="24">mdi-contacts</v-icon>
                            <div>Contatos</div>
                    </div>
                </v-tab>
                <v-tab to="/notificacoes">
                    <div class="custom-tab">
                        <v-icon size="24">{{hasNotifications ? 'mdi-bell-ring' : 'mdi-bell'}}</v-icon>
                        <div>Notificações</div>
                    </div>
                </v-tab>
            </v-tabs>
        </v-container>
    </v-layout>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'TheHeader',
        setup() {
            const hasNotifications = ref(false);

            return {hasNotifications};
        },
    });
</script>


<style>
.custom-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: none;
    gap: 4px;
}
</style>
