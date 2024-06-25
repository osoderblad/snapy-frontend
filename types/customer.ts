export type Customer = {
  // customer_id: number; // Automatiskt genererad, hanteras vanligtvis inte direkt i koden
  type: "private" | "business" | null; // Antagit exempelvärden
  name: string | null;
  email: string | null;

  // Optional fields
  organization_number: string | null;
  pin: string | null;
  address: string | null;
  phone: string | null;
  postal_code: string | null;
  city: string | null;
  country: string | null; // Standard: 'Sverige'
  invoice_email: string | null;
  namesrs_id: number | null; // NameSRS Contact ID
  fortnox_customer_number: number | null; // Fortnox Customer Number
};
