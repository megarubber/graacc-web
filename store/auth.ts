import type UserToken from "~/interfaces/userToken";
import type UserAuth from "~/interfaces/userAuth";
import type User from "~/interfaces/user";
import type Patient from "~/interfaces/patient";
import type Notification from "~/interfaces/notification";
import getUserInfo from "~/utils/api/user/getUserInfo";
import getPatientById from "~/utils/api/patient/getPatientById";
import getUserNotifications from "~/utils/api/notifications/getUserNotifications";

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
        if(userInfo.status != 200) return userInfo.status;
        this.user = userInfo.data;

        const patientInfo = await getPatientById(this.user.idPaciente);
        if(patientInfo.status != 200) return patientInfo.status;

        this.patient = patientInfo.data;
        this.notifications = await getUserNotifications() ?? [];

        this.authenticated = true;

        const notReadNotifications: Notification[] = this.notifications.filter(
          (notification) => !notification.lida,
        );

        this.notReadNotifications = notReadNotifications.length;
      } catch(error: any) {
        console.log(error.status);
        return error.status;
      }
      return 200;
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

        const userInfoStatus: number = await this.refreshAuth();
        if (userInfoStatus != 200) return userInfoStatus;
      }
      
      return response.status;
    },
    updatePage(page: string) {
      this.page = page;
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
