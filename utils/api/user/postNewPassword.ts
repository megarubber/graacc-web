import type userNewPassword from "~/interfaces/newPassword"

export default async function postPassword(password: userNewPassword) {
  const { $api } = useNuxtApp()
  const token = useCookie('token')

  const response = await $api('/usuarios/redefinir-senha', {
    method: 'POST',
    headers: {
      Authorization: ` ${token.value}`
    },
    body: password,
  })
  return(response)
}