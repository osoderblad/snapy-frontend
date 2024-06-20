<template>
  <section>
    <div v-if="loaded">
      <SubModule v-if="!sub"></SubModule>
      <div v-if="sub">
        <div class="text-center my-2">
          <SubHelper :subscription="sub"></SubHelper>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SubscriptionDetails } from "~/helpers/supabasehelper";
const sub = ref<SubscriptionDetails | null>(null);
const loaded = ref(false);
onMounted(async () => {
  if (!sub.value) {
    sub.value = await getUserSubscription();
    loaded.value = true;
  }
});
</script>
