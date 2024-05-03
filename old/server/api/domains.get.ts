// import { getAllDomain } from "~/helpers/domains/supabasehelper";

export default defineEventHandler(async (event) => {
  // return await getAllDomain();
  return { statusCode: 200, body: "Hello, World!" };
});
