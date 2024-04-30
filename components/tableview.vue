<script setup lang="ts">
import { getAllDomains } from "~/helpers/domains/supabasehelper";
import { useInfiniteScroll } from "@vueuse/core";
const from = ref(0) as Ref<number>;
const to = ref(10) as Ref<number>;
const el = ref<HTMLElement | null>(null);
const domains = ref(await getAllDomains(from.value, to.value));
const isBusy = ref(false);

const columns = [
  {
    key: "name",
    label: "Namn",
    sortable: true,
  },
  {
    key: "release_at",
    label: "Release",
    sortable: true,
  },
  // {
  //   key: "domain_created_at",
  //   label: "Domän skapad",
  //   sortable: true,
  // },
  // {
  //   key: "updated_at",
  //   label: "Uppdaterad",
  //   sortable: true,
  // },
  // {
  //   key: "ttl",
  //   label: "TTL",
  //   sortable: true,
  // },
  // {
  //   key: "info_created_at",
  //   label: "Info skapad",
  //   sortable: true,
  // },
  {
    key: "url_length",
    label: "URL-längd",
    sortable: true,
  },
  {
    key: "available",
    label: "Tillgänglig",
    sortable: true,
  },
  // {
  //   key: "cctld",
  //   label: "Landskod",
  //   sortable: true,
  // },
  // {
  //   key: "days_until_release",
  //   label: "Dagar till release",
  //   sortable: true,
  // },
];

const noMoreData = ref(false);

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

const sort = ref({
  column: "name",
  direction: "desc",
});

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return domains.value;
  }

  return domains.value.filter((domain) => {
    return Object.values(domain).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
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
      <template #available-data="{ row }">
        <span v-if="row.available">✔️</span>
        <span v-if="!row.available">Nej</span>
      </template>
    </UTable>

    <div ref="el" class="flex justify-center py-10">
      <span v-if="isBusy" class="loading loading-spinner"></span>
    </div>
  </div>
</template>
