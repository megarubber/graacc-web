import type userNewPassword from "~/interfaces/newPassword";

export default async function setNewPassword(password: userNewPassword) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api("/usuarios/redefinir-senha", {
    method: "POST",
    headers: {
      Authorization: ` ${token.value}`,
    },
    body: password,
  });
  return response;
}
