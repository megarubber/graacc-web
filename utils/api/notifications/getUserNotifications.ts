import type Notification from "~/interfaces/notification";

export default async function getNotifications() {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response: Notification[] = await $api("/usuario/notificacoes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  return response;
}
