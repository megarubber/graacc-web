import type UserNewPasswordWithLogin from "~/interfaces/userNewPasswordWithLogin";
import type UserNewPasswordWithoutLogin from "~/interfaces/userNewPasswordWithoutLogin";

export async function setNewPasswordWithLogin(password: UserNewPasswordWithLogin) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api("/usuarios/redefinir-senha", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: password,
  });
  return response;
}

export async function setNewPasswordWithoutLogin(password: UserNewPasswordWithoutLogin) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api("/email/redefinir-senha", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: password,
  });
  return response;
}