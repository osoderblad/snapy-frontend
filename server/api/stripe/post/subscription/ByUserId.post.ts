import type { Stripe } from "stripe";
import StripeSingleton from "~/server/utils/stripeSingleton";

export default defineEventHandler(
  async (event): Promise<Stripe.Subscription[]> => {
    const stripe = StripeSingleton.getInstance();
    const body = await readBody(event);
    const stripeCustomerId = body.id as string;
    console.log(stripeCustomerId);

    const subscription = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      limit: 1,
    });

    return subscription.data;
  }
);
