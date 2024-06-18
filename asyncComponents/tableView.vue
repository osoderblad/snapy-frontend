<template>
  <div>
    <label class="form-control w-full">
      <input
        v-model="search"
        type="text"
        placeholder="Sök..."
        class="input bg-secondary w-full max-w-xs mb-2" />
    </label>

    <div class="table-container overflow-auto">
      <table
        class="table mb-10 table-xs lg:table-md"
        :style="`width:${width}px;`">
        <tr class="opacity-60">
          <th :style="`width:${item.width}`" v-for="item in options?.columns">
            {{ item.name }}
          </th>
        </tr>
        <tbody>
          <tr v-for="item in filteredList" class="h-12" :key="item.id">
            <th>
              <span class="badge badge-ghost badge-sm">
                <MyNuxtLink :to="`/admin/edit/${type}/${item.id}`">
                  <PencilIcon class="h-5 w-5 inline"></PencilIcon>
                </MyNuxtLink>
              </span>
            </th>
            <td>
              <span class="text-gray-400 text-xs">({{ item.id }})</span>

              <span class="ml-2">{{ item.title || item.name }}</span>
            </td>
            <td>
              <span>
                {{
                  item.publication_date
                    ? dateTimeToDate(item.publication_date)
                    : dateTimeToDate(item.created_at)
                }}
              </span>
            </td>
            <th v-if="type == 'course'">
              <span class="text-xs" v-if="item.stripe_id">
                {{ item.stripe_id }}
              </span>
              <span
                v-else
                class="bg-red-400 bg-opacity-45 text-red-100 p-1 rounded-md text-xs">
                Ingen koppling
              </span>
            </th>
            <th v-if="type == 'course' || type == 'article'">
              <MyNuxtLink target="_blank" :to="`/${type}/${item.slug}`">
                <button class="text-xs">
                  {{ item.slug }}
                  <LinkIcon class="h-4 w-4 inline"></LinkIcon>
                </button>
              </MyNuxtLink>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Course } from "~/types/database/course";
import type { ProductView } from "~/types/database/product";
import { dateTimeToDate } from "~/utils/webHelper";
import { PencilIcon, LinkIcon } from "@heroicons/vue/24/solid";
import type { Article } from "~/types/database/article";
const search = ref("");
const props = defineProps({
  list: Object as any,
  type: String as PropType<
    "product" | "course" | "article" | "testimonial" | "rootpage"
  >,
  options: Object as PropType<TableOptions>,
  width: Number,
});

const filteredList = computed(() => {
  const sv = search.value?.toLowerCase();

  let filtered = props.list?.filter((item: ProductView | Course | Article) => {
    if (props.type == "article") {
      var article = item as Article;
      return (
        article.title?.toLowerCase().includes(sv) ||
        article.slug?.toLowerCase().includes(sv) ||
        article.publication_date?.toString().toLowerCase().includes(sv) ||
        article.id?.toString()?.toLowerCase().includes(sv)
      );
    }

    var coupr = item as ProductView | Course;
    //@ts-ignore
    var nameortitle = coupr.title || coupr.name;
    return (
      nameortitle.toLowerCase().includes(sv) ||
      coupr.slug?.toLowerCase().includes(sv) ||
      coupr.stripe_id?.toLowerCase().includes(sv) ||
      coupr.created_at?.toString().toLowerCase().includes(sv) ||
      coupr.id.toString()?.toLowerCase().includes(sv)
    );
  });

  return filtered?.sort((a: any, b: any) => {
    let dateA =
      props.type == "article"
        ? new Date((a as Article).publication_date)
        : new Date((a as any).created_at);
    let dateB =
      props.type == "article"
        ? new Date((b as Article).publication_date)
        : new Date((b as any).created_at);

    // Ändra `dateA < dateB` till `dateA > dateB` om du vill sortera i fallande ordning (nyaste först)
    return dateA > dateB ? -1 : 1;
  });
});

export type TableOptions = {
  type: "product" | "course" | "article" | "testimonial";
  columns: TableColumn[];
};
export type TableColumn = {
  name: string;

  width: string;
};
</script>
<style>
.table :where(thead, tbody) :where(tr:not(:last-child)) {
  border-color: rgb(65, 65, 65);
}
</style>
