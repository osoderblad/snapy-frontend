import {
  getCurrentUser,
  mapStripeSubscriptionToSubscriptionDetails,
} from "~/helpers/domains/supabasehelper";
import StripeSingleton from "~/server/utils/stripeSingleton";

export async function getStripeProducts() {
  const stripe = StripeSingleton.getInstance();

  const products = await stripe.products.list({
    limit: 20,
    active: true,
  });

  return products;
}

export async function getStripePricesByProd(prodId: string) {
  const stripe = StripeSingleton.getInstance();
  const { data } = await stripe.prices.list({
    product: prodId,
    active: true,
    limit: 20,
  });

  return data;
}

export async function IsUserSubscribedToPlan() {
  var user = await getCurrentUser();

  if (!user.stripeCustomerId) return false;

  const stripe = StripeSingleton.getInstance();
  const subscription = await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
    limit: 1,
  });

  return subscription.data.length > 0;
}

export async function getUserSubscription() {
  var user = await getCurrentUser();

  if (!user.stripeCustomerId) return null;

  const stripe = StripeSingleton.getInstance();
  const subscription = await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
    limit: 1,
  });

  if (subscription.data.length === 0) return null;

  var res = mapStripeSubscriptionToSubscriptionDetails(subscription.data[0]);

  return res;
}
