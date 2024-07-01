export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:transition:finish", () => {
    document.body.scrollTo({ top: 0, behavior: "instant" });
  });
});
