import type Notification from "~/interfaces/notification";

export default async function getUserNotifications() {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api("/usuarios/notificacoes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const data: Notification[] = response.data;
  return data;
}
