<template>
  <div>
    <span>Visar: {{ count }} av {{ fullCount }}</span>
    <span class="opacity-10 mx-2 text-sm">i vy: {{ domains.length }}</span>

    <div class="flex px-3 py-3.5 pl-0">
      <UInput v-model="q" placeholder="Filtrera domäner..." />
    </div>

    <div
      class="block bg-gray-300 bg-opacity-10 dark:bg-slate-50 dark:bg-opacity-5 rounded-lg shadow-md"
    >
      <UTable
        ref="el"
        class="h-[60svh] md:h-[75vh] overflow-y-scroll"
        :loading="isBusy"
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
        :rows="domains"
        :columns="columns"
      >
        <template #booked-data="{ row }">
          <!-- {{ row.booked }} -->

          <a
            class="text-xs font-semibold px-2 py-1 rounded-full text-indigo-200"
            >Boka</a
          >
        </template>
      </UTable>
    </div>

    <div class="flex justify-center py-10" v-if="!isBusy">
      <span v-if="isBusy" class="loading loading-spinner opacity-50"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAllDomains, GetCount } from "~/helpers/domains/supabasehelper";
import { DomainColumns } from "~/helpers/domains/domainhelper";
import type { CombinedDomainInfo } from "~/types/bardate_domains";
import { useScroll } from "@vueuse/core";
import { watchDebounced } from "@vueuse/core";

const el = ref(null);
const getCount = 30;
const from = ref(0) as Ref<number>;
const to = ref(getCount) as Ref<number>;
const domains = ref([] as CombinedDomainInfo[]);
const isBusy = ref(false);
const columns = DomainColumns;
const noMoreData = ref(false);
const q = ref("");
const count = ref(0);
const fullCount = ref(0);
const sort = ref({
  column: "name",
  direction: "desc",
});
// const el = ref<HTMLElement | null>(null);
const smooth = ref(true);
const behavior = computed(() => (smooth.value ? "smooth" : "auto"));
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, {
  behavior,
});
const { left, right, top, bottom } = toRefs(arrivedState);

watch(bottom, async (newValue) => {
  if (newValue) {
    if (noMoreData.value || isBusy.value) {
      return;
    }
    console.log("Fetching more data...");

    const nextFrom = to.value;
    const nextTo = nextFrom + getCount;

    isBusy.value = true;
    var res = await getAllDomains(nextFrom, nextTo, q.value.trim());
    const moreData = res.data;

    if (!moreData || moreData.length === 0) {
      // Lägg till en check för !moreData
      noMoreData.value = true;
    } else {
      from.value = nextFrom;
      to.value = nextTo;
      domains.value.push(...moreData);
      // count.value += moreData.length; // Uppdatera även här endast om moreData är valid
    }

    isBusy.value = false;
  }
});

watchDebounced(
  q,
  async (newValue) => {
    newValue = newValue.trim().toLowerCase();
    if (newValue) {
      from.value = 0;
      to.value = getCount;
      noMoreData.value = false; // Se till att återställa detta också
    }

    var res = await getAllDomains(from.value, to.value, newValue.trim());
    domains.value = res.data;
    count.value = res.count;
    isBusy.value = false;
  },
  { debounce: 300 }
);

onMounted(async () => {
  isBusy.value = true;
  var counta = await GetCount();
  fullCount.value = counta;

  const res = await getAllDomains(from.value, to.value);
  domains.value = res.data;
  count.value = res.count;
  isBusy.value = false;
});

// useInfiniteScroll(
//   el,
//   async () => {
//     if (noMoreData.value || isBusy.value) {
//       return;
//     }
//     console.log("Fetching more data...");

//     const nextFrom = to.value;
//     const nextTo = nextFrom + 10;

//     isBusy.value = true;
//     var res = await getAllDomains(nextFrom, nextTo, q.value.trim());
//     const moreData = res.data;

//     if (!moreData || moreData.length === 0) {
//       // Lägg till en check för !moreData
//       noMoreData.value = true;
//     } else {
//       from.value = nextFrom;
//       to.value = nextTo;
//       domains.value.push(...moreData);
//       // count.value += moreData.length; // Uppdatera även här endast om moreData är valid
//     }

//     isBusy.value = false;
//   },
//   { distance: 100 }
// );
</script>
