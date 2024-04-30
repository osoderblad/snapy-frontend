import type { BardateDomain } from "~/types/bardate_domains";
import { useSupabaseWrapper } from "../../utils/SupabaseWrapper";

export async function getAllDomains(from: number, to: number) {
  const supabaseWrapper = useSupabaseWrapper();

  const { data } = await supabaseWrapper
    .select<BardateDomain[]>("bardate_domains", "name, release_at")
    .range(from, to);
  console.log(data);
  return data as BardateDomain[];
}
