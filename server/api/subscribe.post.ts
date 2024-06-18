import {
  getCurrentUser,
  updateStripeCustomerId,
} from "~/server/database/repositories/userRespository";
import { getSubscribeUrl } from "../app/services/stripeService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const price_id = body.price_id;
  const usera = await getCurrentUser(event);

  const {
    url,
    user: customer,
    shouldUpdateUser,
  } = await getSubscribeUrl(price_id, usera);

  if (shouldUpdateUser) {
    await updateStripeCustomerId(usera, event);
  }

  await sendRedirect(event, url);
});
