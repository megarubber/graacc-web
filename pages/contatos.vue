<template>
    <v-layout>
        <v-container>
            <h1 class = "mb-4">Contatos do GRAAC</h1>
            <div class = "cards-contatos">
                <v-card
                    variant = "flat"
                    color = "blue-light"
                    rounded = "lg"
                    v-for = "contact in contacts">
                <v-card-item>
                    <v-card-title>
                        {{ contact.name }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ contact.info }} 
                    </v-card-subtitle>
                </v-card-item>
                </v-card>
            </div>
            <TheHeader/>
        </v-container>
    </v-layout>
</template>

<script>
    import { defineComponent } from 'vue'; 
    export default defineComponent({
        name: 'ContactsPage',
        data(){
            return{
                contacts: [
                    {
                        name: "Localização",
                        info: "Rua Botucatu, 743 - Vila Clementino - São Paulo - SP",
                    },
                    {
                        name: "Telefone",
                        info: "(11) 5908-9100",
                    },
                    {
                        name: "E-mail",
                        info: "email@gmail.com",
                    }
                ]
            }
        }
    })
</script>

<style>
    .cards-contatos {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
