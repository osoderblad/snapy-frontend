<script setup lang="ts">
import { getAllDomains } from "~/helpers/domains/supabasehelper";
import { DomainColumns } from "~/helpers/domains/domainhelper";
import type { CombinedDomainInfo } from "~/types/bardate_domains";
import { useInfiniteScroll } from "@vueuse/core";
const from = ref(0) as Ref<number>;
const to = ref(10) as Ref<number>;
const el = ref<HTMLElement | null>(null);
const domains = ref([] as CombinedDomainInfo[]);
const isBusy = ref(false);
const columns = DomainColumns;
const noMoreData = ref(false);
const q = ref("");
const sort = ref({
  column: "name",
  direction: "desc",
});

onMounted(async () => {
  domains.value = await getAllDomains(from.value, to.value);
});

const filteredRows = computed(() => {
  if (!q.value) {
    return domains.value;
  }

  return domains.value.filter((domain: any) => {
    return Object.values(domain).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

useInfiniteScroll(
  el,
  async () => {
    if (noMoreData.value) {
      return;
    }

    //update from to
    from.value = to.value;
    to.value += 10;

    isBusy.value = true;
    var moreData = await getAllDomains(from.value, to.value);
    domains.value.push(...moreData);
    isBusy.value = false;
    if (moreData.length == 0) {
      noMoreData.value = true;
    }
  },
  { distance: 10 }
);
</script>

<template>
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtrera domäner..." />
    </div>

    <UTable
      :sort="sort"
      sort-asc-icon="i-heroicons-arrow-up-20-solid"
      sort-desc-icon="i-heroicons-arrow-down-20-solid"
      :sort-button="{
        icon: 'i-heroicons-sparkles-20-solid',
        color: 'primary',
        variant: 'outline',
        size: '2xs',
        square: false,
        ui: { rounded: 'rounded-full' },
      }"
      :rows="filteredRows"
      :columns="columns"
    >
      <!--template #available-data="{ row }">
        <span v-if="row.available">✔️</span>
        <span v-if="!row.available">Nej</span>
      </template!-->
    </UTable>

    <div ref="el" class="flex justify-center py-10">
      <span v-if="isBusy" class="loading loading-spinner opacity-50"></span>
    </div>
  </div>
</template>
