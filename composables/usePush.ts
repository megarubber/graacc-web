export const usePush = async (id_usuario: number) => {
  if (!("serviceWorker" in navigator)) return;

  const registration = await navigator.serviceWorker.register("/sw.js");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 
      "BMcNxhRd77nxDqIprvvNxD6agEHNGLW4cfp24xPK1POI3aFbThkqc2A6dhaMWj_hyFDk4uKp7zngzW81K08-pEg"
  });

  const { $api } = useNuxtApp();
  const token = useCookie("token");
  
  const subscriptionObject: any = {
    id_usuario,
    endpoint: subscription.endpoint,
    keys: {
        p256dh: subscription.getKey("p256dh"),
        auth: subscription.getKey("auth"),
    },
    encoding: PushManager.supportedContentEncodings,
  }

  await $api("/salvar-inscricao", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify(subscriptionObject),
  });
}