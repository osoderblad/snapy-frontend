// import type { IUser } from "~~/types/IUser";
// import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
// import type { ISubscription } from "~~/types/ISubscription";

import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { IUser } from "~/server/types/IUser";

export async function getCurrentUser(event: any): Promise<IUser> {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("users")
    .select()
    .eq("id", user?.id as string)
    .single();

  if (error) {
    throw createError({ statusMessage: error.message });
  }
  return data;
}

// export async function getUserByStripeCustomerId(
//   id: any,
//   event: any
// ): Promise<IUser> {
//   const client = await serverSupabaseClient(event);
//   const { data, error } = await client
//     .from("users")
//     .select()
//     .eq("stripeCustomerId", id)
//     .single();

//   if (error) {
//     throw createError({ statusMessage: error.message });
//   }

//   return data;
// }

// export async function getSubscriptionById(
//   id: any,
//   event: any
// ): Promise<ISubscription> {
//   const client = await serverSupabaseClient(event);

//   const { data, error } = await client
//     .from("subscriptions")
//     .select("*")
//     .eq("id", id);

//   if (error) {
//     throw createError({ statusMessage: error.message });
//   }

//   if (data?.length > 0) return data[0] as ISubscription;

//   return {} as ISubscription;
// }

export async function updateStripeCustomerId(data: IUser, event: any) {
  const client = await serverSupabaseClient(event);

  const { status } = await client
    .from("users")
    .update({ stripeCustomerId: data.stripeCustomerId } as never)
    .eq("id", data.id as number);

  return status;
}

// export async function createOrUpdateSubscription(
//   data: ISubscription,
//   event: any
// ) {
//   const client = await serverSupabaseClient(event);

//   //@ts-ignore
//   return await client.from("subscriptions").upsert({
//     id: data.id,
//     userId: data.userId,
//     stripeCustomerId: data.stripeCustomerId,
//     stripeStatus: data.stripeStatus,
//     stripePriceId: data.stripePriceId,
//     quantity: data.quantity,
//     trialEndsAt: data.trialEndsAt,
//     endsAt: data.endsAt,
//     startDate: data.startDate,
//     lastEventDate: data.lastEventDate,
//     cancel_at: data.cancel_at,
//     cancel_at_period_end: data.cancel_at_period_end,
//     canceled_at: data.canceled_at,
//     current_period_end: data.current_period_end,
//     current_period_start: data.current_period_start,
//   });
// }
