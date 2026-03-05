import type Notification from "~/interfaces/notification";

export default async function getPatientNotifications(patient_id: number) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api(`/notificacoes/paciente/${patient_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const data: Notification[] = response.data;
  return data;
}
