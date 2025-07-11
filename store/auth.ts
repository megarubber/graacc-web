import type UserToken from "~/interfaces/userToken"
import type UserAuth from "~/interfaces/userAuth"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    authenticated: false
  }),
  actions: {
    async authenticateUser(user_auth: UserAuth) {
      const { $api } = useNuxtApp()
      const response: UserToken = await $api('/auth/usuario/login', {
        method: 'POST',
        body: user_auth,
      })

      if (response) {
        const token = useCookie('token')
        token.value = response.token
        this.authenticated = true
      }
    },
    logUserOut() {
      const token = useCookie('token')
      this.authenticated = false
      token.value = null;
    }
  }
})
