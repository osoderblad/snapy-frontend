import type Stripe from "stripe";
import { useSupabaseWrapper } from "../utils/SupabaseWrapper";
import type { IUser } from "~/server/types/IUser";

// export async function getAllDomains(from: number, to: number) {
//   const supabaseWrapper = useSupabaseWrapper();

//   const { data } = await supabaseWrapper
//     .select<CombinedDomainInfo[]>("combined_domains_view", "*")
//     .range(from, to);
//   return data as CombinedDomainInfo[];
// }

export async function getCurrentUser(): Promise<IUser> {
  const user = await useSupabaseUser();
  const client = await useSupabaseClient();

  const { data, error } = await client
    //@ts-ignore
    .schema("public")
    .from("user_profiles")
    .select()
    .eq("id", user?.value?.id as string)
    .single();

  if (error) {
    throw createError({ statusMessage: error.message });
  }
  return data;
}

export async function GetCount() {
  const supabaseWrapper = useSupabaseWrapper();
  let query = supabaseWrapper
    .select<number>("combined_domains_view", "*")
    .limit(0);

  const { count } = await query;
  return count as number;
}

// Uppdaterad getAllDomains funktion för att inkludera sökning
// export async function getAllDomains(
//   from: number,
//   to: number,
//   searchQuery?: string
// ) {
//   const supabaseWrapper = useSupabaseWrapper();
//   let query = supabaseWrapper.select<CombinedDomainInfo[]>(
//     "combined_domains_view",
//     "*"
//   );

//   if (searchQuery && searchQuery.length > 0) {
//     query.ilike("name", `%${searchQuery}%`); // Använder ILIKE för case-insensitive matchning
//   }

//   const { data, count } = await query.range(from, to);

//   return { data, count } as BardateDomainsResult;
// }

// Inkluderar sortColumn och sortDirection i funktionsparametrarna
// export async function getAllDomains(
//   from: number,
//   to: number,
//   searchQuery?: string,
//   sortColumn?: string,
//   sortDirection: "asc" | "desc" = "asc"
// ) {
//   const supabaseWrapper = useSupabaseWrapper();
//   let query = supabaseWrapper.select<CombinedDomainInfo[]>(
//     "combined_domains_view",
//     "*"
//   );

//   // Sökfilter
//   if (searchQuery && searchQuery.length > 0) {
//     query.ilike("name", `%${searchQuery}%`);
//   }

//   // Lägg till sortering om angivet
//   if (sortColumn) {
//     query.order(sortColumn, { ascending: sortDirection === "asc" });
//   }

//   const { data, count } = await query.range(from, to);

//   return { data, count } as BardateDomainsResult;
// }

export async function getAllDomains(
  from: number,
  to: number,
  searchQuery?: string,
  sortColumn?: string,
  sortDirection: "asc" | "desc" = "asc"
) {
  const supabase = useSupabaseClient();
  let query = supabase
    .from("combined_domains_view")
    .select("*", { count: "exact" }) // `count: 'exact'` för att få totala antalet poster
    .range(from, to);

  if (searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  if (sortColumn && sortDirection) {
    query = query.order(sortColumn, { ascending: sortDirection === "asc" });
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching domains:", error.message);
    return { data: [], count: 0 };
  }

  return { data, count };
}

export type SubscriptionDetails = {
  id: string;
  // product: string;
  name?: string;

  status: string;
  current_period_end: string | number;
  cancel_at_period_end: boolean;
  cancel_at: string | number;
  created: string | number;
  plan?: SubscriptionDetailsPlan;
};

export type SubscriptionDetailsPlan = {
  active: boolean;
  amount: number | null;
  interval: string; // day, week, month, year
  product: string | null;
};

// Funktion för att mappa Stripe-subscription till SubscriptionDetails
export function mapStripeSubscriptionToSubscriptionDetails(
  subscription: Stripe.Subscription
): SubscriptionDetails {
  console.log("subscription", subscription);

  const plan = subscription.items.data[0]?.plan as Stripe.Plan;

  return {
    id: subscription.id,

    plan: {
      active: plan.active,
      product: plan.product as string,
      amount: plan.amount,
      interval: plan.interval,
    },

    status: subscription.status,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end
      ? subscription.cancel_at_period_end
      : false,
    cancel_at: subscription.cancel_at ? subscription.cancel_at : "",
    created: subscription.created,
    name: subscription.metadata["name"] ? subscription.metadata["name"] : "",
  };
}
