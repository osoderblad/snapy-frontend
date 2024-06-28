export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    try {
      const supabase = useSupabaseClient();
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      // Kontrollera om det finns en session och om tokenen behöver förnyas
      if (session) {
        if (new Date() > new Date(session.expires_at * 1000)) {
          try {
            // Anropa refreshSession() för att förnya access token om det behövs
            const { error, data } = await supabase.auth.refreshSession();
            if (error) {
              console.error("Error refreshing the session:", error);
              // Lämplig felhantering, exempelvis omdirigering till inloggning
            } else {
              console.log("Session successfully refreshed", data);
            }
          } catch (error) {
            console.error("Error during session refresh:", error);
          }
        } else {
          console.log("Session is still valid:", session);
        }
      } else {
        console.log("No active session");
        // Hantera avsaknaden av en aktiv session, eventuellt genom att omdirigera till inloggning
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
  });
});
