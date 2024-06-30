import type { Snapback_Order } from "~/types/snapback_orders";

export async function getCustomerIdByUserId() {
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  var { data, error } = await client
    //@ts-ignore
    .schema("public")
    .from("customer_users")
    .select("customer_id")
    .eq("user_id", user.value?.id as any);

  if (error) {
    console.error("Error fetching user id", error);
    return null;
  }

  if (data && data.length > 0) {
    return data[0].customer_id;
  }
  return null;
}

export async function getBookedDomains(): Promise<{
  data: Snapback_Order[] | null;
  error: any;
}> {
  const client = useSupabaseWrapper();
  const user_id = await getCustomerIdByUserId();
  const { data, error } = await client
    .select<Snapback_Order[]>("snapback_orders", "*")
    .eq("customer_id", user_id);
  return { data, error };
}

export async function IsAccountCompleted() {
  const user = useSupabaseUser();
  if (user && !user.value) {
    return true;
  }

  const customerId = await getCustomerIdByUserId();

  if (customerId == null) {
    return false;
  }

  // GetCustomer
  const { data } = await GetCustomer(customerId);

  if (!data) {
    return false;
  }

  return true;
}

export async function GetCustomer(customer_id: number) {
  const client = useSupabaseClient();

  var { data, error } = await client
    //@ts-ignore
    .schema("public")
    .from("customers")
    .select("*")
    .eq("customer_id", customer_id)
    .single();

  return { data, error };
}
