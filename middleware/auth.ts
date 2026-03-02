import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();
  const token = useCookie("token");
  
  if(token.value) {
    const { authenticated } = storeToRefs(auth);
    authenticated.value = true;

    auth.refreshAuth();
  }

  if (!token.value && to?.name !== "login") {
    abortNavigation();
    const firstTime = useCookie("firsttime");
    if(firstTime.value == "false") return navigateTo("/login");
    return navigateTo("/boas-vindas");
  }
});
