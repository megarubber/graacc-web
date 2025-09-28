import type UserToken from "~/interfaces/userToken";
import type UserAuth from "~/interfaces/userAuth";
import type User from "~/interfaces/user";
import type Patient from "~/interfaces/patient";
import getUserInfo from "~/utils/api/user/getUserInfo";
import getPatientById from "~/utils/api/patient/getPatientById";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as User,
    patient: {} as Patient,
    authenticated: false,
  }),
  actions: {
    async authenticateUser(user_auth: UserAuth) {
      const { $api } = useNuxtApp();
      const response: UserToken = await $api("/auth/usuario/login", {
        method: "POST",
        body: user_auth,
      });

      if (response) {
        const token = useCookie("token");
        token.value = response.token;

        this.user = await getUserInfo();
        this.patient = await getPatientById(this.user.idPaciente);

        this.authenticated = true;
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
