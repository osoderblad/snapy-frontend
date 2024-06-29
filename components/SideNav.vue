<template>
  <header class="w-full bg-base-100">
    <ul class="links">
      <li v-for="link in links">
        <NuxtLink :to="link.to" class="flex">
          <component class="h-5 w-5 mr-2" :is="link.icon"></component>
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>

<script setup>
const props = defineProps(["links"]);
</script>
