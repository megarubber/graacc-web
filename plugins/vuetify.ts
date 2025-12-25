import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { VCalendar } from "vuetify/components";

const graacc_light: ThemeDefinition = {
  dark: false,
  colors: {
    "blue-light": "#E6F6FE",
    "blue-dark": "#1C3B72",
    green: "#4CAF50",
    grey: "#4B4B4B",
    pink: "#E91E63",
    primary: "#0C3784",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VCalendar
    },
    theme: {
      defaultTheme: "graacc_light",
      themes: {
        graacc_light,
      },
    },
    defaults: {
      global: { ripple: false },
      VTextField: {
        rounded: "lg",
        variant: "outlined",
      },
      VFileInput: {
        rounded: "lg",
        variant: "outlined",
      },
      VBtn: {
        color: "#1C3B72",
        class: ["font-weight-regular", "text-none"],
        style: [{ letterSpacing: "normal" }],
        rounded: "xl",
        size: "x-large",
        variant: "flat",
      },
      VAppBar: {
        style: [{ boxShadow: "1px 1px #e8e9ed" }]
      }
    },
  });
  app.vueApp.use(vuetify);
});
