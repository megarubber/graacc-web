import type User from "~/interfaces/user"
import type UserAuth from "~/interfaces/userAuth"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    authenticated: false
  }),
  actions: {
    async authenticateUser(user_auth: UserAuth) {
      const { $api } = useNuxtApp()

      const response: User = await $api('/usuarios/login', {
        method: 'POST',
        body: user_auth,
      })

      if (response) {
        const token = useCookie('token')
        token.value = response.token
        this.authenticated = true
      }
    }
  }
})