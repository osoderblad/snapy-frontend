import Stripe from "stripe";

class StripeSingleton {
  private static instance: Stripe;
  private constructor() {} // Privat konstruktor för att förhindra direkt instansiering

  public static getInstance(): Stripe {
    if (!StripeSingleton.instance) {
      var key = useRuntimeConfig().public.stripeSectretKey;
      StripeSingleton.instance = new Stripe(key, {
        apiVersion: "2024-04-10",
      });
    }
    return StripeSingleton.instance;
  }
}

export default StripeSingleton;
