export default async function getPatientById(patientId: number) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api(`/usuarios/paciente/${patientId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  return response;
}
