import {
  getCurrentUser,
  mapStripeSubscriptionToSubscriptionDetails,
} from "~/helpers/supabasehelper";
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

export async function getSubscriptionByUserEmail(client: any, email: string) {
  // @ts-ignore
  const stripe = StripeSingleton.getInstance();

  const timeStampNow = Math.floor(Date.now() / 1000);
  const latestSub = await getLatestsubscriptions(client, email);

  if (latestSub) {
    if (timeStampNow >= latestSub.validto) {
    } else {
      return [{ status: "active", isPendingStatus: true }];
    }
  }

  const subscription = await stripe.subscriptions.search({
    query: `Metadata['customeremail']:'${email}'`,
  });

  if (subscription && subscription.data) {
    var filterForTrialingOrActiveSubs = subscription.data.filter(
      (i) => i.status == "active" || i.status == "trialing"
    );
    return filterForTrialingOrActiveSubs;
  }

  return [];
}

export async function getLatestsubscriptions(client: any, email: string) {
  const { data } = await client
    .from("latestsubscriptions")
    .select("email, validto")
    .eq("email", email)
    .maybeSingle();
  return data;
}
