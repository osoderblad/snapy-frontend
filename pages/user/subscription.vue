<template>
  <section>
    <SubModule v-if="!sub"></SubModule>

    <div v-if="sub">
      <div class="text-center my-2">
        {{ sub }}
        <span class="text-lg">
          {{ sub.plan?.amount && sub.plan?.amount / 100 }}
          <span class="font-bold">
            kr/{{ sub.plan?.interval === "month" ? "mån" : "år" }}
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SubscriptionDetails } from "~/helpers/domains/supabasehelper";

const sub = ref<SubscriptionDetails | null>(null);
sub.value = await getUserSubscription();
</script>
