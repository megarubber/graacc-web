<template>
    <v-bottom-sheet
        :v-model="props.show"
        height="75%"
    >
        <v-card class="rounded-xl">
            <template #append>
                <v-avatar
                color="#BCD4FF" 
                size="35" class="cursor-pointer" @click="$emit('close');">
                    <v-icon 
                        color="#0C3784"
                        class="pa-2"
                        size="30"
                    >mdi-close</v-icon>
                </v-avatar>
            </template>
            <v-divider :thickness="3"/>
            <v-card-title class="font-weight-bold">
                {{ props.titulo }}
            </v-card-title>
            <v-card-text>
                {{ props.descricao }}
            </v-card-text>
            <v-divider :thickness="3"/>
            <v-card-actions>
                <v-btn 
                    variant="flat" 
                    class="w-100 ml-2 font-weight-bold"
                >
                    Adicionar ao Google Calendário
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>
<script lang="ts" setup>
import type ShowExam from "~/interfaces/showExam";
const props = defineProps<ShowExam>();
defineEmits(['close']);
</script>