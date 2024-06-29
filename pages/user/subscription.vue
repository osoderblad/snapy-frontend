<template>
  <section>
    <h2>Prenumerationer</h2>
    <template v-if="loaded">
      <SubModule v-if="!sub"></SubModule>
      <SubHelper
        v-if="sub"
        class="text-center my-2"
        :subscription="sub"
      ></SubHelper>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { SubscriptionDetails } from "~/helpers/supabasehelper";
const sub = ref<SubscriptionDetails | null>(null);
const loaded = ref(false);

onMounted(async () => {
  sub.value = await getUserSubscription();
  loaded.value = true;
});
</script>
