import type UserToken from "~/interfaces/userToken";
import type UserAuth from "~/interfaces/userAuth";
import type User from "~/interfaces/user";
import type Patient from "~/interfaces/patient";
import type Notification from "~/interfaces/notification";
import getUserInfo from "~/utils/api/user/getUserInfo";
import loginWithOAuth2 from "~/utils/google/loginWithOAuth2";
type Callback = (status: number, confirmRegister: boolean) => void;

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

        const data = userInfo.data;

        this.patient = data.paciente;
        this.notifications = data.notificacoes;

        delete data.paciente;
        delete data.notificacoes;

        this.user = data;
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
        
        this.user = data.usuario;
        this.patient = data.paciente;
        this.notifications = data.notificacoes;
      }
      
      return response.status;
    },
    async authenticateUserGoogle(callback: Callback) {     
      loginWithOAuth2(async (status: number, data: any) => {
        if(status != 200) {
          callback(status, false);
          return;
        }

        const token = useCookie("token");
        token.value = data.token;
        this.user = data.usuario;
        
        if(!data.usuario.cadastro_confirmado) callback(status, false);
        else {
          this.patient = data.patient;
          this.notifications = data.notificacoes;
          callback(status, true);
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
