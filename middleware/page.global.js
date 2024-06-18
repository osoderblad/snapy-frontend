export default defineNuxtRouteMiddleware((to) => {
  if (to.path.includes("/user")) {
    const user = useSupabaseUser();

    // Om användaren inte är inloggad, omdirigera
    if (user && !user.value) {
      return navigateTo("/login");
    }
  }
});
