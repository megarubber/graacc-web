<template>
  <v-container>
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
          <v-card-title>
            <v-icon size="25" color="#E32585" :icon="contact.icon" />
            {{ contact.title }}
          </v-card-title>
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
            class="w-30 text-body-1 font-weight-bold"
            color="#d7f2ff"
            variant="flat"
            style="color: #1c3b72"
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
  data() {
    return {
      contacts: [
        {
          icon: "mdi-phone",
          title: "Telefone",
          info: ["(11) 5908-9100"],
          action: "Ligar",
        },
        {
          icon: "mdi-email",
          title: "E-mail",
          info: ["graacc@graacc.org.br"],
          action: "Enviar e-mail",
        },
        {
          icon: "mdi-map-marker",
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
hr {
  height: 3px;
  background-color: #e8e9ed;
  border: none;
}
.v-btn--size-x-large {
  --v-btn-height: 35px;
}
</style>
