import type {
  BardateDomainsResult,
  CombinedDomainInfo,
} from "~/types/bardate_domains";
import { useSupabaseWrapper } from "../../utils/SupabaseWrapper";

// export async function getAllDomains(from: number, to: number) {
//   const supabaseWrapper = useSupabaseWrapper();

//   const { data } = await supabaseWrapper
//     .select<CombinedDomainInfo[]>("combined_domains_view", "*")
//     .range(from, to);
//   return data as CombinedDomainInfo[];
// }

export async function GetCount() {
  const supabaseWrapper = useSupabaseWrapper();
  let query = supabaseWrapper
    .select<number>("combined_domains_view", "*")
    .limit(0);

  const { count } = await query;
  return count as number;
}

// Uppdaterad getAllDomains funktion för att inkludera sökning
export async function getAllDomains(
  from: number,
  to: number,
  searchQuery?: string
) {
  const supabaseWrapper = useSupabaseWrapper();
  let query = supabaseWrapper.select<CombinedDomainInfo[]>(
    "combined_domains_view",
    "*"
  );

  if (searchQuery && searchQuery.length > 0) {
    query.ilike("name", `%${searchQuery}%`); // Använder ILIKE för case-insensitive matchning
  }

  const { data, count } = await query.range(from, to);

  return { data, count } as BardateDomainsResult;
}
