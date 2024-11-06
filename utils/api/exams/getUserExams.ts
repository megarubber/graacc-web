import type Exam from "~/interfaces/exam"

export default async function getExams() {
  const { $api } = useNuxtApp()
  const token = useCookie('token')

  const response: Exam[] = await $api('/agendamentos', {
    method: 'GET',
    headers: {
      Authorization: `${token.value}`
    }
  })
  return (response)
}