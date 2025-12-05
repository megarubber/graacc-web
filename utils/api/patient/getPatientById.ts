export default async function getPatientById(id_paciente: number) {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api(`/pacientes/pesquisar/${id_paciente}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  return response;
}
