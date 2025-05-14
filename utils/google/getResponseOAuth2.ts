import { googleSdkLoaded } from "vue3-google-login";

export default function getResponseOAuth2(callback) {
  const runtimeConfig = useRuntimeConfig()

  googleSdkLoaded(google => {
    google.accounts.oauth2.initCodeClient({
      client_id: runtimeConfig.public.googleClientId,
      scope: "openid email",
      callback: async (response) => {
        const tokenData = useFetch(
          "https://oauth2.googleapis.com/token",
          {
            method: "POST",
            body: JSON.stringify({
              code: response.code,
              client_id: runtimeConfig.public.googleClientId,
              client_secret: runtimeConfig.public.googleClientSecret,
              redirect_uri: "postmessage",
              grant_type: "authorization_code"
            }),
          }
        );
      }
    }).requestCode();
  });
}
