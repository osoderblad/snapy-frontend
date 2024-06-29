export function convertUnixTimestampToSwedishDate(unixTimestamp: any) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Stockholm",
  };

  return new Intl.DateTimeFormat("sv-SE", options as any).format(date);
}

export function convertUnixTimestampToSweDateAndMonth(unixTimestamp: any) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  const options = {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Stockholm",
  };
  return new Intl.DateTimeFormat("sv-SE", options as any).format(date);
}

export async function postToApi(endpoint: string, bodyData: Object) {
  try {
    const apiUrl = "/api/";
    const response = await fetch(apiUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Anta att svaret är i JSON-format
    return data;
  } catch (error) {
    console.error("Error in API call:", error);
  }
}


export async function GetToApi(endpoint: string) {
  try {
    const apiUrl = "/api/";
    const response = await fetch(apiUrl + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Anta att svaret är i JSON-format
    return data;
  } catch (error) {
    console.error("Error in API call:", error);
  }
}
