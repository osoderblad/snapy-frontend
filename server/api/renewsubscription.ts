import { reactivateSubscription } from "~/server/app/services/stripeService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const value = await reactivateSubscription(body.subscriptionId);
  return value;
});
