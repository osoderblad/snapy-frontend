export type Customer = {
  customer_id?: number | null;
  type: "Private" | "Business"; // Antagit exempelvärden
  name: string | null;
  email: string | null;
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

export type UserProfiles = {
  id: string | null;
  pin: string | null;
  first_name: string | null;
  last_name: string | null;
  birth_year: string | null;
  birth_month: string | null;
  birth_day: string | null;
  gender: string | null;
  additional_info: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string; // Default value: 'Sverige'
  stripeCustomerId: string | null;
  email: string | null;
};

export type UserProfilesView = {
  id: string;
  pin: string;
  first_name: string;
  last_name: string;
  birth_year: string;
  birth_month: string;
  birth_day: string;
  gender: string;
  additional_info: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  country: string; // Default value: 'Sverige'
  stripeCustomerId: string;
  email: string;
};

export type CustomerView = {
  customer_id?: number;
  type: "Private" | "Business"; // Antagit exempelvärden
  name: string;
  email: string;
  organization_number: string;
  pin: string;
  address: string;
  phone: string;
  postal_code: string;
  city: string;
  country: string; // Standard: 'Sverige'
  invoice_email: string;
  namesrs_id: number; // NameSRS Contact ID
  fortnox_customer_number: number; // Fortnox Customer Number
};
