import type Patient from "~/interfaces/patient";

export default async function getPatientById(patientId: number) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response: Patient = await $api(`/usuario/pacientes/${patientId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  return response;
}
