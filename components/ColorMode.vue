<template>
  <button
    @click="toggleColorMode()"
    type="button"
    class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
    aria-label="Switch to light mode"
  >
    <span
      class="i-heroicons-moon-20-solid flex-shrink-0 h-5 w-5"
      aria-hidden="true"
      v-if="
        $colorMode.preference === 'dark' ||
        $colorMode.preference === 'sepia' ||
        $colorMode.preference === 'system'
      "
    >
    </span>

    <span
      class="i-heroicons-sun-20-solid flex-shrink-0 h-5 w-5"
      aria-hidden="true"
      v-if="
        $colorMode.preference === 'light' ||
        $colorMode.preference === 'sepia' ||
        $colorMode.preference === 'system'
      "
    >
    </span>
  </button>
</template>

<script setup>
const colorMode = useColorMode();

function toggleColorMode() {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}

console.log(colorMode.preference);
</script>

<style>
/* body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
} */
</style>
