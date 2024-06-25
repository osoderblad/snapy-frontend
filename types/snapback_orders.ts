export type Snapback_Order = {
  // order_id: number; // assumes automatic value assignment, not directly set
  customer_id: number | null;
  domain_id: number | null;
  order_time: Date | null;
  order_status: string | null;
  price: number | null;
  payment_status: string | null;
  domain_name: string | null;
};
