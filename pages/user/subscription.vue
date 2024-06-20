<template>
  <section>
    <SubModule v-if="!sub"></SubModule>

    <div v-if="sub">
      <div class="text-center my-2">
        <h3 class="mb-2">{{ sub.name }}</h3>
        <span class="text-lg">
          {{ sub.plan?.amount && sub.plan?.amount / 100 }}
          <span class="font-bold">
            kr/{{ sub.plan?.interval === "month" ? "mån" : "år" }}
          </span>
        </span>
        <form action="/api/stripe/createPortalSession" method="post">
          <input type="hidden" name="user_id" :value="user?.id" />
          <button
            type="submit"
            href="#"
            aria-describedby="tier-hobby"
            class="btn-primary btn btn-sm btn-neutral my-5"
          >
            Hantera prenumeration
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 ml-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SubscriptionDetails } from "~/helpers/domains/supabasehelper";
const user = useSupabaseUser();

const sub = ref<SubscriptionDetails | null>(null);
sub.value = await getUserSubscription();
</script>
