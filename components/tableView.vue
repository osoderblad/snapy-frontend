<template>
  <div>
    <span>Visar: {{ count }} av {{ totalItems }}</span>

    <ClientOnly>
      <Modal
        :isOpen="modelIsOpen"
        @close="closeModal()"
        :item="selectedItem"
        v-if="selectedItem"
      ></Modal>
    </ClientOnly>
    <span class="opacity-10 mx-2 text-sm">i vy: {{ domains.length }}</span>
    <div class="flex px-3 py-3.5 pl-0">
      <input
        v-model="q"
        class="input bg-primary text-black placeholder-gray-400 dark:bg-[#20697C] dark:text-[#B7FBFF] dark:placeholder-[#B7FBFF]"
        placeholder="Filtrera domäner..."
      />
    </div>
    <div
      class="block bg-gray-300 bg-opacity-10 dark:bg-slate-50 dark:bg-opacity-5 rounded-lg shadow-md"
    >
      <div class="overflow-x-scroll h-[65vh] relative" ref="el">
        <span
          v-if="isBusy"
          class="loading loading-spinner absolute left-2 top-2 z-[100] bg-fuchsia-500"
        ></span>
        <table class="table" v-show="domains.length > 0">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                @click="column.sortable ? sortBy(column.key) : null"
              >
                {{ column.label }}
                <span v-if="sortColumn === column.key">
                  {{ sortDirection === "asc" ? "↑" : "↓" }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in domains" :key="index">
              <td v-for="column in columns" :key="column.key">
                {{ item[column.key as keyof typeof item] }}
              </td>
              <td>
                <button
                  v-if="
                    !myBookings?.data?.some((i) => i.domain_name == item.name)
                  "
                  class="btn btn-ghost bg-[#1D2234] btn-sm rounded-full"
                  @click="openModal(item)"
                >
                  Boka
                </button>
                <button
                  v-else
                  class="btn btn-ghost bg-[#1D2234] btn-sm rounded-full"
                >
                  <CheckIcon class="w-5 h-5 text-green-500"></CheckIcon>
                </button>
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
import { getAllDomains, GetCount } from "~/helpers/supabasehelper";
import { DomainColumns } from "~/helpers/domains/domainhelper";
import { CheckIcon } from "@heroicons/vue/24/solid";
import type {
  CombinedDomainInfo,
  CombinedDomainInfoModal,
} from "~/types/bardate_domains";
import { useScroll, watchDebounced } from "@vueuse/core";
import { ref, onMounted } from "vue";
import type { Snapback_Order } from "~/types/snapback_orders";
const modelIsOpen = ref(false);
const selectedItem = ref<CombinedDomainInfoModal | null>(null);
const columns = DomainColumns;
const isBusy = ref(false);
const el = ref(null);
const pageSize = 30;
const domains = ref([] as CombinedDomainInfo[]);
const q = ref("");
const count = ref<number | null>(0);
const sortColumn = ref("");
const sortDirection = ref<"desc" | "asc">("asc");
const currentPage = ref(1);
const totalItems = ref(0);
const myBookings = ref<{ data: Snapback_Order[] | null; error: any }>();
const { arrivedState } = useScroll(el, {});
const { bottom } = toRefs(arrivedState);

const isLastPage = computed(() => {
  const maxPage = Math.ceil(totalItems.value / pageSize);
  if (!count.value) return true;

  if (count.value < pageSize) {
    return true;
  }
  return currentPage.value >= maxPage;
});

async function updatePage(page: number) {
  isBusy.value = true;
  currentPage.value = page;
  const from = (currentPage.value - 1) * pageSize;
  const to = currentPage.value * pageSize - 1;
  await getDomains(from, to, q.value.trim());
  isBusy.value = false;
}

async function openModal(item: any) {
  selectedItem.value = item;
  modelIsOpen.value = true;
}

function closeModal() {
  modelIsOpen.value = false;
  selectedItem.value = null;
  getBookedDomains().then((res) => {
    myBookings.value = res;
  });
}

onMounted(() => {
  GetCount().then((res) => (totalItems.value = res));
  updatePage(1);

  getBookedDomains().then((res) => {
    myBookings.value = res;
  });
});

async function getDomains(from: number, to: number, q: string) {
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

const sortBy = (key: any) => {
  if (sortColumn.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = key;
    sortDirection.value = "asc";
  }
};
</script>
