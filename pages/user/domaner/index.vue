<template>
  <section>
    <div class="w-full m-auto">
      <h2
        class="bg-gradient-to-br from-orange-500 to-yellow-300 bg-clip-text text-transparent font-bold"
      >
        Domäner
      </h2>

      <ClientOnly>
        <TableView :class="!accountCompleted && 'disabled'"></TableView>
      </ClientOnly>
    </div>
  </section>
</template>

<script async setup lang="ts">
const accountCompleted = useState("accountCompleted");
useSeoMeta({
  title: "Domäner",
  description: "Snapbacks by Snapy",
});

// const el = ref(null);
// provide("scrollRef", el);
</script>
