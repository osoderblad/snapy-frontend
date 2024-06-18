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
