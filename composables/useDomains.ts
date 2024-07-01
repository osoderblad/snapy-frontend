import type { Snapback_Order } from "~/types/snapback_orders";

export function useDomains() {
  const bookedDomains = ref([]);
  const completedDomains = ref([]);

  const getBookedDomains = async (): Promise<{
    data: Snapback_Order[] | null;
    error: any;
  }> => {
    try {
      const client = useSupabaseWrapper();
      const user_id = await getCustomerIdByUserId();
      const { data, error } = await client
        .select<Snapback_Order[]>("snapback_orders", "*")
        .eq("customer_id", user_id)
        .eq("order_status", "Pending");
      return { data, error };
    } catch (error) {
      console.error("Failed to fetch booked domains:", error);
      return { data: null, error };
    }
  };

  const getCompletedDomains = async (): Promise<{
    data: Snapback_Order[] | null;
    error: any;
  }> => {
    try {
      const client = useSupabaseWrapper();
      const user_id = await getCustomerIdByUserId();
      const { data, error } = await client
        .select<Snapback_Order[]>("snapback_orders", "*")
        .eq("customer_id", user_id)
        .eq("order_status", "Completed");
      return { data, error };
    } catch (error) {
      console.error("Failed to fetch completed domains:", error);
      return { data: null, error };
    }
  };

  return {
    bookedDomains,
    completedDomains,
    getBookedDomains,
    getCompletedDomains,
  };
}
