<template>
  <div class="w-full flex justify-center mb-20">
    <NuxtLink
      to="/login"
      class="p-3 rounded-lg no-underline"
      :class="
        isActive('login')
          ? 'bg-indigo-400 bg-opacity-20 text-indigo-50 text-md'
          : 'text-indigo-400 text-opacity-50 text-md'
      "
      >Logga in</NuxtLink
    >
    <NuxtLink
      to="/createuser"
      class="p-3 rounded-lg no-underline"
      :class="
        isActive('create')
          ? 'bg-indigo-400 bg-opacity-20 text-indigo-50 text-md'
          : 'text-indigo-400 text-opacity-50 text-md'
      "
      >Skapa konto</NuxtLink
    >
    <span></span>
  </div>
</template>

<script setup lang="ts">
const route = useRouter();

function isActive(href: string) {
  return route.currentRoute.value.path.includes(href);
}
</script>
