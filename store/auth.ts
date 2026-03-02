import type UserToken from "~/interfaces/userToken";
import type UserAuth from "~/interfaces/userAuth";
import type User from "~/interfaces/user";
import type Patient from "~/interfaces/patient";
import type Notification from "~/interfaces/notification";
import getUserInfo from "~/utils/api/user/getUserInfo";
import getPatientById from "~/utils/api/patient/getPatientById";
import getUserNotifications from "~/utils/api/notifications/getUserNotifications";
import loginWithOAuth2 from "~/utils/google/loginWithOAuth2";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as User,
    patient: {} as Patient,
    authenticated: false,
    notifications: [] as Notification[],
    notReadNotifications: 0, 
    page: '/'
  }),
  actions: {
    async refreshAuth() {
      try {
        const userInfo = await getUserInfo();
        if(userInfo.status != 200) return { status: userInfo.status };

        if(!userInfo.data.cadastro_confirmado) return { status: 403 };

        this.user = userInfo.data;
        
        const patientInfo = await getPatientById(this.user.id_paciente);
        if(patientInfo.status != 200) return patientInfo.status;

        this.patient = patientInfo.data;
        this.notifications = await getUserNotifications() ?? [];

        this.authenticated = true;

        const notReadNotifications: Notification[] = this.notifications.filter(
          (notification) => !notification.lida,
        );

        this.notReadNotifications = notReadNotifications.length;
      } catch(error: any) {
        console.error(error.status);
        return { status: error.status };
      }
      return { status: 200 };
    },
    async authenticateUser(user_auth: UserAuth) {
      const { $api } = useNuxtApp();
      const response = await $api("/usuarios/login", {
        method: "POST",
        body: user_auth,
      });

      if (response.status == 200) {
        const data: UserToken = response.data;

        const token = useCookie("token");
        token.value = data.token;
        
        const userInfoStatus = await this.refreshAuth();
        if (userInfoStatus.status != 200) return userInfoStatus.status;
      }
      
      return response.status;
    },
    async authenticateUserGoogle(callback: Function) {     
      loginWithOAuth2(async (status: number, data: any) => {
        if(status != 200) {
          callback(status);
          return;
        }

        const token = useCookie("token");
        token.value = data.token;
        this.user.nome = data.nome;
        this.user.email = data.email;

        if(!data.cadastro_confirmado) callback(status, false);
        else {
          const userInfoStatus = await this.refreshAuth();
          callback(userInfoStatus.status, true);
        }
      });
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
