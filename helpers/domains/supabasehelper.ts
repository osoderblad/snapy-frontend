import type { CombinedDomainInfo } from "~/types/bardate_domains";
import { useSupabaseWrapper } from "../../utils/SupabaseWrapper";

export async function getAllDomains(from: number, to: number) {
  const supabaseWrapper = useSupabaseWrapper();

  const { data } = await supabaseWrapper
    .select<CombinedDomainInfo[]>("combined_domains_view", "*")
    .range(from, to);
  console.log(data);
  return data as CombinedDomainInfo[];
}
