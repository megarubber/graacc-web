import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const graacc_light: ThemeDefinition = {
    dark: false,
    colors: {
        'blue-light': '#ABD8FB',
        'blue-dark': '#1976D2',
        'green': '#4CAF50',
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
    })
    app.vueApp.use(vuetify)
})