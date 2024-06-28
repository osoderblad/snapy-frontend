import type Stripe from "stripe";
import type { IUser } from "~/server/types/IUser";
import type { SubPostRes } from "~/server/types/SubPostRes";
import StripeSingleton from "~/server/utils/stripeSingleton";
const stripe = StripeSingleton.getInstance();

export async function getSubscribeUrl(
  price_id: string,
  user: IUser,
  name: string
): Promise<SubPostRes> {
  const customerEmail = user.email ? user.email : "";
  let shouldUpdateUser = false;
  var subdata = {} as Stripe.Checkout.SessionCreateParams.SubscriptionData;
  const config = useRuntimeConfig();
  subdata = {
    metadata: {
      customeremail: customerEmail,
      name: name,
    },
  };

  if (!user.stripeCustomerId) {
    shouldUpdateUser = true;
    const customer = await stripe.customers.create({
      email: customerEmail,
      expand: ["tax"],
    });
    user.stripeCustomerId = customer.id;
  }

  //@ts-ignore
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    locale: "sv",
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],

    mode: "subscription",
    automatic_tax: { enabled: true },
    success_url: `${config.public.appDomain}`,
    cancel_url: `${config.public.appDomain}`,
    customer: user.stripeCustomerId,
    customer_update: { shipping: "auto", address: "auto" },
    // shipping_address_collection: {
    //   allowed_countries: ["SE"],
    // },
    allow_promotion_codes: true,
    subscription_data: subdata,
    consent_collection: {
      terms_of_service: "required",
    },
  });

  let sessionUrl = session.url ? session.url : "";

  return { url: sessionUrl, user, shouldUpdateUser };
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const canceledSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true,
      }
    );
    return { data: canceledSubscription, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function reactivateSubscription(subscriptionId: string) {
  try {
    const reactivatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: false,
      }
    );
    return { data: reactivatedSubscription, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}
