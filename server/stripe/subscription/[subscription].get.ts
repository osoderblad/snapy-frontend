import type { Stripe } from "stripe";
import StripeSingleton from "~/server/utils/stripeSingleton";

export default defineEventHandler(
  async (event): Promise<Stripe.Subscription> => {
    const stripe = StripeSingleton.getInstance();
    const { subscription } = event.context.params as Record<string, string>;
    const subscriptionres = await stripe.subscriptions.retrieve(subscription);
    return subscriptionres;
  }
);
