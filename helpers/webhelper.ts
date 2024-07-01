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

export function calculateDomainPrice(daysLeft = 23) {
  const priceList = calculatePriceListForDomains();

  daysLeft = Math.min(daysLeft, priceList.length);

  const price = priceList.find((p) => p.day === daysLeft);
  return price?.price;
}

export function calculatePriceListForDomains() {
  // const maxPrice = 146000;
  // const minPrice = 350;
  const days = 23;

  const priceList = calculatePriceList(days);
  return priceList;
}

// static pricing
function calculatePriceList(days: number): { day: number; price: number }[] {
  const prices = [
    350, 455, 590, 770, 1000, 1300, 1690, 2200, 2850, 3710, 4820, 6270, 8150,
    10590, 13770, 17900, 23270, 30250, 39300, 51100, 66450, 86400, 112300,
    146000,
  ];
  let result: { day: number; price: number }[] = [];

  for (let i = 0; i < days; i++) {
    result.push({
      day: i + 1,
      price: prices[i],
    });
  }

  return result;
}

// //dynamic pricing
// function calculatePriceList(
//   maxPrice: number,
//   minPrice: number,
//   days: number
// ): { day: number; price: number }[] {
//   let prices = [{ day: 1, price: minPrice }];
//   let currentPrice = minPrice;
//   const growthRate = 0.186; // Antagen procentuell ökning baserat på översikt av dina data

//   // Beräkna pris för varje dag fram till 'days' med en minskande ökningstakt
//   for (let day = 2; day <= days; day++) {
//     let priceIncrease = currentPrice * growthRate;
//     currentPrice += priceIncrease;
//     currentPrice = Math.min(currentPrice, maxPrice); // Se till att inte överskrida maxpriset

//     prices.push({
//       day: day,
//       price: Math.round(currentPrice),
//     });

//     // Minska tillväxttakten när närmar oss maxpriset
//     if (currentPrice + priceIncrease > maxPrice) {
//       break; // Avbryt om nästa steg skulle överskrida maxpriset
//     }
//   }

//   // Lägg till maxpriset för dagar större än 'days' om vi når max tidigare
//   if (prices[prices.length - 1].price < maxPrice) {
//     prices.push({
//       day: days + 1,
//       price: maxPrice,
//     });
//   }

//   return prices;
// }
