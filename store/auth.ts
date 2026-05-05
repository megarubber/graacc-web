import type UserToken from "~/interfaces/userToken";
import type UserAuth from "~/interfaces/userAuth";
import type User from "~/interfaces/user";
import type Notification from "~/interfaces/notification";
import type GoogleTokens from "~/interfaces/googleTokens";
import getUserInfo from "~/utils/api/user/getUserInfo";
import loginWithOAuth2 from "~/utils/google/loginWithOAuth2";
import { useLoaderStore } from "./loader";

type Callback = (status: number, confirmRegister: boolean) => void;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as User,
    authenticated: false,
    notifications: [] as Notification[],
    notReadNotifications: 0, 
    page: '/',
    googleTokens: {} as GoogleTokens,
  }),
  actions: {
    async refreshAuth() {
      const loader = useLoaderStore();
      try {
        loader.startLoading();

        const info: any = await getUserInfo();
        if(info.status != 200) return { status: info.status };

        const data = info.data;
        if(!data.usuario.cadastro_confirmado) return { status: 403 };

        this.notifications = data.notificacoes;
        this.user = data.usuario;

        this.authenticated = true;

        const notReadNotifications: Notification[] = this.notifications.filter(
          (notification) => !notification.lida,
        );

        this.notReadNotifications = notReadNotifications.length;
      } catch(error: any) {
        console.error(error.status);
        loader.endLoading();
        return { status: error.status };
      }
      loader.endLoading();
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
        token.value = data.loginRequest.token;

        this.user = data.loginRequest.usuario;
        this.googleTokens = data.tokens;
        
        if(!this.user.cadastro_confirmado) callback(status, false);
        else {
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
