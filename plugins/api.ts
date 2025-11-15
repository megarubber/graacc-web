export default defineNuxtPlugin({
  setup() {
    const api = $fetch.raw({
      baseURL: useRuntimeConfig().public.apiBase,
      ignoreResponseError: true,
    });

    return {
      provide: {
        api,
      },
    };
  },
});
