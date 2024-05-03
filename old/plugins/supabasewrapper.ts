// plugins/supabase-wrapper.js
import { SupabaseWrapper } from "~/utils/SupabaseWrapper";

export default defineNuxtPlugin((nuxtApp) => {
  const client = useSupabaseClient();
  const wrapper = new SupabaseWrapper(client);
  nuxtApp.provide("supabaseWrapper", wrapper);
});
