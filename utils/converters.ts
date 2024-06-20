import type { SubscriptionDetails } from "~/helpers/supabasehelper";

export function convertStripeSubscriptionToSubscriptionDetails(
  subscription: any
): SubscriptionDetails {
  return {
    id: subscription.id,
    status: subscription.status,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at,
    name: subscription.metadata["name"] ? subscription.metadata["name"] : "",
    created: "", // Add the missing property 'created'
    plan: {
      active: subscription.plan.active,
      amount: subscription.plan.amount,
      interval: subscription.plan.interval,
      product: subscription.plan.product,
    },
    // course_id: parseInt(subscription.metadata["course_id"] || "0", 10),
    // isUserBundle: false, // Add the missing property 'isUserBundle'
    // product_ids: "", // Add the missing property 'product_ids'

    // external_id: 0, // Add the missing property 'external_id'
    // alternativeName: "", // Add the missing property 'alternativeName'
  };
}
