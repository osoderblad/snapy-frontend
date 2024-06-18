// import type { SubPostRes } from "~/types/SubPostRes";
// import {
//   createOrUpdateSubscription,
//   getSubscriptionById,
//   getUserByStripeCustomerId,
// } from "~/server/database/repositories/userRespository";
// import type { IUser } from "~/types/IUser";
import type { Stripe } from "stripe";
// import type { ISubscription } from "~~/types/ISubscription";

const config = useRuntimeConfig();
import StripeSingleton from "~/server/utils/stripeSingleton";
import type { SubPostRes } from "~/server/types/SubPostRes";
import type { ISubscription } from "~/server/types/ISubscription";
import type { IUser } from "~/server/types/IUser";
const stripe = StripeSingleton.getInstance();

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

export async function getCustomerIdFromEmail(email: string) {
  try {
    const user = await stripe.customers.list({
      email: email,
    });

    if (user.data.length > 0) {
      return { data: user.data[0].id, error: null };
    }

    return { data: null, error: null };
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

export async function updateStripeProducts(
  subscriptionId: string,
  products: string
) {
  try {
    const reactivatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        metadata: {
          product_ids: products,
        },
      }
    );
    return { data: reactivatedSubscription, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function getSubscribeUrl(
  price_id: string,
  user: IUser,
  isUserBundle: boolean,
  userProducts: string,
  objs: number,
  choosedBundleAndWantTrial: boolean
): Promise<SubPostRes> {
  const customerEmail = user.email ? user.email : "";
  let shouldUpdateUser = false;
  var subdata = {} as Stripe.Checkout.SessionCreateParams.SubscriptionData;

  if (isUserBundle) {
    subdata = {
      metadata: {
        customeremail: customerEmail,
        isUserBundle: isUserBundle.toString(),
        product_ids: userProducts,
        objs: objs,
        choosedBundleAndWantTrial: choosedBundleAndWantTrial.toString(),
      },
    };
  } else {
    subdata = {
      metadata: {
        customeremail: customerEmail,
      },
    };
  }

  if (!user.stripeCustomerId) {
    shouldUpdateUser = true;
    const customer = await stripe.customers.create({
      email: customerEmail,
      expand: ["tax"],
    });
    user.stripeCustomerId = customer.id;
  }

  console.log(choosedBundleAndWantTrial);
  // test
  // subdata.trial_period_days = 2;
  //här todo att sätta trial period days sätt trail på nya och gammal sub
  // if (choosedBundleAndWantTrial) {
  //   console.log("hej");
  //   const completeSubscription = await stripe.subscriptions.create({
  //     customer: user.stripeCustomerId,
  //     items: [{ price: "price_1PMz8jLCV8CxTiGeAYMfUNrz" }],
  //     trial_end: createUnixFromXDays(7),
  //     cancel_at_period_end: true,
  //     // expand: ["latest_invoice.payment_intent"],
  //     metadata: {
  //       customeremail: customerEmail,
  //     },
  //   });
  // }

  // ?session_id={CHECKOUT_SESSION_ID}
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
    success_url: `${config.public.appDomain}user/bought`,
    cancel_url: `${config.public.appDomain}user/bought`,
    customer: user.stripeCustomerId,
    customer_update: { shipping: "auto" },
    shipping_address_collection: {
      allowed_countries: ["SE"],
    },
    allow_promotion_codes: true,
    subscription_data: subdata,
    consent_collection: {
      terms_of_service: "required",
    },
  });

  let sessionUrl = session.url ? session.url : "";

  return { url: sessionUrl, user, shouldUpdateUser };
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  lastEventDate: number,
  event: any
): Promise<boolean> {
  const localSubscription = await getSubscriptionById(subscription.id, event);

  if (localSubscription?.lastEventDate != null) {
    if (localSubscription?.lastEventDate > lastEventDate) {
      return true;
    }
  }

  const stripeCustomerId = subscription.customer as string;
  const user = await getUserByStripeCustomerId(stripeCustomerId, event);

  const data = {
    id: subscription.id,
    userId: user.id,
    stripeCustomerId: user.stripeCustomerId,
    stripeStatus: subscription.status,
    stripePriceId: subscription.items.data[0].price.id,
    quantity: 1,
    trialEndsAt: subscription.trial_end,
    endsAt: subscription.ended_at,
    startDate: subscription.start_date,
    lastEventDate: lastEventDate,
    cancel_at: subscription.cancel_at,
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at,
    current_period_end: subscription.current_period_end,
    current_period_start: subscription.current_period_start,
  } as unknown as ISubscription;

  await createOrUpdateSubscription(data, event);

  return true;
}
