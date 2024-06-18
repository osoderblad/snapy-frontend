import { getCurrentUser } from "~~/server/database/repositories/userRespository";
const config = useRuntimeConfig();
import StripeSingleton from "~/server/utils/stripeSingleton";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);
  const stripe = StripeSingleton.getInstance();
  let stripe_id = user.stripeCustomerId ? user.stripeCustomerId : "";

  // if (!stripe_id) {
  //   const subscription = await stripe.subscriptions.search({
  //     query: `Metadata['customeremail']:'${user.email}'`,
  //   });

  //   if (subscription.data) {
  //     stripe_id = subscription.data[0].customer.toString();
  //   }
  // }

  if (stripe_id) {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripe_id,
      locale: "sv",
      return_url: `${config.public.appDomain}/domaner`,
    });

    var sessionUrl = session.url;

    await sendRedirect(event, sessionUrl);
  }
});
