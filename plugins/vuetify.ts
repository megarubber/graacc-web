import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { VCalendar } from 'vuetify/labs/VCalendar'

const graacc_light: ThemeDefinition = {
    dark: false,
    colors: {
        'blue-light': '#E6F6FE',
        'blue-dark': '#1C3B72',
        'green': '#4CAF50',
        'grey': '#4B4B4B',
        'pink': '#E91E63'
    }
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components: {
            VCalendar,
        },
        theme: {
            defaultTheme: 'graacc_light',
            themes: {
                graacc_light,
            },
        },
        defaults: {
          global: { ripple: false },
          VTextField: { 
            rounded: 'xl', 
            variant: 'outlined',
            baseColor: '#545454',
          },
          VBtn: {
            color: '#1C3B72',
            class: ['font-weight-regular', 'text-none'],
            style: [ { 'letterSpacing': 'normal' } ],
            rounded: 'xl',
            size: 'x-large',
            variant: 'flat',
          },
        },
     })
    app.vueApp.use(vuetify)
})
