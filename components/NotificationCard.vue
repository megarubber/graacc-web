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
                {{ props.title }}
            </v-card-title>
            <v-card-text>
                {{ props.description }}
            </v-card-text>
            <v-divider :thickness="3"/>
            <v-card-actions>
                <v-btn 
                    color="#FFAFAF"
                    variant="flat"
                >
                    <v-icon 
                        color="#990000"
                        icon="mdi-trash-can-outline"
                    />
                </v-btn>
                <v-btn 
                    variant="flat" 
                    class="w-66 ml-2 font-weight-bold"
                >
                    Marcar como lida
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>
<script lang="ts" setup>
import type ShowNotification from "~/interfaces/showNotification";
const props = defineProps<ShowNotification>();
defineEmits(['close']);
</script>