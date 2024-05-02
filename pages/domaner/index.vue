<template>
  <section ref="el">
    <div class="w-full m-auto">
      <h3>Domäner</h3>
      <TableView :scroll-ref="el"></TableView>
    </div>
  </section>
</template>

<script async setup>
const el = ref(null);
provide("scrollRef", el);
</script>
