// import { serverSupabaseClient } from "#supabase/server";
// import { SupabaseClient } from "@supabase/supabase-js";
// import type Stripe from "stripe";
// import StripeSingleton from "~/server/utils/stripeSingleton";

// export default defineEventHandler(async (event) => {
//   const stripeEvent = await readBody<Stripe.Event>(event);
//   const client = await serverSupabaseClient(event);
//   const isSubscriptionEvent = stripeEvent.type.startsWith(
//     "customer.subscription"
//   );

//   if (isSubscriptionEvent) {
//     SubscriptionEvent(stripeEvent, client);
//   }

//   return `handled ${stripeEvent.type}.`;
// });

// async function SubscriptionEvent(
//   stripeEvent: Stripe.Event,
//   client: SupabaseClient<unknown, never, never>
// ) {
//   if (stripeEvent.type == "customer.subscription.created") {
//     try {
//       // check if meta dtaa choosedBundleAndWantTrial is true
//       const config = useRuntimeConfig();

//       // check if meta dtaa choosedBundleAndWantTrial is true
//       const { data } = await client
//         .from("handled_subevents")
//         .select()
//         .eq("id", stripeEvent.id)
//         .single();

//       if (
//         stripeEvent.data.object.metadata.choosedBundleAndWantTrial === "true" &&
//         !data
//       ) {
//         const stripe = StripeSingleton.getInstance();
//         const res = await stripe.subscriptions.create({
//           customer: stripeEvent.data.object.customer.toString(),
//           items: [{ price: config.private.STRIPE_PRICE_ID }],
//           trial_end: createUnixFromXDays(7),
//           cancel_at_period_end: true,
//           metadata: {
//             customeremail: stripeEvent.data.object.metadata.customeremail,
//           },
//         });

//         if (res) {
//           const { data, error } = await client
//             .from("handled_subevents")
//             .insert({ id: stripeEvent.id } as any);
//         }
//       }
//     } catch {
//       console.error("error in creating trial subscription");
//     }

//     return `handled ${stripeEvent.type}.`;
//   }
// }
// function createUnixFromXDays(days: number) {
//   return Math.floor(Date.now() / 1000) + days * 86400;
// }

// // Old code
// // export default defineEventHandler(async (event) => {
// //     const stripeEvent = await readBody<Stripe.Event>(event);
// //     const client = await serverSupabaseClient(event);
// //     const isPriceEvent = stripeEvent.type.startsWith("price.");
// //     const isProductEvent = stripeEvent.type.startsWith("product.");
// //     const isSubscriptionEvent = stripeEvent.type.startsWith(
// //       "customer.subscription"
// //     );

// //     if (isPriceEvent) {
// //       PriceEvent(stripeEvent, client);
// //     }

// //     if (isProductEvent) {
// //       ProductEvent(stripeEvent, client);
// //     }

// //     if (isSubscriptionEvent) {
// //       SubscriptionEvent(stripeEvent, client);
// //     }

// //     return `handled ${stripeEvent.type}.`;
// //   });

// //   async function ProductEvent(
// //     stripeEvent: Stripe.Event,
// //     client: SupabaseClient<unknown, never, never>
// //   ) {
// //     if (
// //       stripeEvent.type == "product.created" ||
// //       stripeEvent.type == "product.updated"
// //     ) {
// //       await client
// //         .from("stripe_products")
// //         .upsert(stripeEvent.data.object as any)
// //         .select();
// //       return `handled ${stripeEvent.type}.`;
// //     }

// //     if (stripeEvent.type == "product.deleted") {
// //       await client
// //         .from("stripe_products")
// //         .delete()
// //         .eq("id", stripeEvent.data.object.id);
// //       return `handled ${stripeEvent.type}.`;
// //     }
// //   }

// //   async function PriceEvent(
// //     stripeEvent: Stripe.Event,
// //     client: SupabaseClient<unknown, never, never>
// //   ) {
// //     if (
// //       stripeEvent.type == "price.created" ||
// //       stripeEvent.type == "price.updated"
// //     ) {
// //       await client
// //         .from("stripe_prices")
// //         .upsert(stripeEvent.data.object as any)
// //         .select();

// //       return `handled ${stripeEvent.type}.`;
// //     }

// //     if (stripeEvent.type == "price.deleted") {
// //       await client
// //         .from("stripe_prices")
// //         .delete()
// //         .eq("id", stripeEvent.data.object.id);
// //       return `handled ${stripeEvent.type}.`;
// //     }
// //   }

// //   async function SubscriptionEvent(
// //     stripeEvent: Stripe.Event,
// //     client: SupabaseClient<unknown, never, never>
// //   ) {
// //     if (
// //       stripeEvent.type == "customer.subscription.created" ||
// //       stripeEvent.type == "customer.subscription.updated"
// //     ) {
// //       let stripeEventObject = stripeEvent.data.object as any;

// //       if (stripeEvent.data.object.metadata.isUserBundle) {
// //         stripeEventObject.product_ids =
// //           stripeEvent.data.object.metadata.product_ids;
// //       }

// //       try {
// //         // check if meta dtaa choosedBundleAndWantTrial is true
// //         if (
// //           stripeEvent.data.object.metadata.choosedBundleAndWantTrial === "true" &&
// //           stripeEvent.type == "customer.subscription.created"
// //         ) {
// //           const stripe = StripeSingleton.getInstance();

// //          const completeSubscription = await stripe.subscriptions.create({
// //             customer: stripeEvent.data.object.customer.toString(),
// //             items: [{ price: "price_1PMz8jLCV8CxTiGeAYMfUNrz" }],
// //             trial_end: createUnixFromXDays(7),
// //             cancel_at_period_end: true,
// //             // expand: ["latest_invoice.payment_intent"],
// //             metadata: {
// //               customeremail: stripeEvent.data.object.metadata.customeremail,
// //             },
// //           });
// //         }
// //       } catch {
// //         console.error("error in creating trial subscription");
// //       }

// //       const { data, error } = await client
// //         .from("stripe_subscriptions")
// //         .upsert(stripeEventObject as any)
// //         .select();

// //       return `handled ${stripeEvent.type}.`;
// //     }

// //     if (stripeEvent.type == "customer.subscription.deleted") {
// //       await client
// //         .from("stripe_subscriptions")
// //         .delete()
// //         .eq("id", stripeEvent.data.object.id);
// //       return `handled ${stripeEvent.type}.`;
// //     }
// //   }
// //   function createUnixFromXDays(days: number) {
// //     return Math.floor(Date.now() / 1000) + days * 86400;
// //   }
