import type { Snapback_Order } from "~/types/snapback_orders";

export async function getCustomerIdByUserId() {
  const client = useSupabaseClient();
  const user = await useSupabaseUser();

  var { data, error } = await client
    //@ts-ignore
    .schema("public")
    .from("customer_users")
    .select("customer_id")
    .eq("user_id", user.value?.id as any)
    .single();

  if (error) {
    console.error("Error fetching user id", error);
    return null;
  }

  return data?.customer_id;
}

export async function getBookedDomains() {
  const client = useSupabaseWrapper();
  const user_id = await getCustomerIdByUserId();
  const { data, error } = await client
    .select<Snapback_Order[]>("snapback_orders", "*")
    .eq("customer_id", user_id);
  return { data, error };
}
