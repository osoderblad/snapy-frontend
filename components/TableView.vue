<template>
  <div>
    <span>Visar: {{ count }} av {{ totalItems }}</span>
    <span class="opacity-10 mx-2 text-sm">i vy: {{ domains.length }}</span>
    <div class="flex px-3 py-3.5 pl-0">
      <input
        v-model="q"
        class="input bg-primary text-black placeholder-gray-400 dark:bg-slate-800 dark:text-white dark:placeholder-gray-500"
        placeholder="Filtrera domäner..."
      />
    </div>
    <div
      class="block bg-gray-300 bg-opacity-10 dark:bg-slate-50 dark:bg-opacity-5 rounded-lg shadow-md"
    >
      <div class="overflow-x-scroll h-[65vh]" ref="el">
        <table class="table" v-show="domains.length > 0">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                @click="column.sortable ? sortBy(column.key) : null"
              >
                {{ column.label }}
                <span v-if="sortColumn.value === column.key">
                  {{ sortDirection.value === "asc" ? "↑" : "↓" }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in domains" :key="item.id">
              <td v-for="column in columns" :key="column.key">
                {{ item[column.key] }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th v-for="column in columns" :key="column.key">
                {{ column.label }}
              </th>
            </tr>
          </tfoot>
        </table>
        <span
          v-if="domains.length > 0"
          class="btn btn-primary"
          :class="isLastPage ? 'hidden' : ''"
          @click="loadMore"
          >Ladda fler</span
        >
        <span v-if="domains.length == 0">Empty table</span>
      </div>
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
const columns = DomainColumns;
const isBusy = ref(false);
const el = ref(null);
const pageSize = 30;
const domains = ref([] as CombinedDomainInfo[]);
const q = ref("");
const count = ref(0);
const sortColumn = ref("");
const sortDirection = ref("");
const currentPage = ref(1);
const totalItems = ref(0);

const isLastPage = computed(() => {
  const maxPage = Math.ceil(totalItems.value / pageSize);
  if (count.value < pageSize) {
    return true;
  }
  return currentPage.value >= maxPage;
});

async function updatePage(page) {
  currentPage.value = page;
  const from = (currentPage.value - 1) * pageSize;
  const to = currentPage.value * pageSize - 1;
  // console.log("updatePage", from, to, q.value.trim());
  await getDomains(from, to, q.value.trim());
}

function calculateCurrentPage(totalItems, currentIndex) {
  const itemsPerPage = pageSize;
  return Math.ceil((currentIndex + 1) / itemsPerPage);
}

onMounted(async () => {
  isBusy.value = true;
  totalItems.value = await GetCount();

  await getDomains(0, pageSize, q.value.trim());

  isBusy.value = false;
});

// async function getDomains(from, to, q) {
//   var res = await getAllDomains(
//     from,
//     to,
//     q.trim(),
//     sortColumn.value,
//     sortDirection.value
//   );
//   count.value = res.count;

//   if (currentPage.value === 1) {
//     domains.value = res.data;
//   } else {
//     domains.value.push(...res.data);
//   }
// }

async function getDomains(from, to, q) {
  isBusy.value = true;
  const res = await getAllDomains(
    from,
    to,
    q,
    sortColumn.value,
    sortDirection.value
  );
  isBusy.value = false;

  if (currentPage.value === 1) {
    domains.value = res.data;
  } else {
    domains.value.push(...res.data);
  }
  count.value = res.count;
}

watchDebounced(
  [q, sortColumn, sortDirection],
  () => {
    updatePage(1);
  },
  { debounce: 300, maxWait: 1000 }
);

// watchDebounced(
//   [q, sortColumn, sortDirection],
//   async () => {
//     updatePage(1);
//   },
//   1500
// );

const behavior = computed(() => "smooth");
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, {
  behavior,
});
const { left, right, top, bottom } = toRefs(arrivedState);

function loadMore() {
  if (!isLastPage.value && domains.value.length < totalItems.value) {
    updatePage(currentPage.value + 1);
  }
}

watch(bottom, async (newValue) => {
  if (domains.value.length > 0 && newValue && !isLastPage.value) {
    updatePage(currentPage.value + 1);
  }
});

const sortBy = (key) => {
  if (sortColumn.value === key) {
    // Om samma kolumn, ändra riktningen
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    // Ny kolumn, starta med stigande sortering
    sortColumn.value = key;
    sortDirection.value = "asc";
  }
};
</script>
