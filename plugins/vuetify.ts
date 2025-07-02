import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

import { createVuetify, type ThemeDefinition } from 'vuetify'

const graacc_light: ThemeDefinition = {
    dark: false,
    colors: {
        'blue-light': '#1C3B72',
        'blue-dark': '#1976D2',
        'green': '#4CAF50',
        'grey': '#F5F5F5',
        'pink': '#E91E63'
    }
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'graacc_light',
            themes: {
                graacc_light,
            },
        },
        defaults: {
          global: { ripple: false },
          VTextField: { 
            rounded: 'lg', 
            variant: 'outlined',
          },
          VBtn: {
            color: '#1C3B72',
            class: ['w-100', 'font-weight-regular', 'text-none'],
            style: [ { 'letterSpacing': 'normal' } ],
            rounded: 'xl',
            size: 'x-large',
            variant: 'flat',
          },
        },
     })
    app.vueApp.use(vuetify)
})
