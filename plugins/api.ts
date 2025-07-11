export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase,
    });

    return {
      provide: {
        api,
      },
    };
  },
});
