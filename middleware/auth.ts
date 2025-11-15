import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("token");

  if(token.value) {
    const auth = useAuthStore();
    auth.updatePage(to?.path);
    await auth.refreshAuth();
  }

  if (!token.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});
