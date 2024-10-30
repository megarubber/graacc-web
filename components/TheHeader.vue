<template>
    <v-layout>
        <v-container>
            <v-tabs>
                <v-tab to="/exames">Exames
                    <v-icon>
                        
                    </v-icon>
                </v-tab>
                <v-tab to="/calendario">Calendário

                </v-tab>
            <v-tab to="/contatos">Contatos

            </v-tab>
            <v-tab to="/notificacoes">Notificações

            </v-tab>
            </v-tabs>
        </v-container>
    </v-layout>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'TheHeader'
    });

</script>