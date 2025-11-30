import type User from "~/interfaces/user";
import type UserUpdate from "~/interfaces/userUpdate";

export default async function updateUserInfo(userInfo: UserUpdate) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response: User = await $api("/usuarios/editar", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: userInfo
  });
  return response;
}
