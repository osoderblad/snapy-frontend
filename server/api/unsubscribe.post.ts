import { cancelSubscription } from "~/server/app/services/stripeService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const value = await cancelSubscription(body.subscriptionId);
  return value;
});
