<template>
  <div class="w-full bg-base-100">
    <ul>
      <li v-for="link in links">
        <NuxtLink :to="link.to" class="flex">
          <component class="h-5 w-5 mr-2" :is="link.icon"></component>
          <span>{{ link.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(["links"]);
</script>
