<template>
  <v-container class="pa-0 h-100 position-fixed">
    <v-app-bar>
      <template #prepend>
        <v-app-bar-title
          class="font-weight-bold ml-2">Contatos do GRAACC</v-app-bar-title>
      </template>
    </v-app-bar>
    <v-main class="d-flex flex-column ga-2">
      <v-card
        v-for="contact in contacts"
        :key="contact.title"
        variant="flat"
        color="white"
      >
        <v-card-item class="mb-4">
          <template #prepend>
            <Icon size="20" :name="'icons:' + contact.icon" />
          </template>
          <v-card-title>{{ contact.title }}</v-card-title>
        </v-card-item>
        <v-card-text
          v-for="info in contact.info"
          :key="info"
          class="text-grey"
          style="line-height: 0.1rem"
        >
          {{ info }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="w-30 text-body-1 font-weight-bold"
            prepend-icon="mdi-content-copy"
            text="Copiar"
          />
          <v-btn
            class="w-30 text-body-1 px-4 font-weight-bold"
            color="#BCD4FF"
            variant="flat"
            style="color: #0C3784"
            prepend-icon="mdi-open-in-new"
            >{{ contact.action }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  name: "Contacts",
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  data() {
    return {
      contacts: [
        {
          icon: "phone",
          title: "Telefone",
          info: ["(11) 5908-9100"],
          action: "Ligar",
        },
        {
          icon: "email",
          title: "E-mail",
          info: ["graacc@graacc.org.br"],
          action: "Enviar e-mail",
        },
        {
          icon: "map-marker",
          title: "Endereço",
          info: [
            "Rua Pedro de Toledo, 572",
            "Vila Clementino - São Paulo, SP",
            "CEP: 04039-001",
          ],
          action: "Abrir no mapa",
        },
      ],
    };
  },
});
</script>

<style scoped>
.v-btn--size-x-large {
  --v-btn-height: 35px;
}
</style>
