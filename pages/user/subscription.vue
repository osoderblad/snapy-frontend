<template>
  <section>
    <SubModule v-if="!sub"></SubModule>
    <div v-if="sub">
      <div class="text-center my-2">
        <SubHelper :subscription="sub"></SubHelper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SubscriptionDetails } from "~/helpers/supabasehelper";
const sub = ref<SubscriptionDetails | null>(null);
sub.value = await getUserSubscription();
</script>
