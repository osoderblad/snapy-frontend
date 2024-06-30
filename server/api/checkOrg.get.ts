// /server/api/checkOrg.js
export default defineEventHandler(async (event) => {
  // read query
  const query = getQuery(event);
  const orgNumber = query.orgNumber;

  const url = `https://www.allabolag.se/${orgNumber}`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      // Om vi får ett giltigt svar, anta att företaget finns
      return { valid: true };
    } else {
      // Om svaret inte är 200, anta att företaget inte finns
      return { valid: false };
    }
  } catch (error) {
    // Vid fel, returnera ett lämpligt felmeddelande
    return { valid: false };
  }
});
