import type Exam from "~/interfaces/exam";

export default async function getExams() {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const response = await $api("/usuario/agendamentos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const data: Exam[] = response.data;
  return data;
}
