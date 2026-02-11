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
    const firstTime = useCookie("firsttime");
    if(firstTime.value == "false") return navigateTo("/login");
    return navigateTo("/boas-vindas");
  }
});
