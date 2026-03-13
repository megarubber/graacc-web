<template>
    <v-bottom-sheet
        v-model="status"
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
            <section>
                <v-card-text>
                    Médico: {{ props.medico }}
                </v-card-text>
                <v-card-text>
                    Local: {{ props.local }}
                </v-card-text>
            </section>
            <v-divider :thickness="3"/>
            <v-card-actions>
                <v-btn 
                    variant="flat" 
                    class="w-100 ml-2 font-weight-bold"
                    @click="moveToGoogleCalendar"
                >
                    Adicionar ao Google Calendário
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>
<script lang="ts" setup>
import type ShowExam from "~/interfaces/showExam";
import type Exam from "~/interfaces/exam";
import createTaskIntoCalendar from "~/utils/google/createTaskIntoCalendar";
const props = defineProps<ShowExam>();
defineEmits(['close']);

const status = ref(false);
status.value = props.show;

async function moveToGoogleCalendar() {
    await createTaskIntoCalendar({
        id_agendamento: props.id_agendamento,
        id_paciente: props.id_paciente,
        titulo: props.titulo,
        descricao: props.descricao,
        data: props.data,
        medico: props.medico,
        local: props.local,
        lembrete_enviado: props.lembrete_enviado
    } as Exam);
}
</script>