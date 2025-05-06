import type Notification from "~/interfaces/notification"

export default async function getNotifications() {
  const { $api } = useNuxtApp()
  const token = useCookie('token')

  const response: Notification[] = await $api('/notificacoes/mes', {
    method: 'GET',
    headers: {
      Authorization: `${token.value}`
    }
  })
  return (response)
}
