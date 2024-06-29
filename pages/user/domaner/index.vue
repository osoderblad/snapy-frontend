<template>
  <section>
    <div class="w-full m-auto">
      <h3>Domäner</h3>

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
